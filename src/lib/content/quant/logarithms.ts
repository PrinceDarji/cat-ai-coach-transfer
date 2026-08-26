import { TopicContent } from '../types';

export const logarithms: TopicContent = {
  id: 'q6',
  name: 'Logarithms',
  section: 'quant',
  lessons: [
    {
      title: 'What is a Logarithm?',
      content: `### The Exponent's Alter Ego
A logarithm is just a different way of writing an exponent. It answers the question: "To what power must I raise the base to get the number?"

If $a^b = c$, then $\\log_a(c) = b$.
- $2^3 = 8 \\Rightarrow \\log_2(8) = 3$
- $10^2 = 100 \\Rightarrow \\log_{10}(100) = 2$

*Note: The base 'a' must be positive and not equal to 1. The argument 'c' must be positive.*`
    },
    {
      title: 'Core Properties of Logs',
      content: `### The Rules of the Game
These are the most critical formulas for CAT. Memorize them!

1. **Product Rule:** $\\log_a(xy) = \\log_a(x) + \\log_a(y)$
2. **Quotient Rule:** $\\log_a(x/y) = \\log_a(x) - \\log_a(y)$
3. **Power Rule:** $\\log_a(x^k) = k \\cdot \\log_a(x)$
4. **Base Power Rule:** $\\log_{a^k}(x) = \\frac{1}{k} \\log_a(x)$

*Special values:*
- $\\log_a(1) = 0$ (because $a^0 = 1$)
- $\\log_a(a) = 1$ (because $a^1 = a$)`
    },
    {
      title: 'Change of Base Formula',
      content: `### Switching Bases
Sometimes you need to change the base of a logarithm to solve a problem. 

> $\\log_a(b) = \\frac{\\log_c(b)}{\\log_c(a)}$
(You can choose any valid base $c$)

A very useful variation:
> $\\log_a(b) = \\frac{1}{\\log_b(a)}$`
    },
    {
      title: 'Common Traps and Mistakes',
      content: `### Don't Do This!
Many students invent their own log rules under pressure. Avoid these:

- $\\log(x + y)$ is NOT $\\log(x) + \\log(y)$. There is no formula to split a sum inside a log.
- $(\\log x)^2$ is NOT $2 \\log x$. The power must be ON the variable, like $\\log(x^2)$, to bring the 2 down.
- $\\log x / \\log y$ is NOT $\\log(x/y)$. The former is the change of base formula, the latter is $\\log x - \\log y$.`
    }
  ],
  practice: [
    {
      id: 'q6_1',
      text: 'Find the value of x if log_2(x) = 5.',
      options: ['10', '25', '32', '64'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Convert from logarithmic form to exponential form: base^result = argument.',
      explanation: 'If log_a(b) = c, then a^c = b.\nHere, log_2(x) = 5 means 2^5 = x.\n2^5 = 32. Therefore, x = 32.',
      wrongExplanations: [
        'Multiplied 2 and 5.',
        'Calculated 5^2 instead of 2^5.',
        '',
        'Calculated 2^6.'
      ]
    },
    {
      id: 'q6_2',
      text: 'Evaluate: log_10(5) + log_10(20)',
      options: ['1', '2', '25', '100'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Use the product rule: log(a) + log(b) = log(ab).',
      explanation: 'Using the property log_a(x) + log_a(y) = log_a(x*y).\nlog_10(5) + log_10(20) = log_10(5 * 20) = log_10(100).\nWe know 10^2 = 100, so log_10(100) = 2.',
      wrongExplanations: [
        'Thought log(100) is 1.',
        '',
        'Added the arguments instead of multiplying.',
        'This is the argument inside the log, not the final value.'
      ]
    },
    {
      id: 'q6_3',
      text: 'If log_x(81) = 4, what is x?',
      options: ['2', '3', '4', '9'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Convert to exponential form. What number raised to power 4 gives 81?',
      explanation: 'log_x(81) = 4 implies x^4 = 81.\nWe know that 3^4 = 81. Therefore, x = 3.',
      wrongExplanations: [
        '2^4 = 16.',
        '',
        '4^4 = 256.',
        '9^2 = 81, not 9^4.'
      ]
    },
    {
      id: 'q6_4',
      text: 'Simplify: log_2(16) / log_2(4)',
      options: ['2', '4', '8', 'log_2(12)'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Calculate numerator and denominator separately, OR use the change of base property backwards.',
      explanation: 'Method 1: log_2(16) = 4 (since 2^4=16). log_2(4) = 2 (since 2^2=4). 4 / 2 = 2.\nMethod 2: Change of base formula log_c(b)/log_c(a) = log_a(b). Here, log_4(16) = 2.',
      wrongExplanations: [
        '',
        'Calculated 16/4 = 4. You cannot just divide the arguments when logs are divided!',
        'Calculated log_2(16 * 4) = log_2(64) = 6... wait, answer is 8? Random error.',
        'Confused division of logs with log of quotient.'
      ]
    },
    {
      id: 'q6_5',
      text: 'Solve for x: log_3(x+1) + log_3(x-1) = 1',
      options: ['2', '-2', '2 or -2', '4'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Use the product rule to combine the logs, then convert to exponential form.',
      explanation: 'Combine using product rule: log_3((x+1)(x-1)) = 1.\nlog_3(x^2 - 1) = 1.\nConvert to exponential: x^2 - 1 = 3^1.\nx^2 - 1 = 3 => x^2 = 4.\nx = 2 or x = -2.\nBUT wait! Logs are only defined for positive arguments. \nIf x = -2, log_3(-2+1) = log_3(-1) which is invalid. \nSo x can only be 2.',
      wrongExplanations: [
        '',
        'Negative arguments in logs are invalid.',
        'Forgot to check the domain (validity) of the original log terms. x=-2 is extraneous.',
        'Arithmetic error when solving x^2 = 4.'
      ]
    },
    {
      id: 'q6_6',
      text: 'What is the value of log_{âˆš3}(27)?',
      options: ['3', '6', '9', '1/6'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Express both base and argument as powers of 3, then use power rules.',
      explanation: 'Base = âˆš3 = 3^(1/2). Argument = 27 = 3^3.\nlog_{3^(1/2)}(3^3).\nUse power rules: The power of the argument comes to numerator, power of base goes to denominator.\n= (3 / (1/2)) * log_3(3) \n= (3 * 2) * 1 = 6.',
      wrongExplanations: [
        'Thought log_3(27) is 3, ignoring the square root in the base.',
        '',
        'Squared 3 instead of dividing by 1/2.',
        'Swapped the numerator and denominator powers.'
      ]
    }
  ]
};

