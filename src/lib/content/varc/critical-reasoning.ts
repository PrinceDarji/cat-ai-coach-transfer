import { TopicContent } from '../types';

export const criticalReasoning: TopicContent = {
  id: 'va4',
  name: 'Critical Reasoning',
  section: 'varc',
  description: 'Master the logic behind arguments: identify premises, assumptions, and conclusions.',
  lessons: [
    {
      id: 'cr-1',
      title: 'Deconstructing an Argument',
      content: `### The Anatomy of Logic

In Critical Reasoning (CR), every argument is built on three pillars:
1. **Premise**: The facts, data, or evidence given. (Always assume the premise is 100% true).
2. **Conclusion**: The author's final claim or opinion.
3. **Assumption**: The unstated link that connects the premise to the conclusion.

*Example:* "John is eating a lot of carrots (Premise), therefore his eyesight will improve (Conclusion)." 
*Assumption*: Carrots improve eyesight.`
    },
    {
      id: 'cr-2',
      title: 'Strengthening and Weakening',
      content: `### Attack the Assumption!

Most CR questions ask you to either strengthen or weaken the author's argument.

**Rule of Thumb:** You never attack the premise. You attack the *assumption*.
To weaken the carrot argument, you don't say "John isn't eating carrots." You say "Recent studies show carrots have no effect on human eyesight." (Attacking the assumption).

To strengthen it, you validate the assumption: "Carrots contain high levels of Vitamin A, which repairs retinal damage."`
    },
    {
      id: 'cr-3',
      title: 'Identify the Flaw',
      content: `### Common Logical Fallacies

Watch out for these classic flaws in CR arguments:
- **Correlation vs. Causation**: Just because X happened before Y, doesn't mean X caused Y.
- **Percentage vs. Absolute Numbers**: "Our sales grew by 100%!" (Yeah, from $1 to $2).
- **Unrepresentative Sample**: Surveying 10 teenagers to conclude what "all Americans" think.
- **False Analogy**: Comparing two things that are fundamentally different.`
    },
    {
      id: 'cr-4',
      title: 'Inference in CR',
      content: `### What Must Be True?

Sometimes CR asks for an inference. Remember the rule from RC: A valid inference must be 100% undeniably true based *only* on the provided premises. Do not bring in outside knowledge, and do not make logical leaps. Stick strictly to the facts provided.`
    }
  ],
  practice: [
    {
      id: 'q-cr-1',
      text: `Read the following argument:
"Over the last five years, the city of Oakhaven has installed hundreds of new streetlights in the downtown district. During this same five-year period, the crime rate in the downtown district has dropped by 30%. Therefore, the installation of the new streetlights is responsible for the reduction in crime."

Which of the following, if true, most seriously weakens the argument?`,
      options: [
        { id: 'A', text: 'Streetlights in other neighborhoods of Oakhaven were also upgraded during this time.' },
        { id: 'B', text: 'Five years ago, Oakhaven doubled the size of its downtown police patrol unit.' },
        { id: 'C', text: 'The cost of installing the new streetlights was significantly higher than originally budgeted.' },
        { id: 'D', text: 'A survey showed that citizens feel safer walking in downtown Oakhaven at night.' }
      ],
      correctAnswer: 'B',
      hint: 'The author assumes that streetlights (X) caused the drop in crime (Y). How do you weaken a causation argument? Find an alternative cause.',
      explanation: 'The argument assumes a causal relationship (streetlights caused lower crime) based on a correlation. Option B introduces a massive alternative cause (doubling the police force) that occurred at the exact same time, severely weakening the claim that the streetlights were responsible.',
      wrongExplanations: {
        'A': 'What happened in other neighborhoods does not affect the specific correlation in the downtown district.',
        'C': 'The cost of the streetlights is irrelevant to whether or not they reduced crime.',
        'D': 'This actually strengthens the argument slightly by showing the streetlights had a positive effect on public perception.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-cr-2',
      text: `Read the following argument:
"To increase overall productivity, Megacorp is implementing a strict four-day workweek, mandating that all employees take Fridays off. The CEO argues that employees will be more rested and focused, allowing them to complete the same amount of work in 32 hours that they previously completed in 40 hours."

Which of the following is an assumption upon which the CEO's argument depends?`,
      options: [
        { id: 'A', text: 'Megacorp employees currently waste at least 8 hours a week on unproductive tasks.' },
        { id: 'B', text: 'A four-day workweek is becoming a popular trend among competing companies.' },
        { id: 'C', text: 'Employees will not use their extra day off to take on secondary part-time jobs.' },
        { id: 'D', text: 'The quality of the work produced will not decrease when employees are given less time to complete it.' }
      ],
      correctAnswer: 'D',
      hint: 'If you negate the correct assumption, the argument falls apart. What must be true for the plan to be considered a success?',
      explanation: 'The CEO assumes productivity (doing the same amount of work) will remain stable. However, if they do the work faster but with terrible quality, productivity hasn\'t truly been maintained. Therefore, the argument assumes (depends on the fact) that quality won\'t decrease when rushed.',
      wrongExplanations: {
        'A': 'They don\'t necessarily have to be wasting exactly 8 hours; they could simply work 20% faster overall when well-rested.',
        'B': 'What other companies do is irrelevant to whether the plan will mathematically work at Megacorp.',
        'C': 'Even if they take a part-time job, they could still be highly focused during their 32 hours at Megacorp. It is not an absolute requirement.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-cr-3',
      text: `Read the following argument:
"An advertising agency claims that its new television commercial for 'Sparkle' toothpaste is highly effective. As evidence, they point to a recent survey showing that 80% of consumers who bought Sparkle toothpaste last month recalled seeing the commercial."

Which of the following points out the most serious logical flaw in the agency's argument?`,
      options: [
        { id: 'A', text: 'It fails to consider how many people saw the commercial but did NOT buy the toothpaste.' },
        { id: 'B', text: 'It assumes that television is a more effective advertising medium than social media.' },
        { id: 'C', text: 'It ignores the possibility that the toothpaste was discounted during the month of the survey.' },
        { id: 'D', text: 'It relies on survey data, which is notoriously unreliable.' }
      ],
      correctAnswer: 'A',
      hint: 'Think about the sample pool. They only surveyed people who *already bought* the product. Is that proof the commercial worked?',
      explanation: 'The argument suffers from selection bias. They only asked buyers. If 10 million people saw the ad, and only 100 bought the toothpaste, the ad was actually a massive failure, even if 80 of those 100 buyers remember the ad. Option A points out this fatal mathematical flaw.',
      wrongExplanations: {
        'B': 'The argument makes no comparisons to social media; it only claims the TV ad is effective.',
        'C': 'While a discount is an alternative cause, Option A exposes a fundamental mathematical flaw in their primary evidence, making it the more serious logical error.',
        'D': 'You must accept the premises (the survey data) as true in CR. You cannot just call the evidence "unreliable."'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-cr-4',
      text: `Read the following argument:
"Because of the severe drought, the price of corn has risen by 40%. Since corn is a primary ingredient in many breakfast cereals, the retail price of these cereals is guaranteed to increase significantly in the next few months."

Which of the following, if true, most strengthens the argument?`,
      options: [
        { id: 'A', text: 'Consumers generally refuse to buy breakfast cereal if the price increases by more than 10%.' },
        { id: 'B', text: 'Cereal manufacturers operate on very thin profit margins and cannot absorb increased ingredient costs.' },
        { id: 'C', text: 'The price of wheat and oats, alternative cereal ingredients, has remained stable.' },
        { id: 'D', text: 'The drought is expected to end within the next two months.' }
      ],
      correctAnswer: 'B',
      hint: 'The author assumes that increased ingredient costs will definitely be passed onto the consumer. What if the manufacturer just eats the cost?',
      explanation: 'The argument assumes that an increase in production cost (corn) will result in an increase in retail price. Option B strengthens this by stating manufacturers have "thin profit margins," meaning they *must* pass the cost to the consumer because they cannot afford to absorb it.',
      wrongExplanations: {
        'A': 'This weakens the argument by suggesting manufacturers might *avoid* raising prices to prevent losing all their customers.',
        'C': 'This weakens the argument. If alternative ingredients are cheap, manufacturers might just switch to wheat/oats, keeping prices stable.',
        'D': 'This weakens the argument by suggesting the corn shortage (and price spike) will be short-lived.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-cr-5',
      text: `Read the following facts:
1. All members of the chess club are honors students.
2. Some members of the debate team are members of the chess club.
3. No honors students are failing a class.

If the statements above are true, which of the following MUST be true?`,
      options: [
        { id: 'A', text: 'All members of the debate team are honors students.' },
        { id: 'B', text: 'Some members of the debate team are not failing any classes.' },
        { id: 'C', text: 'No members of the debate team are failing a class.' },
        { id: 'D', text: 'Some honors students are not on the debate team.' }
      ],
      correctAnswer: 'B',
      hint: 'Map it out: Debate Team overlap with Chess Club. Chess Club entirely inside Honors. Honors entirely outside Failing.',
      explanation: 'Since some debate members are chess members, and ALL chess members are honors students, then some debate members are honors students. Since NO honors students are failing, those specific debate members cannot be failing. Therefore, some members of the debate team are not failing any classes.',
      wrongExplanations: {
        'A': 'We only know that *some* debate members are in the chess club (and thus honors). We don\'t know about all of them.',
        'C': 'Some debate members might not be in the chess club, not be honors students, and could be failing a class.',
        'D': 'While likely, it doesn\'t *have* to be true. The chess club and debate team could theoretically contain the exact same group of honors students.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-cr-6',
      text: `Read the following argument:
"A recent medical study found that people who drink three cups of green tea a day have a 25% lower risk of developing heart disease compared to those who drink no green tea. The researchers concluded that the antioxidants in green tea actively protect the heart."

Which of the following, if true, provides the strongest alternative explanation for the study's findings?`,
      options: [
        { id: 'A', text: 'Black tea contains similar antioxidants but was not included in the study.' },
        { id: 'B', text: 'People who drink green tea regularly are statistically more likely to engage in daily cardiovascular exercise and maintain a healthy diet.' },
        { id: 'C', text: 'The study was funded by a consortium of green tea manufacturers.' },
        { id: 'D', text: 'Drinking more than five cups of green tea a day can lead to caffeine-induced heart palpitations.' }
      ],
      correctAnswer: 'B',
      hint: 'Look for the classic "Correlation vs. Causation" flaw. What else could cause the heart health of the tea drinkers?',
      explanation: 'The researchers assume green tea caused the health benefits. Option B introduces a major alternative cause: healthy lifestyle habits. If green tea drinkers also exercise and eat well, *those* habits could be causing the lower heart disease risk, not the tea itself.',
      wrongExplanations: {
        'A': 'The absence of black tea in the study does not explain why the green tea drinkers had healthier hearts.',
        'C': 'While this raises suspicion of bias, it does not provide a biological *alternative explanation* for the actual medical findings of the study.',
        'D': 'This talks about a negative effect of a high dosage (5 cups), which is irrelevant to the positive findings at the 3-cup dosage.'
      },
      difficulty: 'easy'
    }
  ]
};

