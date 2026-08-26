import { TopicContent } from '../types';

export const quadraticEquations: TopicContent = {
  id: 'q5',
  name: 'Quadratic Equations',
  section: 'quant',
  lessons: [
    {
      title: 'The Standard Form',
      content: `### Meet the Parabola
A quadratic equation is an equation where the highest power of the variable is 2.
Standard form:
> $ax^2 + bx + c = 0$ (where $a \neq 0$)

Because it's a degree-2 equation, it always has exactly **two roots** (solutions). Let's call them $\\alpha$ and $\\beta$.`
    },
    {
      title: 'Solving a Quadratic',
      content: `### Two Ways to Solve
**1. Factoring (Splitting the middle term):**
For $x^2 - 5x + 6 = 0$:
Find two numbers that multiply to 6 and add to -5. They are -2 and -3.
$(x - 2)(x - 3) = 0 \\Rightarrow x = 2$ or $x = 3$.

**2. The Quadratic Formula (The Sridharacharya Formula):**
When factoring is too hard, use the heavy machinery:
> $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$`
    },
    {
      title: 'The Discriminant',
      content: `### Predicting the Roots
The expression inside the square root in the formula is called the Discriminant ($\\Delta$).
> $\\Delta = b^2 - 4ac$

This tells you the nature of the roots:
- If **$\\Delta > 0$**: Two distinct real roots.
- If **$\\Delta = 0$**: Two equal real roots (it's a perfect square).
- If **$\\Delta < 0$**: No real roots (they are complex/imaginary numbers).`
    },
    {
      title: 'Sum and Product of Roots',
      content: `### The Most Important Formulas for CAT
You don't always need to solve for the exact roots! Sometimes questions only ask about their relationship.

For $ax^2 + bx + c = 0$ with roots $\\alpha$ and $\\beta$:
> **Sum of roots** ($\\alpha + \\beta$) = $-b/a$
> **Product of roots** ($\\alpha\\beta$) = $c/a$

*Tip:* Any quadratic can be written as:
$x^2 - (\\text{Sum of roots})x + (\\text{Product of roots}) = 0$`
    },
    {
      title: 'The x + 1/x Pattern',
      content: `### A Common Algebra Trick
If you see $x + 1/x = k$, you can turn it into a quadratic!
Multiply everything by $x$:
$x^2 + 1 = kx \\Rightarrow x^2 - kx + 1 = 0$

Also, if $x + 1/x = k$, remember these direct expansions:
- $x^2 + 1/x^2 = k^2 - 2$
- $x^3 + 1/x^3 = k^3 - 3k$`
    }
  ],
  practice: [
    {
      id: 'q5_1',
      text: 'Find the roots of the equation x^2 - 7x + 12 = 0.',
      options: ['3 and 4', '-3 and -4', '2 and 6', '-2 and -6'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Find two numbers that multiply to +12 and add to -7.',
      explanation: 'We need numbers that multiply to 12 and add to -7. These are -3 and -4. \nThe factored form is (x - 3)(x - 4) = 0.\nTherefore, the roots are x = 3 and x = 4.',
      wrongExplanations: [
        '',
        'Signs are flipped. The factors are (x+3)(x+4) which gives x^2 + 7x + 12.',
        'These add to 8, not 7.',
        'These multiply to 12, but add to -8.'
      ]
    },
    {
      id: 'q5_2',
      text: 'For what value of k will the equation x^2 + kx + 9 = 0 have equal roots?',
      options: ['6 only', '-6 only', '+6 or -6', '9'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'For equal roots, the discriminant (b^2 - 4ac) must be zero.',
      explanation: 'For equal roots, b^2 - 4ac = 0.\nHere, a = 1, b = k, c = 9.\nk^2 - 4(1)(9) = 0\nk^2 - 36 = 0\nk^2 = 36\nk = +6 or -6.',
      wrongExplanations: [
        'Forgot that -6 also squares to 36.',
        'Forgot that +6 also squares to 36.',
        '',
        'Confused with the c value.'
      ]
    },
    {
      id: 'q5_3',
      text: 'If Î± and Î² are the roots of the equation 2x^2 - 5x + 3 = 0, find the value of (1/Î±) + (1/Î²).',
      options: ['5/2', '5/3', '3/2', '-5/3'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Simplify the expression to (Î± + Î²) / (Î±Î²). Then use the formulas for sum and product.',
      explanation: '(1/Î±) + (1/Î²) = (Î± + Î²) / (Î±Î²).\nFrom the equation 2x^2 - 5x + 3 = 0, a=2, b=-5, c=3.\nSum of roots (Î± + Î²) = -b/a = -(-5)/2 = 5/2.\nProduct of roots (Î±Î²) = c/a = 3/2.\n(Î± + Î²) / (Î±Î²) = (5/2) / (3/2) = 5/3.',
      wrongExplanations: [
        'This is just the sum of the roots.',
        '',
        'This is the product of the roots.',
        'Forgot the negative sign in the sum formula (-b/a).'
      ]
    },
    {
      id: 'q5_4',
      text: 'Form a quadratic equation whose roots are 2 + âˆš3 and 2 - âˆš3.',
      options: ['x^2 - 4x + 1 = 0', 'x^2 + 4x + 1 = 0', 'x^2 - 4x - 1 = 0', 'x^2 - x + 4 = 0'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Find the Sum and Product of the roots. Equation is x^2 - (Sum)x + (Product) = 0.',
      explanation: 'Roots: Î± = 2 + âˆš3, Î² = 2 - âˆš3.\nSum (Î± + Î²) = 2 + âˆš3 + 2 - âˆš3 = 4.\nProduct (Î±Î²) = (2 + âˆš3)(2 - âˆš3) = (2)^2 - (âˆš3)^2 = 4 - 3 = 1.\nEquation: x^2 - (Sum)x + Product = 0\nx^2 - 4x + 1 = 0.',
      wrongExplanations: [
        '',
        'Messed up the sign of the Sum. It should be - (Sum)x.',
        'Messed up the sign of the Product.',
        'Swapped sum and product.'
      ]
    },
    {
      id: 'q5_5',
      text: 'If x + 1/x = 3, what is the value of x^2 + 1/x^2?',
      options: ['6', '7', '9', '11'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Square both sides of the given equation: (x + 1/x)^2 = 3^2.',
      explanation: '(x + 1/x) = 3\nSquaring both sides: (x + 1/x)^2 = 9\nx^2 + 2(x)(1/x) + 1/x^2 = 9\nx^2 + 2 + 1/x^2 = 9\nx^2 + 1/x^2 = 9 - 2 = 7.\nOr use shortcut: k^2 - 2 = 3^2 - 2 = 7.',
      wrongExplanations: [
        'Subtracted 3 instead of 2.',
        '',
        'Simply squared 3 and forgot the middle term 2ab.',
        'Added 2 instead of subtracting 2.'
      ]
    },
    {
      id: 'q5_6',
      text: 'The roots of the equation x^2 - kx + 8 = 0 are integers. How many possible values can k take?',
      options: ['2', '4', '6', '8'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'The product of the roots is 8. Since roots are integers, list all integer pairs that multiply to 8.',
      explanation: 'Let roots be Î± and Î². Î±Î² = c/a = 8.\nSince roots are integers, the pairs (Î±, Î²) can be:\n(1, 8), (-1, -8), (2, 4), (-2, -4).\nThe sum of the roots is Î± + Î² = -(-k)/1 = k.\nSo k can be: 1+8=9, -1-8=-9, 2+4=6, -2-4=-6.\nThere are 4 possible values for k.',
      wrongExplanations: [
        'Only considered positive roots.',
        '',
        'Included fractions, but roots must be integers.',
        'Included permutations like (8,1) but k will still be the same value.'
      ]
    }
  ]
};

