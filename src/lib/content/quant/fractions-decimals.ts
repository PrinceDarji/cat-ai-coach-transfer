import { TopicContent } from '../types';

export const fractionsDecimals: TopicContent = {
  id: 'q-bm-3',
  name: 'Fractions & Decimals',
  section: 'quant',
  lessons: [
    {
      title: 'Fraction to Percentage & Decimal Equivalents',
      content: `
Memorizing fraction-decimal equivalents up to $1/20$ is arguably the most important foundational skill for Data Interpretation and Arithmetic.

### Essential Fractions
- $1/2 = 0.50$ ($50\\%$)
- $1/3 = 0.3333$ ($33.33\\%$)
- $1/4 = 0.25$ ($25\\%$)
- $1/5 = 0.20$ ($20\\%$)
- $1/6 = 0.1666$ ($16.66\\%$)
- $1/7 = 0.1428$ ($14.28\\%$)
- $1/8 = 0.125$ ($12.5\\%$)
- $1/9 = 0.1111$ ($11.11\\%$)
- $1/10 = 0.10$ ($10\\%$)
- $1/11 = 0.0909$ ($9.09\\%$)
- $1/12 = 0.0833$ ($8.33\\%$)
- $1/13 = 0.0769$ ($7.69\\%$)
- $1/14 = 0.0714$ ($7.14\\%$)
- $1/15 = 0.0666$ ($6.66\\%$)
- $1/16 = 0.0625$ ($6.25\\%$)

**Trick**:
Notice that $1/9 = 11.11\\%$ and $1/11 = 9.09\\%$. They are inverses of each other!
      `,
    }
  ],
  practice: [
    {
      id: 'q-bm-3_1',
      text: 'Calculate $12.5\\%$ of $640$',
      options: ['60', '70', '80', '90'],
      correctAnswer: 2,
      difficulty: 'easy',
      hint: 'What is the fractional equivalent of 12.5%?',
      explanation: '$12.5\\% = 1/8$. So, $(1/8) \\times 640 = 80$.',
      wrongExplanations: ['Incorrect fraction', 'Incorrect fraction', '', 'Incorrect fraction']
    }
  ],
};
