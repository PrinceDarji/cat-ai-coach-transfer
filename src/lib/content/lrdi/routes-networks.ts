import { TopicContent } from '../types';

export const routesNetworks: TopicContent = {
  id: 'm2',
  name: 'Routes & Networks',
  section: 'lrdi',
  lessons: [
    {
      id: 'rn-1',
      title: 'Introduction to Networks',
      content: `### Connecting the Dots
A network is a collection of nodes (cities, computers, checkpoints) connected by paths (roads, cables, pipes).

In CAT, you will usually be asked to:
1. Find the shortest path between two nodes.
2. Find the total number of distinct routes between two nodes.
3. Understand flow (like water pipes or traffic) where paths have maximum capacities.`
    },
    {
      id: 'rn-2',
      title: 'Finding the Shortest Path',
      content: `### The Greedy Approach
When finding the shortest path, you might be tempted to just look at the map and guess. Don't!

**Systematic Method:**
Start at your origin. Write down the distance to all immediate neighbors. From there, explore the next neighbors, always keeping a running total of the shortest distance to each node. If you find a new, faster way to a node, cross out the old number and write the new one. This is a simplified version of Dijkstra's Algorithm.`
    },
    {
      id: 'rn-3',
      title: 'Grid-Based Counting',
      content: `### The Manhattan Grid
A classic question: "How many shortest routes are there from the bottom-left of a grid to the top-right?"

If the grid is $M$ blocks wide and $N$ blocks high, every valid shortest route requires exactly $M$ moves Right and $N$ moves Up.
The total number of moves is $M + N$.
The number of ways to arrange those moves is:
**(M + N)! / (M! * N!)**

**The Addition Method (Pascal's Triangle):**
Instead of the formula, you can write a '1' at the start intersection. The number of ways to reach any intersection is the sum of the ways to reach the intersection directly below it and directly to its left.`
    },
    {
      id: 'rn-4',
      title: 'Network Flow and Bottlenecks',
      content: `### Where Does It Get Stuck?
If water is flowing through pipes, or cars are moving through toll booths, the total flow from Start to End is limited by the **Bottleneck**.

The maximum flow of a network is determined by the minimum capacity of the "cut" that separates the start from the end. If a highway has 4 lanes, but a bridge on it only has 1 lane, the maximum flow of the entire highway is 1 lane.`
    }
  ],
  practice: [
    {
      id: 'rn-q1',
      text: 'You are on a street grid. You need to walk 3 blocks East and 2 blocks North to reach your destination. You only walk East and North. How many different paths can you take?',
      options: [
        { id: 'A', text: '5', isCorrect: false, explanation: 'You just added 3 + 2.' },
        { id: 'B', text: '6', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'C', text: '10', isCorrect: true, explanation: 'Formula is (3+2)! / (3! * 2!) = 5! / (6 * 2) = 120 / 12 = 10.' },
        { id: 'D', text: '12', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'Use the grid formula: (M + N)! / (M! * N!) where M is East moves and N is North moves.',
      explanation: 'You must make a total of 5 moves: E, E, E, N, N. The number of different paths is simply the number of ways to arrange these 5 letters. \nArrangements = 5! / (3! * 2!) = 120 / (6 * 2) = 10.'
    },
    {
      id: 'rn-q2',
      text: 'A network of pipes connects A to C through B. The capacity of pipe A-B is 50 liters/min. The capacity of pipe B-C is 30 liters/min. What is the maximum flow from A to C?',
      options: [
        { id: 'A', text: '80', isCorrect: false, explanation: 'You cannot add them; they are in sequence, not parallel.' },
        { id: 'B', text: '50', isCorrect: false, explanation: 'If 50 liters reach B, the pipe to C can only handle 30.' },
        { id: 'C', text: '30', isCorrect: true, explanation: 'The flow is limited by the smallest capacity in the sequence (the bottleneck).' },
        { id: 'D', text: '20', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'A chain is only as strong as its weakest link.',
      explanation: 'Pipes A-B and B-C are in series. Water flows from A to B (max 50) and then B to C (max 30). Even though A can send 50 liters to B, B can only push 30 liters forward to C. The bottleneck is 30. Max flow is 30.'
    },
    {
      id: 'rn-q3',
      text: 'Four cities P, Q, R, S are connected. P to Q is 10km. Q to R is 15km. P to R directly is 30km. R to S is 5km. What is the shortest distance from P to S?',
      options: [
        { id: 'A', text: '35km', isCorrect: false, explanation: 'That uses the direct path P-R-S (30 + 5). But P-Q-R is shorter!' },
        { id: 'B', text: '30km', isCorrect: true, explanation: 'Shortest to R is P-Q-R (10+15 = 25). Then R to S is 5. Total = 30.' },
        { id: 'C', text: '25km', isCorrect: false, explanation: 'That only gets you to R.' },
        { id: 'D', text: '20km', isCorrect: false, explanation: 'Impossible.' }
      ],
      hint: 'Don\'t assume the direct path is the shortest. Check the intermediate nodes.',
      explanation: 'To get from P to S, we must go through R. \nPath 1 to R: P directly to R = 30km. \nPath 2 to R: P to Q (10) + Q to R (15) = 25km. \nPath 2 is shorter! So the shortest path to R is 25km. \nFrom R, go to S = +5km. \nTotal shortest distance = 25 + 5 = 30km.'
    },
    {
      id: 'rn-q4',
      text: 'In a one-way road network, there are 3 routes from City A to City B, and 4 routes from City B to City C. How many distinct routes are there from A to C?',
      options: [
        { id: 'A', text: '7', isCorrect: false, explanation: 'You add when routes are parallel (A to C directly). You multiply when they are sequential.' },
        { id: 'B', text: '12', isCorrect: true, explanation: 'Fundamental Principle of Counting: 3 * 4 = 12.' },
        { id: 'C', text: '81', isCorrect: false, explanation: 'Math error.' },
        { id: 'D', text: '1', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'For every choice of route from A to B, how many choices do you have to get to C?',
      explanation: 'Since the events are sequential (first A to B, THEN B to C), we multiply the possibilities. \n3 choices for the first leg * 4 choices for the second leg = 12 distinct routes.'
    },
    {
      id: 'rn-q5',
      text: 'To get from Point A to Point B, you can either take the highway (1 route) or take local roads. The local roads go from A to C (2 routes) and C to B (2 routes). How many total routes are there from A to B?',
      options: [
        { id: 'A', text: '4', isCorrect: false, explanation: 'That is the number of local routes. You forgot the highway.' },
        { id: 'B', text: '5', isCorrect: true, explanation: 'Local routes: 2 * 2 = 4. Highway routes = 1. Total = 4 + 1 = 5.' },
        { id: 'C', text: '3', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'D', text: '6', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'Calculate sequential routes (multiply), then add the parallel route (highway).',
      explanation: 'Routes via C: 2 (A to C) * 2 (C to B) = 4 routes. \nRoutes directly via highway: 1 route. \nSince these are mutually exclusive options (parallel), we add them. 4 + 1 = 5 total routes.'
    },
    {
      id: 'rn-q6',
      text: 'A grid is 2x2. How many shortest paths exist from the bottom-left to the top-right?',
      options: [
        { id: 'A', text: '4', isCorrect: false, explanation: 'Too low.' },
        { id: 'B', text: '6', isCorrect: true, explanation: 'Formula: (2+2)! / (2! * 2!) = 24 / 4 = 6.' },
        { id: 'C', text: '8', isCorrect: false, explanation: 'Too high.' },
        { id: 'D', text: '2', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'You need 2 moves East and 2 moves North. How many ways to arrange E, E, N, N?',
      explanation: 'Number of East moves (M) = 2. Number of North moves (N) = 2. \nTotal moves = 4. \nNumber of paths = 4! / (2! * 2!) = 24 / (2 * 2) = 24 / 4 = 6. \nPaths are: EENN, ENEN, ENNE, NEEN, NENE, NNEE.'
    }
  ]
};

