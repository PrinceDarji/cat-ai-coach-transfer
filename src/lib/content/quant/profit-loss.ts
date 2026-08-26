import { TopicContent } from '../types';

export const profitLoss: TopicContent = {
  id: 'q2',
  name: 'Profit & Loss',
  section: 'quant',
  lessons: [
    {
      title: 'The Core Terms',
      content: `### Cost Price, Selling Price, Profit and Loss
Let's keep it simple:
- **Cost Price (CP):** The price at which you *buy* an item.
- **Selling Price (SP):** The price at which you *sell* the item.

If you sell it for more than you bought it ($SP > CP$), you make a **Profit**.
> $\\text{Profit} = SP - CP$

If you sell it for less than you bought it ($SP < CP$), you take a **Loss**.
> $\\text{Loss} = CP - SP$`
    },
    {
      title: 'Calculating Profit% and Loss%',
      content: `### The Golden Rule
Profit and Loss percentages are **always** calculated on the Cost Price (CP), unless explicitly stated otherwise. Think of CP as your base investment.

> $\\text{Profit}\\% = \\frac{\\text{Profit}}{CP} \\times 100$
> $\\text{Loss}\\% = \\frac{\\text{Loss}}{CP} \\times 100$

**Example:**
Buy a toy for â‚¹200. Sell it for â‚¹250.
Profit = $250 - 200 = â‚¹50$.
Profit% = $\\frac{50}{200} \\times 100 = 25\\%$.`
    },
    {
      title: 'Marked Price and Discount',
      content: `### Retail Trickery
Shops don't just show you the CP. They put a price tag on the itemâ€”this is the **Marked Price (MP)**. Then, they offer you a "Discount" to make you feel good.

- **Discount** is always calculated on the **Marked Price (MP)**.
> $\\text{Discount} = MP - SP$
> $\\text{Discount}\\% = \\frac{\\text{Discount}}{MP} \\times 100$

**The Journey of an Item:**
$CP \\xrightarrow{+\\text{Markup}\\%} MP \\xrightarrow{-\\text{Discount}\\%} SP$`
    },
    {
      title: 'Successive Discounts',
      content: `### "50% + 50% Off" does NOT mean FREE
When a store offers successive discounts, the second discount is applied to the already discounted price, NOT the original price.

If discounts are $a\\%$ and $b\\%$, the net discount is NOT $(a+b)\\%$.
You can use the successive percentage formula (treating discounts as negative percentages):
> $\\text{Net Discount}\\% = a + b - \\frac{ab}{100}$

**Example:**
Two successive discounts of 20% and 10% on an item of â‚¹100.
100 -20%-> 80.
80 -10%-> 72.
Total discount is â‚¹28, which is a 28% net discount, not 30%! `
    },
    {
      title: 'The Dishonest Dealer',
      content: `### Cheating Weights
A classic CAT scenario. A shopkeeper claims to sell items at Cost Price but uses a faulty weight (e.g., 900g instead of 1000g).

**The Logic:**
He gets money for 1000g, but his actual cost is only for 900g.
Profit is based on the *actual goods delivered*.

Let 1g cost â‚¹1.
SP = Money taken = â‚¹1000
CP = Goods given out = â‚¹900
Profit = 100.
Profit% = $(100/900) \\times 100 = 11.11\\%$.`
    }
  ],
  practice: [
    {
      id: 'q2_1',
      text: 'A man buys an article for â‚¹300 and sells it at a loss of 20%. What is the selling price of the article?',
      options: ['â‚¹240', 'â‚¹280', 'â‚¹260', 'â‚¹220'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Loss is calculated on the Cost Price.',
      explanation: 'CP = â‚¹300. Loss% = 20%. \nLoss = 20% of 300 = 0.20 * 300 = â‚¹60. \nSP = CP - Loss = 300 - 60 = â‚¹240. \nAlternatively, SP = 80% of CP = 0.8 * 300 = â‚¹240.',
      wrongExplanations: [
        '',
        'Calculation error.',
        'Subtracted 40 instead of 60.',
        'Too low, subtracted 80.'
      ]
    },
    {
      id: 'q2_2',
      text: 'A shopkeeper marks his goods 25% above the cost price and allows a discount of 10% on the marked price. Find his gain or loss percentage.',
      options: ['12.5% gain', '15% gain', '10% gain', '12.5% loss'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Assume CP = 100. Follow the journey: CP -> MP -> SP.',
      explanation: 'Let CP = 100. \nHe marks it up by 25%. So MP = 125. \nDiscount is 10% on MP. Discount = 10% of 125 = 12.5. \nSP = MP - Discount = 125 - 12.5 = 112.5. \nSince SP > CP, it\'s a profit. Profit = 112.5 - 100 = 12.5. \nProfit% = 12.5%.',
      wrongExplanations: [
        '',
        'Simply subtracted 10% from 25%, forgetting the base changes.',
        'Calculated 10% on 150 instead of 125.',
        'Misinterpreted profit as loss.'
      ]
    },
    {
      id: 'q2_3',
      text: 'By selling an article for â‚¹800, a merchant makes a profit of 25%. If he sells it for â‚¹704, what will be his profit or loss percentage?',
      options: ['10% profit', '10% loss', '12% profit', '8% profit'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'First, find the Cost Price using the initial SP and Profit%.',
      explanation: 'Let CP = x. Profit = 25%. So SP = 1.25x.\nGiven SP = 800. \n1.25x = 800 => x = 800 / 1.25 = 640. \nSo, CP = â‚¹640.\nNew SP = â‚¹704. \nProfit = 704 - 640 = 64.\nProfit% = (64 / 640) * 100 = 10%.',
      wrongExplanations: [
        '',
        'Calculated based on a wrong CP.',
        'Used 800 as the base for the new calculation.',
        'Calculated based on 800 instead of 640.'
      ]
    },
    {
      id: 'q2_4',
      text: 'A dishonest dealer claims to sell his goods at the cost price but uses a weight of 800 grams for a kg. What is his profit percentage?',
      options: ['20%', '25%', '30%', '33.33%'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'His CP is for the 800g he actually gives, while his SP is for the 1000g he charges for.',
      explanation: 'Let the price of 1 gram be â‚¹1. \nHe charges the customer for 1000g, so SP = â‚¹1000.\nHe actually gives only 800g, so his cost is CP = â‚¹800.\nProfit = 1000 - 800 = â‚¹200. \nProfit% = (Profit / CP) * 100 = (200 / 800) * 100 = 25%.',
      wrongExplanations: [
        'Calculated profit on 1000g instead of the actual goods given (800g).',
        '',
        'Random error.',
        'Confused with 3/4 fraction.'
      ]
    },
    {
      id: 'q2_5',
      text: 'Find the single discount equivalent to two successive discounts of 20% and 15%.',
      options: ['35%', '32%', '28%', '30%'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Use the formula a + b - (ab/100) or assume the initial price is 100.',
      explanation: 'Using the formula: Net Discount = a + b - (ab/100) = 20 + 15 - (20*15)/100 = 35 - 3 = 32%. \nAlternatively, Let initial price = 100. \nAfter 20% discount = 80. \nAfter 15% discount on 80 = 80 - (0.15*80) = 80 - 12 = 68. \nTotal discount = 100 - 68 = 32%.',
      wrongExplanations: [
        'Simply added the two discounts (20+15). This is a common mistake!',
        '',
        'Subtracted 7 instead of 3.',
        'Miscalculation.'
      ]
    },
    {
      id: 'q2_6',
      text: 'A shopkeeper bought two watches for â‚¹3000 each. He sold one at a 10% profit and the other at a 10% loss. What is his overall profit or loss percentage?',
      options: ['1% loss', '1% profit', 'No profit no loss', '2% loss'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'If Cost Prices are the same, and profit% equals loss%, the net result is zero.',
      explanation: 'Total CP = 3000 + 3000 = â‚¹6000.\nSP of first watch (10% profit) = 3000 + 300 = â‚¹3300.\nSP of second watch (10% loss) = 3000 - 300 = â‚¹2700.\nTotal SP = 3300 + 2700 = â‚¹6000.\nSince Total CP = Total SP, there is no profit or loss.\n*Note: Do not confuse this with the case where Selling Prices are identical, which results in a net loss of (x^2/100)%*.',
      wrongExplanations: [
        'This would be true if the SELLING prices were the same (using x^2/100 formula).',
        'Confused with successive changes formula.',
        '',
        'Calculation error.'
      ]
    }
  ]
};

