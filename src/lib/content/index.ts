// Master index — imports all content from all sections
import { TopicContent } from './types';

// These will be populated by the content files
// Using dynamic imports to avoid circular dependencies
let _allTopics: Record<string, TopicContent> | null = null;

export async function getTopicContent(topicId: string): Promise<TopicContent | null> {
  if (!_allTopics) {
    const [quant, lrdi, varc] = await Promise.all([
      import('./quant/index').then(m => m.default).catch(() => ({})),
      import('./lrdi/index').then(m => m.default).catch(() => ({})),
      import('./varc/index').then(m => m.default).catch(() => ({})),
    ]);
    _allTopics = { ...quant, ...lrdi, ...varc };
  }
  return _allTopics[topicId] || null;
}

// Synchronous version using require — for client components
export function getAllTopicsSync(): Record<string, TopicContent> {
  try {
    const quant = require('./quant/index').default || {};
    const lrdi = require('./lrdi/index').default || {};
    const varc = require('./varc/index').default || {};
    return { ...quant, ...lrdi, ...varc };
  } catch {
    return {};
  }
}
