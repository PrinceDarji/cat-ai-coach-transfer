import { TopicContent } from '../types';

import { linearArrangements } from './linear-arrangements';
import { circularArrangements } from './circular-arrangements';
import { bloodRelations } from './blood-relations';
import { syllogisms } from './syllogisms';
import { tablesCaselets } from './tables-caselets';
import { graphsCharts } from './graphs-charts';
import { vennDiagrams } from './venn-diagrams';
import { gamesTournaments } from './games-tournaments';
import { routesNetworks } from './routes-networks';

export const lrdiTopics: Record<string, TopicContent> = {
  // MOCK_TOPIC IDs
  [linearArrangements.id]: linearArrangements,
  [circularArrangements.id]: circularArrangements,
  [bloodRelations.id]: bloodRelations,
  [syllogisms.id]: syllogisms,
  [tablesCaselets.id]: tablesCaselets,
  [graphsCharts.id]: graphsCharts,
  [vennDiagrams.id]: vennDiagrams,
  [gamesTournaments.id]: gamesTournaments,
  [routesNetworks.id]: routesNetworks,

  // Real CAT_TOPIC IDs
  'l-a-1': linearArrangements,
  'l-a-2': circularArrangements,
  'l-a-3': linearArrangements,
  'l-o-1': tablesCaselets,
  'l-o-2': tablesCaselets,
  'l-o-3': gamesTournaments,
  'l-o-4': routesNetworks,
  'l-o-5': syllogisms,
  'l-o-6': vennDiagrams,
  'l-o-7': vennDiagrams,
};

export default lrdiTopics;
