'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Play, ChevronRight, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

// Topic content database
const TOPIC_CONTENT: Record<string, { learn: string; practice: { question: string; hints: string[]; answer: string }[] }> = {
  'percentages': {
    learn: `### Key Formulas\n- **Percentage** = (Value / Total) × 100\n- **X% of Y** = (X/100) × Y\n- **% Change** = ((New - Old) / Old) × 100\n\n### Successive Percentages\nIf price changes by a% then b%:\n> Net change = a + b + (ab/100)%\n\n### Fraction-Percentage Equivalents\n| Fraction | % | Fraction | % |\n|---|---|---|---|\n| 1/2 | 50% | 1/5 | 20% |\n| 1/3 | 33.33% | 1/6 | 16.67% |\n| 1/4 | 25% | 1/8 | 12.5% |\n\n**Pro tip:** Convert % to fractions for faster mental math. 33.33% of 900 = 1/3 × 900 = 300 instantly!`,
    practice: [
      { question: 'A shopkeeper increases the price by 25% and then offers a 20% discount. What is the net % change?', hints: ['Use successive % formula: a + b + (ab/100)', 'a = +25, b = -20'], answer: '25 + (-20) + (25 × -20)/100 = 25 - 20 - 5 = **0%** — No change!' },
      { question: 'If A is 20% more than B, by what % is B less than A?', hints: ['If A = 1.2B, then difference = 0.2B', 'But % is relative to A, not B'], answer: 'B is less than A by (0.2/1.2) × 100 = **16.67%**' },
      { question: 'A salary increases by 10% then by 20%. Overall % increase?', hints: ['Successive increase formula', 'a=10, b=20'], answer: '10 + 20 + (10×20)/100 = **32%**' },
    ]
  },
  'profit': {
    learn: `### Fundamental Formulas\n- **Profit** = SP - CP\n- **Loss** = CP - SP\n- **Profit%** = (Profit/CP) × 100\n- **SP** = CP × (1 + Profit%/100)\n\n### Marked Price & Discount\n- **Discount** = MP - SP\n- **SP** = MP × (1 - Discount%/100)\n- **Key:** MP × (1 - d%) = CP × (1 + p%)\n\n**CAT Trick:** Use multipliers! 25% profit → SP = CP × 1.25. Chain them for successive operations.`,
    practice: [
      { question: 'A buys for ₹200, marks up 50%, gives 20% discount. Find profit%.', hints: ['MP = 200 × 1.5 = ₹300', 'SP = 300 × 0.8 = ₹240'], answer: 'Profit = 240 - 200 = ₹40. Profit% = (40/200)×100 = **20%**' },
      { question: 'Sells at CP but uses 900g weight instead of 1kg. Profit%?', hints: ['Sells 900g as 1000g', 'Gets paid for 100g extra'], answer: '(100/900) × 100 = **11.11%**' },
    ]
  },
  'time': {
    learn: `### Core: Distance = Speed × Time\n\n### Average Speed (most tested!)\n- Same distance at speeds a, b: **Avg = 2ab/(a+b)**\n- ⚠️ NOT (a+b)/2!\n\n### Relative Speed\n- Same direction: |a - b|\n- Opposite direction: a + b\n\n### Trains\n- Crossing pole: Distance = Train length\n- Crossing platform: Distance = Train + Platform length\n- Two trains: Distance = Sum of both lengths`,
    practice: [
      { question: 'Car goes 60 km/h for first half and 40 km/h for second half distance. Average speed?', hints: ['Same distance → harmonic mean', 'Avg = 2ab/(a+b)'], answer: '2×60×40/(60+40) = 4800/100 = **48 km/h** (NOT 50!)' },
    ]
  },
  'linear equations': { learn: `### Standard Form\nax + b = 0 → x = -b/a\n\n### System of 2 Equations\n- **Unique solution:** a₁/a₂ ≠ b₁/b₂\n- **No solution:** a₁/a₂ = b₁/b₂ ≠ c₁/c₂\n- **Infinite:** a₁/a₂ = b₁/b₂ = c₁/c₂\n\n**Strategy:** Identify unknowns → form equations → substitution or elimination`, practice: [{ question: 'Sum of two numbers is 50, difference is 10. Find them.', hints: ['x + y = 50', 'x - y = 10, add both'], answer: '2x = 60 → x = 30, y = 20' }] },
  'quadratic equations': { learn: `### ax² + bx + c = 0\n- x = (-b ± √(b²-4ac)) / 2a\n\n### Discriminant (D = b²-4ac)\n- D > 0: Two real roots\n- D = 0: One repeated root\n- D < 0: No real roots\n\n### Vieta's\n- Sum of roots = -b/a\n- Product = c/a\n\n**CAT Pattern:** If x + 1/x = k → x² + 1/x² = k² - 2`, practice: [{ question: 'If x + 1/x = 5, find x² + 1/x².', hints: ['Square both sides', '(x + 1/x)² = x² + 2 + 1/x²'], answer: '25 - 2 = **23**' }] },
  'logarithms': { learn: `### log_a(b) = c means a^c = b\n\n### Properties\n- log(ab) = log(a) + log(b)\n- log(a/b) = log(a) - log(b)\n- log(a^n) = n·log(a)\n- log_a(b) = 1/log_b(a)\n- log_a(a) = 1, log_a(1) = 0`, practice: [{ question: 'If log₂(x) = 5, find x.', hints: ['2^5 = ?'], answer: 'x = 2⁵ = **32**' }] },
  'prime numbers': { learn: `### Divisibility Rules\n- By 3: Sum of digits ÷ 3\n- By 4: Last 2 digits ÷ 4\n- By 9: Sum of digits ÷ 9\n- By 11: Alternating sum = 0 or ÷ 11\n\n### HCF & LCM\nHCF × LCM = Product (for 2 numbers)\n\n### Euler's Totient\nφ(n) = n × ∏(1 - 1/p)`, practice: [{ question: 'HCF and LCM of 12 and 18?', hints: ['12 = 2²×3', '18 = 2×3²'], answer: 'HCF = 6, LCM = 36' }] },
  'remainders': { learn: `### Key Rules\n- (a+b) mod n = (a mod n + b mod n) mod n\n- (a×b) mod n = (a mod n × b mod n) mod n\n\n### Fermat's Little Theorem\na^(p-1) ≡ 1 (mod p) where p is prime\n\n### Pattern Method\nFind the cycle in remainders of powers.`, practice: [{ question: 'Remainder when 2^100 ÷ 3?', hints: ['2^1 mod 3 = 2, 2^2 mod 3 = 1', 'Cycle = 2. 100 is even.'], answer: 'Same as 2^2 mod 3 = **1**' }] },
  'circles': { learn: `### Formulas\n- Area = πr², Circumference = 2πr\n- Arc = (θ/360) × 2πr\n- Sector area = (θ/360) × πr²\n\n### Tangent: ⊥ to radius at contact point\nTwo tangents from external point are equal.`, practice: [{ question: 'Circle radius 7cm. Find area (π=22/7).', hints: ['Area = πr²'], answer: '22/7 × 49 = **154 cm²**' }] },
  'triangles': { learn: `### Area\n- ½ × base × height\n- Heron's: √(s(s-a)(s-b)(s-c))\n- Equilateral: (√3/4) × a²\n\n### Pythagorean Triplets\n(3,4,5), (5,12,13), (8,15,17), (7,24,25)\n\n### Similarity: ratio of areas = (ratio of sides)²`, practice: [{ question: 'Triangle with sides 3, 4, 5. Area?', hints: ['3²+4² = 9+16 = 25 = 5²', 'Right triangle!'], answer: '½×3×4 = **6 sq units**' }] },
  'reading comprehension': { learn: `### Strategy\n1. **Read** first & last paragraphs carefully (2 min)\n2. **Map** the author's argument & tone\n3. **Answer** in order: Main idea → Inference → Detail → Tone\n\n### Traps\n- Options using EXACT passage words → usually wrong!\n- "Too extreme" options (always, never, all)\n\n**Time:** 2 min reading + 1 min per question. Hard passage? Skip it.`, practice: [{ question: 'Author presents negative data but concludes optimistically. Tone?', hints: ['Contrast: data (negative) vs conclusion (positive)'], answer: '**Cautiously optimistic** — acknowledges problems but believes in solutions.' }] },
  'para jumbles': { learn: `### Find the Opening\n- Introduces concept (no pronouns without antecedent)\n- No connecting words (however, moreover)\n\n### Find Mandatory Pairs\n- Pronoun links: "He..." follows a named person\n- Cause-effect: "Therefore..." follows reason\n\n### Order clues: first, then, later, finally`, practice: [{ question: 'A) He won Nobel 1921. B) Einstein born in Germany. C) His relativity changed physics. D) He later moved to America.', hints: ['B introduces Einstein', 'C uses "His" → follows B'], answer: '**B → C → A → D**' }] },
  'grammar': { learn: `### Subject-Verb Agreement\n- "Neither A nor B" → verb agrees with B\n- "Each of the boys" → IS (singular)\n\n### Common Errors\n- Dangling modifiers: "Walking down the road, the tree fell" ❌\n- Parallelism: "likes reading, writing, and to swim" ❌`, practice: [{ question: '"Each of the students have completed their assignments." Error?', hints: ['"Each" is singular'], answer: '**has** completed (not "have")' }] },
  'vocabulary': { learn: `### Today's Words\n| Word | Meaning | Mnemonic |\n|------|---------|----------|\n| Ephemeral | Short-lived | E-FEM-eral → short era |\n| Ubiquitous | Everywhere | Uber is everywhere |\n| Pragmatic | Practical | Practical + automatic |\n| Eloquent | Persuasive | Loquacious = talkative |\n| Benevolent | Kind | Bene = good |\n\n### Roots: bene (good), mal (bad), phil (love), chron (time)`, practice: [{ question: 'What does "Cacophony" mean? (Caco = bad, phon = sound)', hints: ['Caco = harsh', 'Phon = sound'], answer: '**Harsh, unpleasant sounds.** Opposite: Euphony' }] },
  'arrangements': { learn: `### Linear: Draw slots _ _ _ _ _\n- Start with most constrained conditions\n- "A left of B" → A...B (not necessarily adjacent)\n- "Immediately left" → AB (adjacent)\n\n### Circular\n- Fix one person → (n-1)! arrangements\n\n**Tip:** Read ALL conditions first. Mark definite positions, then try cases.`, practice: [{ question: '5 people A-E in a row. A not at ends. B immediately left of C. D at right end.', hints: ['D fixed at position 5', 'BC is a block, A at 2/3/4'], answer: 'E-A-B-C-D or B-C-A-E-D (multiple valid)' }] },
  'data interpretation': { learn: `### Strategy\n1. Understand what's measured + units\n2. **Approximate!** 389 ≈ 400\n3. Use ratios and percentages\n\n### Types: Tables, Bar Charts, Line Graphs, Pie Charts\n\n**CAT Trick:** Start with EASIEST question in the set — reveals patterns.`, practice: [{ question: 'Revenue: 2020: ₹100Cr, 2022: ₹150Cr. CAGR?', hints: ['CAGR = (End/Start)^(1/n) - 1', 'n = 2'], answer: '√1.5 - 1 ≈ **22.5%**' }] },
};

