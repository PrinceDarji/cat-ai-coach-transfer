import { TopicContent } from '../types';

export const tsd: TopicContent = {
  id: 'q3',
  name: 'Time, Speed & Distance',
  section: 'quant',
  lessons: [
    {
      title: 'The Golden Formula',
      content: `### Distance = Speed Ã— Time
Everything in this chapter boils down to this one simple relationship:
> **D = S Ã— T**

From this, we get:
- $S = D / T$
- $T = D / S$

**Unit Conversion (Crucial!):**
Often, speed is in km/hr but time is in seconds.
- To convert **km/hr to m/s**: Multiply by $\\frac{5}{18}$
- To convert **m/s to km/hr**: Multiply by $\\frac{18}{5}$

*Trick to remember:* km/hr to m/s goes from big to small, so the smaller number (5) is on top!`
    },
    {
      title: 'Average Speed (The Trap)',
      content: `### Average Speed is NOT the Average of Speeds
If you travel to a city at 40 km/hr and return at 60 km/hr, your average speed is NOT $\\frac{40+60}{2} = 50$ km/hr. You spent more time traveling at the slower speed!

**The Real Formula:**
> $\\text{Average Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}}$

**Shortcut for Equal Distances:**
If a person covers a distance at speed $a$ and returns the same distance at speed $b$, the average speed is:
> $\\text{Avg Speed} = \\frac{2ab}{a+b}$`
    },
    {
      title: 'Relative Speed',
      content: `### Objects Moving Together
When two objects are moving, we use Relative Speed to see how fast the distance between them is closing or widening.

- **Moving in Opposite Directions:** (They are coming toward each other, distance closes faster)
  > $\\text{Relative Speed} = S_1 + S_2$
- **Moving in Same Direction:** (One is chasing the other, distance closes slower)
  > $\\text{Relative Speed} = S_1 - S_2$ (where $S_1 > S_2$)`
    },
    {
      title: 'Trains Crossing',
      content: `### Train Problems
When a train crosses an object, the "distance" covered depends on the object.

1. **Crossing a Point Object (Man, Pole):**
   Distance covered = Length of the Train ($L_T$)
2. **Crossing a Long Object (Platform, Bridge, another Train):**
   Distance covered = Length of Train + Length of Object ($L_T + L_{Obj}$)

If crossing a moving object, use Relative Speed for the speed!`
    },
    {
      title: 'Boats and Streams',
      content: `### Going with the Flow
Let the speed of the boat in still water be $B$ and the speed of the stream/river be $S$.

- **Downstream (with the flow):** The river helps the boat.
  > $\\text{Speed Downstream } (D) = B + S$
- **Upstream (against the flow):** The river opposes the boat.
  > $\\text{Speed Upstream } (U) = B - S$

If you are given D and U, you can find the boat and stream speeds:
- $B = \\frac{D + U}{2}$
- $S = \\frac{D - U}{2}$`
    }
  ],
  practice: [
    {
      id: 'q3_1',
      text: 'A train 150m long is running at a speed of 90 km/hr. How much time will it take to cross a stationary pole?',
      options: ['4 seconds', '5 seconds', '6 seconds', '10 seconds'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'First, convert the speed to m/s. Then use Time = Distance / Speed. Distance = Length of the train.',
      explanation: 'Speed = 90 km/hr. Convert to m/s: 90 * (5/18) = 25 m/s. \nDistance = Length of train = 150m. \nTime = Distance / Speed = 150 / 25 = 6 seconds.',
      wrongExplanations: [
        'Divided incorrectly.',
        'Used a different multiplier for conversion.',
        '',
        'Did not convert units, just divided 150 by 90 arbitrarily.'
      ]
    },
    {
      id: 'q3_2',
      text: 'A car travels from point A to B at 60 km/hr and returns from B to A at 40 km/hr. What is the average speed for the whole journey?',
      options: ['50 km/hr', '48 km/hr', '45 km/hr', '52 km/hr'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Use the formula for average speed when distances are equal: 2ab / (a + b).',
      explanation: 'Since the distance from A to B and B to A is the same, use the formula:\nAverage Speed = 2ab / (a + b) \n= (2 * 60 * 40) / (60 + 40) \n= 4800 / 100 = 48 km/hr.',
      wrongExplanations: [
        'The most common trap! This is the simple arithmetic mean (60+40)/2, which is incorrect because more time is spent driving at 40 km/hr.',
        '',
        'Calculation error.',
        'Calculation error.'
      ]
    },
    {
      id: 'q3_3',
      text: 'Two trains, one 120m long and the other 180m long, are running on parallel tracks in opposite directions. The speed of the first is 50 km/hr and the second is 40 km/hr. In what time will they pass each other?',
      options: ['12 seconds', '15 seconds', '10 seconds', '20 seconds'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Total Distance = sum of train lengths. Relative Speed = sum of speeds (opposite directions).',
      explanation: 'Total Distance = L1 + L2 = 120 + 180 = 300m.\nRelative Speed (opposite directions) = 50 + 40 = 90 km/hr.\nConvert speed to m/s: 90 * (5/18) = 25 m/s.\nTime = Total Distance / Relative Speed = 300 / 25 = 12 seconds.',
      wrongExplanations: [
        '',
        'Used wrong conversion factor.',
        'Divided 300 by 30.',
        'Used relative speed for same direction (50-40 = 10).'
      ]
    },
    {
      id: 'q3_4',
      text: 'A man can row 15 km/hr in still water. If the velocity of the current is 3 km/hr and it takes him 45 minutes to row to a place and back, how far is the place?',
      options: ['3.6 km', '4.2 km', '5.4 km', '6.0 km'],
      correctAnswer: 2,
      difficulty: 'medium',
      hint: 'Set up an equation for total time. Time = Distance / DownstreamSpeed + Distance / UpstreamSpeed.',
      explanation: 'Boat speed (B) = 15. Stream speed (S) = 3.\nDownstream speed (D) = 15 + 3 = 18 km/hr.\nUpstream speed (U) = 15 - 3 = 12 km/hr.\nTotal time = 45 mins = 45/60 = 3/4 hours.\nLet distance be x. \nTime = x/18 + x/12 = 3/4\nMultiply by 36: 2x + 3x = 36 * (3/4) = 27\n5x = 27 => x = 5.4 km.',
      wrongExplanations: [
        'Used wrong downstream/upstream speeds.',
        'Calculation mistake.',
        '',
        'Forgot to convert minutes to hours.'
      ]
    },
    {
      id: 'q3_5',
      text: 'A thief is spotted by a policeman from a distance of 200m. When the policeman starts the chase, the thief also starts running. If the speed of the thief is 10 km/hr and the policeman is 12 km/hr, how far will the thief have run before he is caught?',
      options: ['1 km', '2 km', '1.2 km', '0.8 km'],
      correctAnswer: 0,
      difficulty: 'medium',
      hint: 'Find the time to catch using relative speed. Then find distance the thief runs in that time.',
      explanation: 'Initial gap = 200m = 0.2 km.\nRelative speed = 12 - 10 = 2 km/hr.\nTime to catch = Gap / Relative Speed = 0.2 / 2 = 0.1 hours.\nDistance run by thief = Speed of thief * Time = 10 km/hr * 0.1 hours = 1 km.',
      wrongExplanations: [
        '',
        'This is the total distance run by the policeman (12 * 0.1 = 1.2 km).',
        'Confused units.',
        'Used addition instead of relative subtraction.'
      ]
    },
    {
      id: 'q3_6',
      text: 'Excluding stoppages, the speed of a bus is 54 km/hr and including stoppages, it is 45 km/hr. For how many minutes does the bus stop per hour?',
      options: ['9', '10', '12', '15'],
      correctAnswer: 1,
      difficulty: 'medium',
      hint: 'Find the loss in speed. Time of stoppage per hour = (Loss in speed / Speed without stoppages) * 60.',
      explanation: 'Speed without stops = 54 km/hr. Speed with stops = 45 km/hr.\nDifference = 54 - 45 = 9 km/hr.\nThis means in 1 hour, the bus travels 9 km less because of stops.\nTime taken to cover 9 km at original speed = 9 / 54 hours = 1/6 hours.\nIn minutes = (1/6) * 60 = 10 minutes.',
      wrongExplanations: [
        'Just the difference in speeds, forgot to convert to time relative to 1 hour.',
        '',
        'Calculation error.',
        'Divided by 45 instead of 54.'
      ]
    }
  ]
};

