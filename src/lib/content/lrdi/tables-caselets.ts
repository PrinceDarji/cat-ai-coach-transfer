import { TopicContent } from '../types';

export const tablesCaselets: TopicContent = {
  id: 'd1',
  name: 'Tables & Caselets',
  section: 'lrdi',
  lessons: [
    {
      id: 'tc-1',
      title: 'Introduction to Tables',
      content: `### Data in Grids
Tables are the most fundamental form of Data Interpretation. You are given data organized in rows and columns. 

**How to approach a table:**
1. **Read the Title**: It tells you what the data is about.
2. **Read the Column and Row Headers**: What do the numbers represent? (Years, Companies, Percentages?)
3. **Check the Units**: Are the numbers in thousands? Millions? Dollars? Rupees?
4. **Read the Footnotes**: This is where they hide the crucial *catch* (e.g., "Profit = Revenue - Cost").`
    },
    {
      id: 'tc-2',
      title: 'Missing Data Tables',
      content: `### Playing Detective
Often, CAT tables will have blank cells. Your first job is NOT to jump to the questions, but to see if you can fill in the blanks using totals, averages, or given formulas.

* If you know the Total and 4 out of 5 values, subtract to find the 5th.
* If a cell requires a complex calculation that you only need for one specific question, don't calculate it until that question asks for it! Save your time.`
    },
    {
      id: 'tc-3',
      title: 'What is a Caselet?',
      content: `### Paragraphs of Data
A caselet is essentially a Data Interpretation set given in the form of a paragraph instead of a table or graph. It's a reading comprehension passage filled with numbers!

**The Golden Rule of Caselets:**
Never try to solve questions by hunting back through the paragraph. **Always convert a caselet into a Table or a Venn Diagram first.** 
Once the data is structured, the questions become trivial.`
    },
    {
      id: 'tc-4',
      title: 'Calculation Shortcuts',
      content: `### Speed is Key
In Tables, you'll often have to find percentages, ratios, and growth rates.
* **Percentage Growth**: ((Final - Initial) / Initial) * 100
* **Approximation**: If the options are far apart (A: 12%, B: 24%, C: 35%), don't calculate exactly. Round numbers like 14,892 to 15,000.
* **Fraction to Percentage**: Memorize fractions like 1/6 (16.66%), 1/7 (14.28%), 1/8 (12.5%) to skip long division.`
    }
  ],
  practice: [
    {
      id: 'tc-q1',
      text: 'A table shows revenue of 3 companies (A, B, C) over 2 years (2020, 2021). A\'s revenue was 100 and 120. B\'s was 150 and 180. C\'s was 200 and 220. Which company had the highest percentage growth in revenue?',
      options: [
        { id: 'A', text: 'Company A', isCorrect: false, explanation: 'A grew from 100 to 120. Growth = 20/100 = 20%.' },
        { id: 'B', text: 'Company B', isCorrect: false, explanation: 'B grew from 150 to 180. Growth = 30/150 = 1/5 = 20%.' },
        { id: 'C', text: 'Company C', isCorrect: false, explanation: 'C grew from 200 to 220. Growth = 20/200 = 10%.' },
        { id: 'D', text: 'Both A and B', isCorrect: true, explanation: 'Both A and B have exactly 20% growth.' }
      ],
      hint: 'Percentage growth = (Increase / Original) * 100.',
      explanation: 'Growth for A = (120-100)/100 = 20%. Growth for B = (180-150)/150 = 30/150 = 20%. Growth for C = (220-200)/200 = 20/200 = 10%. So A and B are tied for the highest percentage growth.'
    },
    {
      id: 'tc-q2',
      text: 'Caselet: In a class of 100 students, the ratio of boys to girls is 3:2. 40% of the boys play cricket. 50% of the girls play cricket. How many students in total play cricket?',
      options: [
        { id: 'A', text: '40', isCorrect: false, explanation: 'Calculate boys and girls separately.' },
        { id: 'B', text: '44', isCorrect: true, explanation: 'Let\'s break it down.' },
        { id: 'C', text: '45', isCorrect: false, explanation: 'Incorrect calculation.' },
        { id: 'D', text: '50', isCorrect: false, explanation: 'That is the average of 40% and 50% if the populations were equal.' }
      ],
      hint: 'First find the exact number of boys and girls using the 3:2 ratio out of 100.',
      explanation: 'Total students = 100. Ratio of Boys:Girls = 3:2. Boys = (3/5)*100 = 60. Girls = (2/5)*100 = 40. \nCricket boys = 40% of 60 = 24. \nCricket girls = 50% of 40 = 20. \nTotal playing cricket = 24 + 20 = 44.'
    },
    {
      id: 'tc-q3',
      text: 'A table shows expenses: Rent=20k, Food=15k, Travel=X, Utilities=5k. If Total Expenses = 50k, what percentage of the total expense is Travel?',
      options: [
        { id: 'A', text: '15%', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'B', text: '20%', isCorrect: true, explanation: 'Find X first.' },
        { id: 'C', text: '25%', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'D', text: '10%', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'Sum the known expenses and subtract from the total to find Travel (X).',
      explanation: 'Known expenses = 20k (Rent) + 15k (Food) + 5k (Utilities) = 40k. Total is 50k, so Travel (X) = 50k - 40k = 10k. Percentage of Travel = (10k / 50k) * 100 = 20%.'
    },
    {
      id: 'tc-q4',
      text: 'If Company X\'s profits were $40M in 2018 and grew by 25% every year, what was the profit in 2020?',
      options: [
        { id: 'A', text: '$60M', isCorrect: false, explanation: 'That would be simple interest (40 + 10 + 10). Growth compounds!' },
        { id: 'B', text: '$62.5M', isCorrect: true, explanation: 'Compound growth: 40 * 1.25 * 1.25' },
        { id: 'C', text: '$65M', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'D', text: '$50M', isCorrect: false, explanation: 'That\'s just one year of growth.' }
      ],
      hint: 'Growth is compounded. Increase by 25%, then increase the NEW number by 25%.',
      explanation: '2018 Profit = 40. \n2019 Profit = 40 + (25% of 40) = 40 + 10 = 50. \n2020 Profit = 50 + (25% of 50) = 50 + 12.5 = 62.5M. \nAlternatively: 40 * (1.25)^2 = 62.5M.'
    },
    {
      id: 'tc-q5',
      text: 'Caselet: A shop sells only Shirts and Pants. On Monday, it sold 50 items total, making $1500. Shirts cost $20, Pants cost $40. How many Pants were sold?',
      options: [
        { id: 'A', text: '20', isCorrect: false, explanation: 'If 20 pants ($800), then 30 shirts ($600). Total = $1400. Not 1500.' },
        { id: 'B', text: '25', isCorrect: true, explanation: 'Let\'s set up the equation.' },
        { id: 'C', text: '30', isCorrect: false, explanation: 'If 30 pants ($1200), then 20 shirts ($400). Total = $1600.' },
        { id: 'D', text: '15', isCorrect: false, explanation: 'If 15 pants ($600), then 35 shirts ($700). Total = $1300.' }
      ],
      hint: 'Let Shirts = S and Pants = P. You have two equations: S + P = 50 and 20S + 40P = 1500.',
      explanation: 'Let P be the number of pants. Then Shirts = 50 - P. \nRevenue equation: 20(50 - P) + 40P = 1500. \n1000 - 20P + 40P = 1500. \n20P = 500. \nP = 25. Therefore, 25 pants were sold (and 25 shirts).'
    },
    {
      id: 'tc-q6',
      text: 'A student\'s marks are given: Math (80/100), Science (X/150), English (70/100). If the overall percentage across all three subjects is 70%, what is X?',
      options: [
        { id: 'A', text: '90', isCorrect: false, explanation: 'Total marks = 100+150+100 = 350. Total scored = 80+90+70 = 240. 240/350 is not 70%.' },
        { id: 'B', text: '95', isCorrect: true, explanation: 'Total marks = 350. 70% of 350 = 245. 80 + 70 + X = 245. X = 95.' },
        { id: 'C', text: '105', isCorrect: false, explanation: 'Too high.' },
        { id: 'D', text: '100', isCorrect: false, explanation: 'Total scored = 250. 250/350 is not 70%.' }
      ],
      hint: 'Find the total maximum marks first. Then find what 70% of that total is.',
      explanation: 'Max total marks = 100 + 150 + 100 = 350. \nThe student\'s overall percentage is 70%. Total marks obtained = 70% of 350 = 245. \nMarks obtained in Math and English = 80 + 70 = 150. \nMarks needed in Science (X) = 245 - 150 = 95.'
    }
  ]
};