function findContent(topicName: string) {
  const lower = topicName.toLowerCase();
  if (TOPIC_CONTENT[lower]) return TOPIC_CONTENT[lower];
  for (const key of Object.keys(TOPIC_CONTENT)) {
    if (lower.includes(key) || key.includes(lower)) return TOPIC_CONTENT[key];
  }
  if (lower.includes('percent')) return TOPIC_CONTENT['percentages'];
  if (lower.includes('profit') || lower.includes('loss')) return TOPIC_CONTENT['profit'];
  if (lower.includes('speed') || lower.includes('distance')) return TOPIC_CONTENT['time'];
  if (lower.includes('linear')) return TOPIC_CONTENT['linear equations'];
  if (lower.includes('quadrat')) return TOPIC_CONTENT['quadratic equations'];
  if (lower.includes('log')) return TOPIC_CONTENT['logarithms'];
  if (lower.includes('prime') || lower.includes('number sys')) return TOPIC_CONTENT['prime numbers'];
  if (lower.includes('remainder')) return TOPIC_CONTENT['remainders'];
  if (lower.includes('circle')) return TOPIC_CONTENT['circles'];
  if (lower.includes('triangle')) return TOPIC_CONTENT['triangles'];
  if (lower.includes('rc') || lower.includes('reading') || lower.includes('comprehension') || lower.includes('passage')) return TOPIC_CONTENT['reading comprehension'];
  if (lower.includes('para') || lower.includes('jumble')) return TOPIC_CONTENT['para jumbles'];
  if (lower.includes('grammar') || lower.includes('sentence')) return TOPIC_CONTENT['grammar'];
  if (lower.includes('vocab')) return TOPIC_CONTENT['vocabulary'];
  if (lower.includes('arrange') || lower.includes('seating')) return TOPIC_CONTENT['arrangements'];
  if (lower.includes('data') || lower.includes('interpretation')) return TOPIC_CONTENT['data interpretation'];
  return null;
}

