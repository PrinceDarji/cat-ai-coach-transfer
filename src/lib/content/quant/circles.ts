import { TopicContent } from '../types';

export const circles: TopicContent = {
  id: 'q9',
  name: 'Circles',
  section: 'quant',
  lessons: [
    {
      title: 'Circle Basics',
      content: `### The Perfect Shape
A circle is all points equidistant from a center point.
- **Radius ($r$):** Distance from center to edge.
- **Diameter ($d$):** Straight line across the center ($d = 2r$).
- **Circumference:** The perimeter of the circle. $C = 2\\pi r$.
- **Area:** $A = \\pi r^2$.`
    },
    {
      title: 'Arcs and Sectors',
      content: `### Slices of the Pie
An **Arc** is a piece of the circumference. A **Sector** is a pie-slice of the area.
If the central angle of the slice is $\\theta$ degrees:

- **Arc Length:** $\\frac{\\theta}{360} \\times 2\\pi r$
- **Area of Sector:** $\\frac{\\theta}{360} \\times \\pi r^2$`
    },
    {
      title: 'Chord Properties',
      content: `### Lines Inside the Circle
A chord is a line connecting any two points on the circle.
- The longest chord is the diameter.
- A perpendicular dropped from the center to a chord **bisects** the chord (cuts it exactly in half).
- Equal chords are equidistant from the center.`
    },
    {
      title: 'Tangent Properties',
      content: `### Touching the Edge
A tangent touches the circle at exactly one point.
- A radius drawn to the point of tangency is **perpendicular (90Â°)** to the tangent.
- If you draw two tangents from an outside point to a circle, their lengths are exactly equal.
- **Alternate Segment Theorem:** The angle between a tangent and a chord through the point of contact is equal to the angle in the alternate segment.`
    },
    {
      title: 'Inscribed Angles',
      content: `### Angles in the Circle
- An angle inscribed at the circumference is **half** the angle at the center subtended by the same arc.
- Angles subtended by the same arc at any point on the remaining part of the circle are equal.
- An angle inscribed in a semi-circle (subtended by the diameter) is always **90Â°**.`
    }
  ],
  practice: [
    {
      id: 'q9_1',
      text: 'The area of a circle is 154 sq cm. What is its circumference? (Take Ï€ = 22/7)',
      options: ['22 cm', '44 cm', '88 cm', '66 cm'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'First find the radius using Area = Ï€r^2, then use Circumference = 2Ï€r.',
      explanation: 'Area = Ï€r^2 = 154.\n(22/7) * r^2 = 154\nr^2 = 154 * 7 / 22 = 7 * 7 = 49.\nRadius (r) = 7 cm.\nCircumference = 2Ï€r = 2 * (22/7) * 7 = 44 cm.',
      wrongExplanations: [
        'Used Ï€r instead of 2Ï€r.',
        '',
        'Multiplied by 2 again by mistake.',
        'Arithmetic error.'
      ]
    },
    {
      id: 'q9_2',
      text: 'A chord of length 16 cm is drawn in a circle of radius 10 cm. Find the distance of the chord from the center of the circle.',
      options: ['6 cm', '8 cm', '10 cm', '12 cm'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Draw a perpendicular from the center to the chord. It bisects the chord. Use Pythagoras theorem.',
      explanation: 'A perpendicular from the center bisects the chord. So half-chord = 16/2 = 8 cm.\nThis forms a right-angled triangle with hypotenuse = radius = 10 cm, base = 8 cm, and height = distance from center (d).\nd^2 + 8^2 = 10^2\nd^2 + 64 = 100\nd^2 = 36 => d = 6 cm.',
      wrongExplanations: [
        '',
        'This is the half-chord length.',
        'This is the radius.',
        'Arithmetic error.'
      ]
    },
    {
      id: 'q9_3',
      text: 'Two tangents are drawn to a circle from an external point P. If the angle between the tangents is 60Â° and the radius is 5 cm, what is the length of the tangents?',
      options: ['5 cm', '5âˆš3 cm', '10 cm', '10âˆš3 cm'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Draw a line from P to the center. It bisects the 60Â° angle. Use trigonometry (tan 30Â°) in the right triangle.',
      explanation: 'Let center be O, tangent point be A. Triangle OAP is a right triangle (radius is perpendicular to tangent). \nThe line OP bisects the 60Â° angle, so angle OPA = 30Â°.\nIn Î”OAP, tan(30Â°) = Opposite(OA) / Adjacent(PA)\n1/âˆš3 = 5 / PA\nPA = 5âˆš3 cm.',
      wrongExplanations: [
        'Assumed length equals radius.',
        '',
        'Used sin 30Â° instead of tan 30Â°.',
        'Used wrong trigonometric ratio.'
      ]
    },
    {
      id: 'q9_4',
      text: 'An angle inscribed in a semi-circle is:',
      options: ['45Â°', '60Â°', '90Â°', '120Â°'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'The angle at the center for a straight line (diameter) is 180Â°. The inscribed angle is half of that.',
      explanation: 'A fundamental theorem of circles: Any angle subtended by the diameter at the circumference is always a right angle (90Â°). This is because the angle at the center is a straight line (180Â°), and the angle at the circumference is half of the center angle.',
      wrongExplanations: [
        'Half of 90, incorrect theorem application.',
        'Equilateral triangle angle, not applicable here.',
        '',
        'Obtuse angle, impossible in a semi-circle.'
      ]
    },
    {
      id: 'q9_5',
      text: 'Find the area of a sector of a circle with radius 6 cm if the angle of the sector is 60Â°. (Leave answer in terms of Ï€)',
      options: ['3Ï€', '6Ï€', '12Ï€', '36Ï€'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Area of sector = (Î¸/360) * Ï€r^2.',
      explanation: 'Radius r = 6. Angle Î¸ = 60Â°.\nArea = (60/360) * Ï€ * (6)^2\n= (1/6) * Ï€ * 36\n= 6Ï€ sq cm.',
      wrongExplanations: [
        'Used Ï€r instead of Ï€r^2.',
        '',
        'Did not divide by 360 properly.',
        'This is the area of the entire circle.'
      ]
    },
    {
      id: 'q9_6',
      text: 'In a circle with center O, AB is a chord. If angle AOB is 80Â°, what is the angle subtended by the chord AB at a point on the major arc?',
      options: ['40Â°', '80Â°', '160Â°', '100Â°'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'The angle at the circumference is half the angle at the center.',
      explanation: 'The angle subtended by an arc at the center is double the angle subtended by it at any remaining part of the circle.\nAngle at center = 80Â°.\nAngle at major arc = 80Â° / 2 = 40Â°.',
      wrongExplanations: [
        '',
        'Angle at circumference is not equal to center angle.',
        'Multiplied by 2 instead of dividing.',
        'Used cyclic quadrilateral property incorrectly (180-80).'
      ]
    }
  ]
};

