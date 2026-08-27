export const DEMO_MINI_MOCK = {
  id: 'demo-mini',
  name: 'CAT 2026 Mini Mock (Demo)',
  sections: [
    {
      id: 'varc',
      name: 'VARC',
      timeLimit: 300, // 5 minutes in seconds
      questions: [
        {
          id: 'v1',
          type: 'mcq',
          text: 'Read the following paragraph carefully and identify the main idea.\n\n"The proliferation of artificial intelligence in creative fields has sparked a debate about the nature of authorship. While some argue that machines can only mimic human creativity based on their training data, others suggest that the novel combinations produced by AI constitute a new form of genuine creativity."\n\nWhat is the primary purpose of the passage?',
          options: [
            'To prove that AI is genuinely creative.',
            'To argue that human authorship is dead.',
            'To highlight a debate concerning AI and the definition of creativity.',
            'To explain how AI is trained on human data.'
          ],
          correctAnswer: 2
        },
        {
          id: 'v2',
          type: 'mcq',
          text: 'Find the odd sentence out from the following:\n1. The cheetah is the fastest land animal.\n2. Lions hunt in cooperative groups called prides.\n3. Tigers are solitary hunters, preferring dense vegetation.\n4. Deforestation is rapidly shrinking the natural habitats of big cats.',
          options: ['1', '2', '3', '4'],
          correctAnswer: 3
        },
        {
          id: 'v3',
          type: 'mcq',
          text: 'Arrange the following sentences into a coherent paragraph:\nA. However, the exact mechanism of this navigation remains partially understood.\nB. Many migratory birds rely on the Earth\'s magnetic field to navigate.\nC. This ability is crucial for their survival during long winter migrations.\nD. Recent studies suggest that quantum entanglement in their eyes might play a role.',
          options: ['B, C, A, D', 'B, A, C, D', 'D, A, B, C', 'C, B, D, A'],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'lrdi',
      name: 'LRDI',
      timeLimit: 300,
      questions: [
        {
          id: 'l1',
          type: 'mcq',
          text: 'Five friends (A, B, C, D, E) are sitting in a row facing North.\n- C is to the immediate right of A.\n- B is at one of the extreme ends.\n- D is between B and E.\n- E is not next to A.\n\nWho is sitting exactly in the middle?',
          options: ['A', 'C', 'D', 'E'],
          correctAnswer: 3
        },
        {
          id: 'l2',
          type: 'mcq',
          text: 'Based on the previous arrangement (A, B, C, D, E facing North, B at extreme end, D between B & E, C right of A, E not next to A), who is at the left extreme end?',
          options: ['A', 'B', 'C', 'E'],
          correctAnswer: 0
        },
        {
          id: 'l3',
          type: 'mcq',
          text: 'In a certain code language, "CAT" is written as "3120". How would "DOG" be written?',
          options: ['4157', '4158', '4156', '5157'],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'quant',
      name: 'Quant',
      timeLimit: 300,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          text: 'If $x + y = 10$ and $x^2 + y^2 = 58$, what is the value of $xy$?',
          options: ['19', '21', '23', '25'],
          correctAnswer: 1
        },
        {
          id: 'q2',
          type: 'mcq',
          text: 'A shopkeeper marks his goods 20% above the cost price and allows a discount of 10%. What is his overall profit percentage?',
          options: ['8%', '10%', '12%', '15%'],
          correctAnswer: 0
        },
        {
          id: 'q3',
          type: 'tita',
          text: 'Calculate mentally: $57^2$. (Type the exact number)',
          options: [],
          correctAnswer: '3249' // For TITA (Type in the Answer), correctAnswer is a string
        }
      ]
    }
  ]
};
