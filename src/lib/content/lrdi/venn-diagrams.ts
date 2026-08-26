import { TopicContent } from '../types';

export const vennDiagrams: TopicContent = {
  id: 'd3',
  name: 'Venn Diagrams',
  section: 'lrdi',
  lessons: [
    {
      id: 'vd-1',
      title: 'Introduction to Venn Diagrams',
      content: `### Organizing Overlaps
Venn diagrams are used to organize groups that have overlapping members. 
For example: In a class, some students play Football (Set A), some play Basketball (Set B), some play both, and some play neither.

Instead of keeping track of confusing numbers, we draw intersecting circles.`
    },
    {
      id: 'vd-2',
      title: 'The 2-Set Venn Formula',
      content: `### The Magic Equation
For any two sets A and B, let:
* **Total** = The entire population
* **None** = People who belong to neither set

The fundamental formula is:
**Total = Only A + Only B + Both + None**

Alternatively, using standard set notation:
**Total - None = n(A) + n(B) - n(A âˆ© B)**

Why do we subtract the intersection? Because when you add everyone in circle A and everyone in circle B, you count the people in the middle *twice*! Subtracting it once fixes the double-counting.`
    },
    {
      id: 'vd-3',
      title: 'The 3-Set Venn Diagram',
      content: `### Three Intersecting Circles
When three sets (A, B, C) intersect, you get a beautiful flower-like diagram with 8 distinct regions:
1. Only A
2. Only B
3. Only C
4. Only A & B
5. Only B & C
6. Only A & C
7. All three (A & B & C)
8. None

**The Formula:**
Total = n(A) + n(B) + n(C) - (Aâˆ©B + Bâˆ©C + Aâˆ©C) + (Aâˆ©Bâˆ©C) + None.
*Note: Aâˆ©B includes people who are in all three! If you use the "Only" regions, you just add them all up directly.*`
    },
    {
      id: 'vd-4',
      title: 'Maxima and Minima Concepts',
      content: `### "At least" and "At most"
CAT loves to ask boundary questions.
"What is the maximum possible number of students who play all three sports?"

**How to solve:**
Imagine shifting the circles. 
* To maximize the intersection, push the circles on top of each other as much as possible.
* To minimize the intersection, pull the circles apart as much as possible, pushing people into the "Only" regions or the "None" region.`
    }
  ],
  practice: [
    {
      id: 'vd-q1',
      text: 'In a class of 50 students, 30 like Tea, 25 like Coffee, and 10 like both. How many students like neither?',
      options: [
        { id: 'A', text: '5', isCorrect: true, explanation: 'Total = n(T) + n(C) - Both + None. 50 = 30 + 25 - 10 + None. 50 = 45 + None. None = 5.' },
        { id: 'B', text: '10', isCorrect: false, explanation: 'Check the formula.' },
        { id: 'C', text: '15', isCorrect: false, explanation: 'You forgot to subtract the intersection.' },
        { id: 'D', text: '0', isCorrect: false, explanation: 'Math doesn\'t add up.' }
      ],
      hint: 'Use the formula: Total = n(Tea) + n(Coffee) - n(Both) + None.',
      explanation: 'People who like at least one = 30 (Tea) + 25 (Coffee) - 10 (Both) = 45. \nSince there are 50 students in total, the number of students who like neither = 50 - 45 = 5.'
    },
    {
      id: 'vd-q2',
      text: 'Out of 100 people, 60 own a car, 50 own a bike. Everyone owns at least one. How many own exactly one vehicle?',
      options: [
        { id: 'A', text: '10', isCorrect: false, explanation: 'That\'s the number who own BOTH.' },
        { id: 'B', text: '90', isCorrect: true, explanation: 'Let\'s find "Both" first. 100 = 60 + 50 - Both. Both = 10. Only Car = 50. Only Bike = 40. Total exactly one = 90.' },
        { id: 'C', text: '100', isCorrect: false, explanation: 'Some own both.' },
        { id: 'D', text: '110', isCorrect: false, explanation: 'Exceeds total population.' }
      ],
      hint: 'First find how many own BOTH. Then subtract that from the Car total and Bike total to find "Only Car" and "Only Bike".',
      explanation: 'Since everyone owns at least one, None = 0. \nTotal = Car + Bike - Both. \n100 = 60 + 50 - Both => Both = 10. \nPeople who own ONLY a car = 60 - 10 = 50. \nPeople who own ONLY a bike = 50 - 10 = 40. \nPeople who own EXACTLY one = Only Car + Only Bike = 50 + 40 = 90.'
    },
    {
      id: 'vd-q3',
      text: 'In a group of 80, 40 play cricket, 35 play football, and 15 play neither. How many play only cricket?',
      options: [
        { id: 'A', text: '10', isCorrect: false, explanation: 'That is the number who play BOTH.' },
        { id: 'B', text: '25', isCorrect: false, explanation: 'That is the number who play ONLY football.' },
        { id: 'C', text: '30', isCorrect: true, explanation: 'Find both first: 80 - 15 = 65. 65 = 40 + 35 - Both. Both = 10. Only cricket = 40 - 10 = 30.' },
        { id: 'D', text: '40', isCorrect: false, explanation: '40 is the total who play cricket, including those who also play football.' }
      ],
      hint: 'Find the "Both" intersection first. Then subtract it from total Cricket players.',
      explanation: 'Total = 80. Neither = 15. So, people playing at least one sport = 80 - 15 = 65. \nFormula: 65 = Cricket(40) + Football(35) - Both. \n65 = 75 - Both => Both = 10. \nOnly Cricket = Total Cricket - Both = 40 - 10 = 30.'
    },
    {
      id: 'vd-q4',
      text: 'In a 3-set Venn diagram, 10 people like all three. 20 like only A & B. 15 like only B & C. 5 like only A & C. How many people like EXACTLY two things?',
      options: [
        { id: 'A', text: '40', isCorrect: true, explanation: 'Just add the "only 2" regions: 20 + 15 + 5 = 40.' },
        { id: 'B', text: '50', isCorrect: false, explanation: 'You included the people who like all three.' },
        { id: 'C', text: '30', isCorrect: false, explanation: 'Math error.' },
        { id: 'D', text: '70', isCorrect: false, explanation: 'Way off.' }
      ],
      hint: 'The question asks for EXACTLY two. The regions "only A&B", "only B&C", and "only A&C" represent exactly two.',
      explanation: 'The regions for exactly two things are: (Only A & B), (Only B & C), and (Only A & C). \nThe problem explicitly gives these values! \nExactly two = 20 + 15 + 5 = 40. The 10 people who like all three are excluded because they like THREE things, not exactly two.'
    },
    {
      id: 'vd-q5',
      text: 'If n(A) = 40 and n(B) = 30, and Total = 100, what is the maximum possible value for n(A âˆ© B)?',
      options: [
        { id: 'A', text: '40', isCorrect: false, explanation: 'If intersection is 40, all of B (which is 30) plus some more must be inside A. But B only has 30 people!' },
        { id: 'B', text: '30', isCorrect: true, explanation: 'The intersection cannot be larger than the smallest set. If the entire B circle is inside the A circle, the intersection is 30.' },
        { id: 'C', text: '70', isCorrect: false, explanation: 'That\'s the maximum union, not intersection.' },
        { id: 'D', text: '0', isCorrect: false, explanation: 'That is the minimum possible intersection (since 40+30 < 100, they don\'t have to overlap).' }
      ],
      hint: 'To maximize the overlap between two circles, push the smaller circle entirely inside the larger circle.',
      explanation: 'The intersection n(A âˆ© B) represents people in both sets. The maximum number of people who can be in both sets is limited by the size of the smaller set. Set B has 30 people. If all 30 of them are also in Set A, the intersection is 30. It cannot be more than 30.'
    },
    {
      id: 'vd-q6',
      text: 'In a group of 100, 70 like Math, 80 like English. What is the MINIMUM number of people who MUST like both?',
      options: [
        { id: 'A', text: '0', isCorrect: false, explanation: 'If 0 liked both, Total would be 70 + 80 = 150. But there are only 100 people.' },
        { id: 'B', text: '50', isCorrect: true, explanation: 'To minimize the intersection, set None = 0. Total = M + E - Both. 100 = 70 + 80 - Both. Both = 50.' },
        { id: 'C', text: '70', isCorrect: false, explanation: 'That is the maximum possible intersection.' },
        { id: 'D', text: '10', isCorrect: false, explanation: 'Incorrect.' }
      ],
      hint: 'To minimize overlap, spread the circles out as far as possible until they fill up the entire population (None = 0).',
      explanation: 'To minimize the intersection, we must assume everyone likes at least one (None = 0). \nUsing the formula: Total = n(M) + n(E) - n(Both) \n100 = 70 + 80 - Both \n100 = 150 - Both \nBoth = 50. So at least 50 people are forced to be in the overlap because 70+80 exceeds the total capacity by 50.'
    }
  ]
};

