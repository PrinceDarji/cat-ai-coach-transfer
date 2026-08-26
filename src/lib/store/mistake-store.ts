import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Mistake, MistakeCategory, SectionType } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface MistakeState {
  mistakes: Mistake[];
  
  addMistake: (mistake: Omit<Mistake, 'id' | 'createdAt' | 'isRepeated'>) => void;
  updateMistake: (id: string, updates: Partial<Mistake>) => void;
  deleteMistake: (id: string) => void;
  
  getMistakesByTopic: (topicId: string) => Mistake[];
  getMistakesBySection: (section: SectionType) => Mistake[];
  getMistakesByCategory: (category: MistakeCategory) => Mistake[];
  getRepeatedMistakes: () => Mistake[];
  getMostCommonCategory: () => MistakeCategory | null;
  getMostErrorProneTopic: () => { topicId: string; topicName: string; count: number } | null;
}

export const useMistakeStore = create<MistakeState>()(
  persist(
    (set, get) => ({
      mistakes: [],
      
      addMistake: (mistake) => set((state) => {
        const isRepeated = state.mistakes.some(m => m.topicId === mistake.topicId && m.category === mistake.category);
        const newMistake: Mistake = {
          ...mistake,
          id: generateId(),
          createdAt: new Date().toISOString(),
          isRepeated
        };
        return { mistakes: [...state.mistakes, newMistake] };
      }),
      
      updateMistake: (id, updates) => set((state) => ({
        mistakes: state.mistakes.map(m => m.id === id ? { ...m, ...updates } : m)
      })),
      
      deleteMistake: (id) => set((state) => ({
        mistakes: state.mistakes.filter(m => m.id !== id)
      })),
      
      getMistakesByTopic: (topicId) => get().mistakes.filter(m => m.topicId === topicId),
      
      getMistakesBySection: (section) => get().mistakes.filter(m => m.section === section),
      
      getMistakesByCategory: (category) => get().mistakes.filter(m => m.category === category),
      
      getRepeatedMistakes: () => get().mistakes.filter(m => m.isRepeated),
      
      getMostCommonCategory: () => {
        const mistakes = get().mistakes;
        if (mistakes.length === 0) return null;
        
        const counts = mistakes.reduce((acc, m) => {
          acc[m.category] = (acc[m.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as MistakeCategory;
      },
      
      getMostErrorProneTopic: () => {
        const mistakes = get().mistakes;
        if (mistakes.length === 0) return null;
        
        const counts = mistakes.reduce((acc, m) => {
          if (!acc[m.topicId]) {
            acc[m.topicId] = { count: 0, topicName: m.topicName || m.topicId };
          }
          acc[m.topicId].count += 1;
          return acc;
        }, {} as Record<string, { count: number; topicName: string }>);
        
        const maxTopicId = Object.keys(counts).reduce((a, b) => counts[a].count > counts[b].count ? a : b);
        return { topicId: maxTopicId, topicName: counts[maxTopicId].topicName, count: counts[maxTopicId].count };
      }
    }),
    {
      name: 'cat-mistake-storage',
    }
  )
);
