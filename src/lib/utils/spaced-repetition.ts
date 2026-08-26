import { RevisionItem, SectionType } from '../types';
import { SPACED_REPETITION_INTERVALS } from '../constants';

/**
 * SuperMemo-2 (SM-2) inspired spaced repetition algorithm
 * Quality: 0-5
 * 5 - perfect response
 * 4 - correct response after a hesitation
 * 3 - correct response recalled with serious difficulty
 * 2 - incorrect response; where the correct one seemed easy to recall
 * 1 - incorrect response; the correct one remembered
 * 0 - complete blackout
 */
export function calculateNextReview(item: RevisionItem, quality: number): RevisionItem {
  let { interval, easeFactor, repetitions } = item;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const now = new Date();
  const nextReviewDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    ...item,
    interval,
    easeFactor,
    repetitions,
    lastReview: now.toISOString(),
    nextReview: nextReviewDate.toISOString()
  };
}

export function getItemsDueForReview(items: RevisionItem[], dateStr?: string): RevisionItem[] {
  const targetDate = dateStr ? new Date(dateStr) : new Date();
  
  return items.filter(item => {
    const nextReview = new Date(item.nextReview);
    return nextReview <= targetDate;
  }).sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime());
}

export function createRevisionItem(topicId: string, topicName: string, section: SectionType): RevisionItem {
  const now = new Date();
  const nextReviewDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
  
  return {
    topicId,
    topicName,
    section,
    interval: 1,
    nextReview: nextReviewDate.toISOString(),
    easeFactor: 2.5, // Default starting ease factor for SM-2
    repetitions: 0,
    lastReview: now.toISOString()
  };
}
