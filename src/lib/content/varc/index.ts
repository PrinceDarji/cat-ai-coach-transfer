import { TopicContent } from '../types';

import { mainIdea } from './main-idea';
import { inference } from './inference';
import { toneStyle } from './tone-style';
import { specificDetail } from './specific-detail';
import { paraJumbles } from './para-jumbles';
import { paraSummary } from './para-summary';
import { oddSentence } from './odd-sentence';
import { criticalReasoning } from './critical-reasoning';
import { vocabularyGrammar } from './vocabulary-grammar';

export const varcTopics: Record<string, TopicContent> = {
  // MOCK_TOPIC IDs
  [mainIdea.id]: mainIdea,
  [inference.id]: inference,
  [toneStyle.id]: toneStyle,
  [specificDetail.id]: specificDetail,
  [paraJumbles.id]: paraJumbles,
  [paraSummary.id]: paraSummary,
  [oddSentence.id]: oddSentence,
  [criticalReasoning.id]: criticalReasoning,
  [vocabularyGrammar.id]: vocabularyGrammar,

  // Real CAT_TOPIC IDs
  'v-rc-1': mainIdea,
  'v-rc-2': inference,
  'v-rc-3': vocabularyGrammar,
  'v-rc-4': toneStyle,
  'v-o-1': paraJumbles,
  'v-o-2': paraSummary,
  'v-o-3': oddSentence,
  'v-o-4': criticalReasoning,
  'v-o-5': vocabularyGrammar,
};

export default varcTopics;
