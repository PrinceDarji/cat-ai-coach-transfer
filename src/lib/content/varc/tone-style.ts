import { TopicContent } from '../types';

export const toneStyle: TopicContent = {
  id: 'v3',
  name: 'Tone & Style',
  section: 'varc',
  description: 'Learn to identify the author\'s attitude and the stylistic devices used in passages.',
  lessons: [
    {
      id: 'ts-1',
      title: 'What is Tone?',
      content: `### Hearing the Author's Voice

Tone is the **attitude** the author holds toward the subject they are writing about. 

Imagine two people describing a new policy:
- Person A: "This visionary policy will finally rescue our struggling economy."
- Person B: "This reckless policy will blindly gamble away our economic future."

Both are writing about the same topic, but Person A's tone is **laudatory (praising)**, while Person B's tone is **critical (disapproving)**. Identifying tone helps you understand *why* the author wrote the passage.`
    },
    {
      id: 'ts-2',
      title: 'Common Tone Categories',
      content: `### The Tone Spectrum

Tones usually fall into a few broad categories on the CAT:

1. **Positive/Favorable**: Laudatory, Optimistic, Reverent, Commiserating.
2. **Negative/Unfavorable**: Critical, Cynical, Sarcastic, Derogatory, Acerbic.
3. **Neutral/Objective**: Analytical, Factual, Descriptive, Informative.
4. **Complex/Mixed**: Ambivalent (mixed feelings), Apathetic (lack of feeling), Apologetic.

Always check the adjectives and adverbs the author uses. If they use words like "tragically," "unfortunately," or "blatant," the tone is rarely neutral.`
    },
    {
      id: 'ts-3',
      title: 'Tone Vocabulary',
      content: `### Words to Know

CAT options often use advanced vocabulary to describe tone. Memorize these:
- **Acerbic/Caustic**: Harsh or corrosive in tone.
- **Dogmatic**: Stubbornly asserting an opinion as undeniable fact.
- **Pedestrian**: Dull, lacking imagination.
- **Didactic**: Intended to teach, often preachy.
- **Sardonic**: Grimly mocking or cynical.
- **Eulogistic**: Highly praising (usually for the dead, but can be for ideas).`
    },
    {
      id: 'ts-4',
      title: 'Analyzing Style',
      content: `### How the Author Writes

Style refers to *how* the author constructs their argument. 
- **Narrative**: Tells a story.
- **Descriptive**: Paints a picture with words.
- **Analytical**: Breaks down a concept into parts.
- **Argumentative/Persuasive**: Tries to convince you of a specific viewpoint.

If a passage is full of data, statistics, and citations, the style is analytical. If it's full of emotional anecdotes, it's persuasive/narrative.`
    }
  ],
  practice: [
    {
      id: 'q-ts-1',
      text: `Read the following excerpt:
"The committee's latest 'solution' to the traffic problem is, quite frankly, a masterpiece of bureaucratic incompetence. By deciding to close the only functional bridge during rush hour for 'routine maintenance,' they have ensured that commuters will spend more time staring at the bumpers of the cars in front of them than actually working."

The tone of the passage can best be described as:`,
      options: [
        { id: 'A', text: 'Objective and analytical' },
        { id: 'B', text: 'Sarcastic and highly critical' },
        { id: 'C', text: 'Sorrowful and melancholic' },
        { id: 'D', text: 'Cautiously optimistic' }
      ],
      correctAnswer: 'B',
      hint: 'Look at phrases like "masterpiece of bureaucratic incompetence." Are they being literal?',
      explanation: 'The author uses the word "masterpiece" sarcastically to describe something terrible (incompetence). The overall attitude is highly critical of the committee\'s decision.',
      wrongExplanations: {
        'A': 'An objective tone would simply state the facts of the bridge closure without judgments like "incompetence."',
        'C': 'The author is angry/mocking, not sad or sorrowful.',
        'D': 'There is zero optimism here; the author predicts terrible traffic.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-ts-2',
      text: `Read the following excerpt:
"While the discovery of the new exoplanet is certainly intriguing, we must temper our expectations. The media has quickly dubbed it an 'Earth twin,' but the spectroscopic data indicates a surface temperature exceeding 400 degrees Celsius and an atmosphere thick with sulfuric acid. It is a fascinating celestial body, but it is hardly a vacation destination."

Which of the following best describes the author's tone?`,
      options: [
        { id: 'A', text: 'Enthusiastic and celebratory' },
        { id: 'B', text: 'Dismissive and apathetic' },
        { id: 'C', text: 'Measured and pragmatic' },
        { id: 'D', text: 'Hostile and confrontational' }
      ],
      correctAnswer: 'C',
      hint: 'The author acknowledges the discovery is "intriguing" but pushes back against extreme claims with facts.',
      explanation: 'The author calls the discovery "intriguing" and "fascinating" (not dismissive), but urges us to "temper our expectations" based on harsh facts. This balanced, realistic approach is measured and pragmatic.',
      wrongExplanations: {
        'A': 'The author specifically warns against being too enthusiastic (tempering expectations).',
        'B': 'The author is not dismissive; they acknowledge the planet is a "fascinating celestial body."',
        'D': 'There is no anger or hostility here, just a gentle correction of media hype.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-ts-3',
      text: `Read the following excerpt:
"You must understand that the universe does not care about your petty squabbles. The stars will continue to burn out, the galaxies will continue to drift apart, and the eventual heat death of the cosmos will erase every monument, every book, and every memory of human existence. To assign meaning to our brief flicker of consciousness is the ultimate act of human arrogance."

The author's tone is most accurately described as:`,
      options: [
        { id: 'A', text: 'Didactic and moralizing' },
        { id: 'B', text: 'Nihilistic and bleak' },
        { id: 'C', text: 'Reverent and awe-struck' },
        { id: 'D', text: 'Apologetic and conciliatory' }
      ],
      correctAnswer: 'B',
      hint: 'How does the author view human existence in the grand scheme of things?',
      explanation: 'The author emphasizes the utter meaninglessness of human existence in the face of inevitable cosmic destruction. This rejection of meaning and focus on doom is the definition of nihilistic and bleak.',
      wrongExplanations: {
        'A': 'While slightly preachy ("You must understand"), it is not moralizing (teaching right from wrong); it argues nothing matters at all.',
        'C': 'Reverence implies deep respect or worship. The author is focused on destruction, not awe.',
        'D': 'The author is not apologizing for anything; they are boldly asserting human insignificance.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-ts-4',
      text: `Read the following excerpt:
"The majestic blue whale, a leviathan of the deep, glides through the frigid waters with a grace that belies its immense size. Its haunting songs, echoing across thousands of miles of ocean, are a testament to the complex, hidden world beneath the wavesâ€”a world we have only just begun to fathom."

The style of this passage is primarily:`,
      options: [
        { id: 'A', text: 'Analytical' },
        { id: 'B', text: 'Argumentative' },
        { id: 'C', text: 'Descriptive' },
        { id: 'D', text: 'Satirical' }
      ],
      correctAnswer: 'C',
      hint: 'Look at the word choices: "majestic," "leviathan," "frigid," "haunting." What is the author trying to do?',
      explanation: 'The passage uses rich imagery and adjectives to paint a vivid picture of the blue whale and its environment. It is describing a scene, making it primarily descriptive.',
      wrongExplanations: {
        'A': 'An analytical style would break down the whale\'s biology or song frequencies with data.',
        'B': 'The author is not trying to persuade the reader of a controversial point.',
        'D': 'There is no mockery or humor here.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-ts-5',
      text: `Read the following excerpt:
"It is utterly baffling that in the 21st century, we still rely on an electoral system designed by men who traveled by horse and buggy. The Electoral College doesn't protect rural voters; it disenfranchises millions, distorts the popular will, and routinely hands power to the runner-up. To call this 'democracy' is a linguistic farce."

The author's tone can best be described as:`,
      options: [
        { id: 'A', text: 'Vehement and scathing' },
        { id: 'B', text: 'Analytical and detached' },
        { id: 'C', text: 'Nostalgic and wistful' },
        { id: 'D', text: 'Ambivalent and uncertain' }
      ],
      correctAnswer: 'A',
      hint: 'Look at the strong emotional words: "utterly baffling," "linguistic farce," "disenfranchises."',
      explanation: 'The author uses extremely strong, passionate, and harsh language to criticize the Electoral College. "Vehement" means showing strong feeling, and "scathing" means bitterly harsh. This perfectly matches the passage.',
      wrongExplanations: {
        'B': 'The author is heavily invested and emotional, not detached.',
        'C': 'The author mocks the past ("horse and buggy"), they do not miss it (nostalgia).',
        'D': 'The author is absolutely certain of their opinion.'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-ts-6',
      text: `Read the following excerpt:
"One might argue that the CEO's decision to lay off 10,000 workers while accepting a $20 million bonus was a stroke of absolute genius. After all, why should the captain go down with the ship when he can simply buy a golden life raft and watch the crew drown from a safe distance?"

The tone of the passage is:`,
      options: [
        { id: 'A', text: 'Laudatory' },
        { id: 'B', text: 'Vindicative' },
        { id: 'C', text: 'Sardonic' },
        { id: 'D', text: 'Pedestrian' }
      ],
      correctAnswer: 'C',
      hint: 'Is the author actually praising the CEO, or using dark humor to criticize them?',
      explanation: 'The author calls the decision a "stroke of absolute genius" but follows it with a dark, mocking metaphor about watching the crew drown. This grim, cynical mocking is the definition of a sardonic tone.',
      wrongExplanations: {
        'A': 'Laudatory means praising. The praise here is fake (irony/sarcasm).',
        'B': 'Vindicative means seeking revenge. The author is mocking, not threatening revenge.',
        'D': 'Pedestrian means dull or boring. The vivid metaphor makes this passage anything but dull.'
      },
      difficulty: 'hard'
    }
  ]
};

