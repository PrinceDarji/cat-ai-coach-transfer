import { TopicContent } from '../types';

export const graphsCharts: TopicContent = {
  id: 'd2',
  name: 'Bar Graphs & Pie Charts',
  section: 'lrdi',
  lessons: [
    {
      id: 'gc-1',
      title: 'Visualizing Data',
      content: `### Why Graphs?
While tables just show you raw numbers, graphs give you a visual representation. You can often skip complex calculations by just *looking* at the graph!

If a question asks "In which year was the revenue highest?", and it's a bar graph, don't calculate the exact value for each bar. Just look for the tallest bar.`
    },
    {
      id: 'gc-2',
      title: 'Mastering Bar Graphs',
      content: `### Reading the Bars
* **Simple Bar Graph**: One bar per category.
* **Grouped Bar Graph**: Multiple bars clustered together (e.g., Revenue and Cost for each year side-by-side). Good for comparing two variables directly.
* **Stacked Bar Graph**: A single bar divided into segments. The total height represents the total value. To find the value of a middle segment, you must subtract its bottom value from its top value on the Y-axis!

> **Common Trap**: Assuming the width of the bar means something. In standard bar graphs, only the *height* matters.`
    },
    {
      id: 'gc-3',
      title: 'Decoding Pie Charts',
      content: `### The Circle of Data
A pie chart represents 100% of a quantity, divided into slices. 

**Angles vs Percentages:**
A full circle is 360 degrees. It is also 100%. 
Therefore, 1% = 3.6 degrees.

If a slice (e.g., "Food expenses") has an angle of 90 degrees, it represents 90 / 3.6 = 25% of the total. (Or just recognize that 90 is 1/4 of 360, so it's 25%).`
    },
    {
      id: 'gc-4',
      title: 'Combination Charts',
      content: `### Double the Trouble
CAT loves to give you two charts at once.
Example: A Pie Chart showing the total number of students in different schools, and a Bar Graph showing the percentage of girls in each school.

**How to solve:**
1. Understand the connection. The total from Chart 1 is the base for Chart 2.
2. Do not combine them in your head. Write down a mini-table linking the data before you tackle the questions.`
    }
  ],
  practice: [
    {
      id: 'gc-q1',
      text: 'A pie chart shows the market share of 4 phone brands. Apple is 120 degrees. Samsung is 90 degrees. OnePlus is 60 degrees. What percentage of the market does the 4th brand (Xiaomi) hold?',
      options: [
        { id: 'A', text: '90%', isCorrect: false, explanation: 'Degrees are not percentages.' },
        { id: 'B', text: '25%', isCorrect: true, explanation: 'Let\'s find the remaining degrees. 360 - 120 - 90 - 60 = 90 degrees. 90 degrees is 1/4 of a circle, which is 25%.' },
        { id: 'C', text: '30%', isCorrect: false, explanation: 'Incorrect conversion.' },
        { id: 'D', text: '20%', isCorrect: false, explanation: 'Incorrect conversion.' }
      ],
      hint: 'A full circle is 360 degrees. Find the remaining degrees, then convert to percentage.',
      explanation: 'Total degrees = 360. Sum of known brands = 120 + 90 + 60 = 270 degrees. \nRemaining for Xiaomi = 360 - 270 = 90 degrees. \nTo convert degrees to percentage: (90 / 360) * 100 = 1/4 * 100 = 25%.'
    },
    {
      id: 'gc-q2',
      text: 'A stacked bar graph for Year 2020 has a total height of 500 (Total Sales). The bottom segment (Region A) goes from 0 to 150. The middle segment (Region B) goes from 150 to 350. The top segment is Region C. What are the sales for Region B?',
      options: [
        { id: 'A', text: '150', isCorrect: false, explanation: 'That is Region A\'s sales.' },
        { id: 'B', text: '350', isCorrect: false, explanation: 'That is the cumulative sales of A and B.' },
        { id: 'C', text: '200', isCorrect: true, explanation: 'Region B\'s segment starts at 150 and ends at 350. The height of the segment is 350 - 150 = 200.' },
        { id: 'D', text: '500', isCorrect: false, explanation: 'That is the total.' }
      ],
      hint: 'In a stacked bar, the value of a segment is its Top Y-value minus its Bottom Y-value.',
      explanation: 'Region A is 150 - 0 = 150. \nRegion B starts on top of A at 150 and ends at 350. Its value is 350 - 150 = 200. \nRegion C is 500 - 350 = 150. \nThe question asks for Region B, which is 200.'
    },
    {
      id: 'gc-q3',
      text: 'Chart 1 (Pie): Total population of a city is 100,000. North zone = 30%. Chart 2 (Table): Ratio of Males to Females in North zone is 3:2. How many females are in the North zone?',
      options: [
        { id: 'A', text: '12,000', isCorrect: true, explanation: 'North zone pop = 30,000. Females = 2/5 of 30,000 = 12,000.' },
        { id: 'B', text: '18,000', isCorrect: false, explanation: 'That is the number of males (3/5 of 30,000).' },
        { id: 'C', text: '20,000', isCorrect: false, explanation: 'Incorrect fraction.' },
        { id: 'D', text: '30,000', isCorrect: false, explanation: 'That is the total North zone population.' }
      ],
      hint: 'First find the total population of the North zone. Then apply the ratio.',
      explanation: 'North zone population = 30% of 100,000 = 30,000. \nRatio of M:F = 3:2 (Total 5 parts). \nFemales = 2 parts out of 5 = (2/5) * 30,000 = 12,000.'
    },
    {
      id: 'gc-q4',
      text: 'A bar graph shows Profit of a company. 2018: 40k. 2019: 60k. 2020: 50k. 2021: 80k. In which year was the percentage increase in profit the highest from the previous year?',
      options: [
        { id: 'A', text: '2019', isCorrect: false, explanation: 'Increase is 20k over 40k = 50%.' },
        { id: 'B', text: '2020', isCorrect: false, explanation: 'Profit decreased in 2020.' },
        { id: 'C', text: '2021', isCorrect: true, explanation: 'Increase is 30k over 50k = 60%. 60% > 50%.' },
        { id: 'D', text: 'Both 2019 and 2021', isCorrect: false, explanation: 'The percentages are different.' }
      ],
      hint: 'Calculate (Increase / Previous Year Profit) * 100 for each year.',
      explanation: 'Growth in 2019 = (60 - 40)/40 = 20/40 = 50%. \nGrowth in 2020 = Negative (decreased). \nGrowth in 2021 = (80 - 50)/50 = 30/50 = 60%. \nThe highest percentage increase is in 2021.'
    },
    {
      id: 'gc-q5',
      text: 'If a pie chart has 5 equal slices, what is the central angle of each slice?',
      options: [
        { id: 'A', text: '72 degrees', isCorrect: true, explanation: '360 / 5 = 72.' },
        { id: 'B', text: '60 degrees', isCorrect: false, explanation: 'That would be 6 equal slices.' },
        { id: 'C', text: '90 degrees', isCorrect: false, explanation: 'That would be 4 equal slices.' },
        { id: 'D', text: '20 degrees', isCorrect: false, explanation: 'That would be 18 equal slices (or confused with 20%).' }
      ],
      hint: 'A full circle is 360 degrees. Divide it equally.',
      explanation: 'Total degrees = 360. 5 equal slices means 360 / 5 = 72 degrees each. (Also, 1/5 = 20%, and 20% of 360 is 72 degrees).'
    },
    {
      id: 'gc-q6',
      text: 'A company\'s expenses are shown in a pie chart. If "Marketing" is a 54-degree sector and the company spent $30,000 on Marketing, what is the total expense of the company?',
      options: [
        { id: 'A', text: '$150,000', isCorrect: false, explanation: 'Check the conversion.' },
        { id: 'B', text: '$180,000', isCorrect: false, explanation: 'Check the math.' },
        { id: 'C', text: '$200,000', isCorrect: true, explanation: '54 degrees is 54/360 = 15%. If 15% = 30k, Total = 30k / 0.15 = 200k.' },
        { id: 'D', text: '$300,000', isCorrect: false, explanation: 'Incorrect calculation.' }
      ],
      hint: 'Find out what fraction of the total 54 degrees represents. (54 / 360)',
      explanation: 'Fraction of total = 54 / 360 = 3 / 20 = 15%. \nSo, 15% of Total = $30,000. \nTotal = ($30,000 * 100) / 15 = $2,000 * 100 = $200,000.'
    }
  ]
};

