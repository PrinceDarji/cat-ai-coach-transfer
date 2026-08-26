import { TopicContent } from '../types';

export const paraJumbles: TopicContent = {
  id: 'va1',
  name: 'Para Jumbles',
  section: 'varc',
  description: 'Master the logical sequencing of jumbled sentences to form a coherent paragraph.',
  lessons: [
    {
      id: 'pj-1',
      title: 'The Anatomy of a Paragraph',
      content: `### Putting the Pieces Together

Para Jumbles give you 4 or 5 sentences out of order. Your job is to find the original sequence. Unlike RC, these are usually Type-in-the-Answer (TITA) questions in CAT, meaning no options to guess from!

A standard paragraph flows like this:
1. **Introduction**: A general statement introducing the theme.
2. **Elaboration**: Expanding on the intro.
3. **Examples/Evidence**: Supporting details.
4. **Conclusion**: A summary or a concluding thought.

Your first goal is always to find the independent, introductory sentence.`
    },
    {
      id: 'pj-2',
      title: 'Finding the Opening Sentence',
      content: `### The Anchor

The opening sentence is your anchor. It must be able to stand completely alone.

**How to spot a bad opening sentence:**
- Starts with a pronoun (He, She, They, It, This, That) referring to something unnamed.
- Starts with a transition word (However, Therefore, Also, Furthermore).
- Continues an argument (e.g., "Such a policy would...").

**How to spot a good opening sentence:**
- Introduces a noun or concept for the first time.
- Is general and overarching.
- Sets a time or place context (e.g., "In the late 19th century...").`
    },
    {
      id: 'pj-3',
      title: 'Mandatory Pairs',
      content: `### Linking the Chain

Once you have the opener, don't try to solve the whole thing at once. Look for **Mandatory Pairs**â€”two sentences that absolutely must go back-to-back.

**Types of Links:**
1. **Noun-Pronoun Link**: Sentence 1 introduces "Dr. Smith". Sentence 2 starts with "He...".
2. **Chronological Link**: Sentence 1 mentions "1990". Sentence 2 mentions "1995".
3. **Contrast Link**: Sentence 1 says X is good. Sentence 2 starts with "However," and says X is bad.
4. **Acronym Link**: Sentence 1 introduces "World Health Organization (WHO)". Sentence 2 uses "WHO".`
    },
    {
      id: 'pj-4',
      title: 'The "Idea" Progression',
      content: `### General to Specific

Paragraphs almost always move from General to Specific. 
If you have one sentence talking about "global warming" and another talking about "rising sea levels in Miami," the general one (global warming) will come first.

If you form pairs like (2, 4) and (1, 3), try to see which pair is more general. That pair will likely come first.`
    }
  ],
  practice: [
    {
      id: 'q-pj-1',
      text: `Arrange the following sentences into a coherent paragraph:
1. He immediately ordered his army to retreat.
2. The king realized that his supply lines had been cut off by the enemy cavalry.
3. Without food and ammunition, a protracted siege was impossible.
4. In the winter of 1452, a massive siege was laid upon the castle.`,
      options: [
        { id: 'A', text: '4231' },
        { id: 'B', text: '2314' },
        { id: 'C', text: '4321' },
        { id: 'D', text: '2134' }
      ],
      correctAnswer: 'A',
      hint: 'Find the opening sentence that introduces the setting. Then look for the noun before the pronoun "He".',
      explanation: 'Sentence 4 is the independent opener introducing the event (the siege). Sentence 2 introduces the king and the problem (supply lines cut). Sentence 3 elaborates on the consequence of the cut supply lines (no food). Sentence 1 gives the final action (He retreated). Therefore, 4-2-3-1.',
      wrongExplanations: {
        'B': 'Sentence 2 cannot start because we don\'t know the context of the battle yet.',
        'C': '3 cannot follow 4 directly because we don\'t know *why* there is no food until 2 explains the supply lines were cut.',
        'D': '2 cannot open, and 1 cannot precede 3 because he retreats *because* the siege is impossible.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-pj-2',
      text: `Arrange the following sentences into a coherent paragraph:
1. However, this definition is entirely inadequate for the modern digital economy.
2. Traditionally, a monopoly was defined by a company's ability to artificially raise prices without losing customers.
3. Therefore, regulators must look beyond price and examine how these platforms restrict user choice and data mobility.
4. Today, tech giants offer their services for "free," making price-gouging an irrelevant metric.`,
      options: [
        { id: 'A', text: '2143' },
        { id: 'B', text: '2413' },
        { id: 'C', text: '4123' },
        { id: 'D', text: '1243' }
      ],
      correctAnswer: 'A',
      hint: 'Which sentence defines the concept initially? Which sentence pivots from that definition?',
      explanation: 'Sentence 2 introduces the traditional definition. Sentence 1 pivots ("However, this definition..."). Sentence 4 explains *why* it is inadequate (services are free). Sentence 3 provides the conclusion/solution ("Therefore..."). Sequence: 2-1-4-3.',
      wrongExplanations: {
        'B': '4 doesn\'t flow directly from 2 as well as 1 does. "This definition" in 1 directly links back to the definition in 2.',
        'C': '4 cannot open because "Today" implies a contrast with a past state, which is established in 2.',
        'D': '1 starts with "However," making it impossible to be the opening sentence.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-pj-3',
      text: `Arrange the following sentences into a coherent paragraph:
1. These algorithms process millions of past legal cases to predict judge rulings.
2. As a result, junior lawyers are finding fewer opportunities for entry-level document review work.
3. Artificial intelligence is rapidly transforming the legal profession.
4. While this increases efficiency for law firms, it disrupts traditional career paths.`,
      options: [
        { id: 'A', text: '3142' },
        { id: 'B', text: '3412' },
        { id: 'C', text: '1324' },
        { id: 'D', text: '3124' }
      ],
      correctAnswer: 'A',
      hint: 'Find the general introductory sentence. What does "These algorithms" refer to?',
      explanation: 'Sentence 3 introduces the broad topic (AI in law). Sentence 1 explains *how* AI works ("These algorithms"). Sentence 4 evaluates this ("increases efficiency... disrupts career paths"). Sentence 2 gives a specific example of the disruption ("As a result, junior lawyers..."). Sequence: 3-1-4-2.',
      wrongExplanations: {
        'B': '4 cannot follow 3 directly because "this" in sentence 4 refers to the specific action described in 1.',
        'C': '1 starts with "These algorithms" which has no reference point if placed first.',
        'D': '2 flows better after 4, as 4 introduces the concept of "disrupting career paths," which 2 then gives a specific example of.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-pj-4',
      text: `Arrange the following sentences into a coherent paragraph:
1. The latter implies that the observer's presence alters the state of what is being observed.
2. Heisenberg's Uncertainty Principle is often confused with the observer effect.
3. In contrast, Heisenberg's principle is an inherent property of quantum systems, stating that position and momentum cannot both be precisely known simultaneously.
4. While both deal with the limitations of measurement at a microscopic level, they are fundamentally different concepts.`,
      options: [
        { id: 'A', text: '2134' },
        { id: 'B', text: '2413' },
        { id: 'C', text: '4213' },
        { id: 'D', text: '2431' }
      ],
      correctAnswer: 'B',
      hint: 'Sentence 2 introduces two concepts. Sentence 4 talks about "both". "The latter" in sentence 1 refers to the second concept mentioned in sentence 2.',
      explanation: '2 introduces the confusion between two concepts (Heisenberg and observer effect). 4 elaborates on the similarity ("both deal with limitations") but pivots to difference. 1 defines "the latter" (observer effect, the second item in sentence 2). 3 defines the former ("In contrast, Heisenberg\'s..."). Sequence: 2-4-1-3.',
      wrongExplanations: {
        'A': 'Placing 4 at the end leaves the paragraph without a strong logical flow; 4 acts as a bridge between the introduction and the specific definitions.',
        'C': '4 cannot open because "both" has no reference.',
        'D': '1 must come before 3 because 3 starts with "In contrast," setting up the opposition to the definition in 1.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-pj-5',
      text: `Arrange the following sentences into a coherent paragraph:
1. This symbiotic relationship allowed early hominids to spend less energy on digestion and more on brain development.
2. The mastery of fire was a pivotal turning point in human evolution.
3. Cooking food breaks down tough fibers, effectively performing a portion of the digestive process outside the body.
4. It provided warmth, protection from predators, and crucially, a way to cook meat and fibrous plants.`,
      options: [
        { id: 'A', text: '2431' },
        { id: 'B', text: '2341' },
        { id: 'C', text: '3124' },
        { id: 'D', text: '2143' }
      ],
      correctAnswer: 'A',
      hint: 'Sentence 2 introduces fire. Which sentence explains what fire provided?',
      explanation: '2 introduces the topic (mastery of fire). 4 expands on what fire provided (warmth, protection, cooking). 3 explains the mechanics of the last point in 4 (cooking breaks down fibers). 1 concludes by explaining the evolutionary result of this cooking process ("This symbiotic relationship..."). Sequence: 2-4-3-1.',
      wrongExplanations: {
        'B': '3 cannot follow 2 directly because 2 doesn\'t mention food/cooking yet; 4 introduces the idea of cooking.',
        'C': '3 is too specific to be the opening sentence.',
        'D': '1 ("This symbiotic relationship") has no reference point if it comes right after 2.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-pj-6',
      text: `Arrange the following sentences into a coherent paragraph:
1. Such a massive influx of tourists places unbearable strain on local infrastructure, from water supply to waste management.
2. Venice is currently experiencing the severe consequences of 'overtourism'.
3. To mitigate this, local authorities have proposed implementing a daily entry tax for day-trippers.
4. During peak summer months, the city's population effectively doubles on a daily basis.`,
      options: [
        { id: 'A', text: '2413' },
        { id: 'B', text: '2143' },
        { id: 'C', text: '4123' },
        { id: 'D', text: '2341' }
      ],
      correctAnswer: 'A',
      hint: 'Which sentence defines the problem generally? What is the specific data point that proves the problem?',
      explanation: '2 introduces the general problem (overtourism in Venice). 4 provides the specific evidence (population doubles). 1 describes the negative impact of that specific evidence ("Such a massive influx..."). 3 provides the solution ("To mitigate this..."). Sequence: 2-4-1-3.',
      wrongExplanations: {
        'B': '1 uses "Such a massive influx," which requires a preceding sentence quantifying the influx (which is sentence 4).',
        'C': '4 doesn\'t establish the location or the core problem explicitly enough to serve as the best opening.',
        'D': 'You cannot propose a solution (3) before fully explaining the problem and its impacts (4 and 1).'
      },
      difficulty: 'hard'
    }
  ]
};

