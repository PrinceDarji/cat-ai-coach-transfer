import { TopicContent } from '../types';

export const syllogisms: TopicContent = {
  id: 'l4',
  name: 'Syllogisms',
  section: 'lrdi',
  lessons: [
    {
      id: 'syl-1',
      title: 'What are Syllogisms?',
      content: `### Logic over Reality
"All cats are dogs. Some dogs are birds."
Wait, what? 

In syllogisms, you must **suspend your knowledge of reality**. You are given statements (premises) that you must assume are 100% true, no matter how absurd they sound. Then, you evaluate conclusions to see if they *logically follow* from those statements.

If a conclusion *might* be true, but isn't *guaranteed* to be true, it is considered **False** in standard syllogism problems.`
    },
    {
      id: 'syl-2',
      title: 'The Venn Diagram Method',
      content: `### Drawing the Possibilities
The most foolproof way to solve syllogisms is by drawing Venn diagrams. 

There are 4 standard types of statements:
1. **"All A are B"**: Draw circle A completely inside circle B.
2. **"No A are B"**: Draw circle A and circle B completely separate, with a line and an 'X' between them to denote they can never touch.
3. **"Some A are B"**: Draw circle A overlapping with circle B.
4. **"Some A are not B"**: Draw circle A overlapping B, but put a dot in the part of A that is outside B, to show that *at least some* A is definitely outside B.

> **Crucial Rule**: Always draw the "Basic Diagram"â€”the diagram with the least amount of overlapping possible. But keep in mind other variations (e.g., "All A are B" technically allows for A and B to be exactly the same circle!).`
    },
    {
      id: 'syl-3',
      title: 'Evaluating Conclusions',
      content: `### Definite vs. Possibility Conclusions
Read the conclusion carefully. Is it asking if something is a fact, or a possibility?

**Definite Conclusions** ("All A are C", "Some B are A"):
For a definite conclusion to be True, it must be true in **EVERY SINGLE POSSIBLE Venn Diagram** you can draw. If you can draw even one valid diagram where the conclusion fails, the conclusion is False.

**Possibility Conclusions** ("Some A being C is a possibility"):
For a possibility conclusion to be True, you only need to be able to draw **ONE valid Venn Diagram** where it happens. If it's possible without breaking the rules, it's True!`
    },
    {
      id: 'syl-4',
      title: 'The "Either/Or" Case',
      content: `### The Sneaky Exception
Sometimes, two conclusions are false on their own, but together form an "Either/Or" pair.

For an Either/Or pair to exist, three conditions must be met:
1. Both conclusions must have the same subjects and predicates (e.g., A and B).
2. Both conclusions must be individually False (not necessarily true).
3. They must form a complementary pair:
   - "Some A are B" AND "No A is B"
   - "All A are B" AND "Some A are not B"

If all three conditions are met, your answer should be "Either I or II follows".`
    }
  ],
  practice: [
    {
      id: 'syl-q1',
      text: 'Statements: 1. All cats are dogs. 2. All dogs are birds. \nConclusions: I. All cats are birds. II. Some birds are cats.',
      options: [
        { id: 'A', text: 'Only Conclusion I follows', isCorrect: false, explanation: 'Conclusion II also follows.' },
        { id: 'B', text: 'Only Conclusion II follows', isCorrect: false, explanation: 'Conclusion I also follows.' },
        { id: 'C', text: 'Both I and II follow', isCorrect: true, explanation: 'Circle Cats is inside Dogs. Circle Dogs is inside Birds. Therefore, Cats is entirely inside Birds. Thus, All cats are birds (True). Since the Cat circle is part of the Bird circle, some part of Birds is Cats. Thus, Some birds are cats (True).' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'Both follow.' }
      ],
      hint: 'Draw the circles. C is inside D. D is inside B. Therefore, C is inside B.',
      explanation: 'Draw concentric circles. Inner circle = Cats, Middle = Dogs, Outer = Birds. \nI. All cats are birds. Yes, the Cats circle is completely inside the Birds circle. \nII. Some birds are cats. Yes, the area occupied by Cats is also part of the Birds area, so some birds are indeed cats. Both follow.'
    },
    {
      id: 'syl-q2',
      text: 'Statements: 1. Some apples are bananas. 2. No banana is a cherry. \nConclusions: I. Some apples are not cherries. II. All apples being cherries is a possibility.',
      options: [
        { id: 'A', text: 'Only I follows', isCorrect: true, explanation: 'The apples that are bananas can NEVER be cherries. So at least some apples are definitely not cherries.' },
        { id: 'B', text: 'Only II follows', isCorrect: false, explanation: 'If all apples were cherries, the apples that are bananas would also be cherries. But no banana can be a cherry.' },
        { id: 'C', text: 'Either I or II follows', isCorrect: false, explanation: 'I is definitely true, II is definitely false.' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'I follows.' }
      ],
      hint: 'Look at the overlap between apples and bananas. Can those specific apples ever touch the cherry circle?',
      explanation: 'Draw circle A overlapping with circle B. Draw circle C totally separate from B. \nI. Some apples are not cherries. The part of the Apple circle that overlaps with the Banana circle can NEVER touch the Cherry circle (since no Banana is a Cherry). Therefore, those specific apples are not cherries. Conclusion I is True.\nII. All apples being cherries is a possibility. If we put the entire Apple circle inside the Cherry circle, the part of Apples that are Bananas would also be inside Cherries. But Bananas and Cherries cannot overlap. This is impossible. Conclusion II is False.'
    },
    {
      id: 'syl-q3',
      text: 'Statements: 1. Some pens are pencils. 2. Some pencils are erasers. \nConclusions: I. Some pens are erasers. II. No pen is an eraser.',
      options: [
        { id: 'A', text: 'Only I follows', isCorrect: false, explanation: 'Just because they both overlap with pencils doesn\'t mean they overlap with each other.' },
        { id: 'B', text: 'Only II follows', isCorrect: false, explanation: 'They *could* overlap, so "No pen is an eraser" isn\'t guaranteed.' },
        { id: 'C', text: 'Either I or II follows', isCorrect: true, explanation: 'These two conclusions form a complementary pair. Either they overlap (Some) or they don\'t (No).' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'They form an Either/Or pair.' }
      ],
      hint: 'Draw the basic diagram where Pens and Erasers don\'t touch. Then draw a diagram where they do. Notice the complementary pair?',
      explanation: 'Basic Diagram: Circle Pen overlaps Pencil. Circle Pencil overlaps Eraser. Pen and Eraser do NOT touch. In this diagram, I is False, II is True.\nAlternate Diagram: Pen overlaps Pencil, Pencil overlaps Eraser, and Eraser overlaps Pen (like a triangle of Venns). Here, I is True, II is False.\nBecause neither is universally true, both are individually False. However, in any universe, either Pens and Erasers overlap (Some) or they do not (No). They share the same subjects and form a complementary pair. Therefore, the answer is Either I or II.'
    },
    {
      id: 'syl-q4',
      text: 'Statements: 1. All waters are rivers. 2. All rivers are oceans. 3. No ocean is a lake. \nConclusions: I. No water is a lake. II. Some rivers are waters.',
      options: [
        { id: 'A', text: 'Only I follows', isCorrect: false, explanation: 'Check II as well.' },
        { id: 'B', text: 'Only II follows', isCorrect: false, explanation: 'Check I as well.' },
        { id: 'C', text: 'Both I and II follow', isCorrect: true, explanation: 'Water is inside River, River inside Ocean. Ocean cannot touch Lake. So Water cannot touch Lake. And since Water is inside River, some rivers are waters.' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'Both are correct.' }
      ],
      hint: 'If a smaller circle is entirely inside a larger circle, and the larger circle cannot touch a third circle, can the smaller one touch it?',
      explanation: 'Circle W is inside R. Circle R is inside O. Circle L is completely separate from O. \nI. No water is a lake. Since W is completely inside O, and O cannot touch L, W can never touch L. This is definitely True.\nII. Some rivers are waters. Since W is entirely inside R, the area occupied by W is part of R. Thus, some parts of R are W. This is True. Both follow.'
    },
    {
      id: 'syl-q5',
      text: 'Statements: 1. Only a few cars are bikes. 2. All bikes are trains. \nConclusions: I. All cars being trains is a possibility. II. All bikes being cars is a possibility.',
      options: [
        { id: 'A', text: 'Only I follows', isCorrect: false, explanation: 'Check II as well.' },
        { id: 'B', text: 'Only II follows', isCorrect: false, explanation: 'Check I as well.' },
        { id: 'C', text: 'Both I and II follow', isCorrect: true, explanation: '"Only a few" means "Some are and Some are not". Cars can be completely inside Trains without being completely inside Bikes. Bikes can be completely inside Cars.' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'Let\'s analyze "Only a few".' }
      ],
      hint: '"Only a few A are B" means two things: Some A are B, AND Some A are NOT B. It restricts A from being fully inside B, but B can be fully inside A.',
      explanation: '"Only a few cars are bikes" means: 1) Some cars are bikes. 2) Some cars are DEFINITELY NOT bikes. (Thus, All cars can never be bikes). \nConclusion I: All cars being trains is a possibility. Can we draw Cars inside Trains? Yes, as long as Cars aren\'t completely inside Bikes, we can draw a massive Train circle covering both Cars and Bikes. This is possible (True).\nConclusion II: All bikes being cars is a possibility. Can we draw the entire Bike circle inside the Car circle? Yes! The rule only says Cars cannot be entirely inside Bikes. Bikes being inside Cars is perfectly fine. Thus, True. Both I and II follow.'
    },
    {
      id: 'syl-q6',
      text: 'Statements: 1. No X is Y. 2. No Y is Z. \nConclusions: I. No X is Z. II. Some X are Z.',
      options: [
        { id: 'A', text: 'Only I follows', isCorrect: false, explanation: 'Just because X doesn\'t touch Y, and Y doesn\'t touch Z, doesn\'t mean X cannot touch Z. They could overlap!' },
        { id: 'B', text: 'Only II follows', isCorrect: false, explanation: 'They don\'t have to overlap.' },
        { id: 'C', text: 'Either I or II follows', isCorrect: true, explanation: 'X and Z have no direct relationship given. They either overlap or they don\'t.' },
        { id: 'D', text: 'Neither I nor II follows', isCorrect: false, explanation: 'They form an either/or pair.' }
      ],
      hint: 'If X avoids Y, and Z avoids Y, do X and Z have to avoid each other? Could they be the same thing?',
      explanation: 'Draw X separate from Y. Draw Z separate from Y. What is the relationship between X and Z? We don\'t know. They could be completely separate (making I true and II false), or they could overlap (making II true and I false). Since we don\'t know, neither is definitely true. However, because they use the same subjects and cover all possibilities (either they touch or they don\'t), they form an Either/Or pair.'
    }
  ]
};

