import { TopicContent } from '../types';

export const mainIdea: TopicContent = {
  id: 'v1',
  name: 'Main Idea / Central Theme',
  section: 'varc',
  description: 'Learn how to identify the core argument and central theme of reading comprehension passages.',
  lessons: [
    {
      id: 'mi-1',
      title: 'What is the Main Idea?',
      content: `### Welcome to Reading Comprehension!

Imagine you're watching a movie and someone asks you, "What was it about?" You wouldn't list every single scene, right? You'd give them the **core plot**. 

In CAT Reading Comprehension (RC), the **Main Idea** is exactly thatâ€”the core plot of the passage. It's the primary argument or point the author wants you to take away after reading.

**Main Idea vs. Topic**
- **Topic**: What the passage is about (e.g., "Climate Change").
- **Main Idea**: What the author is *saying* about the topic (e.g., "Climate change requires immediate local action, not just global treaties.").

Think of the Main Idea as the umbrella that covers all the other points in the passage.`
    },
    {
      id: 'mi-2',
      title: 'Where to Find the Main Idea',
      content: `### The Author's Roadmap

Authors aren't trying to hide the main idea; they usually place it where it makes the most impact. Here are the hotspots:

1. **The Opening Paragraph**: Often, authors state their thesis right up front.
2. **The Conclusion**: Sometimes they build an argument and summarize it at the end.
3. **The Pivot Point**: Watch out for words like *however*, *but*, or *yet*. The passage might start with a common belief, use a pivot word, and then state the author's *actual* main idea.

**Pro Tip:** Read the first and last sentence of each paragraph. This often gives you a structural outline of the entire passage.`
    },
    {
      id: 'mi-3',
      title: 'Main Idea vs. Supporting Details',
      content: `### Don't Get Lost in the Weeds

A common trap in CAT is confusing a **supporting detail** with the **main idea**. 

Supporting details are the examples, statistics, and anecdotes the author uses to *prove* the main idea. 

**Analogy:** If the main idea is "Eating vegetables is good for you," the supporting details would be "Carrots improve eyesight" and "Spinach has iron." 

When looking at options, ask yourself: *Is this the whole passage, or just one piece of it?* If an option only covers one paragraph, it's too narrow to be the main idea.`
    },
    {
      id: 'mi-4',
      title: 'Common Question Formats',
      content: `### Spotting the Question

CAT RC questions asking for the main idea can be phrased in several ways:
- "The primary purpose of the passage is to..."
- "Which of the following best summarizes the central theme?"
- "The author's main argument is..."
- "What is the core message of the passage?"
- "An appropriate title for this passage would be..." (A title should reflect the main idea!)

Whenever you see these, you're looking for the overarching theme, not a minor detail.`
    },
    {
      id: 'mi-5',
      title: 'Elimination Strategies',
      content: `### How to Choose the Right Option

The best way to solve Main Idea questions is by elimination. Here are the four types of wrong answers to look out for:

1. **Too Narrow**: Covers only a part of the passage (a supporting detail).
2. **Too Broad**: Covers the topic, but goes beyond the scope of what the author actually discussed.
3. **Opposite**: Directly contradicts the author's main point.
4. **Out of Scope**: Brings in information not mentioned in the passage at all.

**The Goldilocks Rule:** The correct answer will be *just right*â€”covering the core argument without being too specific or too general.`
    }
  ],
  practice: [
    {
      id: 'q-mi-1',
      text: `Read the following excerpt:
"While many argue that the rise of artificial intelligence will lead to widespread job loss, this view ignores historical precedents. Every major technological revolution, from the printing press to the internet, has initially caused panic about unemployment. However, these innovations consistently create new, previously unimaginable industries and roles. Therefore, we should view AI not as a job destroyer, but as a catalyst for economic evolution."

What is the primary purpose of this passage?`,
      options: [
        { id: 'A', text: 'To argue that AI will create more jobs than it destroys, similar to past technological shifts.' },
        { id: 'B', text: 'To describe the historical impact of the printing press and the internet on employment.' },
        { id: 'C', text: 'To warn people about the potential for widespread job loss due to artificial intelligence.' },
        { id: 'D', text: 'To explain how technological revolutions cause initial panic in society.' }
      ],
      correctAnswer: 'A',
      hint: 'Look for the author\'s main conclusion. What are the historical examples being used to prove?',
      explanation: 'The passage argues that AI is a "catalyst for economic evolution" and uses historical precedents to support this optimistic view. Option A perfectly captures this overarching argument.',
      wrongExplanations: {
        'B': 'This is too narrow. The printing press and internet are just examples used to support the main argument, not the main idea itself.',
        'C': 'This is the opposite of the passage\'s main point. The author explicitly rejects the view that AI will lead to widespread job loss.',
        'D': 'While true according to the passage, this is a supporting detail, not the primary purpose of the text.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-mi-2',
      text: `Read the following excerpt:
"Modern urban planning often prioritizes vehicular traffic over pedestrian spaces, resulting in cities that feel hostile to human life. Expanding highways and adding parking lots only induces more demand for driving, leading to worse congestion. Instead, cities that have reclaimed streets for pedestrians, bicycles, and public transit have seen improvements in local business revenue, public health, and community engagement. It is time for city councils to stop designing for cars and start designing for people."

Which of the following best summarizes the central theme?`,
      options: [
        { id: 'A', text: 'Expanding highways leads to increased traffic congestion.' },
        { id: 'B', text: 'Modern cities are hostile to human life because of poor urban planning.' },
        { id: 'C', text: 'Urban planning must shift focus from accommodating cars to prioritizing pedestrian and community spaces.' },
        { id: 'D', text: 'Local businesses thrive when cities build more infrastructure for bicycles and public transit.' }
      ],
      correctAnswer: 'C',
      hint: 'What action is the author advocating for based on the problems and solutions presented?',
      explanation: 'The passage outlines the problems with car-centric planning, highlights the benefits of pedestrian-centric planning, and concludes with a call to action ("time... to start designing for people"). Option C encompasses this entire logical flow.',
      wrongExplanations: {
        'A': 'This is a supporting detail explaining why current planning fails. It misses the proposed solution.',
        'B': 'This captures the problem stated in the beginning but ignores the solution and the call to action that make up the rest of the passage.',
        'D': 'This is a specific supporting detail used to prove the benefits of the author\'s proposed solution.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-mi-3',
      text: `Read the following excerpt:
"The debate over the origins of the Indo-European languages has long been polarized between the 'Kurgan hypothesis' and the 'Anatolian hypothesis.' The former suggests a rapid spread by nomadic warriors from the pontic steppes, while the latter proposes a slow expansion driven by agriculture from modern-day Turkey. Recent paleogenomic data, however, paints a far more complex picture. It reveals that neither a single migration event nor a purely peaceful agricultural spread can account for the genetic diversity of early Indo-European speakers. Instead, the data suggests multiple waves of migration, intermingling, and localized adaptations over millennia."

An appropriate title for this passage would be:`,
      options: [
        { id: 'A', text: 'The Kurgan vs. Anatolian Hypotheses in Linguistics.' },
        { id: 'B', text: 'Paleogenomic Data: Solving the Indo-European Mystery.' },
        { id: 'C', text: 'The Agricultural Origins of Indo-European Languages.' },
        { id: 'D', text: 'Beyond Simple Models: A Nuanced View of Indo-European Origins.' }
      ],
      correctAnswer: 'D',
      hint: 'Does the author side with one theory, or suggest that the reality is more complicated than either?',
      explanation: 'The passage introduces two simple hypotheses but uses recent data to argue that the reality is "far more complex" involving multiple factors. Option D perfectly captures this shift toward a more nuanced, complex model.',
      wrongExplanations: {
        'A': 'This is too narrow. It only describes the first sentence, ignoring the recent data and the author\'s actual conclusion.',
        'B': 'The passage says the data paints a "complex picture," not that it has definitively "solved" the mystery.',
        'C': 'This contradicts the passage, which explicitly rejects the idea that a purely agricultural spread accounts for the diversity.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-mi-4',
      text: `Read the following excerpt:
"For decades, psychologists assumed that willpower was a finite resource, akin to a muscle that gets fatigued with useâ€”a concept known as 'ego depletion.' Numerous studies supposedly proved that resisting temptation on one task led to poorer performance on a subsequent task. However, massive replication efforts in recent years have failed to reproduce these classic findings. It increasingly appears that willpower is not a physical resource that gets depleted, but rather a psychological state influenced by motivation, beliefs, and emotional regulation."

What is the core message of the passage?`,
      options: [
        { id: 'A', text: 'Psychological studies from previous decades were fundamentally flawed and unscientific.' },
        { id: 'B', text: 'Willpower is better understood as a psychological state influenced by beliefs rather than a finite, depletable resource.' },
        { id: 'C', text: 'Ego depletion is a concept that explains why resisting temptation leads to fatigue.' },
        { id: 'D', text: 'People can improve their willpower by enhancing their motivation and emotional regulation.' }
      ],
      correctAnswer: 'B',
      hint: 'What old idea is being rejected, and what new idea is taking its place?',
      explanation: 'The passage contrasts the old model of willpower (finite resource/ego depletion) with the new understanding based on recent replications (psychological state). Option B summarizes this central shift in understanding.',
      wrongExplanations: {
        'A': 'This is too broad and extreme. The passage focuses specifically on studies regarding willpower, not all psychological studies.',
        'C': 'This is the *old* concept that the passage argues is incorrect based on recent replication efforts.',
        'D': 'While this might be a logical inference, it is not the main point of the passage, which is primarily focused on redefining what willpower is, not giving self-help advice.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-mi-5',
      text: `Read the following excerpt:
"Critics of postmodernism often accuse it of being inherently relativistic and destructive to rational discourse. By insisting that all truths are merely social constructs driven by power dynamics, these critics argue, postmodernism leaves no ground for scientific objectivity or moral absolutes. Yet, this critique oversimplifies the movement. Postmodern theorists do not necessarily deny physical reality; rather, they seek to expose how societal biases shape our *interpretation* of that reality. Their goal is not to destroy truth, but to democratize it by giving voice to marginalized perspectives that traditional, 'objective' narratives have historically silenced."

The author's main argument is that:`,
      options: [
        { id: 'A', text: 'Postmodernism is inherently relativistic and threatens rational scientific discourse.' },
        { id: 'B', text: 'Postmodernism aims to democratize truth by including marginalized perspectives, contrary to critics\' claims of destructive relativism.' },
        { id: 'C', text: 'Societal biases and power dynamics are the only factors that shape our interpretation of physical reality.' },
        { id: 'D', text: 'Traditional narratives have intentionally silenced marginalized voices to maintain objective truth.' }
      ],
      correctAnswer: 'B',
      hint: 'Pay attention to the pivot word "Yet". What does the author say in response to the critics?',
      explanation: 'The passage presents the critics\' view, then uses "Yet" to introduce the author\'s counter-argument: that postmodernism is misunderstood and actually seeks to democratize truth by exposing biases. Option B accurately captures this defense.',
      wrongExplanations: {
        'A': 'This is the view of the critics, which the author explicitly argues against in the second half of the passage.',
        'C': 'This is an extreme statement (using "only factors") that goes beyond what the passage claims. The passage says biases "shape" interpretation, not that they are the only factor.',
        'D': 'This misinterprets the text. The passage says traditional narratives have historically silenced voices, but doesn\'t state they did it "intentionally" to maintain truth.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-mi-6',
      text: `Read the following excerpt:
"The tendency of corporate boards to focus obsessively on quarterly earnings reports is a structural flaw in modern capitalism. This 'short-termism' incentivizes CEOs to cut crucial research and development budgets to artificially inflate current profit margins. While this pleases shareholders in the immediate term, it systematically hollows out the company's long-term competitive advantage. By the time the lack of innovation catches up with the firm, the CEO has typically moved on with a hefty bonus, leaving the consequences to their successor. To foster genuine innovation, compensation structures must be tied to decadal, rather than quarterly, performance metrics."

Which of the following best states the main idea of the passage?`,
      options: [
        { id: 'A', text: 'CEOs often cut R&D budgets to inflate short-term profits and secure large bonuses before leaving.' },
        { id: 'B', text: 'Corporate boards are responsible for the structural flaws in modern capitalism because of their focus on quarterly earnings.' },
        { id: 'C', text: 'The focus on short-term profits harms long-term innovation, necessitating a shift to long-term compensation metrics.' },
        { id: 'D', text: 'Modern capitalism is flawed because it rewards short-termism at the expense of shareholders.' }
      ],
      correctAnswer: 'C',
      hint: 'Identify the problem discussed and the proposed solution. The main idea usually encompasses both.',
      explanation: 'The passage argues that short-termism harms long-term innovation (the problem) and concludes that compensation must be tied to long-term metrics (the solution). Option C covers both the core problem and the proposed remedy.',
      wrongExplanations: {
        'A': 'This is a supporting detail explaining *how* short-termism manifests, but it misses the overarching structural issue and the proposed solution.',
        'B': 'This is too narrow and slightly misstates the passage. The passage says the *tendency* is a structural flaw, not that boards are responsible for *all* structural flaws.',
        'D': 'This contradicts the passage. The text says short-termism actually *pleases* shareholders in the immediate term, it doesn\'t happen at their expense (until later).'
      },
      difficulty: 'hard'
    }
  ]
};

