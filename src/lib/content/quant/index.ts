import { TopicContent } from '../types';

import { basicOperations } from './basic-operations';
import { squaresCubes } from './squares-cubes';
import { fractionsDecimals } from './fractions-decimals';

import { percentages } from './percentages';
import { profitLoss } from './profit-loss';
import { tsd } from './tsd';
import { linearEquations } from './linear-equations';
import { quadraticEquations } from './quadratic-equations';
import { logarithms } from './logarithms';
import { numberSystems } from './number-systems';
import { remainders } from './remainders';
import { circles } from './circles';
import { triangles } from './triangles';

export const quantTopics: Record<string, TopicContent> = {
  [basicOperations.id]: basicOperations,
  [squaresCubes.id]: squaresCubes,
  [fractionsDecimals.id]: fractionsDecimals,
  [percentages.id]: percentages,
  [profitLoss.id]: profitLoss,
  [tsd.id]: tsd,
  [linearEquations.id]: linearEquations,
  [quadraticEquations.id]: quadraticEquations,
  [logarithms.id]: logarithms,
  [numberSystems.id]: numberSystems,
  [remainders.id]: remainders,
  [circles.id]: circles,
  [triangles.id]: triangles,
  
  // Real CAT_TOPIC IDs
  'q-a-1': percentages,
  'q-a-2': profitLoss,
  'q-a-8': tsd,
  'q-al-1': linearEquations,
  'q-al-2': quadraticEquations,
  'q-al-4': logarithms,
  'q-ns-1': numberSystems,
  'q-ns-2': remainders,
  'q-g-2': circles,
  'q-g-1': triangles
};

export default quantTopics;
