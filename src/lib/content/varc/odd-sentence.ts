import { TopicContent } from '../types';

export const oddSentence: TopicContent = {
  id: 'va3',
  name: 'Odd Sentence Out',
  section: 'varc',
  description: 'Identify the sentence that does not fit the logical flow or core theme of a paragraph.',
  lessons: [
    {
      id: 'oso-1',
      title: 'Finding the Impostor',
      content: `### What is an Odd Sentence Out?

In this CAT question type, you are given 4 or 5 sentences. All but one can be arranged to form a coherent paragraph. Your job is to identify the "impostor" sentence that doesn't belong.

This is a test of **theme identification** and **logical flow**. The odd sentence is often related to the general topic, making it a tricky impostor, but it will veer off in a different direction or break the logical chain.`
    },
    {
      id: 'oso-2',
      title: 'Step 1: Identify the Core Theme',
      content: `### Find the Umbrella

Read all the sentences quickly. Ask yourself: "What is the overarching theme connecting the majority of these sentences?"

For example, if four sentences are about "the economic benefits of solar energy," and one sentence is about "the chemical composition of solar panels," the chemical composition one is the odd one out. It's related to the *topic* (solar panels), but not the *theme* (economics).`
    },
    {
      id: 'oso-3',
      title: 'Step 2: Look for Mandatory Pairs',
      content: `### Build the Paragraph (Mentally)

Use the same skills you use for Para Jumbles. Look for pronouns (he, she, it), transition words (however, therefore), and chronological links. 

If you can firmly link sentences 1, 3, and 4 together in a logical sequence, sentence 2 is likely your odd one out.`
    },
    {
      id: 'oso-4',
      title: 'Common Types of Odd Sentences',
      content: `### The Impostor Profiles

Watch out for these common types of odd sentences:
1. **The Scope Shifter**: The paragraph is about a specific town, but the odd sentence talks about the whole country.
2. **The Tone Breaker**: Four sentences are objective and factual; the odd one is highly emotional and opinionated.
3. **The Timeline Jumper**: The paragraph discusses future predictions, but the odd sentence states a historical fact from 500 years ago.`
    }
  ],
  practice: [
    {
      id: 'q-oso-1',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. The human brain consumes about 20% of the body's energy, despite accounting for only 2% of its weight.
2. This massive energy demand is primarily driven by the continuous firing of neurons.
3. Foods rich in omega-3 fatty acids, like salmon and walnuts, are excellent for cardiovascular health.
4. To meet this demand, the brain relies almost exclusively on glucose transported via the bloodstream.
5. If blood flow to the brain is interrupted even briefly, consciousness is lost within seconds due to energy depletion.`,
      options: [
        { id: '1', text: 'Sentence 1' },
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' }
      ],
      correctAnswer: '3',
      hint: 'What is the specific theme of the other four sentences? (Energy/fuel for the brain).',
      explanation: 'Sentences 1, 2, 4, and 5 all discuss the brain\'s high energy consumption and reliance on glucose/blood flow. Sentence 3 talks about cardiovascular health and omega-3s. While somewhat related to health/biology, it breaks the specific theme of brain energy mechanics.',
      wrongExplanations: {
        '1': 'Sentence 1 is the introductory sentence establishing the brain\'s energy consumption.',
        '2': 'Sentence 2 directly links to Sentence 1 ("This massive energy demand").',
        '4': 'Sentence 4 directly links to the demand established in 1 and 2.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-oso-2',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. In ancient Rome, the purple dye known as Tyrian purple was worth more than its weight in gold.
2. It was extracted painstakingly from the mucus of a specific type of predatory sea snail found in the Mediterranean.
3. The color purple has long been associated with royalty, power, and wealth across various global cultures.
4. Because it required thousands of snails to produce just one ounce of dye, only the emperor and the highest-ranking elites could afford to wear it.
5. Anyone of lower status caught wearing the color faced severe punishment, including death.`,
      options: [
        { id: '1', text: 'Sentence 1' },
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' }
      ],
      correctAnswer: '3',
      hint: 'Four sentences focus specifically on the history of the dye in Ancient Rome. One sentence zooms out to a global, general statement.',
      explanation: 'Sentences 1, 2, 4, and 5 form a coherent paragraph detailing the production and strict social rules regarding Tyrian purple *specifically in Ancient Rome*. Sentence 3 is a broad, general statement about the color purple across "various global cultures," breaking the specific scope of the paragraph.',
      wrongExplanations: {
        '1': 'Sentence 1 introduces the specific topic: Tyrian purple in Rome.',
        '2': 'Sentence 2 explains *why* it was expensive (extracted from snails).',
        '4': 'Sentence 4 links the snail extraction (2) to the social exclusivity (emperor/elites).'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-oso-3',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. The development of CRISPR-Cas9 technology has revolutionized genetic engineering by allowing precise edits to DNA.
2. Scientists can now theoretically remove genetic mutations responsible for hereditary diseases before a child is born.
3. However, this capability has sparked intense ethical debates regarding 'designer babies.'
4. The first cloned mammal, Dolly the sheep, was born in 1996, marking a milestone in reproductive biology.
5. Critics fear that the wealthy will use this technology to enhance their children's intelligence or physical traits, exacerbating social inequality.`,
      options: [
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' },
        { id: '5', text: 'Sentence 5' }
      ],
      correctAnswer: '4',
      hint: 'Identify the specific genetic technology being discussed. Which sentence introduces a different technology?',
      explanation: 'Sentences 1, 2, 3, and 5 follow a logical flow about CRISPR technology, its potential to cure disease, and the resulting ethical debates. Sentence 4 abruptly introduces cloning (Dolly the sheep), which is a different reproductive technology and breaks the flow.',
      wrongExplanations: {
        '2': 'Sentence 2 provides the positive potential of the CRISPR technology introduced in 1.',
        '3': 'Sentence 3 introduces the ethical pivot ("However...") related to the editing in 2.',
        '5': 'Sentence 5 elaborates on the ethical debates mentioned in 3 ("Critics fear...").'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-oso-4',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. Bitcoin's underlying architecture, the blockchain, is often praised as a highly secure, decentralized ledger.
2. A single Bitcoin transaction can consume as much electrical energy as an average household uses in a month.
3. By requiring a distributed network of nodes to verify transactions, it makes fraudulent alterations nearly impossible.
4. However, this robust security mechanism, known as Proof-of-Work, requires massive amounts of computational power.
5. Consequently, the network's immense energy consumption has drawn severe criticism from environmental advocates.`,
      options: [
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' },
        { id: '5', text: 'Sentence 5' }
      ],
      correctAnswer: '2',
      hint: 'Try to build the paragraph. 1 -> 3 -> 4 -> 5. Where does 2 fit? Does it break the logical transition?',
      explanation: 'The logical flow is: 1 (intro blockchain security) -> 3 (explains the security: distributed nodes) -> 4 (pivot: security requires power) -> 5 (result: environmental criticism). Sentence 2 provides a specific data point about energy consumption, but structurally, it interrupts the logical chain explaining *how* the security leads to energy use and criticism. Sentence 5 acts as the concluding thought, making 2 an extraneous, overly specific insert.',
      wrongExplanations: {
        '3': 'Sentence 3 is crucial for explaining the "decentralized ledger" mentioned in 1.',
        '4': 'Sentence 4 pivots the argument from security to energy consumption, necessary for 5.',
        '5': 'Sentence 5 concludes the logical chain (security -> power -> environmental criticism).'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-oso-5',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. The minimalist architectural movement, characterized by simple geometric forms and lack of ornamentation, emerged as a reaction against the excess of postmodernism.
2. Its proponents argued that stripping a building down to its essential structural elements revealed a purer, more honest form of beauty.
3. Renowned architect Le Corbusier famously described the house as a "machine for living in."
4. Materials like exposed concrete, steel, and large expanses of glass became the hallmarks of this austere style.
5. Yet, many critics found these stark, unadorned spaces to be cold, sterile, and hostile to human comfort.`,
      options: [
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' },
        { id: '5', text: 'Sentence 5' }
      ],
      correctAnswer: '3',
      hint: 'Which sentence introduces a specific quote that doesn\'t fit the general descriptive flow of the other sentences?',
      explanation: 'The paragraph flows nicely: 1 (intro minimalism) -> 2 (philosophy behind it) -> 4 (materials used) -> 5 (criticism of the style). Sentence 3 is a quote from Le Corbusier. While he is associated with modernism/minimalism, the quote "machine for living in" interrupts the descriptive flow of the paragraph and has no direct logical link to the sentences before or after it.',
      wrongExplanations: {
        '2': 'Sentence 2 directly follows 1, explaining the philosophy of the movement just introduced.',
        '4': 'Sentence 4 provides physical examples of the "essential elements" mentioned in 2.',
        '5': 'Sentence 5 provides the counter-argument (critique) to the praise in sentence 2.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-oso-6',
      text: `Five sentences are given below. Four of them can be put together to form a meaningful and coherent paragraph. Identify the odd one out.
1. Black holes possess gravitational fields so intense that nothing, not even light, can escape their event horizon.
2. Because they emit no light of their own, black holes are completely invisible against the dark backdrop of space.
3. Therefore, astronomers must rely on indirect methods to detect them, such as observing the behavior of nearby stars.
4. If a star is seen orbiting an empty point in space at extreme speeds, it strongly suggests the presence of a massive, invisible object.
5. Supermassive black holes, which contain millions of solar masses, are thought to reside at the center of most galaxies.`,
      options: [
        { id: '2', text: 'Sentence 2' },
        { id: '3', text: 'Sentence 3' },
        { id: '4', text: 'Sentence 4' },
        { id: '5', text: 'Sentence 5' }
      ],
      correctAnswer: '5',
      hint: 'Four sentences describe a problem (invisible black holes) and a specific solution (how to detect them). Which sentence goes off topic?',
      explanation: 'Sentences 1, 2, 3, and 4 form a perfect logical chain: Black holes trap light (1) -> so they are invisible (2) -> so we must detect them indirectly (3) -> here is an example of indirect detection (4). Sentence 5 introduces a new sub-topic (supermassive black holes at the center of galaxies) that breaks the logical flow regarding detection methods.',
      wrongExplanations: {
        '2': 'Sentence 2 links 1 (no light escapes) to 3 (we can\'t see them).',
        '3': 'Sentence 3 provides the solution to the problem stated in 2.',
        '4': 'Sentence 4 provides the specific example of the "indirect methods" mentioned in 3.'
      },
      difficulty: 'medium'
    }
  ]
};

