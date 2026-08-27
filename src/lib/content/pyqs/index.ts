import { CAT_2025_SLOT_1 } from '../mocks/cat-2025-slot-1';
import { CAT_2025_SLOT_2 } from '../mocks/cat-2025-slot-2';
import { CAT_2024_SLOT_1 } from '../mocks/cat-2024-slot-1';
import { CAT_2024_SLOT_3 } from '../mocks/cat-2024-slot-3';
import { CAT_2023_SLOT_1 } from '../mocks/cat-2023-slot-1';
import { CAT_2023_SLOT_2 } from '../mocks/cat-2023-slot-2';

export interface PYQ {
  id: string;
  year: number;
  slot: number;
  section: string;
  topicId?: string;
  type: 'mcq' | 'tita';
  text: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
}

export function getAllPYQs(): PYQ[] {
  const allMocks = [
    { year: 2025, slot: 1, mock: CAT_2025_SLOT_1 },
    { year: 2025, slot: 2, mock: CAT_2025_SLOT_2 },
    { year: 2024, slot: 1, mock: CAT_2024_SLOT_1 },
    { year: 2024, slot: 3, mock: CAT_2024_SLOT_3 },
    { year: 2023, slot: 1, mock: CAT_2023_SLOT_1 },
    { year: 2023, slot: 2, mock: CAT_2023_SLOT_2 },
  ];

  const pyqs: PYQ[] = [];

  allMocks.forEach(({ year, slot, mock }) => {
    mock.sections.forEach(section => {
      section.questions.forEach((q: any) => {
        pyqs.push({
          id: `${year}-s${slot}-${section.id}-${q.id}`,
          year,
          slot,
          section: section.id,
          topicId: q.topicId || 'general',
          type: q.type,
          text: q.text,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'Detailed explanation not available yet.'
        });
      });
    });
  });

  return pyqs;
}

export function getPYQsByTopic(topicId: string): PYQ[] {
  return getAllPYQs().filter(q => q.topicId === topicId);
}

export function getPYQsByYear(year: number): PYQ[] {
  return getAllPYQs().filter(q => q.year === year);
}