interface Props {
  topicName: string;
  mode: 'learn' | 'practice';
  onClose: () => void;
}

export default function TopicLearningPanel({ topicName, mode, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>(mode);
  const [currentQ, setCurrentQ] = useState(0);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const content = findContent(topicName);

  const resetQuestion = (qi: number) => {
    setCurrentQ(qi);
    setRevealedHints(0);
    setShowAnswer(false);
  };

  if (!content) {
    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="border-t border-white/5 bg-gradient-to-b from-violet-500/5 to-transparent px-5 py-6"
      >
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-sm">Content for <strong className="text-white/80">{topicName}</strong> coming soon!</p>
          <button onClick={onClose} className="text-xs text-white/40 hover:text-white/70 transition-colors">Close</button>
        </div>
      </motion.div>
    );
  }

  const questions = content.practice;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="border-t border-violet-500/20 bg-gradient-to-b from-violet-500/5 to-[#0d0d15] overflow-hidden"
    >
      <div className="px-5 pt-4 pb-5">
        {/* Tab bar + close */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('learn')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                activeTab === 'learn' ? "bg-violet-600 text-white shadow-sm" : "text-white/40 hover:text-white/70"
              )}
            >
              📖 Learn
            </button>
            <button
              onClick={() => { setActiveTab('practice'); resetQuestion(0); }}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                activeTab === 'practice' ? "bg-violet-600 text-white shadow-sm" : "text-white/40 hover:text-white/70"
              )}
            >
              🎯 Practice
            </button>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md transition-colors">
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>

        {activeTab === 'learn' ? (
          /* ---- LEARN TAB ---- */
          <div className="space-y-3">
            <div className="prose prose-invert prose-sm prose-violet max-w-none [&_table]:text-xs [&_th]:py-1 [&_td]:py-1 [&_h3]:text-sm [&_h3]:mt-0 [&_p]:text-[13px] [&_li]:text-[13px] [&_blockquote]:text-[13px] [&_blockquote]:border-violet-500/40">
              <ReactMarkdown>{content.learn}</ReactMarkdown>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => { setActiveTab('practice'); resetQuestion(0); }}
                className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
              >
                Try practice questions <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          /* ---- PRACTICE TAB ---- */
          <div className="space-y-3">
            {/* Question navigation */}
            {questions.length > 1 && (
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => resetQuestion(i)}
                    className={cn(
                      "w-6 h-6 rounded text-[11px] font-medium transition-all",
                      i === currentQ ? "bg-violet-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Question card */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <p className="text-white text-sm leading-relaxed mb-3">{questions[currentQ].question}</p>

              {/* Progressive hints */}
              <div className="space-y-2">
                {questions[currentQ].hints.map((hint, i) => (
                  <div key={i}>
                    {i < revealedHints ? (
                      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/15 rounded-lg px-3 py-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-amber-200/90 text-xs">{hint}</span>
                      </div>
                    ) : i === revealedHints ? (
                      <button
                        onClick={() => setRevealedHints(revealedHints + 1)}
                        className="text-xs text-amber-400/70 hover:text-amber-400 flex items-center gap-1 transition-colors"
                      >
                        <Lightbulb className="w-3 h-3" /> Show hint {i + 1}
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Answer */}
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Reveal answer
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 bg-emerald-500/10 border border-emerald-500/15 rounded-lg px-3 py-2"
                >
                  <div className="prose prose-invert prose-sm max-w-none [&_p]:text-xs [&_strong]:text-emerald-300">
                    <ReactMarkdown>{questions[currentQ].answer}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Next question */}
            {currentQ < questions.length - 1 && showAnswer && (
              <button
                onClick={() => resetQuestion(currentQ + 1)}
                className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
              >
                Next question <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
