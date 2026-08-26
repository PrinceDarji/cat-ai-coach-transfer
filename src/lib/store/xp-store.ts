import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { XPEvent, Badge } from '@/lib/types';
import { BADGES, XP_AWARDS, LEVEL_THRESHOLDS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface XPState {
  totalXP: number;
  xpHistory: XPEvent[];
  badges: Badge[];
  streak: number;
  lastLoginDate: string | null;
  longestStreak: number;

  addXP: (type: XPEvent['type'], description?: string) => void;
  checkStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  checkBadgeEligibility: () => void;
  getLevel: () => { level: number; currentXP: number; nextLevelXP: number; progress: number };
  resetXP: () => void;
}

const initialBadges: Badge[] = BADGES.map((b: any) => ({ ...b, unlockedAt: null }));

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      xpHistory: [],
      badges: initialBadges,
      streak: 0,
      lastLoginDate: null,
      longestStreak: 0,

      addXP: (type, description) => set((state) => {
        const amount = XP_AWARDS[type] || 0;
        const event: XPEvent = {
          id: generateId(),
          type,
          amount,
          timestamp: new Date().toISOString(),
          description
        };
        return {
          totalXP: state.totalXP + amount,
          xpHistory: [...state.xpHistory, event]
        };
      }),

      checkStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (!state.lastLoginDate) {
          return { lastLoginDate: today, streak: 1, longestStreak: Math.max(1, state.longestStreak) };
        }
        if (state.lastLoginDate === today) {
          return state;
        }
        
        const lastDate = new Date(state.lastLoginDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastLoginDate === yesterdayStr) {
          const newStreak = state.streak + 1;
          return { lastLoginDate: today, streak: newStreak, longestStreak: Math.max(newStreak, state.longestStreak) };
        }
        
        return { lastLoginDate: today, streak: 1 };
      }),

      unlockBadge: (badgeId) => set((state) => ({
        badges: state.badges.map(b => b.id === badgeId ? { ...b, unlockedAt: new Date().toISOString() } : b)
      })),

      checkBadgeEligibility: () => {
        // Implementation would check various conditions and unlock badges via get().unlockBadge
        // Skipping exact logic for now since it depends on the full app state (other stores)
      },

      getLevel: () => {
        const totalXP = get().totalXP;
        let level = 1;
        let nextLevelXP = LEVEL_THRESHOLDS[1] || 1000;

        for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
          if (totalXP >= LEVEL_THRESHOLDS[i]) {
            level = i + 1;
            nextLevelXP = LEVEL_THRESHOLDS[i + 1] || LEVEL_THRESHOLDS[i] + 1000;
          } else {
            break;
          }
        }
        
        const currentLevelBaseXP = LEVEL_THRESHOLDS[level - 1] || 0;
        const currentXPInLevel = totalXP - currentLevelBaseXP;
        const levelXPRequirement = nextLevelXP - currentLevelBaseXP;
        const progress = Math.min(100, Math.max(0, (currentXPInLevel / levelXPRequirement) * 100));

        return { level, currentXP: totalXP, nextLevelXP, progress };
      },

      resetXP: () => set({
        totalXP: 0,
        xpHistory: [],
        badges: initialBadges,
        streak: 0,
        lastLoginDate: null,
        longestStreak: 0
      })
    }),
    {
      name: 'cat-xp-storage',
    }
  )
);
