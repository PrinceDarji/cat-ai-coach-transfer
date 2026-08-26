import { SectionType } from '../types';

export const CAT_TOPICS = [
  // Quant - Basic Maths Foundation
  { id: 'q-bm-1', name: 'Basic Operations & Tables', section: 'quant' as SectionType, category: 'Basic Maths' },
  { id: 'q-bm-2', name: 'Squares & Cubes', section: 'quant' as SectionType, category: 'Basic Maths' },
  { id: 'q-bm-3', name: 'Fractions & Decimals', section: 'quant' as SectionType, category: 'Basic Maths' },

  // Quant - Arithmetic
  { id: 'q-a-1', name: 'Percentages', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-2', name: 'Profit & Loss', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-3', name: 'SI/CI', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-4', name: 'Ratio & Proportion', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-5', name: 'Averages', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-6', name: 'Mixtures & Alligation', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-7', name: 'Time & Work', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-8', name: 'Time Speed Distance', section: 'quant' as SectionType, category: 'Arithmetic' },
  { id: 'q-a-9', name: 'Pipes & Cisterns', section: 'quant' as SectionType, category: 'Arithmetic' },

  // Quant - Algebra
  { id: 'q-al-1', name: 'Linear Equations', section: 'quant' as SectionType, category: 'Algebra' },
  { id: 'q-al-2', name: 'Quadratic Equations', section: 'quant' as SectionType, category: 'Algebra' },
  { id: 'q-al-3', name: 'Inequalities', section: 'quant' as SectionType, category: 'Algebra' },
  { id: 'q-al-4', name: 'Logarithms', section: 'quant' as SectionType, category: 'Algebra' },
  { id: 'q-al-5', name: 'Functions', section: 'quant' as SectionType, category: 'Algebra' },
  { id: 'q-al-6', name: 'Progressions', section: 'quant' as SectionType, category: 'Algebra' },

  // Quant - Number System
  { id: 'q-ns-1', name: 'Divisibility', section: 'quant' as SectionType, category: 'Number System' },
  { id: 'q-ns-2', name: 'Remainders', section: 'quant' as SectionType, category: 'Number System' },
  { id: 'q-ns-3', name: 'Factors', section: 'quant' as SectionType, category: 'Number System' },
  { id: 'q-ns-4', name: 'HCF & LCM', section: 'quant' as SectionType, category: 'Number System' },
  { id: 'q-ns-5', name: 'Base System', section: 'quant' as SectionType, category: 'Number System' },

  // Quant - Geometry
  { id: 'q-g-1', name: 'Triangles', section: 'quant' as SectionType, category: 'Geometry' },
  { id: 'q-g-2', name: 'Circles', section: 'quant' as SectionType, category: 'Geometry' },
  { id: 'q-g-3', name: 'Coordinate Geometry', section: 'quant' as SectionType, category: 'Geometry' },
  { id: 'q-g-4', name: 'Mensuration', section: 'quant' as SectionType, category: 'Geometry' },
  { id: 'q-g-5', name: 'Trigonometry', section: 'quant' as SectionType, category: 'Geometry' },

  // Quant - Modern Math
  { id: 'q-mm-1', name: 'Permutations', section: 'quant' as SectionType, category: 'Modern Math' },
  { id: 'q-mm-2', name: 'Combinations', section: 'quant' as SectionType, category: 'Modern Math' },
  { id: 'q-mm-3', name: 'Probability', section: 'quant' as SectionType, category: 'Modern Math' },
  { id: 'q-mm-4', name: 'Set Theory', section: 'quant' as SectionType, category: 'Modern Math' },

  // LRDI
  { id: 'l-a-1', name: 'Linear Arrangement', section: 'lrdi' as SectionType, category: 'Arrangements' },
  { id: 'l-a-2', name: 'Circular Arrangement', section: 'lrdi' as SectionType, category: 'Arrangements' },
  { id: 'l-a-3', name: 'Matrix Arrangement', section: 'lrdi' as SectionType, category: 'Arrangements' },
  { id: 'l-o-1', name: 'Grouping & Selection', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-2', name: 'Scheduling', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-3', name: 'Games & Tournaments', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-4', name: 'Routes & Networks', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-5', name: 'Binary Logic', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-6', name: 'Venn Diagrams', section: 'lrdi' as SectionType, category: 'Other' },
  { id: 'l-o-7', name: 'Cubes & Dice', section: 'lrdi' as SectionType, category: 'Other' },

  // VARC
  { id: 'v-rc-1', name: 'Main Idea', section: 'varc' as SectionType, category: 'Reading Comprehension' },
  { id: 'v-rc-2', name: 'Inference', section: 'varc' as SectionType, category: 'Reading Comprehension' },
  { id: 'v-rc-3', name: 'Vocabulary in Context', section: 'varc' as SectionType, category: 'Reading Comprehension' },
  { id: 'v-rc-4', name: 'Tone & Structure', section: 'varc' as SectionType, category: 'Reading Comprehension' },
  { id: 'v-o-1', name: 'Para Jumbles', section: 'varc' as SectionType, category: 'Other' },
  { id: 'v-o-2', name: 'Para Summary', section: 'varc' as SectionType, category: 'Other' },
  { id: 'v-o-3', name: 'Odd Sentence Out', section: 'varc' as SectionType, category: 'Other' },
  { id: 'v-o-4', name: 'Critical Reasoning', section: 'varc' as SectionType, category: 'Other' },
  { id: 'v-o-5', name: 'Grammar', section: 'varc' as SectionType, category: 'Other' },
];

export const XP_AWARDS = {
  'daily-login': 10,
  'question-correct': 5,
  'streak-day': 15,
  'mock-completion': 50,
  'revision': 10,
  'topic-mastered': 100,
};

// Generates levels 1-50. Exponentially scaling up to ~50k XP.
export const LEVEL_THRESHOLDS = Array.from({ length: 50 }, (_, i) => {
  if (i === 0) return 0;
  return Math.floor(100 * Math.pow(1.15, i - 1));
});

export const BADGES = [
  { id: 'b-1', name: 'First Steps', description: 'Completed your first study session', icon: 'footprints', requirement: 'Complete 1 session' },
  { id: 'b-2', name: 'Week Warrior', description: 'Maintained a 7-day study streak', icon: 'flame', requirement: '7 day streak' },
  { id: 'b-3', name: 'Century Club', description: 'Answered 100 questions correctly', icon: 'target', requirement: '100 correct answers' },
  { id: 'b-4', name: 'Mock Master', description: 'Completed 5 mock tests', icon: 'award', requirement: '5 mock tests' },
  { id: 'b-5', name: 'Streak King', description: 'Maintained a 30-day study streak', icon: 'crown', requirement: '30 day streak' },
  { id: 'b-6', name: 'Quant Guru', description: 'Mastered 5 Quant topics', icon: 'calculator', requirement: 'Master 5 Quant topics' },
  { id: 'b-7', name: 'LRDI Legend', description: 'Mastered 5 LRDI topics', icon: 'puzzle', requirement: 'Master 5 LRDI topics' },
  { id: 'b-8', name: 'VARC Virtuoso', description: 'Mastered 5 VARC topics', icon: 'book-open', requirement: 'Master 5 VARC topics' },
  { id: 'b-9', name: 'Early Bird', description: 'Studied before 8 AM for 5 days', icon: 'sunrise', requirement: '5 early sessions' },
  { id: 'b-10', name: 'Night Owl', description: 'Studied after 10 PM for 5 days', icon: 'moon', requirement: '5 late sessions' },
  { id: 'b-11', name: 'Revision Rockstar', description: 'Completed 50 revision tasks', icon: 'repeat', requirement: '50 revisions' },
  { id: 'b-12', name: 'Flawless', description: 'Got 100% accuracy in a session (min 10 Qs)', icon: 'check-circle', requirement: '100% accuracy session' },
  { id: 'b-13', name: 'Dedicated', description: 'Studied for 100 total hours', icon: 'clock', requirement: '100 hours studied' },
  { id: 'b-14', name: 'Top Percentile', description: 'Scored 99+ percentile in a Mock', icon: 'trending-up', requirement: '99+ mock percentile' },
  { id: 'b-15', name: 'All-Rounder', description: 'Mastered 1 topic in every section', icon: 'star', requirement: '1 topic master per section' },
];

export const SPACED_REPETITION_INTERVALS = [1, 3, 7, 15, 30];

export const IIM_COLLEGES = [
  'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore',
  'IIM Kozhikode', 'IIM Shillong', 'IIM Tiruchirappalli', 'IIM Udaipur', 'IIM Kashipur',
  'IIM Raipur', 'IIM Ranchi', 'IIM Rohtak', 'IIM Nagpur', 'IIM Bodh Gaya', 'IIM Visakhapatnam',
  'IIM Amritsar', 'IIM Jammu', 'IIM Sirmaur', 'IIM Sambalpur', 'FMS Delhi', 'XLRI Jamshedpur',
  'IIFT Delhi', 'MDI Gurgaon', 'NITIE Mumbai', 'SPJIMR Mumbai', 'JBIMS Mumbai',
  'IIT Bombay (SJMSOM)', 'IIT Delhi (DMS)', 'IIT Kharagpur (VGSoM)'
];

export const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts, repeated day-in and day-out.",
  "Don't stop when you're tired. Stop when you're done.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Dream big and dare to fail.",
  "Hard work beats talent when talent doesn't work hard.",
  "Focus on the step in front of you, not the whole staircase.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't wait for opportunity. Create it.",
  "Sometimes later becomes never. Do it now.",
  "Success doesn't just find you. You have to go out and get it.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for the right opportunity: create it.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "A year from now you may wish you had started today."
];

export const NAV_ITEMS = [
  { label: 'Coach', href: '/', icon: 'bot', description: 'Your AI Mentor' },
  { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard', description: 'Overview & Stats' },
  { label: 'Planner', href: '/planner', icon: 'calendar', description: 'Daily Study Plan' },
  { label: 'Quant', href: '/quant', icon: 'calculator', description: 'Quantitative Ability' },
  { label: 'LRDI', href: '/lrdi', icon: 'puzzle', description: 'Logical Reasoning & Data Interpretation' },
  { label: 'VARC', href: '/varc', icon: 'book-open', description: 'Verbal Ability & Reading Comprehension' },
  { label: 'Mistakes', href: '/mistakes', icon: 'alert-circle', description: 'Mistake Book & Review' },
  { label: 'Mocks', href: '/mocks', icon: 'file-text', description: 'Mock Tests & Analysis' },
  { label: 'Notes', href: '/notes', icon: 'notebook', description: 'Your Notes & Flashcards' },
  { label: 'Analytics', href: '/analytics', icon: 'bar-chart-2', description: 'Deep Performance Insights' }
];
