import { TopicContent } from '../types';

export const bloodRelations: TopicContent = {
  id: 'l3',
  name: 'Blood Relations',
  section: 'lrdi',
  lessons: [
    {
      id: 'br-1',
      title: 'Introduction to Blood Relations',
      content: `### Who is my Father's Brother's Son?
Blood relations questions test your ability to map out family connections. While they might seem confusing when written as a long paragraph ("Pointing to a photograph, a man said..."), they become trivial once you learn to draw a Family Tree.

**Core Vocabulary:**
* **Maternal**: Related through the mother (Maternal uncle = Mother's brother).
* **Paternal**: Related through the father (Paternal grandfather = Father's father).
* **Sibling**: Brother or sister.
* **Spouse**: Husband or wife.
* **Nephew/Niece**: Son/daughter of a sibling.
* **Cousin**: Son/daughter of an uncle/aunt. (Never "cousin brother" or "cousin sister"â€”just cousin).`
    },
    {
      id: 'br-2',
      title: 'The Family Tree Notation',
      content: `### Drawing the Tree
To solve these quickly, use a standard set of symbols. Here is the most common system used by CAT toppers:

1. **Gender**:
   * **Square (or \`+\`)**: Male
   * **Circle (or \`-\`)**: Female
   * **No symbol**: Gender unknown! (Crucial: Do NOT assume gender from a name like "Priya" or "Rahul" unless stated).

2. **Generations**:
   * Draw children below their parents. Use a vertical line \`|\` to connect generations.

3. **Relationships**:
   * **Siblings**: Connect with a horizontal dash \`-\`. (e.g., \`A - B\`)
   * **Marriage**: Connect with a double line \`=\` or a plus sign inside a box. (e.g., \`A = B\`)

When you map a paragraph using these symbols, the final answer stares right back at you.`
    },
    {
      id: 'br-3',
      title: 'Coded Blood Relations',
      content: `### Cracking the Code
A modern favorite in competitive exams is the "Coded" blood relation. 

*Example:*
* A + B means A is the father of B.
* A - B means A is the wife of B.
* A * B means A is the brother of B.

**Question:** What does P * Q + R - S mean?

**How to solve:**
Break it down piece by piece from left to right.
1. \`P * Q\`: P is the brother of Q. (Draw P as male, connect horizontally to Q).
2. \`Q + R\`: Q is the father of R. (Draw Q as male, vertical line down to R).
3. \`R - S\`: R is the wife of S. (Draw R as female, double line to S, S must be male).

Now you have a full tree and can answer any question about how P relates to S (P is the wife's uncle? No, P is the father's brother... wait, let's look at the tree! P is brother of Q. Q is father of R. So P is R's uncle. R is wife of S. So P is S's wife's uncle!).`
    },
    {
      id: 'br-4',
      title: 'Common Traps and Gender Assumptions',
      content: `### Don't Fall for It!

**Trap 1: The Name Game**
"Kiran is the child of M. Kiran's brother is P." What is Kiran's gender?
*Answer*: Unknown! Kiran could be a boy or a girl. Never assume based on real-world names.

**Trap 2: "The Only Son/Daughter"**
If someone says "He is the only son of my father," the speaker is referring to themselves IF the speaker is male. If the speaker is female, she is referring to her brother!

**Trap 3: In-laws and "Spouse's Sibling"**
"Brother-in-law" can mean two things:
1. Your sister's husband.
2. Your spouse's brother.
Always consider both possibilities if the tree feels stuck.`
    }
  ],
  practice: [
    {
      id: 'br-q1',
      text: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
      options: [
        { id: 'A', text: 'Brother', isCorrect: false, explanation: 'Suresh is the father, not the brother.' },
        { id: 'B', text: 'Uncle', isCorrect: false, explanation: 'If Suresh had a brother, he could be an uncle. But Suresh is the *only* son.' },
        { id: 'C', text: 'Father', isCorrect: true, explanation: 'Let\'s break it down: "My mother\'s only son" = Suresh himself (since Suresh is male). So the boy is the "son of Suresh". Therefore, Suresh is the father of the boy.' },
        { id: 'D', text: 'Cousin', isCorrect: false, explanation: 'Incorrect generation level.' }
      ],
      hint: 'Work backward from "my mother". Who is the only son of Suresh\'s mother?',
      explanation: 'Start at the end of the quote: "my mother". Suresh is a male. The "only son of my mother" must be Suresh himself. Substitute that back into the sentence: "He is the son of [Suresh]". Thus, the boy is Suresh\'s son. The question asks how Suresh is related to the boy. Suresh is his father.'
    },
    {
      id: 'br-q2',
      text: 'If A + B means A is the mother of B; A - B means A is the brother of B; A % B means A is the father of B and A x B means A is the sister of B. Which of the following shows that P is the maternal uncle of Q?',
      options: [
        { id: 'A', text: 'P - M + N x Q', isCorrect: true, explanation: 'Let\'s trace this: P - M means P is the brother of M. M + N means M is the mother of N. N x Q means N is the sister of Q. So M is the mother of Q, and P is M\'s brother. Thus P is the maternal uncle of Q. This is correct!' },
        { id: 'B', text: 'P + S x N - Q', isCorrect: false, explanation: 'P + S means P is the mother of S. A mother cannot be a maternal uncle (wrong gender).' },
        { id: 'C', text: 'P - M % N x Q', isCorrect: false, explanation: 'M % N means M is the father of N. P is brother of M. So P is the paternal uncle, not maternal.' },
        { id: 'D', text: 'Q - N + M x P', isCorrect: false, explanation: 'This makes Q the brother of N, completely changing the relationship direction.' }
      ],
      hint: 'Maternal uncle means mother\'s brother. You need P to be a brother (-) of someone who is a mother (+) of Q (or Q\'s sibling).',
      explanation: 'We need P to be male (brother) and connected to Q\'s mother. Let\'s check Option A: P - M + N x Q. \n1. P - M: P is brother of M. (P is Male).\n2. M + N: M is mother of N. (M is Female).\n3. N x Q: N is sister of Q.\nSince N and Q are siblings and M is N\'s mother, M is also Q\'s mother. P is the brother of M (Q\'s mother). Therefore, P is the maternal uncle of Q.'
    },
    {
      id: 'br-q3',
      text: 'A is the brother of B. B is the sister of C. C is the father of D. How is D related to A?',
      options: [
        { id: 'A', text: 'Nephew', isCorrect: false, explanation: 'D could be a nephew if D is male, but we don\'t know D\'s gender.' },
        { id: 'B', text: 'Niece', isCorrect: false, explanation: 'D could be a niece if D is female, but we don\'t know D\'s gender.' },
        { id: 'C', text: 'Cannot be determined', isCorrect: true, explanation: 'D\'s gender is never stated. D could be a nephew or a niece.' },
        { id: 'D', text: 'Uncle', isCorrect: false, explanation: 'A is the uncle of D. The question asks how D is related to A.' }
      ],
      hint: 'Draw the tree. Pay close attention to whether the text specifies the gender of EVERY person.',
      explanation: 'A is male (brother). B is female (sister). C is male (father). They are all siblings. C is the father of D. This makes A the uncle of D. However, the question asks "How is D related to A?". D is the child of A\'s brother (C). So D is either the nephew or niece of A. Since D\'s gender is not mentioned, it cannot be determined.'
    },
    {
      id: 'br-q4',
      text: 'Read the information: 1) P is the husband of Q. 2) R is the mother of S and Q. How is R related to P?',
      options: [
        { id: 'A', text: 'Mother', isCorrect: false, explanation: 'R is Q\'s mother, not P\'s mother.' },
        { id: 'B', text: 'Sister', isCorrect: false, explanation: 'Incorrect generation.' },
        { id: 'C', text: 'Mother-in-law', isCorrect: true, explanation: 'R is the mother of P\'s wife Q, making R the mother-in-law.' },
        { id: 'D', text: 'Aunt', isCorrect: false, explanation: 'Incorrect relationship.' }
      ],
      hint: 'If P is married to Q, and R is Q\'s parent, what do you call your spouse\'s parent?',
      explanation: 'P = Q. P is the husband (male), so Q is the wife (female). R is the mother of S and Q. This means R is a female in the generation above Q. Since R is the mother of P\'s wife Q, R is the mother-in-law of P.'
    },
    {
      id: 'br-q5',
      text: 'A family has 6 members: A, B, C, D, E, F. A and B are a married couple. A is a male. D is the only son of C, who is the brother of A. E is the sister of D. B is the daughter-in-law of F, whose husband has died. How is E related to C?',
      options: [
        { id: 'A', text: 'Daughter', isCorrect: true, explanation: 'C is the father of D. E is the sister of D. Thus, E is the daughter of C.' },
        { id: 'B', text: 'Sister', isCorrect: false, explanation: 'E is in a lower generation than C.' },
        { id: 'C', text: 'Niece', isCorrect: false, explanation: 'E would be the niece of A, but she is the daughter of C.' },
        { id: 'D', text: 'Mother', isCorrect: false, explanation: 'E is a child, not a parent.' }
      ],
      hint: 'Focus only on the parts mentioning C, D, and E. You might not need the whole family tree!',
      explanation: 'Let\'s isolate the relevant clues: "D is the only son of C". "E is the sister of D". Since D is C\'s son, and E is D\'s sister, E must be C\'s daughter. The rest of the information (about A, B, F) is extra and not strictly needed to answer this specific question. The correct answer is Daughter.'
    },
    {
      id: 'br-q6',
      text: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. Then, how is A related to D?',
      options: [
        { id: 'A', text: 'Grandmother', isCorrect: false, explanation: 'D is older than A.' },
        { id: 'B', text: 'Grandfather', isCorrect: false, explanation: 'D is the grandfather of A, but the question asks how A is related to D.' },
        { id: 'C', text: 'Daughter', isCorrect: false, explanation: 'A is two generations below D.' },
        { id: 'D', text: 'Granddaughter', isCorrect: true, explanation: 'A is the daughter of C, who is the daughter/son of D. A is a female, so she is the granddaughter.' }
      ],
      hint: 'Track the generations downwards from D to A.',
      explanation: 'D is the father of C. C is the mother of B. So D is the grandfather of B. A is B\'s sister, which means C is also A\'s mother. Since A is the daughter of C, and D is the father of C, D is A\'s grandfather. The question asks how A is related to D. Since A is female (sister), A is the granddaughter of D.'
    }
  ]
};

