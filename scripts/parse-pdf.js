const { GoogleGenAI, Type } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function extractSection(fileRef, sectionName, questionCount, year, slot) {
  console.log(`Extracting ${sectionName}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        fileRef,
        `You are an expert data extractor. This PDF is a CAT Question Paper (Year ${year}, Slot ${slot}).
Your task is to extract ONLY the questions for the ${sectionName} section.
There should be around ${questionCount} questions for this section.

Each question should be formatted as follows:
- id: e.g., 'v1', 'l1', 'q1' depending on section
- type: 'mcq' or 'tita' (Type In The Answer)
- text: The full question text, including any passage, instructions, or tables preceding it. Format math with LaTeX $...$.
- options: An array of 4 string options (for mcq). Empty array for tita.
- correctAnswer: The index of the correct option (0-3) for mcq, or the string answer for tita.
- topicId: Guess the topic (e.g., 'reading-comprehension', 'percentages', 'algebra', 'arrangements').
- explanation: Use the "Explanations" section at the end of the PDF to find the explanation for this question.

Return ONLY the raw JSON array of question objects, without markdown formatting. Do not wrap in \`\`\`json. Return valid JSON.`
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING },
              text: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              topicId: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['id', 'type', 'text', 'options', 'correctAnswer', 'topicId']
          }
        }
      }
    });

    return JSON.parse(response.text());
  } catch (error) {
    console.error(`Failed to extract ${sectionName}:`, error);
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node parse-pdf.js <path-to-pdf> <year> <slot>');
    process.exit(1);
  }

  const pdfPath = args[0];
  const year = parseInt(args[1]);
  const slot = parseInt(args[2]);

  if (!fs.existsSync(pdfPath)) {
    console.error('File not found:', pdfPath);
    process.exit(1);
  }

  console.log(`Uploading ${pdfPath} to Gemini...`);
  
  // The correct file upload method
  let uploadedFile;
  try {
    uploadedFile = await ai.files.upload({ file: pdfPath, mimeType: 'application/pdf' });
    console.log('Upload complete! File URI:', uploadedFile.uri);
  } catch (e) {
    console.error('Upload failed:', e);
    process.exit(1);
  }

  // Sleep for a few seconds to let Gemini process the file
  await new Promise(r => setTimeout(r, 5000));

  const varcQuestions = await extractSection(uploadedFile, 'VARC', 24, year, slot);
  const lrdiQuestions = await extractSection(uploadedFile, 'LRDI', 20, year, slot);
  const quantQuestions = await extractSection(uploadedFile, 'Quant', 22, year, slot);

  const sections = [
    {
      id: 'varc',
      name: 'VARC',
      timeLimit: 2400,
      questions: varcQuestions
    },
    {
      id: 'lrdi',
      name: 'LRDI',
      timeLimit: 2400,
      questions: lrdiQuestions
    },
    {
      id: 'quant',
      name: 'Quant',
      timeLimit: 2400,
      questions: quantQuestions
    }
  ];

  const tsContent = `export const CAT_${year}_SLOT_${slot} = {
  id: 'cat-${year}-slot-${slot}',
  name: 'CAT ${year} Slot ${slot}',
  sections: ${JSON.stringify(sections, null, 2)}
};`;

  const mocksDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'mocks');
  if (!fs.existsSync(mocksDir)) fs.mkdirSync(mocksDir, { recursive: true });
  
  const outputPath = path.join(mocksDir, `cat-${year}-slot-${slot}.ts`);
  fs.writeFileSync(outputPath, tsContent);
  console.log(`Saved successfully to ${outputPath}`);
  
  // Clean up
  try {
     await ai.files.delete({name: uploadedFile.name});
     console.log('Deleted remote file.');
  } catch (e) {}
  
  console.log('Registering the mock in the app...');
  // 1. Update pyqs/index.ts
  const pyqIndexPath = path.join(__dirname, '..', 'src', 'lib', 'content', 'pyqs', 'index.ts');
  if (fs.existsSync(pyqIndexPath)) {
    let pyqContent = fs.readFileSync(pyqIndexPath, 'utf8');
    const importStatement = `import { CAT_${year}_SLOT_${slot} } from '../mocks/cat-${year}-slot-${slot}';`;
    if (!pyqContent.includes(importStatement)) {
      pyqContent = importStatement + '\n' + pyqContent;
      const arrayEntry = `{ year: ${year}, slot: ${slot}, mock: CAT_${year}_SLOT_${slot} },`;
      pyqContent = pyqContent.replace('const allMocks = [', `const allMocks = [\n    ${arrayEntry}`);
      fs.writeFileSync(pyqIndexPath, pyqContent);
      console.log('Updated pyqs/index.ts');
    }
  }

  // 2. Update mocks/take/page.tsx
  const mockPagePath = path.join(__dirname, '..', 'src', 'app', 'mocks', 'take', 'page.tsx');
  if (fs.existsSync(mockPagePath)) {
    let mockPage = fs.readFileSync(mockPagePath, 'utf8');
    const mockEntry = `  {
    id: 'cat-${year}-slot-${slot}',
    name: 'CAT ${year} Slot ${slot} (PYQ)',
    description: 'Official CAT ${year} Slot ${slot} question paper.',
    duration: 120,
    totalQuestions: 66,
    status: 'new'
  },`;
    if (!mockPage.includes(`id: 'cat-${year}-slot-${slot}'`)) {
      mockPage = mockPage.replace('const AVAILABLE_MOCKS = [', `const AVAILABLE_MOCKS = [\n${mockEntry}`);
      fs.writeFileSync(mockPagePath, mockPage);
      console.log('Updated mocks/take/page.tsx');
    }
  }

  // 3. Update mocks/take/[mockId]/page.tsx
  const enginePath = path.join(__dirname, '..', 'src', 'app', 'mocks', 'take', '[mockId]', 'page.tsx');
  if (fs.existsSync(enginePath)) {
    let engine = fs.readFileSync(enginePath, 'utf8');
    const importStmt = `import { CAT_${year}_SLOT_${slot} } from '@/lib/content/mocks/cat-${year}-slot-${slot}';`;
    if (!engine.includes(importStmt)) {
      engine = engine.replace(/import { DEMO_MINI_MOCK }.*?;/, `import { DEMO_MINI_MOCK } from '@/lib/content/mocks/demo';\n${importStmt}`);
      const ternary = `                 : mockId === 'cat-${year}-slot-${slot}' ? CAT_${year}_SLOT_${slot}`;
      engine = engine.replace(/const mockData = .*?\n(.*?): null;/s, (match) => {
        return match.replace(': null;', `${ternary} \n                 : null;`);
      });
      fs.writeFileSync(enginePath, engine);
      console.log('Updated MockExamEngine imports');
    }
  }

  console.log('All done!');
}

main();
