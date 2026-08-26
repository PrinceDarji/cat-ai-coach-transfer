export interface Lesson {
  title: string;
  content: string; // Rich markdown — teacher-style explanation
}

export interface PracticeQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'numeric';
  options?: { label: string; text: string }[];
  correctAnswer: string; // 'A'/'B'/'C'/'D' or numeric string
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  explanation: string;
  wrongExplanations?: Record<string, string>;
}

export interface TopicContent {
  id: string;
  name: string;
  section: 'quant' | 'lrdi' | 'varc';
  lessons: Lesson[];
  practice: PracticeQuestion[];
}
