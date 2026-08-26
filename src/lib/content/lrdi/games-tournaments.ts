import { TopicContent } from '../types';

export const gamesTournaments: TopicContent = {
  id: 'm1',
  name: 'Games & Tournaments',
  section: 'lrdi',
  lessons: [
    {
      id: 'gt-1',
      title: 'Welcome to the Arena',
      content: `### Sports Logistics
Games and Tournaments sets are entirely logic-based puzzles disguised as sports. You don't need to be a sports fan to solve them, but you do need to understand the tournament structures.

There are two main types of tournaments tested in CAT:
1. **Knockout Tournaments** (like Wimbledon tennis)
2. **Round-Robin Tournaments** (like the IPL league stage)`
    },
    {
      id: 'gt-2',
      title: 'Knockout Tournaments',
      content: `### Win or Go Home
In a knockout tournament, if you lose a match, you are eliminated immediately.

**Key Formulas for Knockouts:**
* If there are N players, how many matches are played in total to find a single winner?
  * **Answer: N - 1 matches.** (Why? Because to get 1 winner, you must eliminate N-1 players. Each match eliminates exactly 1 player!)
* **Seeding**: Players are ranked (1 is best, N is worst). In standard knockouts, the best player plays the worst player in the first round (1 plays N, 2 plays N-1, etc.).`
    },
    {
      id: 'gt-3',
      title: 'Round-Robin Tournaments',
      content: `### Everyone Plays Everyone
In a Round-Robin, every team plays against every other team exactly once.

**Key Formulas for Round-Robins:**
* If there are N teams, how many total matches are played?
  * **Answer: N Ã— (N - 1) / 2 matches.** (This is the combination formula nC2, because choosing 2 teams makes 1 match).
* If a team plays everyone else, how many matches does one specific team play?
  * **Answer: N - 1 matches.**`
    },
    {
      id: 'gt-4',
      title: 'Points Tables and Rankings',
      content: `### Decoding the Standings
Usually, you'll be given a partially filled points table.
* Win = 2 points, Draw = 1 point, Loss = 0 points.

**Core strategy:**
Total matches played by a team = Wins + Losses + Draws.
Total matches in the whole tournament = Total Wins + (Total Draws / 2). (Because every match must have a winner/loser OR result in two draws).

If team A has 6 points from 3 matches, they MUST have won all 3. Use extreme cases like this as your anchor points!`
    }
  ],
  practice: [
    {
      id: 'gt-q1',
      text: 'In a knockout tennis tournament, there are 64 players. How many matches in total must be played to decide the final champion?',
      options: [
        { id: 'A', text: '63', isCorrect: true, explanation: 'To get 1 champion, you must eliminate 63 players. One match = one elimination. So 63 matches.' },
        { id: 'B', text: '64', isCorrect: false, explanation: 'That would eliminate everyone.' },
        { id: 'C', text: '32', isCorrect: false, explanation: 'That\'s just the number of matches in the first round.' },
        { id: 'D', text: '127', isCorrect: false, explanation: 'Formula is N-1.' }
      ],
      hint: 'Every match eliminates exactly one player. How many people need to be eliminated?',
      explanation: 'In a knockout, every match produces exactly one loser, who is eliminated. Since we start with 64 players and want exactly 1 champion, we must eliminate 64 - 1 = 63 players. Therefore, 63 matches are needed.'
    },
    {
      id: 'gt-q2',
      text: 'In a round-robin tournament with 6 teams, where every team plays every other team once, how many matches are played in total?',
      options: [
        { id: 'A', text: '12', isCorrect: false, explanation: 'Incorrect.' },
        { id: 'B', text: '15', isCorrect: true, explanation: 'Using the formula N(N-1)/2. 6 * 5 / 2 = 15.' },
        { id: 'C', text: '30', isCorrect: false, explanation: 'That is if they play each other TWICE (home and away).' },
        { id: 'D', text: '36', isCorrect: false, explanation: 'That is N^2.' }
      ],
      hint: 'Use the formula N Ã— (N - 1) / 2.',
      explanation: 'Every team plays every other team once. Number of teams N = 6. Matches = 6C2 = (6 Ã— 5) / 2 = 15 matches.'
    },
    {
      id: 'gt-q3',
      text: 'In a tournament of 4 teams (A, B, C, D) playing a round-robin format, a win gives 3 points, a draw 1 point, and a loss 0 points. Team A finished with 9 points. Which of the following is definitely true?',
      options: [
        { id: 'A', text: 'Team A drew one match.', isCorrect: false, explanation: 'If they drew, they would get 1 pt. 9 cannot be formed with a draw in 3 matches.' },
        { id: 'B', text: 'Team A won all its matches.', isCorrect: true, explanation: 'There are 3 matches. 3 wins = 3 x 3 = 9 pts.' },
        { id: 'C', text: 'Team B lost all its matches.', isCorrect: false, explanation: 'We don\'t know B\'s performance against C and D.' },
        { id: 'D', text: 'Team C drew against Team D.', isCorrect: false, explanation: 'We have no info on C and D.' }
      ],
      hint: 'How many matches does one team play in a 4-team round robin? How can you make exactly 9 points?',
      explanation: 'In a 4-team round-robin, each team plays N-1 = 3 matches. \nThe maximum points a team can score is 3 wins Ã— 3 points = 9 points. \nSince Team A has 9 points, they MUST have won all 3 of their matches.'
    },
    {
      id: 'gt-q4',
      text: 'In a knockout tournament of 16 players, the players are seeded from 1 to 16. In the first round, Seed 1 plays Seed 16, Seed 2 plays Seed 15, etc. If there are no upsets (the better seed always wins), who will Seed 1 play in the Semifinals?',
      options: [
        { id: 'A', text: 'Seed 2', isCorrect: false, explanation: 'Seed 1 and Seed 2 are placed in opposite halves of the draw so they only meet in the Final.' },
        { id: 'B', text: 'Seed 3', isCorrect: false, explanation: 'Seed 3 meets Seed 2 in the Semifinals.' },
        { id: 'C', text: 'Seed 4', isCorrect: true, explanation: 'Seed 1 plays 16. Seed 8 plays 9. Winner 1 plays Winner 8. (Quarterfinal). Seed 4 plays 13, Seed 5 plays 12. Winner 4 plays Winner 5. (Quarterfinal). Winner 1 plays Winner 4 in Semifinals.' },
        { id: 'D', text: 'Seed 8', isCorrect: false, explanation: 'Seed 1 plays Seed 8 in the Quarterfinals.' }
      ],
      hint: 'In any match, the sum of the seeds of the expected opponents is constant. For 16 players, R1 sum = 17. For QF (8 players), sum = 9. For SF (4 players), sum = 5.',
      explanation: 'Let\'s trace Seed 1\'s path. \nRound 1 (16 players): The sum of seeds playing each other is 17. Seed 1 plays 16. \nQuarterfinals (8 players remaining, seeds 1 to 8): The sum of seeds playing is 9. Seed 1 plays Seed 8. \nSemifinals (4 players remaining, seeds 1, 2, 3, 4): The sum of seeds playing is 5. Seed 1 plays Seed 4. \nFinals: Seed 1 plays Seed 2. \nThus, in the Semifinals, Seed 1 plays Seed 4.'
    },
    {
      id: 'gt-q5',
      text: 'In a chess tournament, every player plays every other player once. A total of 45 games were played. How many players participated?',
      options: [
        { id: 'A', text: '9', isCorrect: false, explanation: '9*8/2 = 36.' },
        { id: 'B', text: '10', isCorrect: true, explanation: '10*9/2 = 45.' },
        { id: 'C', text: '11', isCorrect: false, explanation: '11*10/2 = 55.' },
        { id: 'D', text: '12', isCorrect: false, explanation: '12*11/2 = 66.' }
      ],
      hint: 'Solve N Ã— (N - 1) / 2 = 45.',
      explanation: 'Total matches = N(N - 1) / 2 = 45. \nN(N - 1) = 90. \nWhat two consecutive numbers multiply to 90? 10 and 9. \nSo N = 10. There were 10 players.'
    },
    {
      id: 'gt-q6',
      text: 'A football group has 4 teams. Win = 3 points, Draw = 1, Loss = 0. What is the MINIMUM number of points a team needs to guarantee they finish in the top 2 (and advance to the next round)?',
      options: [
        { id: 'A', text: '6', isCorrect: false, explanation: '3 teams could all finish with 6 points (each winning 2 and losing 1), and one could be eliminated on goal difference.' },
        { id: 'B', text: '7', isCorrect: true, explanation: 'If a team has 7 points (2 wins, 1 draw), they cannot finish 3rd. Let\'s verify in explanation.' },
        { id: 'C', text: '5', isCorrect: false, explanation: 'Too low.' },
        { id: 'D', text: '9', isCorrect: false, explanation: '9 is the maximum possible, but not the minimum required to *guarantee* advancement.' }
      ],
      hint: 'Think of the worst-case scenario where multiple teams get high scores. Can 3 teams get 6 points? Yes. Can 3 teams get 7 points?',
      explanation: 'Total matches in a 4-team group = 6. Total points distributed per match is 3 (for a win) or 2 (for a draw). Max total points = 18. \nCould 3 teams get 6 points? Yes (A beats B, B beats C, C beats A, and all beat D). In this case, a team with 6 points might finish 3rd on tiebreakers. \nCould 3 teams get 7 points? 7 points requires 2 wins, 1 draw. If teams A, B, C all have 7 points, they each have 2 wins and 1 draw. That means A, B, C must have drawn with each other. But they only play each other once! If A draws B, B draws C, C draws A... then A has 2 draws! They can\'t have 2 wins and 1 draw. Thus, it\'s impossible for 3 teams to get 7 points. If you get 7 points, you are guaranteed top 2.'
    }
  ]
};

