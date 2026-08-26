const fs = require('fs');

const tables = fs.readFileSync('temp_tables.txt', 'utf8');

const basicOperationsCode = `import { TopicContent } from '../types';

export const basicOperations: TopicContent = {
  id: 'q-bm-1',
  name: 'Basic Operations & Tables',
  section: 'quant',
  lessons: [
    {
      title: 'Foundation: BODMAS Rule',
      content: \`
### The Order of Operations
Before learning speed tricks, you must never fail the basic order of operations. Always follow **BODMAS**:
- **B**rackets (solve inner most first)
- **O**f / **O**rders (powers, roots, e.g., $x^2$)
- **D**ivision
- **M**ultiplication
- **A**ddition
- **S**ubtraction

*(Note: Division and Multiplication have the same priority, evaluated left to right. Same for Addition and Subtraction.)*

**Example:** $48 \\\\div 2(9 + 3)$
1. Brackets first: $9 + 3 = 12$. Expression becomes $48 \\\\div 2 \\\\times 12$.
2. Division and Multiplication are left to right.
3. $48 \\\\div 2 = 24$.
4. $24 \\\\times 12 = 288$.
      \`,
    },
    {
      title: 'Advanced Addition & Subtraction Tricks',
      content: \`
### 1. The Left-to-Right Method
Instead of the traditional right-to-left school method, add left-to-right to hold the biggest numbers in your head.
**Example:** $456 + 328$
- Hundreds: $400 + 300 = 700$
- Tens: $50 + 20 = 70 \\\\rightarrow 770$
- Units: $6 + 8 = 14 \\\\rightarrow 770 + 14 = 784$

### 2. The Rounding / Compensation Method
Round to the nearest 10 or 100, then compensate.
**Example:** $834 - 397$
- $397$ is close to $400$.
- Do $834 - 400 = 434$.
- Since you subtracted 3 too many, add 3 back: $434 + 3 = 437$.

**Example:** $648 + 295$
- Do $648 + 300 = 948$.
- Subtract 5: $948 - 5 = 943$.

### 3. Digit Sum / Digital Root (For Checking Answers)
The digital root of a number is the sum of its digits until a single digit is reached.
$456 \\\\rightarrow 4+5+6 = 15 \\\\rightarrow 1+5 = 6$.
You can use this to quickly verify complex addition/multiplication in options without fully solving!
      \`,
    },
    {
      title: 'Advanced Multiplication Shortcuts',
      content: \`
### 1. Base Method (Vedic Math)
Useful for numbers near 10, 100, 1000.
**Example:** $104 \\\\times 107$
- Both are near base 100. Offsets are $+4$ and $+7$.
- Cross add: $104 + 7 = 111$ (or $107 + 4 = 111$). This is the left part.
- Multiply offsets: $4 \\\\times 7 = 28$. This is the right part.
- Answer: $11128$.

**Example:** $96 \\\\times 92$
- Offsets: $-4$ and $-8$.
- Cross add: $96 - 8 = 88$.
- Multiply offsets: $(-4) \\\\times (-8) = +32$.
- Answer: $8832$.

### 2. Multiplication by Special Numbers (5, 25, 125, 11)
- **By 5**: Multiply by $10$, then divide by $2$. ($48 \\\\times 5 = 480 / 2 = 240$)
- **By 25**: Multiply by $100$, then divide by $4$. ($36 \\\\times 25 = 3600 / 4 = 900$)
- **By 11**: Write the last digit, add adjacent digits, write the first digit. 
  - $452 \\\\times 11$: Last digit 2. Next: 5+2=7. Next: 4+5=9. First digit 4. Answer: $4972$.

### 3. Split and Multiply
**Example:** $43 \\\\times 12$
- Split $12$ into $10 + 2$.
- $(43 \\\\times 10) + (43 \\\\times 2) = 430 + 86 = 516$.
      \`,
    },
    {
      title: 'Division Shortcuts & Approximations',
      content: \`
### 1. Division by 5, 25
- **By 5**: Multiply the number by $2$ and shift the decimal point left. ($235 / 5 = 470 \\\\rightarrow 47$)
- **By 25**: Multiply the number by $4$ and shift decimal left twice. ($1200 / 25 = 4800 \\\\rightarrow 48$)

### 2. Approximating Fractions in DI
In Data Interpretation, you rarely need exact division.
**Example:** Calculate $\\\\frac{342}{815}$
- Find $10\\\\%$ of the denominator: $81.5$
- Find $1\\\\%$ of the denominator: $8.15$
- $40\\\\%$ is $81.5 \\\\times 4 = 326$.
- We need $342$, so we are short by $342 - 326 = 16$.
- $1\\\\%$ is roughly 8, so $16$ is roughly $2\\\\%$.
- Therefore, the fraction is approximately $40\\\\% + 2\\\\% = 42\\\\%$.
      \`,
    },
    {
      title: 'Comprehensive Multiplication Tables (1 to 20)',
      content: \`
Memorizing these tables is non-negotiable for CAT. It will save you immense time in Data Interpretation and Quant calculations.

${tables.replace(/\\/g, '\\\\')}
      \`,
    },
  ],
  practice: [
    {
      id: 'q-bm-1_1',
      text: 'Calculate mentally using compensation: $834 - 397$',
      options: ['477', '487', '437', '447'],
      correctAnswer: 2,
      difficulty: 'easy',
      hint: 'Subtract 400 instead of 397, then compensate.',
      explanation: 'Subtract 400 from 834 to get 434. Since you subtracted 3 too many, add 3 back. 434 + 3 = 437.',
      wrongExplanations: ['Incorrect subtraction.', 'Forgot to compensate correctly.', '', 'Compensated in the wrong direction.']
    },
    {
      id: 'q-bm-1_2',
      text: 'What is the value of $108 \\\\times 104$ using the Base Method?',
      options: ['11232', '11224', '10832', '11432'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Base is 100. Offsets are +8 and +4.',
      explanation: 'Left part: Cross add offsets. $108 + 4 = 112$. Right part: Multiply offsets. $8 \\\\times 4 = 32$. Combine to get 11232.',
      wrongExplanations: ['', 'Multiplied offsets incorrectly.', 'Did not cross add the offsets.', 'Added offsets incorrectly.']
    },
    {
      id: 'q-bm-1_3',
      text: 'Calculate mentally: $94 \\\\times 97$',
      options: ['9128', '9118', '9218', '9112'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Offsets from 100 are -6 and -3.',
      explanation: 'Left part: $94 - 3 = 91$. Right part: $(-6) \\\\times (-3) = 18$. Combine to get 9118.',
      wrongExplanations: ['Incorrect multiplication of offsets.', '', 'Incorrect cross addition.', 'Incorrect multiplication.']
    },
    {
      id: 'q-bm-1_4',
      text: 'Calculate mentally using the 11 shortcut: $635 \\\\times 11$',
      options: ['6985', '6895', '6935', '6885'],
      correctAnswer: 0,
      difficulty: 'easy',
      hint: 'Write the last digit, add adjacent digits, write the first digit.',
      explanation: 'Last digit is 5. Next digit: 3+5=8. Next digit: 6+3=9. First digit is 6. The answer is 6985.',
      wrongExplanations: ['', 'Swapped the middle digits.', 'Incorrect addition.', 'Incorrect addition.']
    },
    {
      id: 'q-bm-1_5',
      text: 'Evaluate: $36 \\\\div 6(2 + 1)$',
      options: ['2', '18', '12', '24'],
      correctAnswer: 1,
      difficulty: 'hard',
      hint: 'Remember BODMAS. Do brackets first, then division and multiplication from left to right.',
      explanation: 'Step 1 (Brackets): $2 + 1 = 3$. The expression is now $36 \\\\div 6 \\\\times 3$. Step 2 (Left to right): $36 \\\\div 6 = 6$. Step 3: $6 \\\\times 3 = 18$.',
      wrongExplanations: ['You multiplied $6 \\\\times 3 = 18$ first, then did $36 \\\\div 18 = 2$. Division and Multiplication have the same priority and must be done left-to-right!', '', 'Incorrect calculation.', 'Incorrect calculation.']
    }
  ],
};
`;

fs.writeFileSync('src/lib/content/quant/basic-operations.ts', basicOperationsCode);
console.log('Done rewriting basic operations.');
