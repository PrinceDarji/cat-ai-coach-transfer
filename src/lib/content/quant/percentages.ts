import { TopicContent } from '../types';

export const percentages: TopicContent = {
  id: 'q-a-1',
  name: 'Percentages',
  section: 'quant',
  lessons: [
    {
      title: 'Deep Dive: What is a Percentage?',
      content: `### The Basics of Percentage
Think of "percent" as two words: "per" meaning "for every", and "cent" meaning "100". So, 20 percent (20%) simply means "20 for every 100".

If you score 40 marks out of 50, how much is that out of 100? 
You can scale it up: 40 out of 50 is the same as 80 out of 100. Therefore, your score is 80%.

**Formula:**
> $\\text{Percentage} = \\frac{\\text{Value}}{\\text{Total Base}} \\times 100$

### Percentage vs Fraction vs Decimal
Percentages, fractions, and decimals are just three different ways to represent the exact same proportion.
- $50\\% = 50 / 100 = 1 / 2 = 0.5$
- $75\\% = 75 / 100 = 3 / 4 = 0.75$

In CAT, mastering the translation between these three forms is critical for speed.
`
    },
    {
      title: 'Fraction to Percentage Equivalents',
      content: `### The Magic Fractions
In CAT, speed is everything. You shouldn't be calculating $1/8 \\times 100$ in the exam. You must memorize these:

- $1/2 = 50\\%$
- $1/3 = 33.33\\%$
- $1/4 = 25\\%$
- $1/5 = 20\\%$
- $1/6 = 16.66\\%$
- $1/7 \\approx 14.28\\%$
- $1/8 = 12.5\\%$
- $1/9 = 11.11\\%$
- $1/10 = 10\\%$
- $1/11 = 9.09\\%$
- $1/12 = 8.33\\%$
- $1/13 \\approx 7.69\\%$
- $1/14 \\approx 7.14\\%$
- $1/15 = 6.66\\%$

### Deriving Values
Once you know the base fraction, you can derive multiples instantly:
- Since $1/8 = 12.5\\%$, what is $3/8$? It is $3 \\times 12.5\\% = 37.5\\%$.
- Since $1/6 = 16.66\\%$, what is $5/6$? It is $5 \\times 16.66\\% = 83.33\\%$.
`
    },
    {
      title: 'Multiplying Factors (The Most Powerful Tool)',
      content: `### Concept of Multiplying Factor (MF)
Instead of calculating a percentage and adding/subtracting it from the base, you can use a single multiplier.

- **To increase a value by 20%:** The new value is $100\\% + 20\\% = 120\\%$. Multiply by $1.2$.
- **To decrease a value by 30%:** The new value is $100\\% - 30\\% = 70\\%$. Multiply by $0.7$.

### Working with Fractions
If the percentage is complex, use fraction multipliers:
- **Increase by $16.66\\%$**: $16.66\\% = 1/6$. The multiplier is $1 + 1/6 = 7/6$.
- **Decrease by $12.5\\%$**: $12.5\\% = 1/8$. The multiplier is $1 - 1/8 = 7/8$.

**Example:** Increase 240 by 37.5%.
- $37.5\\% = 3/8$.
- Multiplier = $1 + 3/8 = 11/8$.
- New Value = $240 \\times \\frac{11}{8} = 30 \\times 11 = 330$.
`
    },
    {
      title: 'Successive Percentage Change',
      content: `### Multiple Changes in a Row
If a quantity is increased by $a\\%$ and then by $b\\%$, the net percentage change is NOT $(a+b)\\%$. Because the second change happens on the new, already increased value!

**The Successive Formula:**
> $\\text{Net } \\% \\text{ Change} = a + b + \\frac{ab}{100}$
*(Use positive values for increase, negative for decrease)*

**Example:**
Price increases by 20%, then decreases by 10%.
Net change = $20 + (-10) + \\frac{20 \\times -10}{100} = 10 - 2 = 8\\% \\text{ increase}$.

### Using Multiplying Factors for Successive Changes
For multiple complex changes, multiplying factors are much faster than the formula.
If price increases by $16.66\\%$, then decreases by $14.28\\%$ and increases by $12.5\\%$...
- $MF_1 = 1 + 1/6 = 7/6$
- $MF_2 = 1 - 1/7 = 6/7$
- $MF_3 = 1 + 1/8 = 9/8$

Net Multiplier = $\\frac{7}{6} \\times \\frac{6}{7} \\times \\frac{9}{8} = \\frac{9}{8} = 1 + \\frac{1}{8}$.
The net change is an increase of $1/8$, which is $12.5\\%$.
`
    },
    {
      title: 'Product Constancy (A x B = Constant)',
      content: `### Price x Consumption = Expenditure
If $A \\times B = C$, and $C$ is constant, then $A$ and $B$ are inversely proportional.

If $A$ increases by a fraction $\\frac{x}{y}$, then $B$ must **decrease** by the fraction $\\frac{x}{x+y}$ to keep $C$ constant.

If $A$ decreases by a fraction $\\frac{x}{y}$, then $B$ must **increase** by the fraction $\\frac{x}{y-x}$ to keep $C$ constant.

**Example:** Price of sugar increases by 25%. How much should consumption decrease so expenditure remains same?
- 25% increase = $+1/4$. ($x=1, y=4$)
- Decrease needed = $- \\frac{1}{1+4} = -1/5 = -20\\%$.
`
    }
  ],
  practice: [
    {
      id: 'q-a-1_1',
      text: 'If the price of petrol increases by 25%, by what percentage should a person reduce their consumption so that the expenditure remains the same?',
      options: ['20%', '25%', '33.33%', '16.66%'],
      correctAnswer: 0,
      difficulty: 'easy',
      hint: 'Use the product constancy rule: an increase of x/y requires a decrease of x/(x+y).',
      explanation: 'An increase of 25% is a fraction increase of +1/4. To keep the product constant, the consumption must decrease by -1/(4+1) = -1/5 = 20%.',
      wrongExplanations: [
        '',
        'This is the percentage of increase, but to go back to the original value, the decrease is calculated on a larger base.',
        'This would be the answer if the price decreased by 25% instead.',
        'Calculation error. 1/6 is the reverse of a 20% increase.'
      ]
    },
    {
      id: 'q-a-1_2',
      text: 'A number is first increased by 20% and then decreased by 20%. What is the net percentage change in the number?',
      options: ['No change', '4% decrease', '4% increase', '8% decrease'],
      correctAnswer: 1,
      difficulty: 'easy',
      hint: 'Use the successive percentage change formula: a + b + (ab/100).',
      explanation: 'Using the formula: a = 20, b = -20. Net change = 20 - 20 + (20)(-20)/100 = -400/100 = -4%. The negative sign indicates a decrease. So, it\'s a 4% decrease.',
      wrongExplanations: [
        'A common trap! 20% increase and 20% decrease do not cancel out because the decrease is calculated on a larger base.',
        '',
        'The formula gives a negative result, meaning decrease, not increase.',
        'Misapplied the formula or added 4% decrease twice.'
      ]
    },
    {
      id: 'q-a-1_3',
      text: '[CAT 2021] If the area of a regular hexagon is equal to the area of an equilateral triangle of side 12 cm, then the length, in cm, of each side of the hexagon is:',
      options: ['4√6', '6√6', '2√6', '√6'],
      correctAnswer: 2,
      difficulty: 'hard',
      hint: 'Area of regular hexagon = 6 * (sqrt(3)/4) * a^2. Area of equilateral triangle = (sqrt(3)/4) * s^2.',
      explanation: 'Area of equilateral triangle = (√3/4) * (12)^2 = 36√3.\nArea of regular hexagon of side a = 6 * (√3/4) * a^2 = (3√3/2) * a^2.\nEquating them: (3√3/2) * a^2 = 36√3\na^2 = 36 * 2 / 3 = 24\na = √24 = 2√6.',
      wrongExplanations: [
        'Calculation error while solving a^2 = 24.',
        'Calculation error.',
        '',
        'Calculation error.'
      ]
    },
    {
      id: 'q-a-1_4',
      text: '[CAT 2020] In May, John bought the same amount of rice and the same amount of wheat as he had bought in April, but spent 150 more due to price increase of rice and wheat by 20% and 12%, respectively. If John had spent 450 on rice in April, then how much did he spend on wheat in April?',
      options: ['500', '560', '580', '600'],
      correctAnswer: 0,
      difficulty: 'hard',
      hint: 'Let wheat expenditure in April be W. Total increase = (20% of 450) + (12% of W) = 150.',
      explanation: 'Expenditure on rice in April = 450. Increase in rice price = 20%. Extra amount spent on rice = 20% of 450 = 90.\nTotal extra amount spent = 150. So, extra amount spent on wheat = 150 - 90 = 60.\nThis 60 corresponds to the 12% price increase of wheat.\nSo, 12% of W = 60.\n(12/100) * W = 60 -> W = 60 * 100 / 12 = 500.',
      wrongExplanations: [
        '',
        'Calculation error.',
        'Calculation error.',
        'Calculation error.'
      ]
    },
    {
      id: 'q-a-1_5',
      text: '[CAT 2018] In an examination, the maximum possible score is N while the pass mark is 45% of N. A candidate obtains 36 marks, but falls short of the pass mark by 68%. Which one of the following is then correct?',
      options: ['N ≤ 200', '201 ≤ N ≤ 242', '243 ≤ N ≤ 252', 'N ≥ 253'],
      correctAnswer: 2,
      difficulty: 'hard',
      hint: 'Falling short by 68% means the obtained marks are (100% - 68%) = 32% of the pass marks.',
      explanation: 'Pass marks = 0.45N.\nThe candidate got 36 marks, which falls short of the pass mark by 68%. This means the candidate scored 32% of the pass marks.\n0.32 * Pass Marks = 36\nPass Marks = 36 / 0.32 = 112.5.\nWe know Pass Marks = 0.45N.\nSo, 0.45N = 112.5\nN = 112.5 / 0.45 = 250.\nLooking at the options, 250 lies in the range 243 ≤ N ≤ 252.',
      wrongExplanations: [
        'Incorrect range.',
        'Incorrect range.',
        '',
        'Incorrect range.'
      ]
    },
    {
      id: 'q-a-1_6',
      text: '[CAT 2017] The number of girls appearing for an admission test is twice the number of boys. If 30% of the girls and 45% of the boys get admission, the percentage of candidates who do not get admission is:',
      options: ['35', '50', '60', '65'],
      correctAnswer: 3,
      difficulty: 'medium',
      hint: 'Assume the number of boys is 100. Then girls are 200. Total = 300.',
      explanation: 'Let Boys = 100. Then Girls = 200. Total candidates = 300.\nBoys getting admission = 45% of 100 = 45.\nGirls getting admission = 30% of 200 = 60.\nTotal admitted = 45 + 60 = 105.\nTotal NOT admitted = 300 - 105 = 195.\nPercentage of candidates not admitted = (195 / 300) * 100 = 65%.',
      wrongExplanations: [
        'This is the percentage of students admitted.',
        'Calculation error.',
        'Calculation error.',
        ''
      ]
    }
  ]
};
