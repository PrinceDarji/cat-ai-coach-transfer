import { TopicContent } from '../types';

export const inference: TopicContent = {
  id: 'v2',
  name: 'Inference Based',
  section: 'varc',
  description: 'Master the art of reading between the lines without bringing in outside knowledge.',
  lessons: [
    {
      id: 'inf-1',
      title: 'What is an Inference?',
      content: `### Reading Between the Lines

An inference is a conclusion that is **not explicitly stated** in the text, but is **logically derived** from the facts that *are* stated. 

If the passage says: *"The ground is wet, the sky is grey, and people are carrying umbrellas."*
- **Explicit Fact**: People are carrying umbrellas.
- **Valid Inference**: It has been raining.

**The Golden Rule of CAT Inferences:**
A valid inference must be 100% undeniably true based *only* on the passage. If you have to use outside knowledge to prove it, it's wrong.`
    },
    {
      id: 'inf-2',
      title: 'Inference vs. Assumption',
      content: `### Know the Difference

Many students confuse inferences with assumptions. 

- **Assumption**: An unstated premise that *must be true* for the author's argument to work. (It comes *before* the conclusion).
- **Inference**: A logical consequence that *must be true* because of what the author stated. (It comes *after* the facts).

For inference questions, you are acting as a detective looking at the evidence (the passage) and figuring out what else must be true.`
    },
    {
      id: 'inf-3',
      title: 'Validating with Evidence',
      content: `### The "Point to It" Test

When evaluating an inference option, use the "Point to It" test. 

Can you point to a specific sentence or set of sentences in the passage that logically forces this inference to be true? If the answer is "no, but it makes sense," you are likely falling into a trap.

Always trace your inference back to explicit evidence in the text.`
    },
    {
      id: 'inf-4',
      title: 'Common Traps in Inference Questions',
      content: `### Watch Your Step!

Test-makers love to trick you with these common traps:

1. **The "Real World" Trap**: The option is factually true in the real world, but wasn't mentioned or implied in the passage.
2. **The Extreme Word Trap**: The option uses words like *always*, *never*, *all*, or *none* when the passage only used *sometimes*, *rarely*, or *some*.
3. **The "Too Far" Trap**: The option takes a logical leap that is plausible but not strictly necessary based on the text.

Remember: A boring, safe inference is usually the correct one.`
    }
  ],
  practice: [
    {
      id: 'q-inf-1',
      text: `Read the following excerpt:
"Unlike its competitor, Brand X, which spends millions annually on television advertising, our company relies entirely on word-of-mouth marketing and social media engagement. This approach has allowed us to keep our product prices 20% lower than Brand X's while maintaining a similar profit margin per unit sold."

What can be logically inferred from this passage?`,
      options: [
        { id: 'A', text: 'Television advertising is an ineffective way to market products.' },
        { id: 'B', text: 'Word-of-mouth marketing is cheaper than television advertising.' },
        { id: 'C', text: 'The company\'s product is of higher quality than Brand X\'s product.' },
        { id: 'D', text: 'Brand X is losing market share to the author\'s company.' }
      ],
      correctAnswer: 'B',
      hint: 'If profit margins are similar but prices are 20% lower, where are the cost savings coming from?',
      explanation: 'The passage states that the company has lower prices but similar profit margins because they use word-of-mouth instead of expensive TV ads. This mathematically implies that their marketing costs (word-of-mouth) are lower than Brand X\'s marketing costs (TV).',
      wrongExplanations: {
        'A': 'The passage says nothing about the effectiveness of TV ads, only that they cost millions.',
        'C': 'There is no information given about the relative quality of the products.',
        'D': 'There is no data provided about market share or sales volume, only profit margin per unit.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-inf-2',
      text: `Read the following excerpt:
"During the Victorian era, the application of toxic arsenic in green dyes was incredibly popular for dresses, wallpaper, and artificial flowers. Despite growing medical reports linking the dye to skin lesions and respiratory failure among factory workers, consumer demand remained high for decades. It wasn't until a highly publicized incident involving a high-society lady fainting at a ball that the public began to view the 'emerald green' with suspicion."

It can be inferred from the passage that:`,
      options: [
        { id: 'A', text: 'Victorian factory workers lacked the political power to improve their working conditions.' },
        { id: 'B', text: 'Medical reports in the Victorian era were generally ignored by the public.' },
        { id: 'C', text: 'The suffering of factory workers was less influential on public opinion than an incident involving a wealthy individual.' },
        { id: 'D', text: 'Arsenic was eventually banned for use in dyes and consumer goods.' }
      ],
      correctAnswer: 'C',
      hint: 'Compare the public\'s reaction to the factory workers\' illness versus the high-society lady\'s incident.',
      explanation: 'The passage states that demand remained high despite medical reports about dying workers, but suspicion grew after a high-society lady fainted. This logically implies that the upper-class incident swayed public opinion more than the workers\' suffering.',
      wrongExplanations: {
        'A': 'While likely true historically, it goes too far beyond the text. The passage mentions medical reports, not political power.',
        'B': 'This is too extreme ("generally ignored"). We only know they ignored reports specifically about this green dye.',
        'D': 'This is the "Real World" trap. Arsenic was banned eventually in reality, but the passage ends only with the public viewing it with "suspicion," not a ban.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-inf-3',
      text: `Read the following excerpt:
"The introduction of the cane toad to Australia in 1935 to control the cane beetle population is a textbook example of a biological control gone wrong. The toads, lacking natural predators and possessing highly toxic skin glands, ignored the beetles entirely. Instead, they reproduced exponentially and devastated local fauna, outcompeting native amphibians and poisoning predators that attempted to eat them."

Which of the following can be inferred about the scientists who introduced the cane toad?`,
      options: [
        { id: 'A', text: 'They did not anticipate that the cane toad would lack natural predators in Australia.' },
        { id: 'B', text: 'They were unaware that the cane toad possessed highly toxic skin glands.' },
        { id: 'C', text: 'They failed to adequately study the dietary habits of the cane toad before introducing it.' },
        { id: 'D', text: 'They deliberately ignored warnings from ecologists about the dangers of invasive species.' }
      ],
      correctAnswer: 'C',
      hint: 'Why did they introduce the toad? What did the toad actually do?',
      explanation: 'They introduced the toad to eat cane beetles, but the passage states the toads "ignored the beetles entirely." This logically implies that whoever introduced them was wrong about what the toads would eat, meaning they failed to adequately study their dietary habits.',
      wrongExplanations: {
        'A': 'It is possible they knew there were no predators but thought the toads would only eat beetles and die out. We cannot infer they didn\'t anticipate it, only that it happened.',
        'B': 'We cannot infer they were unaware of the poison; they might have known but deemed it an acceptable risk to kill the beetles.',
        'D': 'There is no mention of warnings from ecologists in the text. This is out of scope.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-inf-4',
      text: `Read the following excerpt:
"Classical economics relies heavily on the concept of 'Homo economicus'â€”a theoretical human who always acts rationally to maximize their own self-interest. However, behavioral economics has demonstrated through numerous experiments that real humans are prone to cognitive biases. For instance, people consistently assign higher value to an object they already own compared to an identical object they do not own, a phenomenon known as the endowment effect."

Based on the passage, what would a proponent of classical economics most likely predict about the endowment effect?`,
      options: [
        { id: 'A', text: 'They would predict that the endowment effect only applies to expensive items.' },
        { id: 'B', text: 'They would argue that the endowment effect is a rational strategy for minimizing loss.' },
        { id: 'C', text: 'They would deny that the endowment effect exists in a perfectly free market.' },
        { id: 'D', text: 'They would not predict the endowment effect, as it violates the assumption of rational valuation.' }
      ],
      correctAnswer: 'D',
      hint: 'How does the passage contrast "Homo economicus" with the endowment effect?',
      explanation: 'The passage contrasts classical economics (which assumes rational valuation) with behavioral economics (which proves cognitive biases like the endowment effect). Since the endowment effect is presented as a deviation from rationality, a classical economist would not predict it.',
      wrongExplanations: {
        'A': 'The passage makes no distinction about the price of items regarding the endowment effect.',
        'B': 'The passage presents the endowment effect as a "cognitive bias," contrasting it with rational self-interest. A classical economist would not call it rational.',
        'C': 'While they might deny it, predicting they wouldn\'t expect it (Option D) is a safer, more direct inference based on their foundational assumption.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-inf-5',
      text: `Read the following excerpt:
"While dark matter has never been directly observed, its existence is universally accepted by astrophysicists due to its gravitational effects on visible matter. If dark matter did not exist, the outer stars in spiral galaxies would be flung into space, as the observable mass of these galaxies is insufficient to provide the gravity needed to hold them in their current orbits."

Which of the following must be true based on the passage?`,
      options: [
        { id: 'A', text: 'Astrophysicists will eventually develop technology capable of directly observing dark matter.' },
        { id: 'B', text: 'The gravitational force exerted by visible matter is less than the gravitational force exerted by dark matter in spiral galaxies.' },
        { id: 'C', text: 'Spiral galaxies contain more observable mass than elliptical galaxies.' },
        { id: 'D', text: 'The current orbits of outer stars in spiral galaxies require more gravity than visible matter alone can provide.' }
      ],
      correctAnswer: 'D',
      hint: 'Focus on what the second sentence explicitly states about gravity and observable mass.',
      explanation: 'The passage explicitly states that "the observable mass... is insufficient to provide the gravity needed to hold [outer stars] in their current orbits." This means the orbits require more gravity than visible matter provides. Option D is a direct, safe inference.',
      wrongExplanations: {
        'A': 'This is a prediction about the future, which cannot be inferred from the current facts.',
        'B': 'The passage says visible matter isn\'t enough, but it doesn\'t explicitly state that dark matter exerts *more* total gravity than visible matter (though it might). It just provides the *difference* needed.',
        'C': 'Elliptical galaxies are never mentioned in the text.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-inf-6',
      text: `Read the following excerpt:
"The recent tax reform act was promoted as a boon for small business owners. However, a close reading of the legislation reveals a complex tiering system for deductions. While businesses with fewer than 10 employees can write off 50% of their equipment purchases, businesses with 11 to 50 employees can only write off 20%. Furthermore, the administrative burden of filing for these deductions has doubled, requiring most small businesses to hire specialized accountants."

It can be inferred that the author believes:`,
      options: [
        { id: 'A', text: 'The tax reform act is entirely detrimental to all small business owners.' },
        { id: 'B', text: 'A business with 5 employees will benefit more financially from the act than a business with 20 employees.' },
        { id: 'C', text: 'The cost of hiring a specialized accountant may negate the benefits of the tax deductions for some small businesses.' },
        { id: 'D', text: 'The politicians who promoted the act deliberately lied to the public.' }
      ],
      correctAnswer: 'C',
      hint: 'Connect the deductions mentioned with the "administrative burden" mentioned at the end.',
      explanation: 'The author contrasts the promoted "boon" with the reality of complex tiers and increased administrative costs (hiring accountants). It logically follows that the author believes these new costs might outweigh the advertised benefits, negating the "boon." Option C expresses this nuance safely.',
      wrongExplanations: {
        'A': 'This is too extreme ("entirely detrimental"). Some businesses might still net a profit despite the accountant fees.',
        'B': 'We cannot know this for sure. A 20% write-off on $1 million in equipment is worth more than a 50% write-off on $10,000. We lack financial totals.',
        'D': 'This is a strong assumption. They might have been ignorant or overly optimistic, not deliberately lying.'
      },
      difficulty: 'hard'
    }
  ]
};

