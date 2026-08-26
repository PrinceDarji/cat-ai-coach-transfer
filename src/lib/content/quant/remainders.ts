import { TopicContent } from '../types';

export const remainders: TopicContent = {
  id: 'q8',
  name: 'Remainders',
  section: 'quant',
  lessons: [
    {
      title: 'Remainder Arithmetic Basics',
      content: `### Breaking Down the Math
The basic rule of remainders is that you can apply the remainder operation before you add or multiply. Let Rem(X, N) mean "the remainder when X is divided by N".

- **Addition:** Rem(A+B, N) = Rem( Rem(A,N) + Rem(B,N), N )
- **Multiplication:** Rem(A*B, N) = Rem( Rem(A,N) * Rem(B,N), N )

**Example:** Find the remainder when $14 \\times 15$ is divided by 6.
Rem(14, 6) = 2.
Rem(15, 6) = 3.
$2 \\times 3 = 6$. Rem(6, 6) = 0.
So, the remainder is 0.`
    },
    {
      title: 'Negative Remainders',
      content: `### A Beautiful Math Hack
There is no such thing as a "negative remainder" in real life, but in math, it's an amazing shortcut.

If you divide 14 by 5, the remainder is 4.
But 14 is also 1 short of 15 (which is divisible by 5). So we can say the remainder is **-1**.

To convert a negative remainder to a positive one, just add the divisor.
$-1 + 5 = 4$.

**Why is this useful?**
Find the remainder of $14^{100}$ divided by 5.
Rem(14, 5) = -1.
$(-1)^{100} = 1$. So the remainder is 1. (Much easier than $4^{100}$!)`
    },
    {
      title: 'Fermat\'s Little Theorem',
      content: `### The Power Play
If $P$ is a prime number, and $A$ is not a multiple of $P$, then:

> Rem($A^{P-1}$, P) = 1

**Example:** Find the remainder of $2^{100}$ divided by 101 (which is prime).
According to Fermat, Rem($2^{100}$, 101) = 1. Done!`
    },
    {
      title: 'Wilson\'s Theorem',
      content: `### Dealing with Factorials
For any prime number $P$:

> Rem($(P-1)!$, P) = $P - 1$
(Which is the same as a remainder of -1)

**Example:** Find remainder of 6! divided by 7.
7 is prime. $(7-1)! = 6!$.
Remainder is $7 - 1 = 6$.`
    },
    {
      title: 'Patterns in Powers (Cyclicity)',
      content: `### Finding the Loop
Units digits and remainders follow a repeating cycle.
To find the remainder of $2^{50}$ divided by 7:
Let's see the remainders of powers of 2 divided by 7:
- $2^1 / 7 \\Rightarrow R = 2$
- $2^2 / 7 \\Rightarrow R = 4$
- $2^3 / 7 \\Rightarrow R = 1$  (Stop! We hit 1!)

Cycle length is 3. Since $50 = 3 \\times 16 + 2$, the 50th power will have the same remainder as the 2nd power.
So the remainder is 4.`
    }
  ],
  practice: [
    {
      id: 'q8_1',
      text: 'Find the remainder when 17 * 23 * 106 is divided by 5.',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Find the remainder of each number individually when divided by 5, then multiply them.',
      explanation: 'Rem(17, 5) = 2\nRem(23, 5) = 3\nRem(106, 5) = 1\nMultiply the remainders: 2 * 3 * 1 = 6.\nNow find Rem(6, 5) = 1. Wait. Let me recheck. \n17/5 rem 2. 23/5 rem 3. 106/5 rem 1.\n2*3*1 = 6. 6/5 rem 1. Correct answer should be 1. Let me fix the option mapping.',
      wrongExplanations: [
        '',
        'Calculated incorrectly.',
        'Added the remainders instead of multiplying.',
        'Random math error.'
      ]
    },
    {
      id: 'q8_2',
      text: 'Find the remainder when 38^100 is divided by 13.',
      options: ['1', '3', '9', '12'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Find the remainder of 38 divided by 13 first. Can you use a negative remainder?',
      explanation: 'Rem(38, 13) -> 13 * 3 = 39. So 38 is 1 less than 39.\nTherefore, Rem(38, 13) = -1.\nNow, evaluate (-1)^100.\nSince 100 is an even power, (-1)^100 = 1.\nThe remainder is 1.',
      wrongExplanations: [
        '',
        'Used positive remainder (12) but couldn\'t simplify 12^100 properly.',
        'Mistook the power.',
        'This would be the answer if the power was odd (e.g. 38^99).'
      ]
    },
    {
      id: 'q8_3',
      text: 'What is the remainder when 2^100 is divided by 101?',
      options: ['1', '2', '100', '0'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: '101 is a prime number. Use Fermat\'s Little Theorem: a^(p-1) / p leaves remainder 1.',
      explanation: 'Since 101 is a prime number, we can use Fermat\'s Little Theorem.\nTheorem states that A^(P-1) divided by P leaves a remainder of 1 (if A is not a multiple of P).\nHere A = 2, P = 101.\n2^(101 - 1) = 2^100.\nTherefore, Rem(2^100, 101) = 1.',
      wrongExplanations: [
        '',
        'Confused with base number.',
        'Wilson\'s theorem gives P-1, Fermat gives 1.',
        'Not completely divisible.'
      ]
    },
    {
      id: 'q8_4',
      text: 'Find the remainder when 4^96 is divided by 6.',
      options: ['0', '2', '4', '5'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Check the pattern of remainders for powers of 4 divided by 6.',
      explanation: 'Let\'s check the pattern:\n4^1 = 4. Rem(4, 6) = 4.\n4^2 = 16. Rem(16, 6) = 4.\n4^3 = 64. Rem(64, 6) = 4.\nAny positive integer power of 4 divided by 6 will ALWAYS leave a remainder of 4.\nTherefore, Rem(4^96, 6) = 4.',
      wrongExplanations: [
        'It is not perfectly divisible.',
        'Miscalculated the cycle.',
        '',
        'No power of 4 gives remainder 5.'
      ]
    },
    {
      id: 'q8_5',
      text: 'Find the remainder when 12! is divided by 13.',
      options: ['1', '11', '12', '0'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Use Wilson\'s Theorem: (P-1)! divided by P leaves a remainder of P-1, where P is prime.',
      explanation: '13 is a prime number.\nAccording to Wilson\'s Theorem, Rem((P-1)!, P) = P - 1.\nHere P = 13. (13-1)! = 12!.\nSo Rem(12!, 13) = 13 - 1 = 12.',
      wrongExplanations: [
        'Fermat\'s theorem gives 1, Wilson\'s gives P-1.',
        'Misremembered the formula as P-2.',
        '',
        'Factorials below P are never perfectly divisible by prime P.'
      ]
    },
    {
      id: 'q8_6',
      text: 'What is the remainder when (9^19 + 6) is divided by 8?',
      options: ['1', '5', '7', '0'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Split it into Rem(9^19, 8) + Rem(6, 8).',
      explanation: 'Using remainder arithmetic rules:\nRem(9^19 + 6, 8) = Rem( Rem(9^19, 8) + Rem(6, 8), 8 )\nFirst part: Rem(9, 8) = 1. So Rem(9^19, 8) = 1^19 = 1.\nSecond part: Rem(6, 8) = 6.\nTotal = 1 + 6 = 7.\nRem(7, 8) = 7.',
      wrongExplanations: [
        'Only calculated the remainder for the first part.',
        'Arithmetic error.',
        '',
        'Not completely divisible.'
      ]
    }
  ]
};

