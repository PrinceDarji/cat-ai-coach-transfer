import { TopicContent } from '../types';

export const squaresCubes: TopicContent = {
  id: 'q-bm-2',
  name: 'Squares & Cubes',
  section: 'quant',
  lessons: [
    {
      title: 'Squares up to 30',
      content: `
Memorizing squares up to $30$ is essential for identifying patterns in Number Systems and LRDI.

### Complete List of Squares (1 to 30)
- $1^2 = 1$
- $2^2 = 4$
- $3^2 = 9$
- $4^2 = 16$
- $5^2 = 25$
- $6^2 = 36$
- $7^2 = 49$
- $8^2 = 64$
- $9^2 = 81$
- $10^2 = 100$
- $11^2 = 121$
- $12^2 = 144$
- $13^2 = 169$
- $14^2 = 196$
- $15^2 = 225$
- $16^2 = 256$
- $17^2 = 289$
- $18^2 = 324$
- $19^2 = 361$
- $20^2 = 400$
- $21^2 = 441$
- $22^2 = 484$
- $23^2 = 529$
- $24^2 = 576$
- $25^2 = 625$
- $26^2 = 676$
- $27^2 = 729$
- $28^2 = 784$
- $29^2 = 841$
- $30^2 = 900$


**Trick**: Notice the symmetry around 25. 
- $24^2$ ends in $76$ ($576$), $26^2$ ends in $76$ ($676$)
- $23^2$ ends in $29$ ($529$), $27^2$ ends in $29$ ($729$)
      `,
    },
    {
      title: 'Cubes up to 20',
      content: `
You should also memorize cubes up to 20 to spot series logic instantly.

### Complete List of Cubes (1 to 20)
- $1^3 = 1$
- $2^3 = 8$
- $3^3 = 27$
- $4^3 = 64$
- $5^3 = 125$
- $6^3 = 216$
- $7^3 = 343$
- $8^3 = 512$
- $9^3 = 729$
- $10^3 = 1000$
- $11^3 = 1331$
- $12^3 = 1728$
- $13^3 = 2197$
- $14^3 = 2744$
- $15^3 = 3375$
- $16^3 = 4096$
- $17^3 = 4913$
- $18^3 = 5832$
- $19^3 = 6859$
- $20^3 = 8000$
      `,
    },
    {
      title: 'Trick to Find Squares Quickly (Near 50 and 100)',
      content: `
### Squaring numbers near 50
To find $53^2$:
- Base is $50$, offset is $+3$.
- Add the offset to $25$: $25 + 3 = 28$
- Square the offset: $3^2 = 09$
- Combine: $2809$

To find $46^2$:
- Offset is $-4$.
- $25 - 4 = 21$
- $(-4)^2 = 16$
- Combine: $2116$
      `,
    },
  ],
  practice: [
    {
      id: 'q-bm-2_1',
      text: 'Calculate mentally: $57^2$',
      options: ['3149', '3249', '3349', '3449'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Base is 50, offset is +7.',
      explanation: 'Offset is $+7$. $25 + 7 = 32$. $7^2 = 49$. Combine them to get $3249$.',
      wrongExplanations: ['Incorrect addition of offset.', '', 'Incorrect addition of offset.', 'Incorrect addition of offset.']
    },
    {
      id: 'q-bm-2_2',
      text: 'What is the value of $14^3$?',
      options: ['2197', '3375', '2744', '1728'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'It ends with a 4.',
      explanation: '$14^3 = 2744$. Note: $2197$ is $13^3$, $3375$ is $15^3$, and $1728$ is $12^3$.',
      wrongExplanations: ['This is $13^3$.', 'This is $15^3$.', '', 'This is $12^3$.']
    },
    {
      id: 'q-bm-2_3',
      text: 'Calculate mentally: $43^2$',
      options: ['1749', '1849', '1949', '1649'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Base is 50, offset is -7.',
      explanation: 'Offset is $-7$. $25 - 7 = 18$. $(-7)^2 = 49$. Combine them to get $1849$.',
      wrongExplanations: ['Incorrect subtraction.', '', 'Incorrect subtraction.', 'Incorrect subtraction.']
    },
    {
      id: 'q-bm-2_4',
      text: 'What is the value of $28^2$?',
      options: ['729', '784', '841', '676'],
      correctAnswer: 1,
      difficulty: 'easy',
      hint: 'Check the last digit. $8 \times 8$ ends in 4.',
      explanation: '$28^2 = 784$. Note: $729 = 27^2$, $841 = 29^2$, and $676 = 26^2$.',
      wrongExplanations: ['This is $27^2$.', '', 'This is $29^2$.', 'This is $26^2$.']
    },
    {
      id: 'q-bm-2_5',
      text: 'Calculate mentally: $104^2$',
      options: ['10816', '10416', '10804', '11616'],
      correctAnswer: 0,
      difficulty: 'hard',
      hint: 'Base is 100, offset is +4. The rule for base 100 is: add offset to the original number, and attach offset squared.',
      explanation: 'Offset is $+4$. Original number + offset = $104 + 4 = 108$. Offset squared = $4^2 = 16$. Combine to get $10816$.',
      wrongExplanations: ['', 'Forgot to add the offset to the original number properly.', 'Incorrect square of offset.', 'Added the square of the offset to the number itself.']
    }
  ],
};
