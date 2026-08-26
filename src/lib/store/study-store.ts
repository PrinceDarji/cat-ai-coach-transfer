import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Topic, TopicStatus, DailyPlan, StudySession, RevisionItem, SectionType } from '@/lib/types';
import { CAT_TOPICS } from '@/lib/constants';

interface StudyState {
  topics: Topic[];
  dailyPlan: DailyPlan | null;
  studySessions: StudySession[];
  revisionItems: RevisionItem[];
  
  updateTopicStatus: (topicId: string, status: TopicStatus) => void;
  updateTopicProgress: (topicId: string, updates: Partial<Topic>) => void;
  setDailyPlan: (plan: DailyPlan) => void;
  completeTask: (taskId: string) => void;
  skipTask: (taskId: string, reason: string) => void;
  addStudySession: (session: StudySession) => void;
  addRevisionItem: (item: RevisionItem) => void;
  updateRevisionItem: (topicId: string, item: RevisionItem) => void;
  
  getTopicsBySection: (section: SectionType) => Topic[];
  getWeakTopics: (threshold?: number) => Topic[];
  getTotalHoursStudied: () => number;
  getTotalQuestionsAttempted: () => number;
  getOverallAccuracy: () => number;
}

const initialTopics: Topic[] = CAT_TOPICS.map((topic: any) => ({
  id: topic.id,
  name: topic.name,
  section: topic.section,
  category: topic.category,
  status: 'not-started' as TopicStatus,
  progress: 0,
  questionsAttempted: 0,
  questionsCorrect: 0,
  accuracy: 0,
  averageTime: 0,
  lastStudied: null,
  nextRevision: null,
  masteryConfidence: 0,
}));

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      topics: initialTopics,
      dailyPlan: null,
      studySessions: [],
      revisionItems: [],
      
      updateTopicStatus: (topicId, status) => set((state) => ({
        topics: state.topics.map(t => t.id === topicId ? { ...t, status } : t)
      })),
      
      updateTopicProgress: (topicId, updates) => set((state) => ({
        topics: state.topics.map(t => t.id === topicId ? { ...t, ...updates } : t)
      })),
      
      setDailyPlan: (plan) => set({ dailyPlan: plan }),
      
      completeTask: (taskId) => set((state) => ({
        dailyPlan: state.dailyPlan ? {
          ...state.dailyPlan,
          tasks: state.dailyPlan.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t)
        } : null
      })),
      
      skipTask: (taskId, reason) => set((state) => ({
        dailyPlan: state.dailyPlan ? {
          ...state.dailyPlan,
          tasks: state.dailyPlan.tasks.map(t => t.id === taskId ? { ...t, skipped: true, skipReason: reason } : t)
        } : null
      })),
      
      addStudySession: (session) => set((state) => ({
        studySessions: [...state.studySessions, session]
      })),
      
      addRevisionItem: (item) => set((state) => ({
        revisionItems: [...state.revisionItems, item]
      })),
      
      updateRevisionItem: (topicId, item) => set((state) => ({
        revisionItems: state.revisionItems.map(r => r.topicId === topicId ? { ...r, ...item } : r)
      })),
      
      getTopicsBySection: (section) => get().topics.filter(t => t.section === section),
      
      getWeakTopics: (threshold = 60) => get().topics.filter(t => t.status !== 'not-started' && t.accuracy < threshold),
      
      getTotalHoursStudied: () => {
        const sessions = get().studySessions;
        return sessions.reduce((total, session) => total + (session.hoursStudied || 0), 0);
      },
      
      getTotalQuestionsAttempted: () => {
        return get().topics.reduce((total, topic) => total + (topic.questionsAttempted || 0), 0);
      },
      
      getOverallAccuracy: () => {
        const topics = get().topics;
        const totalAttempted = topics.reduce((total, topic) => total + (topic.questionsAttempted || 0), 0);
        const totalCorrect = topics.reduce((total, topic) => total + (topic.questionsCorrect || 0), 0);
        return totalAttempted === 0 ? 0 : Math.round((totalCorrect / totalAttempted) * 100);
      }
    }),
    {
      name: 'cat-study-storage',
    }
  )
);
