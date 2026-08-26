import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TopicStatus, SectionType } from '../types';
import { LEVEL_THRESHOLDS, MOTIVATIONAL_QUOTES } from '../constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(date);
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function calculateDaysUntilCAT(examDate: string): number {
  const exam = new Date(examDate);
  const now = new Date();
  const diffTime = exam.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function calculateLevel(totalXP: number): { level: number; currentXP: number; nextLevelXP: number; progress: number } {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1];
  const nextLevelXP = LEVEL_THRESHOLDS[level] || currentLevelXP; // Max level fallback
  const currentXP = totalXP - currentLevelXP;
  const levelXPRequired = nextLevelXP - currentLevelXP;
  const progress = levelXPRequired === 0 ? 100 : Math.min(100, Math.round((currentXP / levelXPRequired) * 100));

  return { level, currentXP: totalXP, nextLevelXP, progress };
}

export function getMotivationalQuote(): string {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) {
    return `${h}h ${m > 0 ? m + 'm' : ''}`.trim();
  }
  return `${m}m`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

export function getStatusColor(status: TopicStatus): string {
  switch (status) {
    case 'not-started': return 'text-slate-500 bg-slate-100';
    case 'learning': return 'text-blue-600 bg-blue-100';
    case 'practicing': return 'text-purple-600 bg-purple-100';
    case 'needs-revision': return 'text-orange-600 bg-orange-100';
    case 'mastered': return 'text-emerald-600 bg-emerald-100';
    default: return 'text-slate-500 bg-slate-100';
  }
}

export function getSectionColor(section: SectionType): string {
  switch (section) {
    case 'quant': return 'from-blue-500 to-cyan-500';
    case 'lrdi': return 'from-purple-500 to-pink-500';
    case 'varc': return 'from-amber-500 to-orange-500';
    default: return 'from-slate-500 to-gray-500';
  }
}
