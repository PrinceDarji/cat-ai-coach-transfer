import { TopicContent } from '../types';

export const numberSystems: TopicContent = {
  id: 'q7',
  name: 'Prime Numbers',
  section: 'quant',
  lessons: [
    {
      title: 'Primes and Composites',
      content: `### The Building Blocks of Numbers
A **Prime Number** has exactly two distinct positive divisors: 1 and itself.
- Examples: 2, 3, 5, 7, 11...
- **2** is the only even prime number.
- **1** is neither prime nor composite.

A **Composite Number** has more than two divisors (e.g., 4, 6, 8, 9).

Every composite number can be broken down into a unique product of primes. This is the **Prime Factorization**.
E.g., $120 = 2^3 \\times 3^1 \\times 5^1$.`
    },
    {
      title: 'Divisibility Rules',
      content: `### Speed Checking
- **2:** Last digit is even.
- **3:** Sum of digits is divisible by 3.
- **4:** Last two digits form a number divisible by 4.
- **5:** Last digit is 0 or 5.
- **6:** Divisible by both 2 and 3.
- **8:** Last three digits form a number divisible by 8.
- **9:** Sum of digits is divisible by 9.
- **11:** Difference between sum of digits at odd places and even places is 0 or a multiple of 11.`
    },
    {
      title: 'Number of Factors',
      content: `### Counting Divisors
If you prime factorize a number $N = a^p \\times b^q \\times c^r...$
(where a, b, c are prime bases)

The **Total Number of Factors** is:
> $(p+1)(q+1)(r+1)...$

**Example:** Number of factors of 120.
$120 = 2^3 \\times 3^1 \\times 5^1$.
Factors = $(3+1)(1+1)(1+1) = 4 \\times 2 \\times 2 = 16$.`
    },
    {
      title: 'HCF and LCM',
      content: `### Highest Common Factor & Lowest Common Multiple
Using Prime Factorization:
- **HCF (GCD):** Take the lowest power of all *common* prime factors.
- **LCM:** Take the highest power of *all* prime factors present.

**Golden Rule for two numbers A and B:**
> $HCF(A,B) \\times LCM(A,B) = A \\times B$

*Note: This rule ONLY works for TWO numbers, not three!*`
    },
    {
      title: 'Euler\'s Totient Function',
      content: `### The Co-prime Counter
Euler's Totient function, $\\phi(N)$, tells you how many numbers less than $N$ are co-prime to $N$ (i.e., share no common factors other than 1).

If $N = a^p \\times b^q \\times c^r$, where a,b,c are prime bases:
> $\\phi(N) = N \\times (1 - 1/a) \\times (1 - 1/b) \\times (1 - 1/c)$

**Example:** $\\phi(12)$
$12 = 2^2 \\times 3^1$. Prime bases are 2 and 3.
$\\phi(12) = 12 \\times (1 - 1/2) \\times (1 - 1/3) = 12 \\times (1/2) \\times (2/3) = 4$.
(The numbers are 1, 5, 7, 11).`
    }
  ],
  practice: [
    {
      id: 'q7_1',
      text: 'Which of the following numbers is prime?',
      options: ['161', '221', '373', '437'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Test divisibility by primes up to the square root of the number.',
      explanation: 'To check if N is prime, test divisibility by primes â‰¤ âˆšN.\n- 161: âˆš161 is ~12. Primes: 2,3,5,7,11. 161 = 7 * 23. (Not prime)\n- 221: âˆš221 is ~14. Primes: 2,3,5,7,11,13. 221 = 13 * 17. (Not prime)\n- 373: âˆš373 is ~19. Primes: 2,3,5,7,11,13,17,19. None divide 373. (Prime!)\n- 437: âˆš437 is ~20. Primes: 2,3...19. 437 = 19 * 23. (Not prime)',
      wrongExplanations: [
        'Divisible by 7.',
        'Divisible by 13.',
        '',
        'Divisible by 19.'
      ]
    },
    {
      id: 'q7_2',
      text: 'If a 6-digit number 738A6A is divisible by 11, what is the value of A?',
      options: ['1', '3', '6', '9'],
      correctAnswer: 3,
      difficulty: 'medium',
      hint: 'Use the divisibility rule of 11: Difference of sum of alternate digits must be 0 or multiple of 11.',
      explanation: 'Number: 7 3 8 A 6 A\nSum of odd places (from left): 7 + 8 + 6 = 21.\nSum of even places: 3 + A + A = 3 + 2A.\nDifference must be 0, 11, 22...\n|21 - (3 + 2A)| = |18 - 2A|\nIf 18 - 2A = 0 => 2A = 18 => A = 9.\nSince A must be a single digit (0-9), A = 9 is valid.',
      wrongExplanations: [
        '18 - 2(1) = 16, not divisible by 11.',
        '18 - 2(3) = 12, not divisible by 11.',
        '18 - 2(6) = 6, not divisible by 11.',
        ''
      ]
    },
    {
      id: 'q7_3',
      text: 'Find the total number of factors of 360.',
      options: ['18', '24', '30', '36'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Prime factorize 360, then add 1 to each exponent and multiply them.',
      explanation: 'Prime factorization of 360:\n360 = 36 * 10 = (2^2 * 3^2) * (2 * 5) = 2^3 * 3^2 * 5^1.\nThe powers are 3, 2, and 1.\nNumber of factors = (3+1) * (2+1) * (1+1) = 4 * 3 * 2 = 24.',
      wrongExplanations: [
        'Multiplied the exponents without adding 1 (3 * 2 * 1 = 6) or did some other error.',
        '',
        'Calculation error.',
        'Added incorrectly.'
      ]
    },
    {
      id: 'q7_4',
      text: 'The HCF of two numbers is 12 and their LCM is 144. If one of the numbers is 36, what is the other number?',
      options: ['48', '72', '24', '96'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Use the formula: HCF * LCM = Product of the two numbers.',
      explanation: 'Let the numbers be A and B.\nWe know HCF(A,B) * LCM(A,B) = A * B.\n12 * 144 = 36 * B.\nB = (12 * 144) / 36 = 144 / 3 = 48.',
      wrongExplanations: [
        '',
        'Arithmetic error.',
        'Confused HCF and LCM formulas.',
        'Calculated 144 - 36 or something else.'
      ]
    },
    {
      id: 'q7_5',
      text: 'How many numbers less than 100 are co-prime to 100?',
      options: ['20', '25', '40', '50'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Use Euler\'s Totient function: Ï†(100).',
      explanation: 'Find prime bases of 100.\n100 = 2^2 * 5^2. The prime bases are 2 and 5.\nEuler\'s Totient Ï†(100) = 100 * (1 - 1/2) * (1 - 1/5)\n= 100 * (1/2) * (4/5) = 100 * (4/10) = 40.\nSo there are 40 numbers less than 100 that are co-prime to it.',
      wrongExplanations: [
        'Number of primes less than 100 is 25, but co-prime is different (e.g., 9 is not prime but is co-prime to 100).',
        'Just guessing.',
        '',
        'Thought it\'s exactly half.'
      ]
    },
    {
      id: 'q7_6',
      text: 'Find the LCM of 2^3 * 3^2 * 5^1 and 2^2 * 3^3 * 7^1.',
      options: ['2^2 * 3^2', '2^3 * 3^3 * 5 * 7', '2^5 * 3^5 * 5 * 7', '2 * 3'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'LCM takes the HIGHEST power of every prime factor present in either number.',
      explanation: 'To find LCM from prime factorizations, take the highest power of every prime number that appears.\nFor 2: highest power is max(3, 2) = 3.\nFor 3: highest power is max(2, 3) = 3.\nFor 5: highest power is max(1, 0) = 1.\nFor 7: highest power is max(0, 1) = 1.\nLCM = 2^3 * 3^3 * 5^1 * 7^1.',
      wrongExplanations: [
        'This is the HCF (takes the lowest powers).',
        '',
        'Added the powers instead of taking the maximum.',
        'Took difference of powers.'
      ]
    }
  ]
};

