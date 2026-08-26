import { TopicContent } from '../types';

export const paraSummary: TopicContent = {
  id: 'va2',
  name: 'Para Summary',
  section: 'varc',
  description: 'Learn how to distill a complex paragraph into its most essential, accurate core message.',
  lessons: [
    {
      id: 'ps-1',
      title: 'The Art of Summarizing',
      content: `### Distilling the Essence

A Para Summary question gives you a short paragraph and asks you to choose the one option that best captures its essence. 

Think of it like a Twitter (X) character limit: If you had to explain this paragraph to a friend in one sentence, what would you say?

A perfect summary must contain:
1. The **main subject** of the paragraph.
2. The **author's core argument** or primary conclusion about that subject.`
    },
    {
      id: 'ps-2',
      title: 'Key Points vs. Examples',
      content: `### Cutting the Fat

Paragraphs are full of "fluff" designed to illustrate the main point:
- Data and statistics (e.g., "78% of people...")
- Examples (e.g., "Like the French Revolution...")
- Anecdotes (e.g., "When John went to the store...")

**Rule of Thumb**: Do NOT choose a summary option if it focuses heavily on an example. A good summary focuses on the *rule*, not the *example*.`
    },
    {
      id: 'ps-3',
      title: 'Elimination Techniques',
      content: `### How to Spot Fake Summaries

Use the acronym **B.O.M.B.** to eliminate bad options:

- **B - Broad**: The option is too general and misses the specific nuance of the paragraph.
- **O - Out of Scope**: The option introduces new information not mentioned in the text.
- **M - Missing**: The option completely leaves out half of the author's main argument.
- **B - Biased**: The option changes the author's tone (e.g., changing a "possibility" into a "certainty").`
    },
    {
      id: 'ps-4',
      title: 'The "Math" of a Summary',
      content: `### A + B = Summary

Many paragraphs have a two-part structure:
*Part A (Problem) + Part B (Solution)*
*Part A (Old Theory) + Part B (New Theory)*

If the paragraph discusses both A and B, the correct summary *must* include both A and B. An option that perfectly summarizes A but ignores B is wrong.`
    }
  ],
  practice: [
    {
      id: 'q-ps-1',
      text: `Read the following paragraph:
"The widespread adoption of remote work during the pandemic proved that employees do not need to be tethered to a cubicle to be productive. In fact, many companies reported record profits during this period. However, this shift has also resulted in the erosion of corporate culture and a significant increase in employee feelings of isolation and burnout. Managers are now realizing that while output has been maintained, the long-term psychological health of their workforce is deteriorating."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Remote work led to record corporate profits but should be banned due to employee burnout.' },
        { id: 'B', text: 'While remote work has proven to be highly productive, it negatively impacts corporate culture and employee mental health.' },
        { id: 'C', text: 'Companies are forcing employees to return to the office because remote work causes severe isolation.' },
        { id: 'D', text: 'The pandemic showed that traditional cubicle work environments are entirely obsolete.' }
      ],
      correctAnswer: 'B',
      hint: 'The paragraph has a two-part structure: The positive (productivity) and the negative (isolation/culture). The summary must capture both.',
      explanation: 'The paragraph states that remote work is productive (Part A) but causes isolation and harms corporate culture (Part B). Option B accurately balances both of these core points.',
      wrongExplanations: {
        'A': 'The passage never suggests remote work should be "banned" (Out of Scope / Extreme).',
        'C': 'The passage doesn\'t mention forcing employees back to the office (Out of Scope).',
        'D': 'This captures the first sentence but completely ignores the second half of the paragraph regarding the negative impacts (Missing).'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-ps-2',
      text: `Read the following paragraph:
"Fast fashion brands rely on a business model of rapid production cycles and artificially low prices to encourage constant consumption. By releasing new collections weekly, they create a psychological urgency in consumers to buy trends before they disappear. However, this hyper-consumerism generates millions of tons of textile waste annually and relies on exploitative labor practices in developing nations to maintain those low costs."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Fast fashion creates psychological urgency by releasing new collections every week.' },
        { id: 'B', text: 'The fast fashion industry exploits workers in developing nations to keep clothing prices artificially low.' },
        { id: 'C', text: 'The fast fashion business model, driven by rapid production and constant consumption, results in severe environmental and ethical consequences.' },
        { id: 'D', text: 'Consumers should stop buying fast fashion because it generates millions of tons of textile waste.' }
      ],
      correctAnswer: 'C',
      hint: 'Identify the business model described and the two specific negative outcomes mentioned at the end.',
      explanation: 'The paragraph explains the business model (rapid production/consumption) and its consequences (textile waste [environmental] and exploitative labor [ethical]). Option C perfectly encapsulates both the cause and the dual effects.',
      wrongExplanations: {
        'A': 'This is too narrow; it only summarizes one supporting detail (how they create urgency).',
        'B': 'This only summarizes the ethical consequence, ignoring the business model explanation and the environmental waste.',
        'D': 'The passage does not explicitly tell consumers to "stop buying" (Out of scope/prescription). It just states the facts.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-ps-3',
      text: `Read the following paragraph:
"Historically, historians viewed the fall of the Roman Empire as a catastrophic, sudden collapse triggered by barbarian invasions in 476 AD. Modern historians, however, prefer the term 'Late Antiquity,' arguing that the period was characterized by a gradual transformation and blending of Roman and Germanic cultures rather than a violent rupture. They point to the continuity of Roman legal systems and Christian institutions long after the political administration in Rome had dissolved."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Modern historians have proven that the barbarian invasions of 476 AD never actually happened.' },
        { id: 'B', text: 'Unlike the historical view of a sudden collapse, modern historians view the fall of Rome as a gradual cultural transformation.' },
        { id: 'C', text: 'The survival of Roman legal systems and Christian institutions proves that the Roman Empire never truly fell.' },
        { id: 'D', text: 'The term "Late Antiquity" was created to describe the violent rupture between Roman and Germanic cultures.' }
      ],
      correctAnswer: 'B',
      hint: 'Contrast the old view (sudden collapse) with the new view (gradual transformation).',
      explanation: 'The paragraph explicitly contrasts the old historical view (sudden collapse) with the modern view (gradual transformation). Option B captures this core contrast perfectly.',
      wrongExplanations: {
        'A': 'The passage doesn\'t say the invasions didn\'t happen, just that they weren\'t the sole cause of a sudden collapse.',
        'C': 'This is an extreme interpretation of a supporting detail. The passage says the administration dissolved, not that the empire "never truly fell."',
        'D': 'This is factually backwards based on the text. Late antiquity describes a blending, *not* a violent rupture.'
      },
      difficulty: 'medium'
    },
    {
      id: 'q-ps-4',
      text: `Read the following paragraph:
"A fundamental paradox of democracy is that it requires an informed citizenry to function effectively, yet human psychology is inherently prone to confirmation bias. Voters naturally seek out information that validates their pre-existing beliefs and actively dismiss factual evidence that contradicts them. Consequently, in an age of fragmented media and algorithmic echo chambers, achieving the baseline level of objective shared reality necessary for democratic deliberation is becoming increasingly impossible."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Democracy is failing because modern algorithmic echo chambers prevent voters from accessing factual information.' },
        { id: 'B', text: 'Human confirmation bias, exacerbated by modern media, undermines the informed citizenry that a functional democracy requires.' },
        { id: 'C', text: 'Voters must actively fight against their natural confirmation bias if they want to participate in democratic deliberation.' },
        { id: 'D', text: 'The fragmentation of media has caused a paradox where voters are both highly informed and highly biased.' }
      ],
      correctAnswer: 'B',
      hint: 'Connect the requirement of democracy, the human psychological flaw, and the modern exacerbating factor.',
      explanation: 'The paragraph states democracy needs informed citizens (requirement), but confirmation bias prevents this (flaw), and modern media echo chambers make it worse (exacerbation), threatening democracy. Option B captures this exact logical chain.',
      wrongExplanations: {
        'A': 'This blames echo chambers entirely, missing the core point that *human psychology* (confirmation bias) is the root cause.',
        'C': 'This is prescriptive (telling voters what to do), whereas the passage is descriptive (explaining why the situation is bad).',
        'D': 'The passage does not say voters are highly informed; it says the opposite (they lack objective shared reality).'
      },
      difficulty: 'hard'
    },
    {
      id: 'q-ps-5',
      text: `Read the following paragraph:
"The concept of 'rewilding' involves reintroducing apex predators, such as wolves, into ecosystems from which they have been eradicated. While local farmers fiercely oppose this practice due to the threat to livestock, ecologists argue it is necessary to restore ecological balance. Without predators, herbivore populations like deer explode, leading to overgrazing, the destruction of saplings, and the subsequent decline of forest habitats and the diverse species that rely on them."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Rewilding is opposed by farmers but supported by ecologists who want to increase wolf populations.' },
        { id: 'B', text: 'Despite farmer opposition, ecologists advocate rewilding apex predators to prevent herbivore overpopulation from destroying ecosystems.' },
        { id: 'C', text: 'The eradication of apex predators has caused deer populations to explode and destroy forest habitats.' },
        { id: 'D', text: 'Rewilding is a controversial practice because wolves frequently attack livestock, angering local farmers.' }
      ],
      correctAnswer: 'B',
      hint: 'Include the action (rewilding), the conflict (farmers vs ecologists), and the reason (restoring ecosystem balance).',
      explanation: 'The paragraph covers what rewilding is, the conflict (farmers vs ecologists), and the ecological justification (preventing overgrazing/ecosystem destruction). Option B includes all three critical elements.',
      wrongExplanations: {
        'A': 'Too simplistic. It misses *why* ecologists support it (ecosystem balance/preventing overgrazing).',
        'C': 'This only summarizes the problem, completely ignoring the solution ("rewilding") and the conflict with farmers.',
        'D': 'This only summarizes the farmer\'s perspective, ignoring the ecological benefits which form the second half of the paragraph.'
      },
      difficulty: 'easy'
    },
    {
      id: 'q-ps-6',
      text: `Read the following paragraph:
"Standardized testing was originally championed in the early 20th century as a great equalizer, a meritocratic tool designed to identify brilliant students from lower-class backgrounds who would otherwise be overlooked by elite universities. Today, however, the tests largely correlate with household income. Wealthy families can afford expensive test-prep tutors, multiple testing attempts, and private psychoeducational evaluations for extended time accommodations, effectively transforming a tool of meritocracy into an instrument for entrenched privilege."

Which of the following best summarizes the paragraph?`,
      options: [
        { id: 'A', text: 'Standardized testing no longer identifies brilliant students from lower-class backgrounds.' },
        { id: 'B', text: 'Wealthy families use test-prep tutors and extended time accommodations to cheat on standardized tests.' },
        { id: 'C', text: 'Originally intended to promote meritocracy, standardized testing has become a system that reinforces economic inequality.' },
        { id: 'D', text: 'Elite universities created standardized tests to keep lower-class students out of higher education.' }
      ],
      correctAnswer: 'C',
      hint: 'What was the original goal of the tests, and what is the current reality?',
      explanation: 'The paragraph contrasts the original intent (meritocracy/equalizer) with the current reality (correlates with income/entrenches privilege). Option C perfectly captures this ironic historical shift.',
      wrongExplanations: {
        'A': 'While true, this misses the second half of the paragraph explaining *why* (wealthy advantages) and the conclusion that it entrenches privilege.',
        'B': 'The passage does not accuse them of "cheating," only of using expensive advantages. (Biased word choice).',
        'D': 'This contradicts the passage. The passage says the tests were originally championed to *help* lower-class students, not keep them out.'
      },
      difficulty: 'medium'
    }
  ]
};

