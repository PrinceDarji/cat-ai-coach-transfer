import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Load API key from env or use the one provided
const apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6J3Sl8yxQ686-QJgO1xSjh6WhwAbzVlgP4o2WJwtVbL7A';
const ai = new GoogleGenAI({ apiKey });

const TOPICS_TO_GENERATE = [
  { id: 'q-a-2', name: 'Profit & Loss', section: 'quant', filename: 'profit-loss' },
  { id: 'l-a-1', name: 'Linear Arrangement', section: 'lrdi', filename: 'linear-arrangement' },
  { id: 'v-rc-1', name: 'Main Idea', section: 'varc', filename: 'main-idea' },
];

const interfaceDefinition = `
export interface Lesson {
  title: string;
  content: string; // Markdown with LaTeX math
}

export interface PracticeQuestion {
  id: string;
  text: string;
  options: string[]; // Exactly 4 options
  correctAnswer: number; // Index 0-3
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  explanation: string;
  wrongExplanations: string[]; // 4 strings, empty string for the correct option
}

export interface TopicContent {
  id: string; // e.g., 'q-a-2'
  name: string; // e.g., 'Profit & Loss'
  section: 'quant' | 'lrdi' | 'varc';
  lessons: Lesson[]; // 3-5 deep theory lessons
  practice: PracticeQuestion[]; // 5 actual CAT PYQs or high-quality questions
}
`;

async function generateTopicContent(topic) {
  console.log(`Generating content for: ${topic.name}...`);
  
  const prompt = `You are an expert CAT exam tutor creating curriculum content.
I need you to generate a valid TypeScript file that exports a constant named "${topic.filename.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}" of type TopicContent.

Here is the interface:
${interfaceDefinition}

Topic details:
- ID: ${topic.id}
- Name: ${topic.name}
- Section: ${topic.section}

Requirements:
1. Provide deep, comprehensive theory in the 'lessons' array. Include formulas, shortcuts, and examples. Format content in Markdown. Use LaTeX for math (e.g. $x^2$).
2. Provide exactly 5 practice questions in the 'practice' array. Make these Actual CAT PYQs (label them [CAT 2021], etc.) if possible, or very realistic CAT-level questions.
3. Provide detailed explanations for the correct answer, and 'wrongExplanations' for why the other 3 options are incorrect traps.
4. Output ONLY the raw TypeScript code. Do not wrap it in markdown code blocks like \`\`\`typescript. Just the raw code. It MUST start with "import { TopicContent } from '../types';"

Begin!`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    let code = response.text;
    // Strip markdown blocks if the model accidentally included them
    if (code.startsWith('\`\`\`')) {
      code = code.replace(/^\`\`\`(typescript|ts)?\n/, '');
      code = code.replace(/\n\`\`\`$/, '');
    }

    const dir = path.join(process.cwd(), 'src', 'lib', 'content', topic.section);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${topic.filename}.ts`);
    fs.writeFileSync(filePath, code);
    
    console.log(`Successfully generated and saved: ${filePath}`);
  } catch (error) {
    console.error(`Failed to generate ${topic.name}:`, error);
  }
}

async function main() {
  for (const topic of TOPICS_TO_GENERATE) {
    await generateTopicContent(topic);
    // Add a small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log('Done generating initial batch!');
}

main();
