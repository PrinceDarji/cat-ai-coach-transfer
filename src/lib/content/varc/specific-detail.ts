import { TopicContent } from '../types';

export const specificDetail: TopicContent = {
  id: 'v4',
  name: 'Specific Detail',
  section: 'varc',
  description: 'Learn how to efficiently scan passages to locate and verify specific factual details.',
  lessons: [
    {
      id: 'sd-1',
      title: 'The Hunt for Facts',
      content: `### What are Specific Detail Questions?

Unlike Main Idea or Tone questions, Specific Detail questions do not ask for the big picture. They ask about a precise fact, statistic, or claim mentioned in the text.

Question stems look like this:
- "According to the passage, which of the following is true regarding X?"
- "The author mentions X in order to..."
- "Which of the following is NOT listed as a cause of Y?"

The good news? The answer is **literally in the text**. You just have to find it.`
    },
    {
      id: 'sd-2',
      title: 'Scanning for Keywords',
      content: `### Don't Reread, Scan!

When faced with a detail question, do not re-read the entire passage. 

1. **Identify the Target**: Pick the most unique word or phrase in the question (e.g., a proper noun, a specific date, or a weird term like "endowment effect").
2. **Scan**: Run your eyes quickly over the text looking *only* for that word.
3. **Read the Context**: Once you find the keyword, read the sentence before it, the sentence with it, and the sentence after it. The answer is in that window.`
    },
    {
      id: 'sd-3',
      title: 'Paraphrase vs. Exact Match',
      content: `### The Synonym Trap

Test-makers know you are looking for exact words. To make the question harder, the correct option will almost always **paraphrase** the text.

- **Passage says**: "The sudden influx of capital caused the currency to appreciate."
- **Correct Option says**: "A rapid increase in investment led to a stronger exchange rate."

If an option uses the *exact same words* as the passage, be suspicious. It might be a trap that uses familiar words but twists the meaning.`
    },
    {
      id: 'sd-4',
      title: 'Except / NOT Questions',
      content: `### The Process of Elimination

For questions that ask "Which of the following is NOT true," you have to do the opposite. You must find evidence in the text that proves three of the options *are* true. 

The one you cannot prove, or the one that contradicts the text, is your answer. Use your scratchpad to mark T (True) or F (False) next to A, B, C, and D as you scan.`
    }
  ],
  practice: [
    {
      id: 'q-sd-1',
      text: `Read the following excerpt:
"The Great Emu War of 1932 is a bizarre footnote in Australian military history. Facing a drought and a massive migration of roughly 20,000 emus destroying their wheat crops, farmers in Western Australia petitioned the government for help. The Minister of Defence dispatched Major G.P.W. Meredith, two soldiers, and two Lewis machine guns with 10,000 rounds of ammunition. Despite their firepower, the emus proved remarkably elusive. By the time the military withdrew a month later, they had expended almost all their ammunition but killed fewer than 1,000 birds. The emus had effectively won."

According to the passage, why did the Australian farmers request government assistance?`,
      options: [
        { id: 'A', text: 'To acquire Lewis machine guns for their own use.' },
        { id: 'B', text: 'Because a massive drought was killing their wheat crops.' },
        { id: 'C', text: 'To combat a large flock of emus that were damaging their wheat crops.' },
        { id: 'D', text: 'Because Major Meredith ordered them to petition the government.' }
      ],
      correctAnswer: 'C',
      hint: 'Look for the sentence that mentions "petitioned the government for help." What precedes it?',
      explanation: 'The passage explicitly states: "Facing a drought and a massive migration of roughly 20,000 emus destroying their wheat crops, farmers... petitioned the government for help." Option C accurately reflects the emu destruction mentioned as the cause.',
      wrongExplanations: {
        'A': 'The government sent soldiers with guns; the farmers did not request the guns for themselves.',
        'B': 'While a drought was happening, the direct cause of the petition was the emus destroying the crops.',
        'D': 'Major Meredith was dispatched *in response* to the petition; he did not order it.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-sd-2',
      text: `Read the following excerpt:
"Coffee rust, caused by the fungus *Hemileia vastatrix*, is one of the most devastating diseases affecting Arabica coffee plants. First identified in East Africa in the 1860s, it completely wiped out the coffee industry in Sri Lanka by 1890, forcing the island to switch entirely to tea production. The fungus spreads via windborne spores, causing yellow spots on leaves that eventually drop off, starving the plant of energy and severely reducing crop yields."

Based on the text, which of the following is true about *Hemileia vastatrix*?`,
      options: [
        { id: 'A', text: 'It affects all types of coffee plants globally.' },
        { id: 'B', text: 'It causes plants to die by directly attacking their roots.' },
        { id: 'C', text: 'It is responsible for Sri Lanka\'s historical shift from coffee to tea cultivation.' },
        { id: 'D', text: 'It was first discovered in Sri Lanka in 1890.' }
      ],
      correctAnswer: 'C',
      hint: 'Scan for "Sri Lanka" and see what happened there.',
      explanation: 'The passage explicitly states that the fungus "wiped out the coffee industry in Sri Lanka... forcing the island to switch entirely to tea production." Option C perfectly paraphrases this fact.',
      wrongExplanations: {
        'A': 'The passage says it affects "Arabica coffee plants," not all types.',
        'B': 'The passage says it causes leaves to drop off, starving the plant, not attacking the roots.',
        'D': 'It was discovered in East Africa in the 1860s, not Sri Lanka.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-sd-3',
      text: `Read the following excerpt:
"Geothermal energy is often touted as a universally applicable green solution, but its viability is highly dependent on local geology. The most efficient geothermal plants require high-temperature hydrothermal resources (water and steam) near the Earth's surface, conditions typically found only near tectonic plate boundaries, such as in Iceland, New Zealand, or the western United States. While newer Enhanced Geothermal Systems (EGS) attempt to fracture hot, dry rocks deep underground to create artificial reservoirs, this technology remains expensive and has been linked to minor induced seismicity (small earthquakes)."

The author mentions "minor induced seismicity" to highlight:`,
      options: [
        { id: 'A', text: 'A reason why traditional hydrothermal resources are dangerous.' },
        { id: 'B', text: 'A drawback associated with Enhanced Geothermal Systems (EGS).' },
        { id: 'C', text: 'The main reason geothermal energy is not used in the western United States.' },
        { id: 'D', text: 'The natural earthquakes that occur near tectonic plate boundaries.' }
      ],
      correctAnswer: 'B',
      hint: 'Find the phrase "minor induced seismicity". What subject is it attached to in the sentence?',
      explanation: 'The sentence structure links "minor induced seismicity" specifically to the newer Enhanced Geothermal Systems (EGS), presenting it alongside cost as a negative aspect (drawback) of that specific technology.',
      wrongExplanations: {
        'A': 'It is linked to EGS, not traditional hydrothermal resources.',
        'C': 'The text says the western US *does* have the conditions for traditional plants; seismicity is not mentioned as a deterrent there.',
        'D': 'Induced seismicity means human-caused (by the EGS technology), not natural tectonic earthquakes.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-sd-4',
      text: `Read the following excerpt:
"Despite the popular belief that camels store water in their humps, these iconic desert structures are actually reservoirs of fatty tissue. Concentrating body fat in a single mound minimizes the insulating effect fat would have if distributed evenly over the body, allowing camels to survive in extreme heat. When food is scarce, the camel's body metabolizes this fat into energy and, as a byproduct, water. A camel can yield more than a gram of water for every gram of fat converted."

All of the following are supported by the passage EXCEPT:`,
      options: [
        { id: 'A', text: 'A camel\'s hump is composed primarily of fat.' },
        { id: 'B', text: 'Evenly distributed body fat would make it harder for camels to endure extreme heat.' },
        { id: 'C', text: 'Camels drink massive amounts of water before journeying through the desert.' },
        { id: 'D', text: 'The metabolism of fat in a camel\'s hump produces water as a secondary result.' }
      ],
      correctAnswer: 'C',
      hint: 'Find evidence for three of the options. Which one is completely absent from the text?',
      explanation: 'Options A, B, and D are all explicitly supported by the text. However, the passage never mentions camels drinking massive amounts of water before a journey. Therefore, C is the exception.',
      wrongExplanations: {
        'A': 'Supported by: "structures are actually reservoirs of fatty tissue." (True)',
        'B': 'Supported by: "minimizes the insulating effect fat would have if distributed evenly... allowing [them] to survive extreme heat." (True)',
        'D': 'Supported by: "metabolizes this fat into energy and, as a byproduct, water." (True)'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-sd-5',
      text: `Read the following excerpt:
"The invention of the mechanical clock in 14th-century Europe fundamentally altered human psychology. Before mechanical timekeeping, humans organized their days around natural phenomena: the rising and setting of the sun, and the changing of the seasons. Time was fluid and qualitative. The mechanical clock, however, broke the day down into rigid, quantifiable units. It allowed for the synchronization of labor, enabling the transition from an agrarian society to an industrial one, but it also introduced the modern anxiety of 'wasting time.'"

According to the passage, the primary shift caused by the mechanical clock was that time became:`,
      options: [
        { id: 'A', text: 'Determined by the rising and setting of the sun.' },
        { id: 'B', text: 'Anxiety-inducing for agrarian workers.' },
        { id: 'C', text: 'Structured into fixed, measurable segments.' },
        { id: 'D', text: 'Faster than it was in previous centuries.' }
      ],
      correctAnswer: 'C',
      hint: 'Look for the sentence describing what the mechanical clock did to the day.',
      explanation: 'The passage states: "The mechanical clock, however, broke the day down into rigid, quantifiable units." Option C ("fixed, measurable segments") is a direct paraphrase of "rigid, quantifiable units."',
      wrongExplanations: {
        'A': 'This is how time was determined *before* the mechanical clock.',
        'B': 'While it introduced anxiety, the text links the synchronization of labor to the *transition* to an industrial society, not anxiety specifically for agrarian workers.',
        'D': 'The passage says time became rigid, not that time physically sped up.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-sd-6',
      text: `Read the following excerpt:
"In the realm of cryptography, the shift from symmetric-key algorithms to public-key cryptography was revolutionary. In older symmetric systems, both the sender and receiver had to possess the exact same secret key to encrypt and decrypt a message. The glaring vulnerability was key distribution: how do you securely share the secret key over an insecure channel? Public-key cryptography solved this by using a pair of mathematically linked keys: a public key that anyone can use to encrypt a message, and a private key kept securely by the receiver to decrypt it."

What was the primary vulnerability of symmetric-key algorithms mentioned in the text?`,
      options: [
        { id: 'A', text: 'They required highly complex mathematical links.' },
        { id: 'B', text: 'The public could easily decrypt the messages.' },
        { id: 'C', text: 'Safely transmitting the shared secret key to both parties.' },
        { id: 'D', text: 'They could only be used for very short messages.' }
      ],
      correctAnswer: 'C',
      hint: 'Scan for the phrase "glaring vulnerability" and read the explanation that follows it.',
      explanation: 'The passage explicitly identifies the vulnerability: "The glaring vulnerability was key distribution: how do you securely share the secret key over an insecure channel?" Option C accurately paraphrases this problem of safely transmitting the key.',
      wrongExplanations: {
        'A': 'Mathematical links are mentioned in relation to the *new* public-key systems, not the old symmetric ones.',
        'B': 'The public could not easily decrypt it unless they intercepted the key (the distribution problem).',
        'D': 'Message length is never mentioned in the text.'
      },
      difficulty: 'hard'
    }
  ]
};

