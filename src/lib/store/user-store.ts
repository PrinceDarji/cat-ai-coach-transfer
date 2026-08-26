import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/lib/types';

interface UserState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  setProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  updateGoals: (targetPercentile: number, targetColleges: string[], catExamDate?: string) => void;
  updateSchedule: (weekdayHours: number, weekendHours: number, preferredTime: string) => void;
  resetProfile: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      isOnboarded: false,
      
      setProfile: (profile) => set((state) => ({ 
        profile: state.profile 
          ? { ...state.profile, ...profile } 
          : profile as UserProfile 
      })),
      
      completeOnboarding: () => set({ isOnboarded: true }),
      
      updateGoals: (targetPercentile, targetColleges, catExamDate = '2026-11-24') => 
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            targetPercentile,
            targetColleges,
            catExamDate
          } : { targetPercentile, targetColleges, catExamDate } as UserProfile
        })),
        
      updateSchedule: (weekdayHours, weekendHours, preferredTime) =>
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            studySchedule: { weekdayHours, weekendHours, preferredTime }
          } : { studySchedule: { weekdayHours, weekendHours, preferredTime } } as UserProfile
        })),
        
      resetProfile: () => set({ profile: null, isOnboarded: false }),
    }),
    {
      name: 'cat-user-storage',
    }
  )
);
