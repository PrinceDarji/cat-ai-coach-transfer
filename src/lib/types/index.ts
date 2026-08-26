// User & Profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetPercentile: number; // 90-100
  targetColleges: string[];
  catExamDate: string; // ISO date
  availableHoursWeekday: number;
  availableHoursWeekend: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  previousAttempts: number;
  onboardingCompleted: boolean;
  createdAt: string;
}

// Topic & Progress
export type TopicStatus = 'not-started' | 'learning' | 'practicing' | 'needs-revision' | 'mastered';
export type SectionType = 'quant' | 'lrdi' | 'varc';

export interface Topic {
  id: string;
  name: string;
  section: SectionType;
  category: string;
  status: TopicStatus;
  progress: number; // 0-100
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  averageTime: number; // seconds
  lastStudied: string | null;
  nextRevision: string | null;
  masteryConfidence: number; // 0-1
}

// Study Plan
export type TaskType = 'learn' | 'practice' | 'revise' | 'mock' | 'review-mistakes';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface StudyTask {
  id: string;
  type: TaskType;
  topicId: string;
  topicName: string;
  section: SectionType;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  completed: boolean;
  skipped: boolean;
  skipReason?: string;
  order: number;
}

export interface DailyPlan {
  date: string;
  tasks: StudyTask[];
  totalMinutes: number;
  completedMinutes: number;
  generatedAt: string;
}

// Mistake Book
export type MistakeCategory = 'conceptual' | 'calculation' | 'carelessness' | 'time-pressure';

export interface Mistake {
  id: string;
  topicId: string;
  topicName: string;
  section: SectionType;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  category: MistakeCategory;
  aiComment: string;
  isRepeated: boolean;
  revisionStatus: 'pending' | 'revised' | 'resolved';
  nextRevisionDate: string;
  createdAt: string;
}

// Mock Tests
export interface MockResult {
  id: string;
  name: string;
  date: string;
  overallScore: number;
  maxScore: number;
  percentile: number;
  sections: MockSectionResult[];
  totalTime: number;
  questionsAttempted: number;
  questionsCorrect: number;
  questionsWrong: number;
  questionsSkipped: number;
  accuracy: number;
  aiAnalysis: string;
}

export interface MockSectionResult {
  section: SectionType;
  score: number;
  maxScore: number;
  accuracy: number;
  timeSpent: number;
  questionsAttempted: number;
  questionsCorrect: number;
  questionsWrong: number;
}

// XP & Gamification
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  requirement: string;
}

export interface XPEvent {
  id: string;
  type: 'daily-login' | 'question-correct' | 'streak-day' | 'mock-completion' | 'revision' | 'topic-mastered';
  amount: number;
  description: string;
  timestamp: string;
}

// Chat / AI Coach
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  hints?: string[];
  currentHint?: number;
  relatedTopicId?: string;
}

// Notes
export interface Note {
  id: string;
  title: string;
  content: string;
  topicId?: string;
  section?: SectionType;
  flashcards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  noteId: string;
}

// Analytics
export interface StudySession {
  date: string;
  hoursStudied: number;
  questionsAttempted: number;
  questionsCorrect: number;
  topicsStudied: string[];
}

// Spaced Repetition
export interface RevisionItem {
  topicId: string;
  topicName: string;
  section: SectionType;
  interval: number;
  nextReview: string;
  easeFactor: number;
  repetitions: number;
  lastReview: string;
}
