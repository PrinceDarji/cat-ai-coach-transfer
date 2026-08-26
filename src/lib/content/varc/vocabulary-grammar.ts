import { TopicContent } from '../types';

export const vocabularyGrammar: TopicContent = {
  id: 'gv1',
  name: 'Vocabulary Context',
  section: 'varc',
  description: 'Learn to deduce word meanings from context clues and master essential grammar rules.',
  lessons: [
    {
      id: 'vg-1',
      title: 'Context is King',
      content: `### Decoding Unknown Words

You don't need a dictionary in your head to ace the CAT. When you encounter a word you don't know, look at its neighbors. 

**Context Clues:**
1. **Contrast Clues**: Look for words like *but, however, although, despite*. 
   *(e.g., "Although his brother was outgoing, Paul was naturally **reticent**.") -> Reticent must mean shy/quiet.*
2. **Restatement Clues**: The author defines the word right after using it.
   *(e.g., "The politician's **mendacity**, or his habit of constant lying, ruined his career.")*
3. **Example Clues**: Look for *such as, including, for instance*.
   *(e.g., "**Nocturnal** animals, such as owls and bats...")*`
    },
    {
      id: 'vg-2',
      title: 'The Power of Roots and Prefixes',
      content: `### Word Anatomy

Learning basic Latin and Greek roots can help you guess hundreds of words.
- **Mal** (bad): Malicious, Malfunction, Malevolent.
- **Ben/Bon** (good): Beneficial, Bonus, Benevolent.
- **Dict** (speak): Dictate, Contradict, Predict.
- **Luc/Lum** (light): Illuminate, Lucid, Translucent.
- **Chron** (time): Chronological, Chronic, Synchronize.

If you see the word "Malefactor," you know it means someone who does something bad, even if you've never seen it before.`
    },
    {
      id: 'vg-3',
      title: 'Grammar: Subject-Verb Agreement',
      content: `### The Golden Rule of Grammar

The subject and verb must agree in number (singular/plural). 
Sounds simple, but test-makers hide the subject!

**The Prepositional Phrase Trap:**
- *Incorrect*: The box of chocolates **are** missing.
- *Correct*: The **box** [of chocolates] **is** missing.
(Cross out the prepositional phrase "of chocolates" to see the real subject: box).

**Tricky Singulars:** Everyone, anyone, each, neither, either are always SINGULAR.
- *Correct*: **Each** of the boys **has** a pen.`
    },
    {
      id: 'vg-4',
      title: 'Grammar: Modifiers',
      content: `### Dangling and Misplaced Modifiers

A modifier describes a word. It must be placed exactly next to the word it describes.

- **Misplaced**: I saw a bear walking through the woods looking through my binoculars. *(Is the bear looking through binoculars?)*
- **Correct**: Walking through the woods, I saw a bear through my binoculars.

- **Dangling**: Exhausted from the marathon, the bed looked incredibly comfortable. *(Was the bed exhausted?)*
- **Correct**: Exhausted from the marathon, I thought the bed looked incredibly comfortable.`
    }
  ],
  practice: [
    {
      id: 'q-vg-1',
      text: `Based on the context, choose the correct meaning of the bolded word:

"Despite the CEO's **obfuscation** during the press conference, the investigative journalists eventually uncovered the company's massive accounting fraud."`,
      options: [
        { id: 'A', text: 'Clear and transparent communication.' },
        { id: 'B', text: 'The act of intentionally making something unclear or confusing.' },
        { id: 'C', text: 'A sudden burst of anger or hostility.' },
        { id: 'D', text: 'A public admission of guilt.' }
      ],
      correctAnswer: 'B',
      hint: 'The word "Despite" indicates a contrast. If the journalists eventually uncovered the fraud, what was the CEO trying to do?',
      explanation: 'The sentence uses "Despite," setting up a contrast. The journalists uncovered the truth *despite* the CEO\'s actions. This implies the CEO was trying to hide the truth or confuse people. Obfuscation means intentionally making things unclear.',
      wrongExplanations: {
        'A': 'This is the exact opposite. If communication was clear, "Despite" wouldn\'t make sense.',
        'C': 'Anger doesn\'t contrast logically with uncovering a financial fraud.',
        'D': 'If he admitted guilt, there would be nothing for the journalists to "eventually uncover."'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-vg-2',
      text: `Identify the grammatical error in the following sentence:

"A fleet of heavily armed ships, which had been sailing for three months, were finally approaching the enemy harbor."`,
      options: [
        { id: 'A', text: 'Change "heavily armed" to "heavy armed"' },
        { id: 'B', text: 'Change "which had been" to "who had been"' },
        { id: 'C', text: 'Change "were finally approaching" to "was finally approaching"' },
        { id: 'D', text: 'The sentence is grammatically correct.' }
      ],
      correctAnswer: 'C',
      hint: 'Find the subject of the sentence. Cross out the prepositional phrase "of heavily armed ships".',
      explanation: 'The subject of the sentence is "fleet" (a singular collective noun). The phrases "of heavily armed ships" and "which had been..." are modifiers. The singular subject "fleet" requires the singular verb "was," not the plural verb "were."',
      wrongExplanations: {
        'A': '"Heavily" is an adverb correctly modifying the adjective "armed".',
        'B': '"Which" is correctly used for inanimate objects (ships/fleet). "Who" is for people.',
        'D': 'The sentence contains a subject-verb agreement error.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-vg-3',
      text: `Based on the context, choose the correct meaning of the bolded word:

"The professor's lecture on quantum mechanics was so **esoteric** that only the two graduate students in the room had any idea what he was talking about."`,
      options: [
        { id: 'A', text: 'Incredibly boring and monotonous.' },
        { id: 'B', text: 'Intended for or understood by only a small number of people with specialized knowledge.' },
        { id: 'C', text: 'Completely false or scientifically inaccurate.' },
        { id: 'D', text: 'Loud and aggressive.' }
      ],
      correctAnswer: 'B',
      hint: 'Look at the result clause: "that only the two graduate students... had any idea".',
      explanation: 'The context clue is the result: only people with highly advanced knowledge (graduate students) could understand it. Therefore, "esoteric" means understood by only a specialized few.',
      wrongExplanations: {
        'A': 'Boring doesn\'t explain why the grad students understood it but others didn\'t.',
        'C': 'If it were false, the grad students wouldn\'t be the only ones who "understood" it; they would likely be the ones rejecting it.',
        'D': 'Volume/aggression has nothing to do with the audience\'s ability to comprehend the subject matter.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-vg-4',
      text: `Identify the best way to correct the dangling modifier in the following sentence:

"Having finished the tedious assignment, the TV was turned on."`,
      options: [
        { id: 'A', text: 'Having finished the tedious assignment, the remote turned on the TV.' },
        { id: 'B', text: 'The TV was turned on, having finished the tedious assignment.' },
        { id: 'C', text: 'Having finished the tedious assignment, I turned on the TV.' },
        { id: 'D', text: 'After the tedious assignment was finished by me, turning on the TV happened.' }
      ],
      correctAnswer: 'C',
      hint: 'Ask yourself: Who or what finished the assignment? That person/thing must come immediately after the comma.',
      explanation: 'The introductory modifier "Having finished the tedious assignment" must immediately precede the noun doing the action. The TV didn\'t finish the assignment, a person did. Option C correctly places "I" right after the comma.',
      wrongExplanations: {
        'A': 'The remote didn\'t finish the assignment either.',
        'B': 'This still implies the TV finished the assignment.',
        'D': 'While grammatically possible, it is incredibly awkward, passive, and wordy. C is much clearer.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-vg-5',
      text: `Based on your knowledge of word roots, what is the most likely meaning of the word "**magnanimous**"?
(Hint: Think of the roots 'magn' and 'anim')`,
      options: [
        { id: 'A', text: 'Having a physically large body.' },
        { id: 'B', text: 'Being very generous or forgiving, especially toward a rival or less powerful person.' },
        { id: 'C', text: 'Possessing magnetic or attractive qualities.' },
        { id: 'D', text: 'Hostile and aggressive.' }
      ],
      correctAnswer: 'B',
      hint: '"Magn" means large/great (like magnify). "Anim" means spirit/mind (like animate).',
      explanation: 'The root "magn" means great (e.g., magnify, magnificent), and "anim" means spirit or soul (e.g., animate, animal). Therefore, a "magnanimous" person is a "great-souled" personâ€”someone who is generous, noble, and forgiving.',
      wrongExplanations: {
        'A': 'This focuses only on "large" but applies it physically, ignoring the "anim" (spirit) root.',
        'C': 'This confuses "magn" with "magnet."',
        'D': 'This is the opposite of a great/noble spirit.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-vg-6',
      text: `Choose the grammatically correct sentence:`,
      options: [
        { id: 'A', text: 'Neither the manager nor the employees is happy with the new schedule.' },
        { id: 'B', text: 'Neither the employees nor the manager are happy with the new schedule.' },
        { id: 'C', text: 'Neither the employees nor the manager is happy with the new schedule.' },
        { id: 'D', text: 'Neither the manager or the employees are happy with the new schedule.' }
      ],
      correctAnswer: 'C',
      hint: 'In a "Neither/Nor" sentence, the verb must agree with the noun that is *closest* to it.',
      explanation: 'The rule for "Neither/Nor" (and "Either/Or") is that the verb agrees with the subject closest to it. In option C, "manager" (singular) is closest to the verb, so it takes the singular verb "is".',
      wrongExplanations: {
        'A': 'The closest noun to the verb is "employees" (plural), so it should be "are".',
        'B': 'The closest noun to the verb is "manager" (singular), so it should be "is".',
        'D': 'The pairing is strictly "Neither/Nor", not "Neither/or".'
      },
      difficulty: 'hard'
    }
  ]
};

