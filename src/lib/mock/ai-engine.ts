import { UserProfile, Topic, Mistake, RevisionItem, DailyPlan, StudySession, MockResult, ChatMessage } from '../types';
import { generateId } from '../utils';

export function generateGreeting(profile: UserProfile, studySessions: StudySession[], streak: number): string {
  const hour = new Date().getHours();
  let timeOfDay = 'morning';
  if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17) timeOfDay = 'evening';

  const name = profile.name || 'Champion';
  
  let streakMsg = '';
  if (streak > 0) {
    streakMsg = `You're on a ${streak}-day streak — keep that momentum going! 🔥`;
  } else {
    streakMsg = `Ready to kickstart your preparation today?`;
  }

  const recentSession = studySessions.length > 0 ? studySessions[studySessions.length - 1] : null;
  let sessionMsg = '';
  
  if (recentSession && recentSession.hoursStudied > 0) {
    sessionMsg = `Yesterday you studied for ${recentSession.hoursStudied} hours and tackled ${recentSession.topicsStudied.length} topics. Great effort!`;
  }

  return `Good ${timeOfDay}, ${name}! 🌅\n\n${streakMsg} ${sessionMsg}\n\nI've prepared a focused study plan for you today. Ready to dive in?`;
}

export function generateCoachResponse(message: string, context: any): ChatMessage {
  const lowerMsg = message.toLowerCase().trim();
  let responseContent = '';
  let hints: string[] = [];

  // Handle follow-up confusion
  if (lowerMsg.includes('still do not understand') || lowerMsg.includes('still confused') || lowerMsg.includes('explain simpler') || lowerMsg.includes('easier way') || lowerMsg.includes("don't understand")) {
    const historyText = context?.history?.map((m: any) => m.text).join(' ') || '';
    if (historyText.includes('Percent') || lowerMsg.includes('percent')) {
      responseContent = `Okay, let's simplify it even more! 🍕\n\nImagine you have a pizza with **100 slices**. "Percent" literally means "out of 100".\n\nIf you eat 20 slices, you ate 20 out of 100 slices. That's **20%**.\n\nNow, what if the pizza only has **4 slices** and you eat 1? \nTo find the percentage, you just ask: "If this pizza had 100 slices, how many would that 1 slice equal?" \n\nSince 4 × 25 = 100, we do 1 × 25 = 25. So 1 slice out of 4 is **25%**.\n\nDoes this pizza example make it click? 🍕`;
    } else {
      responseContent = `I hear you! Sometimes this stuff can be tricky. Let me break it down differently.\n\nInstead of memorizing a formula, think about it in real life. If you have ₹100 and give me half, you gave me ₹50. That's a 50% fraction. Everything in math is just scaling that up or down.\n\nWhat exactly is the confusing part? Is it the calculation, or setting up the equation?`;
    }
    return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
  }

  // --- TOPIC TEACHING DATABASE ---
  const topicTeaching: Record<string, { explanation: string; example: string; tip: string }> = {
    'percentage': {
      explanation: `## Percentages — Core Concepts\n\nPercentage means "per hundred." It's a way to express a number as a fraction of 100.\n\n**Key Formula:**\n- Percentage = (Value / Total) × 100\n- X% of Y = (X/100) × Y\n\n**Successive Percentages:**\nIf price increases by a% and then b%, net change = a + b + (ab/100)%\n\n**Fraction-Percentage Equivalents (memorize these!):**\n- 1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%\n- 1/5 = 20%, 1/6 = 16.67%, 1/8 = 12.5%`,
      example: `**Example:** If a shirt costs ₹800 and gets a 15% discount, what's the price?\n\nDiscount = 15% of 800 = (15/100) × 800 = ₹120\nFinal price = 800 - 120 = **₹680**\n\n**Try this:** A salary increases by 20% and then decreases by 20%. Is it back to original? (Hint: No! Use successive percentage formula)`,
      tip: `**Pro tip:** Convert percentages to fractions for faster mental math. 33.33% = 1/3, so 33.33% of 900 = 300 instantly!`
    },
    'profit': {
      explanation: `## Profit & Loss — Core Concepts\n\n**Key Formulas:**\n- Profit = SP - CP\n- Loss = CP - SP\n- Profit% = (Profit/CP) × 100\n- SP = CP × (1 + Profit%/100)\n\n**Discount & Marked Price:**\n- Discount = MP - SP\n- Discount% = (Discount/MP) × 100\n\n**When CP uses SP:** Be careful! Profit% on SP ≠ Profit% on CP.`,
      example: `**Example:** A buys for ₹200, marks up 50%, gives 20% discount. Find profit%.\n\nMP = 200 × 1.5 = ₹300\nSP = 300 × 0.8 = ₹240\nProfit = 240 - 200 = ₹40\nProfit% = (40/200) × 100 = **20%**`,
      tip: `**CAT Trick:** Use multipliers! If profit is 25%, SP = CP × 1.25. Chain them for successive operations.`
    },
    'time': {
      explanation: `## Time, Speed & Distance\n\n**Fundamental:** Distance = Speed × Time\n\n**Average Speed** (most tested!):\n- For same distance at speeds a and b: Average = 2ab/(a+b)\n- NOT (a+b)/2!\n\n**Relative Speed:**\n- Same direction: |a - b|\n- Opposite direction: a + b\n\n**Trains:** Add train length to distance. Two trains crossing = sum of lengths.`,
      example: `**Example:** A car goes 60 km/h for first half distance and 40 km/h for second half. Average speed?\n\nAvg = 2 × 60 × 40 / (60 + 40) = 4800/100 = **48 km/h** (NOT 50!)`,
      tip: `**CAT Pattern:** They love testing average speed misconception. Always use harmonic mean for equal distances.`
    },
    'algebra': {
      explanation: `## Algebra — Key Concepts for CAT\n\n**Equations:**\n- Linear: ax + b = 0 → x = -b/a\n- Quadratic: ax² + bx + c = 0 → x = (-b ± √(b²-4ac)) / 2a\n\n**Important Identities:**\n- (a+b)² = a² + 2ab + b²\n- (a-b)² = a² - 2ab + b²\n- a² - b² = (a+b)(a-b)\n- a³ + b³ = (a+b)(a² - ab + b²)\n\n**Sum & Product of roots:** Sum = -b/a, Product = c/a`,
      example: `**Example:** If x + 1/x = 5, find x² + 1/x²\n\nSquare both sides: (x + 1/x)² = 25\nx² + 2 + 1/x² = 25\nx² + 1/x² = **23**`,
      tip: `**Pattern:** CAT loves "if x + 1/x = k, find expressions." Master this technique!`
    },
    'number': {
      explanation: `## Number Systems — Foundation\n\n**Divisibility Rules:**\n- By 3: Sum of digits divisible by 3\n- By 4: Last 2 digits divisible by 4\n- By 9: Sum of digits divisible by 9\n- By 11: Alternating sum of digits = 0 or divisible by 11\n\n**Remainders (Fermat's):** a^(p-1) ≡ 1 (mod p) where p is prime\n\n**LCM × HCF = Product** (for two numbers)`,
      example: `**Example:** What's the remainder when 2^100 is divided by 3?\n\n2^1 mod 3 = 2, 2^2 mod 3 = 1, pattern repeats every 2.\n100 is even → same as 2^2 mod 3 = **1**`,
      tip: `**Power tip:** Remainder problems are pattern-based. Find the cycle length first!`
    },
    'geometry': {
      explanation: `## Geometry for CAT\n\n**Triangles:**\n- Area = ½ × base × height = √(s(s-a)(s-b)(s-c)) [Heron's]\n- In equilateral: Area = (√3/4) × a²\n\n**Circles:**\n- Area = πr², Circumference = 2πr\n- Arc length = (θ/360) × 2πr\n\n**Coordinate Geometry:**\n- Distance = √((x₂-x₁)² + (y₂-y₁)²)\n- Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)`,
      example: `**Example:** A triangle has sides 3, 4, 5. What's the area?\n\nIt's a right triangle (3² + 4² = 5²)!\nArea = ½ × 3 × 4 = **6 sq units**`,
      tip: `**Shortcut:** Know Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25)`
    },
    'rc': {
      explanation: `## Reading Comprehension Strategy\n\n**Step 1: Read the first and last paragraphs carefully** — they usually contain the main argument.\n\n**Step 2: Map the structure** — What's the author's position? What evidence do they use?\n\n**Step 3: Attack questions in order:**\n1. Main idea questions first (you already know this)\n2. Inference questions (look for "implies", "suggests")\n3. Specific detail questions (scan for keywords)\n4. Tone questions last`,
      example: `**Common Trap:** "Which of the following is true according to the passage?" — The answer is usually paraphrased, NEVER copied verbatim. If an option uses exact words from the passage, it's likely a trap!`,
      tip: `**Time management:** Spend 2 min reading, 1 min per question. If a passage feels too hard after 1 min, skip and come back.`
    },
    'lrdi': {
      explanation: `## LR & DI Strategy\n\n**Logical Reasoning:**\n1. Read ALL conditions before starting\n2. Draw tables/grids for arrangement problems\n3. Look for definite information first\n4. Use "what if" for remaining slots\n\n**Data Interpretation:**\n1. Don't calculate exact values — approximate!\n2. Use ratios and percentages for comparison\n3. Read axis labels carefully\n4. Start with the easiest sub-question`,
      example: `**Example Set:** "5 people sit in a row. A is not at either end. B is to the left of C..."\n\nStart with: Who CAN'T sit where? Eliminate positions first, then fill definite ones.`,
      tip: `**CAT Trend:** LRDI sets are the biggest differentiator. Practice selecting which sets to attempt — that's the real skill!`
    }
  };

  // --- MATCH TOPIC TEACHING ---
  const teachMatch = lowerMsg.match(/teach|learn|explain|concept|basics|understand|what is|how to|tell me about/);
  if (teachMatch) {
    for (const [key, content] of Object.entries(topicTeaching)) {
      if (lowerMsg.includes(key) || (key === 'profit' && lowerMsg.includes('loss')) || (key === 'time' && (lowerMsg.includes('speed') || lowerMsg.includes('distance'))) || (key === 'rc' && (lowerMsg.includes('reading') || lowerMsg.includes('comprehension') || lowerMsg.includes('varc'))) || (key === 'lrdi' && (lowerMsg.includes('logical') || lowerMsg.includes('reasoning') || lowerMsg.includes('data interpretation')))) {
        responseContent = `${content.explanation}\n\n---\n\n${content.example}\n\n---\n\n${content.tip}\n\n💡 *Want me to give you a practice problem on this?*`;
        return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
      }
    }

    if ((lowerMsg.includes('learn') || lowerMsg.includes('teach')) && lowerMsg.includes('table')) {
      responseContent = `You're absolutely right. A strong foundation is everything. Let's learn the tables! 🔢\n\nStart with the **Table of 12** (one of the most useful for CAT):\n- 12 × 1 = 12\n- 12 × 2 = 24\n- 12 × 3 = 36\n- 12 × 4 = 48\n- 12 × 5 = 60\n- 12 × 6 = 72\n- 12 × 7 = 84\n- 12 × 8 = 96\n- 12 × 9 = 108\n- 12 × 10 = 120\n\n**Quick Quiz:** What is 12 × 7?`;
      return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
    }

    if (lowerMsg.includes('math') || lowerMsg.includes('basic') || lowerMsg.includes('table') || lowerMsg.includes('calculation')) {
      responseContent = `I can definitely help with the basics! 🧮\n\nFor CAT, you should memorize:\n- **Tables** up to 20\n- **Squares** up to 30\n- **Cubes** up to 15\n- **Fractions to Percentages** up to 1/20\n\nIf you want me to teach you tables directly, just say **"teach me tables"**! Or we can start with the **Number Systems** module.`;
      return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
    }

    // Generic teach response
    responseContent = `I'd love to teach you! Which topic do you want to learn?\n\n**Quant:** Percentages, Profit & Loss, TSD, Algebra, Number Systems, Geometry\n**VARC:** Reading Comprehension, Para Jumbles, Sentence Correction\n**LRDI:** Arrangements, Puzzles, Data Interpretation\n\nJust say something like "Teach me Percentages" and I'll break it down! 📚`;
    return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
  }

  // --- PRACTICE MODE ---
  const practiceMatch = lowerMsg.match(/practice|quiz|question|problem|give me|test me|solve/);
  if (practiceMatch) {
    // Find which topic they want to practice
    const practiceQuestions: Record<string, string> = {
      'percentage': `**Practice Question — Percentages** 🎯\n\nA shopkeeper increases the price of an item by 25% and then offers a discount of 20%. What is the net percentage change in price?\n\n*Think about it before scrolling down...*\n\n|||\n\n💡 **Hint 1:** Use the successive percentage formula: a + b + (ab/100)\n\n💡 **Hint 2:** a = +25, b = -20\n\n✅ **Answer:** 25 + (-20) + (25 × -20)/100 = 25 - 20 - 5 = **0%** — No change! The shopkeeper breaks even.`,
      'profit': `**Practice Question — Profit & Loss** 🎯\n\nA person buys an article for ₹500, marks it up by 40%, and then gives two successive discounts of 10% and 15%. Find the profit or loss percentage.\n\n*Try solving it step by step!*\n\n💡 **Hint:** MP = 500 × 1.4 = ₹700. After 10% discount: 700 × 0.9 = ₹630. After 15% discount: 630 × 0.85 = ?`,
      'algebra': `**Practice Question — Algebra** 🎯\n\nIf a + b = 7 and a² + b² = 29, find the value of ab.\n\n*Use an algebraic identity!*\n\n💡 **Hint:** (a + b)² = a² + 2ab + b². You know (a+b) and a²+b². Find ab.`,
      'number': `**Practice Question — Number Systems** 🎯\n\nWhat is the remainder when 7^99 is divided by 5?\n\n*Look for a pattern in powers of 7 mod 5!*\n\n💡 **Hint:** 7¹ mod 5 = 2, 7² mod 5 = 4, 7³ mod 5 = 3, 7⁴ mod 5 = 1. Cycle = 4.`,
    };
    
    for (const [key, question] of Object.entries(practiceQuestions)) {
      if (lowerMsg.includes(key) || (key === 'profit' && lowerMsg.includes('loss'))) {
        responseContent = question;
        return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
      }
    }
    
    responseContent = `Let's practice! 💪 Which topic should I quiz you on?\n\n**Quick options:**\n- "Practice Percentages"\n- "Give me an Algebra question"\n- "Quiz me on Number Systems"\n- "Quick quiz" (I'll pick a random mix)\n\nOr you can paste any specific question and I'll guide you through solving it!`;
    return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
  }

  // --- CONVERSATIONAL RESPONSES ---
  if (/^(ok|okay|sure|yes|yeah|yep|got it|understood|alright|cool|nice|great|thanks|thank you|thx)[\s!.]*$/i.test(lowerMsg)) {
    const followUps = [
      `Great! What would you like to work on next? I can:\n\n📚 **Teach** a concept — "Teach me Algebra"\n🎯 **Practice** problems — "Give me a Percentages question"\n📋 **Plan** your day — "What should I study today?"\n📊 **Analyze** your progress — "How am I doing?"`,
      `Awesome! Ready for more? Here are some things we can do:\n\n- Deep dive into a **weak topic**\n- Do a quick **5-question quiz**\n- Review your **recent mistakes**\n- Plan your **study session**\n\nWhat interests you?`,
      `Perfect! Let's keep the momentum going! 🔥\n\nSay "practice" to solve problems, "teach me [topic]" to learn concepts, or "what's my plan" to see today's study plan.`
    ];
    responseContent = followUps[Math.floor(Math.random() * followUps.length)];
  }
  // --- STUDY PLAN ---
  else if (lowerMsg.includes('plan') || lowerMsg.includes('schedule') || lowerMsg.includes('what should i study') || lowerMsg.includes('today')) {
    const name = context?.profile?.name || 'there';
    responseContent = `Here's what I recommend for today, ${name}! 📋\n\n**Morning Block (Focus)**\n- 📖 Learn/Revise one weak Quant topic (45 mins)\n- 🎯 Solve 15 practice questions (30 mins)\n\n**Afternoon Block (Practice)**\n- 📄 1 RC passage with analysis (20 mins)\n- 🧩 1 LRDI set with timer (25 mins)\n\n**Evening Block (Review)**\n- 🔍 Review today's mistakes (15 mins)\n- 📝 Update your mistake book (10 mins)\n\nHead to the **Daily Planner** page for a personalized AI-generated plan! 🚀`;
  }
  // --- SECTION SPECIFIC ---
  else if (lowerMsg.includes('quant') || lowerMsg.includes('math') || lowerMsg.includes('quantitative')) {
    responseContent = `**Quant Strategy for CAT** 📐\n\nThe Quant section has ~22 questions in 40 minutes. Key areas:\n\n1. **Arithmetic** (40% weightage) — Percentages, Profit/Loss, TSD, Ratios\n2. **Algebra** (25%) — Equations, Inequalities, Functions\n3. **Number Systems** (20%) — Divisibility, Remainders, HCF/LCM\n4. **Geometry** (15%) — Triangles, Circles, Coordinate Geometry\n\n**My advice:** Master Arithmetic first — it's the highest ROI. Then Algebra.\n\nWant me to teach you any specific topic? Just say "Teach me [topic name]"! 📚`;
  }
  else if (lowerMsg.includes('varc') || lowerMsg.includes('verbal') || lowerMsg.includes('reading')) {
    responseContent = `**VARC Strategy** 📖\n\n~24 questions in 40 minutes. Split:\n\n1. **RC Passages** (70% weightage) — 4-5 passages, most important!\n2. **Para Jumbles** — Sentence ordering\n3. **Odd One Out** — Find the misfit sentence\n4. **Summary** — Pick the best summary\n\n**Key insight:** RC is purely skill-based — the more you read, the better you get. Read editorials from The Hindu, Aeon, or The Economist daily.\n\nSay "Teach me RC" and I'll walk you through strategies! 📚`;
  }
  else if (lowerMsg.includes('lrdi') || lowerMsg.includes('logical') || lowerMsg.includes('reasoning') || lowerMsg.includes('data')) {
    responseContent = `**LRDI Strategy** 🧩\n\n~24 questions in 40 minutes, grouped in 4-6 sets.\n\n**Critical skill:** Set selection. Not all sets are equal!\n\n**Difficulty ranking (easiest to hardest):**\n1. Blood Relations, Direction Sense\n2. Linear/Circular Arrangements\n3. Schedules, Grouping\n4. Games, Tournaments\n5. Complex multi-layered sets\n\n**Rule of thumb:** Spend 2 mins reading a set. If you can't figure out the approach, MOVE ON.\n\nSay "Teach me LRDI" for detailed strategies! 🎯`;
  }
  // --- MOTIVATION ---
  else if (lowerMsg.includes('motivat') || lowerMsg.includes('tired') || lowerMsg.includes('give up') || lowerMsg.includes('stress') || lowerMsg.includes('can\'t') || lowerMsg.includes('hard') || lowerMsg.includes('difficult') || lowerMsg.includes('scared') || lowerMsg.includes('anxious')) {
    const motivations = [
      `I hear you, and it's completely okay to feel this way. 💙\n\nEvery CAT topper has felt exactly like this at some point. The difference? They kept going.\n\n**Here's what I want you to do right now:**\n1. Take 5 deep breaths\n2. Drink some water\n3. Solve just ONE easy question from your strongest topic\n\nThat small win will build momentum. You don't need to study 10 hours today. Just do one focused hour. I'm right here with you. 🤝`,
      `The fact that you're here, preparing, puts you ahead of 90% of aspirants who never start. 🌟\n\nRemember: CAT is not about being perfect. A 99%ile means getting about 60-65% of questions right. You don't need to solve everything!\n\n**Quick energy boost:**\n- 🎵 Put on your favorite song\n- 🚶 Take a 10-minute walk\n- ☕ Grab a coffee/tea\n\nCome back and let's tackle just one topic together. Deal?`
    ];
    responseContent = motivations[Math.floor(Math.random() * motivations.length)];
  }
  // --- MOCK / SCORES ---
  else if (lowerMsg.includes('mock') || lowerMsg.includes('score') || lowerMsg.includes('percentile')) {
    const target = context?.profile?.targetPercentile || 99;
    responseContent = `**Mock Test Strategy** 📊\n\nFor your target of **${target}%ile**, here's the game plan:\n\n**Frequency:** Take 1 mock per week minimum. 2 is ideal.\n\n**The 3-Step Mock Protocol:**\n1. **Take** — Strict 2-hour timer, no distractions\n2. **Analyze** — Spend 2-3 hours reviewing. Go through EVERY question.\n3. **Act** — Add mistakes to your Mistake Book. Revise weak topics.\n\n**Score interpretation:**\n- 90+ percentile → Focus on time management\n- 80-90 → Strengthen 2 weak areas\n- Below 80 → Back to basics, reduce mock frequency\n\nHead to the **Mocks** page to log and analyze your tests! 📈`;
  }
  // --- PROGRESS / HOW AM I DOING ---
  else if (lowerMsg.includes('progress') || lowerMsg.includes('how am i') || lowerMsg.includes('doing') || lowerMsg.includes('improve') || lowerMsg.includes('weak')) {
    responseContent = `**Let's check your pulse!** 📈\n\nHead to the **Analytics** page for a detailed breakdown, but here's a quick assessment framework:\n\n**Are you on track if:**\n✅ You study 3+ hours daily on weekdays\n✅ Your mock percentile is trending up\n✅ You're reviewing mistakes regularly\n✅ You've covered 60%+ of Quant and VARC topics\n\n**Red flags:**\n🚩 Same mistakes repeating\n🚩 Mock scores plateauing for 3+ weeks\n🚩 Skipping LRDI practice\n🚩 Not taking full-length mocks\n\nTell me specifically what you're struggling with and I'll give targeted advice! 🎯`;
  }
  // --- HELLO / GREETINGS ---
  else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') || lowerMsg.match(/^(yo|sup|hola|namaste)/)) {
    responseContent = `Hey there! 👋 Ready to make progress on your CAT prep today?\n\nHere's what we can do:\n- 📚 **Learn** a topic — "Teach me Percentages"\n- 🎯 **Practice** — "Give me a quiz"\n- 📋 **Plan** — "What should I study today?"\n- 💡 **Strategy** — "How to crack LRDI?"\n\nWhat's on your mind?`;
  }
  // --- DEFAULT (smarter than before) ---
  else {
    // Try to find any topic keyword as a last resort
    for (const [key, content] of Object.entries(topicTeaching)) {
      if (lowerMsg.includes(key)) {
        responseContent = `I see you're interested in **${key.charAt(0).toUpperCase() + key.slice(1)}**! 📚\n\nWould you like me to:\n- **Teach** the concept from scratch?\n- **Give you practice questions**?\n- **Share strategies** for this topic in CAT?\n\nJust say "Teach me ${key}" or "Practice ${key}"!`;
        return { id: generateId(), role: 'assistant', content: responseContent, timestamp: new Date().toISOString() };
      }
    }
    
    const defaults = [
      `That's an interesting question! Let me help you out. 🤔\n\nI can assist with:\n\n📚 **Learning** — "Teach me [topic]"\n🎯 **Practice** — "Give me a question on [topic]"\n📋 **Planning** — "What should I study today?"\n📊 **Analysis** — "How am I doing?"\n💪 **Motivation** — "I'm feeling stuck"\n\nOr you can paste any CAT question and I'll walk you through solving it step by step!`,
      `I'd love to help with that! To give you the best guidance, could you tell me:\n\n1. Which **section** — Quant, VARC, or LRDI?\n2. What **kind of help** — learn a concept, solve a problem, or plan your prep?\n\n**Quick commands:**\n- "Teach me [topic]" for concept explanations\n- "Practice [topic]" for questions\n- "Plan my day" for a study schedule`
    ];
    responseContent = defaults[Math.floor(Math.random() * defaults.length)];
  }

  return {
    id: generateId(),
    role: 'assistant',
    content: responseContent,
    timestamp: new Date().toISOString(),
    hints: hints.length > 0 ? hints : undefined,
    currentHint: hints.length > 0 ? 0 : undefined
  };
}

