import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockResult, SectionType } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface MockState {
  mocks: MockResult[];
  
  addMock: (mock: Omit<MockResult, 'id'>) => void;
  deleteMock: (id: string) => void;
  
  getAverageScore: () => number;
  getAveragePercentile: () => number;
  getScoreTrend: () => { date: string; score: number }[];
  getPercentileTrend: () => { date: string; percentile: number }[];
  getSectionTrends: (section: SectionType) => { date: string; score: number; accuracy: number }[];
  getBestMock: () => MockResult | null;
  getLatestMock: () => MockResult | null;
}

export const useMockStore = create<MockState>()(
  persist(
    (set, get) => ({
      mocks: [],
      
      addMock: (mock) => set((state) => ({
        mocks: [...state.mocks, { ...mock, id: generateId() }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      })),
      
      deleteMock: (id) => set((state) => ({
        mocks: state.mocks.filter(m => m.id !== id)
      })),
      
      getAverageScore: () => {
        const mocks = get().mocks;
        if (mocks.length === 0) return 0;
        const total = mocks.reduce((sum, m) => sum + m.overallScore, 0);
        return Math.round(total / mocks.length);
      },
      
      getAveragePercentile: () => {
        const mocks = get().mocks;
        if (mocks.length === 0) return 0;
        const total = mocks.reduce((sum, m) => sum + m.percentile, 0);
        return Number((total / mocks.length).toFixed(2));
      },
      
      getScoreTrend: () => get().mocks.map(m => ({ date: m.date, score: m.overallScore })),
      
      getPercentileTrend: () => get().mocks.map(m => ({ date: m.date, percentile: m.percentile })),
      
      getSectionTrends: (section) => get().mocks.map(m => {
        let sectionResult;
        if (Array.isArray(m.sections)) {
          sectionResult = m.sections.find((s: any) => s.section === section);
        } else if (m.sections) {
          sectionResult = (m.sections as any)[section];
        }
        return {
          date: m.date,
          score: sectionResult?.score || 0,
          accuracy: sectionResult?.accuracy || 0
        };
      }),
      
      getBestMock: () => {
        const mocks = get().mocks;
        if (mocks.length === 0) return null;
        return mocks.reduce((best, m) => (m.percentile > best.percentile) ? m : best, mocks[0]);
      },
      
      getLatestMock: () => {
        const mocks = get().mocks;
        if (mocks.length === 0) return null;
        return mocks[mocks.length - 1];
      }
    }),
    {
      name: 'cat-mock-storage',
    }
  )
);
