import { TopicContent } from '../types';

export const triangles: TopicContent = {
  id: 'q10',
  name: 'Triangles',
  section: 'quant',
  lessons: [
    {
      title: 'Triangle Properties',
      content: `### The 180Â° Rule
A triangle is a 3-sided polygon.
- The sum of all interior angles is always **180Â°**.
- The sum of any two sides must be strictly **greater** than the third side. ($a+b > c$)
- The difference of any two sides must be strictly **less** than the third side. ($|a-b| < c$)`
    },
    {
      title: 'Types of Triangles',
      content: `### Classification
**By Sides:**
- **Equilateral:** All 3 sides equal, all angles 60Â°.
- **Isosceles:** 2 sides equal, angles opposite to them are equal.
- **Scalene:** All sides different.

**By Angles:**
- **Acute:** All angles < 90Â°.
- **Right:** One angle exactly 90Â°.
- **Obtuse:** One angle > 90Â°.`
    },
    {
      title: 'Area of a Triangle',
      content: `### Finding the Space Inside
1. **Basic Formula:**
   $Area = \\frac{1}{2} \\times \\text{base} \\times \\text{height}$
2. **Heron\'s Formula (when all 3 sides are known):**
   $Area = \\sqrt{s(s-a)(s-b)(s-c)}$
   *(where s is the semi-perimeter: $s = \\frac{a+b+c}{2}$)*
3. **Equilateral Triangle Shortcut:**
   $Area = \\frac{\\sqrt{3}}{4} a^2$ *(where a is the side)*`
    },
    {
      title: 'Pythagoras Theorem',
      content: `### Right Triangles Rule!
For any right-angled triangle with sides $a$ and $b$, and hypotenuse $c$ (the longest side, opposite 90Â°):

> $a^2 + b^2 = c^2$

**Famous Pythagorean Triplets to memorize:**
(3, 4, 5) | (5, 12, 13) | (7, 24, 25) | (8, 15, 17)
*Any multiple of these is also a triplet! (e.g., 6, 8, 10)*`
    },
    {
      title: 'Similarity and Congruence',
      content: `### Twins and Clones
**Congruent Triangles** are exact clones. Same shape, same size.
Tests: SSS, SAS, ASA, AAS, RHS.

**Similar Triangles** are scaled versions (twins of different sizes). Same shape, different size. Same angles, proportional sides.
Tests: AA, SSS, SAS.

*Golden Rule for Similar Triangles:*
If ratio of sides is $a:b$, then:
- Ratio of perimeters/heights/medians = $a:b$
- Ratio of Areas = $a^2 : b^2$`
    }
  ],
  practice: [
    {
      id: 'q10_1',
      text: 'Which of the following can be the sides of a triangle?',
      options: ['2, 3, 6', '4, 5, 9', '3, 4, 5', '1, 2, 4'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'The sum of any two sides must be strictly greater than the third side.',
      explanation: 'Let\'s check the triangle inequality theorem (sum of smallest two > longest).\n- 2+3 = 5 (Not greater than 6)\n- 4+5 = 9 (Equal to 9, not strictly greater. Forms a straight line, not a triangle)\n- 3+4 = 7 (Greater than 5). Valid!\n- 1+2 = 3 (Not greater than 4)',
      wrongExplanations: [
        'Fails triangle inequality (2+3 < 6).',
        'Fails triangle inequality (4+5 = 9, must be > 9).',
        '',
        'Fails triangle inequality (1+2 < 4).'
      ]
    },
    {
      id: 'q10_2',
      text: 'The area of an equilateral triangle is 16âˆš3 sq cm. Find its side length.',
      options: ['4 cm', '8 cm', '16 cm', '32 cm'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Equilateral area = (âˆš3 / 4) * a^2.',
      explanation: 'Area = (âˆš3 / 4) * a^2 = 16âˆš3\nDivide both sides by âˆš3: a^2 / 4 = 16\na^2 = 16 * 4 = 64\na = 8 cm.',
      wrongExplanations: [
        'Calculated square root of 16 without multiplying by 4 first.',
        '',
        'Forgot to take square root of 64.',
        'Calculation error.'
      ]
    },
    {
      id: 'q10_3',
      text: 'In a right-angled triangle, if one leg is 5 cm and the hypotenuse is 13 cm, what is the length of the other leg?',
      options: ['8 cm', '10 cm', '12 cm', '14 cm'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Use Pythagoras theorem: a^2 + b^2 = c^2, where c is the hypotenuse.',
      explanation: 'Let the unknown leg be b. Hypotenuse c = 13, leg a = 5.\na^2 + b^2 = c^2\n5^2 + b^2 = 13^2\n25 + b^2 = 169\nb^2 = 169 - 25 = 144\nb = 12 cm. (This is the famous 5-12-13 triplet!)',
      wrongExplanations: [
        'Confused with 3-4-5 triplet or guessed.',
        'Guessed random even number.',
        '',
        'Calculated 169 - 25 incorrectly.'
      ]
    },
    {
      id: 'q10_4',
      text: 'Two similar triangles have perimeters of 20 cm and 30 cm. What is the ratio of their areas?',
      options: ['2:3', '4:9', 'sqrt(2):sqrt(3)', '8:27'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Ratio of areas is the square of the ratio of perimeters.',
      explanation: 'Ratio of perimeters = 20 : 30 = 2 : 3.\nFor similar triangles, ratio of sides = ratio of perimeters.\nRatio of areas = (Ratio of sides)^2 = (2/3)^2 = 4 : 9.',
      wrongExplanations: [
        'This is the ratio of sides/perimeters, not areas.',
        '',
        'Took square root instead of squaring.',
        'Cubed the ratio instead of squaring.'
      ]
    },
    {
      id: 'q10_5',
      text: 'Find the area of a triangle with sides 13 cm, 14 cm, and 15 cm.',
      options: ['84 sq cm', '90 sq cm', '100 sq cm', '112 sq cm'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Use Heron\'s formula. First find semi-perimeter s = (a+b+c)/2.',
      explanation: 'a=13, b=14, c=15.\nSemi-perimeter s = (13+14+15)/2 = 42/2 = 21.\nArea = âˆš(s(s-a)(s-b)(s-c))\n= âˆš(21 * (21-13) * (21-14) * (21-15))\n= âˆš(21 * 8 * 7 * 6)\n= âˆš( (7*3) * (4*2) * 7 * (3*2) )\n= âˆš( 7^2 * 3^2 * 4 * 2^2 ) \n= 7 * 3 * 2 * 2 = 84 sq cm.',
      wrongExplanations: [
        '',
        'Calculated incorrectly.',
        'Random math error.',
        'Guessed based on perimeter.'
      ]
    },
    {
      id: 'q10_6',
      text: 'In a triangle ABC, the angles are in the ratio 2:3:4. What type of triangle is this?',
      options: ['Right-angled', 'Acute-angled', 'Obtuse-angled', 'Isosceles'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Find the largest angle. If it is < 90, it is acute.',
      explanation: 'Sum of angles = 180Â°.\nRatio = 2x : 3x : 4x.\n2x + 3x + 4x = 180 => 9x = 180 => x = 20.\nAngles are 40Â°, 60Â°, and 80Â°.\nSince all angles are less than 90Â°, it is an acute-angled triangle.',
      wrongExplanations: [
        'None of the angles is 90Â°.',
        '',
        'None of the angles is greater than 90Â°.',
        'All angles are different, so it is scalene, not isosceles.'
      ]
    }
  ]
};