export function generateDailyPlan(
  profile: UserProfile, 
  topics: Topic[], 
  mistakes: Mistake[], 
  revisionItems: RevisionItem[]
): DailyPlan {
  const isWeekend = [0, 6].includes(new Date().getDay());
  const availableMins = (isWeekend ? (profile.availableHoursWeekend || 4) : (profile.availableHoursWeekday || 2)) * 60;
  
  const tasks: any[] = [];
  let usedMins = 0;
  let order = 1;

  // PRIORITY FOR BEGINNERS: Foundation
  if (profile.currentLevel === 'beginner' && usedMins < availableMins) {
    const timeAlloc = Math.min(30, availableMins - usedMins);
    tasks.push({
      id: generateId(),
      title: 'Master the Foundation',
      description: 'Memorize Tables up to 20, Squares up to 30, and Cubes up to 15. This is the first step for anyone weak in math.',
      type: 'learn',
      section: 'quant',
      topicId: 'q-a-1',
      durationMins: timeAlloc,
      completed: false,
      order: order++
    });
    usedMins += timeAlloc;
  }

  // Helper: shuffle array randomly
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Task templates for variety
  const practiceDescriptions = [
    'Solve 15-20 moderate to hard level questions. Focus on accuracy.',
    'Attempt 10 questions under timed conditions. Target: 90% accuracy.',
    'Work through a mixed difficulty set. Review every wrong answer.',
    'Challenge yourself with 5 hard problems. Quality over quantity.',
    'Complete a mini mock of 12 questions. Strict 20-minute timer.',
  ];

  const learnDescriptions = [
    'Watch concept videos and take detailed notes.',
    'Read theory and solve 5 basic examples step by step.',
    'Map out all formulas and create a cheat sheet.',
    'Study the concept and create 3 flashcards for revision.',
    'Deep dive into fundamentals. Understand the "why" behind each formula.',
  ];

  // 1. Revision Task (Priority) - randomize which topics to revise
  const dueRevisions = shuffle(revisionItems.filter(item => new Date(item.nextReview) <= new Date()));
  if (dueRevisions.length > 0 && usedMins < availableMins) {
    const time = Math.min(30, dueRevisions.length * 5);
    const selectedRevisions = dueRevisions.slice(0, 3);
    tasks.push({
      id: generateId(),
      type: 'revise' as const,
      topicId: selectedRevisions[0].topicId,
      topicName: selectedRevisions.map(r => r.topicName).join(', ') + (dueRevisions.length > 3 ? ' & more' : ''),
      section: selectedRevisions[0].section,
      title: 'Daily Spaced Repetition',
      description: `Review ${dueRevisions.length} topics to keep them fresh in your memory.`,
      estimatedMinutes: time,
      difficulty: 'medium' as const,
      completed: false,
      skipped: false,
      order: order++
    });
    usedMins += time;
  }

  // 2. Mistake Review - randomize
  const pendingMistakes = shuffle(mistakes.filter(m => m.revisionStatus === 'pending'));
  if (pendingMistakes.length > 0 && usedMins + 20 <= availableMins) {
    tasks.push({
      id: generateId(),
      type: 'review-mistakes' as const,
      topicId: 'mixed',
      topicName: 'Mixed Errors',
      section: 'quant' as const,
      title: 'Analyze Recent Mistakes',
      description: `Review ${Math.min(5, pendingMistakes.length)} recent errors to patch conceptual gaps.`,
      estimatedMinutes: 20,
      difficulty: 'hard' as const,
      completed: false,
      skipped: false,
      order: order++
    });
    usedMins += 20;
  }

  // 3. New Learning - RANDOMIZE topic selection
  const learningTopics = shuffle(topics.filter(t => t.status === 'learning' || t.status === 'not-started'));
  if (learningTopics.length > 0 && usedMins + 45 <= availableMins) {
    const topic = learningTopics[0]; // random due to shuffle
    tasks.push({
      id: generateId(),
      type: topic.status === 'not-started' ? 'learn' as const : 'practice' as const,
      topicId: topic.id,
      topicName: topic.name,
      section: topic.section,
      title: topic.status === 'not-started' ? `Learn: ${topic.name}` : `Practice: ${topic.name}`,
      description: learnDescriptions[Math.floor(Math.random() * learnDescriptions.length)],
      estimatedMinutes: 45,
      difficulty: 'medium' as const,
      completed: false,
      skipped: false,
      order: order++
    });
    usedMins += 45;
  }

  // 4. Practice weak topics - RANDOMIZE
  const practiceTopics = shuffle(topics.filter(t => t.status === 'practicing' || t.status === 'needs-revision'));
  if (practiceTopics.length > 0 && usedMins + 40 <= availableMins) {
    const topic = practiceTopics[0]; // random due to shuffle
    tasks.push({
      id: generateId(),
      type: 'practice' as const,
      topicId: topic.id,
      topicName: topic.name,
      section: topic.section,
      title: `Intense Practice: ${topic.name}`,
      description: practiceDescriptions[Math.floor(Math.random() * practiceDescriptions.length)],
      estimatedMinutes: 40,
      difficulty: 'hard' as const,
      completed: false,
      skipped: false,
      order: order++
    });
    usedMins += 40;
  }

  // 5. Extra: Add a VARC/LRDI task if time remains
  const sections = ['varc', 'lrdi'] as const;
  const randomSection = sections[Math.floor(Math.random() * 2)];
  const sectionTopics = shuffle(topics.filter(t => t.section === randomSection));
  if (sectionTopics.length > 0 && usedMins + 30 <= availableMins) {
    const topic = sectionTopics[0];
    tasks.push({
      id: generateId(),
      type: 'practice' as const,
      topicId: topic.id,
      topicName: topic.name,
      section: topic.section,
      title: randomSection === 'varc' ? `RC & Verbal: ${topic.name}` : `LRDI Set: ${topic.name}`,
      description: randomSection === 'varc' 
        ? 'Read one passage and answer all questions. Time yourself strictly.'
        : 'Attempt one full LRDI set. Spend 2 mins planning before solving.',
      estimatedMinutes: 25,
      difficulty: 'medium' as const,
      completed: false,
      skipped: false,
      order: order++
    });
    usedMins += 25;
  }

  return {
    date: new Date().toISOString(),
    tasks,
    totalMinutes: usedMins,
    completedMinutes: 0,
    generatedAt: new Date().toISOString()
  };
}

