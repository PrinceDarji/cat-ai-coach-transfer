import { TopicContent } from '../types';

export const linearEquations: TopicContent = {
  id: 'q4',
  name: 'Linear Equations',
  section: 'quant',
  lessons: [
    {
      title: 'What is a Linear Equation?',
      content: `### Keeping it Straight
A linear equation is an equation where the highest power of any variable is 1. If you graph it, it makes a straight line.
- $3x + 5 = 14$ (Linear, one variable)
- $2x - y = 7$ (Linear, two variables)

Solving for one variable is simple algebra: isolate the variable!
$3x = 14 - 5 \\Rightarrow 3x = 9 \\Rightarrow x = 3$.`
    },
    {
      title: 'Simultaneous Equations (Two Variables)',
      content: `### Two Unknowns Require Two Clues
If you have two variables, you need two distinct equations to find a unique solution.
For example:
1) $2x + y = 8$
2) $x - y = 1$

**Method 1: Elimination**
Add the equations together to eliminate $y$:
$(2x + x) + (y - y) = 8 + 1 \\Rightarrow 3x = 9 \\Rightarrow x = 3$.
Plug $x$ back in: $3 - y = 1 \\Rightarrow y = 2$.

**Method 2: Substitution**
From eq 2, $x = y + 1$. Plug this into eq 1:
$2(y + 1) + y = 8 \\Rightarrow 2y + 2 + y = 8 \\Rightarrow 3y = 6 \\Rightarrow y = 2$.`
    },
    {
      title: 'Consistency Conditions',
      content: `### Do Solutions Always Exist?
Consider two lines: $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$.
Depending on how these lines cross, we have three scenarios:

1. **Unique Solution (Intersecting lines):**
   $\\frac{a_1}{a_2} \neq \\frac{b_1}{b_2}$
2. **No Solution (Parallel lines):**
   $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \neq \\frac{c_1}{c_2}$
   *Example: $x+y=2$ and $x+y=5$. Impossible!*
3. **Infinite Solutions (Same line):**
   $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$`
    },
    {
      title: 'Word Problems to Equations',
      content: `### The Art of Translation
The hardest part of CAT linear equations isn't solving them, it's setting them up.
- "A is 5 more than B" $\\Rightarrow A = B + 5$
- "Twice of X is 10 less than Y" $\\Rightarrow 2X = Y - 10$
- "The ratio of ages is 3:4" $\\Rightarrow$ Ages are $3x$ and $4x$

Always define your variables clearly first!`
    }
  ],
  practice: [
    {
      id: 'q4_1',
      text: 'Solve for x and y: 3x + 2y = 12 and 4x - y = 5',
      options: ['x=2, y=3', 'x=3, y=2', 'x=4, y=0', 'x=1, y=4.5'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Multiply the second equation by 2 and add them together to eliminate y.',
      explanation: 'Eq 1: 3x + 2y = 12\nEq 2: 4x - y = 5. Multiply by 2: 8x - 2y = 10.\nAdd them: (3x+8x) + (2y-2y) = 12+10 => 11x = 22 => x = 2.\nSubstitute x=2 in Eq 2: 4(2) - y = 5 => 8 - y = 5 => y = 3.',
      wrongExplanations: [
        '',
        'Swapped the values of x and y.',
        'Made a math error when substituting back.',
        'Calculated incorrectly in elimination.'
      ]
    },
    {
      id: 'q4_2',
      text: 'For what value of k will the equations 3x + 4y = 12 and 6x + ky = 24 have infinitely many solutions?',
      options: ['4', '6', '8', '12'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'For infinite solutions, a1/a2 = b1/b2 = c1/c2.',
      explanation: 'Condition for infinite solutions: a1/a2 = b1/b2 = c1/c2.\nHere, 3/6 = 4/k = 12/24.\n1/2 = 4/k.\nCross multiply: k = 8.',
      wrongExplanations: [
        'Just matched the y coefficient from equation 1.',
        'Calculation error.',
        '',
        'Matched the constants.'
      ]
    },
    {
      id: 'q4_3',
      text: 'The sum of the digits of a two-digit number is 10. If the digits are reversed, the new number is 36 less than the original number. What is the original number?',
      options: ['37', '73', '64', '46'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'A two digit number with digits x and y is 10x + y. Its reverse is 10y + x.',
      explanation: 'Let the tens digit be x and units digit be y.\nEquation 1: x + y = 10.\nOriginal number = 10x + y. Reversed = 10y + x.\nEquation 2: (10y + x) = (10x + y) - 36\n9y - 9x = -36 => x - y = 4.\nSolving x+y=10 and x-y=4: \nAdd them: 2x = 14 => x=7. y=3.\nOriginal number is 73.',
      wrongExplanations: [
        'This is the reversed number. It is 36 MORE than 73, wait, 73-36=37. The question asked for the original number.',
        '',
        '64-46 = 18, not 36.',
        'Sum is 10, but reversing gives 64 which is MORE than 46.'
      ]
    },
    {
      id: 'q4_4',
      text: 'A father is currently 3 times as old as his son. In 12 years, the father will be twice as old as his son. What is the father\'s present age?',
      options: ['24', '36', '48', '60'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Set up equations: F = 3S and (F + 12) = 2(S + 12)',
      explanation: 'Let father\'s age = F, son\'s age = S.\nF = 3S.\nIn 12 years: F + 12 = 2(S + 12)\nSubstitute F = 3S:\n3S + 12 = 2S + 24\nS = 12.\nFather = 3 * 12 = 36.',
      wrongExplanations: [
        'Calculated the son\'s age in 12 years.',
        '',
        'Father\'s age in 12 years.',
        'Random math error.'
      ]
    },
    {
      id: 'q4_5',
      text: 'Determine the nature of solutions for: 2x - 3y = 7 and 4x - 6y = 10',
      options: ['Unique solution', 'Infinite solutions', 'No solution', 'Cannot be determined'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Check the ratios a1/a2, b1/b2, and c1/c2.',
      explanation: 'a1/a2 = 2/4 = 1/2\nb1/b2 = -3/-6 = 1/2\nc1/c2 = 7/10\nSince a1/a2 = b1/b2 != c1/c2, the lines are parallel and never intersect. Therefore, there is no solution.',
      wrongExplanations: [
        'A unique solution happens when a1/a2 != b1/b2.',
        'Infinite solutions happen if c1/c2 was also equal to 1/2 (e.g. if the constant was 14 instead of 10).',
        '',
        'It can be determined.'
      ]
    },
    {
      id: 'q4_6',
      text: 'In a farm, there are cows and hens. If heads are counted, there are 180. If legs are counted, there are 420. The number of cows is:',
      options: ['30', '60', '120', '150'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Let C = cows, H = hens. C+H=180. Cows have 4 legs, hens have 2.',
      explanation: 'Let C = number of cows, H = number of hens.\nHeads equation: C + H = 180.\nLegs equation: 4C + 2H = 420. Divide by 2: 2C + H = 210.\nSubtract heads eq from legs eq:\n(2C + H) - (C + H) = 210 - 180\nC = 30.\nNumber of cows is 30.',
      wrongExplanations: [
        '',
        'Arithmetic error.',
        'This is the number of hens (180 - 30 = 150).',
        'This is the number of hens.'
      ]
    }
  ]
};