export function generateMockAnalysis(mockResult: MockResult): string {
  let analysis = `### Mock Performance Analysis: ${mockResult.name}\n\n`;
  
  analysis += `You scored **${mockResult.overallScore}** (${mockResult.percentile} percentile) with an overall accuracy of ${mockResult.accuracy}%. `;
  
  if (mockResult.percentile >= 95) {
    analysis += `Exceptional performance! You are well on track for top IIMs.\n\n`;
  } else if (mockResult.percentile >= 85) {
    analysis += `Solid attempt! You have good fundamentals but need to refine your question selection.\n\n`;
  } else {
    analysis += `This is a stepping stone. We need to focus heavily on foundational concepts and accuracy over speed.\n\n`;
  }

  // Sectional Analysis
  analysis += `#### Sectional Breakdown\n`;
  mockResult.sections.forEach(sec => {
    analysis += `- **${sec.section.toUpperCase()}**: Scored ${sec.score}/${sec.maxScore} (${sec.accuracy}% accuracy). `;
    if (sec.accuracy < 70) {
      analysis += `*High negative marking detected. Focus on leaving doubtful questions.*`;
    } else if (sec.questionsAttempted < 10) {
      analysis += `*Low attempt rate. Need to improve speed and concept recall.*`;
    } else {
      analysis += `*Great balance of speed and accuracy!*`;
    }
    analysis += `\n`;
  });

  analysis += `\n#### Coach's Recommendation\n`;
  if (mockResult.accuracy < 75) {
    analysis += `Your main enemy right now is negative marking. For the next week, I want you to focus 100% on accuracy. Do not guess. If you aren't sure, leave it. We will build speed later.\n`;
  } else {
    analysis += `Your accuracy is good! Now we need to gradually increase your attempt rate. Try to shave off 10 seconds per question in your next practice session.\n`;
  }

  return analysis;
}

export function getTeachingResponse(topicId: string, hintLevel: number): string {
  // Mock implementations of hints based on levels
  const hints = [
    "Start by writing down the formula you think applies here.",
    "Look closely at the units or the given ratio. What can you deduce?",
    "Let's substitute the given values into the equation.",
    "The core trick here is to realize that X is inversely proportional to Y. Try setting up the equation based on that."
  ];

  return hints[Math.min(hintLevel, hints.length - 1)];
}
