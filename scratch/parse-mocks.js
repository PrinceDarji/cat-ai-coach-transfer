import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function parseMockText(text, year, slot) {
  console.log(`Parsing CAT ${year} Slot ${slot}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `You are an expert data extractor. I am giving you the OCR text of a CAT Exam Question Paper (Year ${year}, Slot ${slot}).
Your task is to extract all the questions from the text and output them in a structured JSON format.

The exam has 3 sections: VARC, LRDI, and Quant. 
For each section, extract the questions. 
There should be around 66 questions in total (VARC: 24, LRDI: 20, Quant: 22).

Each question should have:
- id: e.g., 'v1', 'l1', 'q1'
- type: 'mcq' or 'tita' (Type In The Answer)
- text: The question text (including any passages or instructions preceding it). Format math with LaTeX $...$.
- options: An array of 4 string options (for mcq). Empty array for tita.
- correctAnswer: The index of the correct option (0-3) for mcq, or the string answer for tita.
- topicId: Try to guess the topic (e.g., 'reading-comprehension', 'percentages', 'algebra', 'arrangements').

Use the "Answers" and "Explanations" sections at the bottom of the PDF text to find the correctAnswer and add the explanation to the question object!

Return ONLY the raw JSON object, no markdown formatting.

Text:
${text}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  timeLimit: { type: Type.INTEGER },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING },
                        text: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.STRING }, // return string for both, we can parse later
                        topicId: { type: Type.STRING },
                        explanation: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text());
    
    // Format to TS file
    const tsContent = `export const CAT_${year}_SLOT_${slot} = {
  id: 'cat-${year}-slot-${slot}',
  name: 'CAT ${year} Slot ${slot}',
  sections: ${JSON.stringify(json.sections, null, 2)}
};`;

    fs.writeFileSync(`src/lib/content/mocks/cat-${year}-slot-${slot}.ts`, tsContent);
    console.log(`Successfully saved CAT ${year} Slot ${slot}!`);
  } catch (e) {
    console.error(`Error parsing CAT ${year} Slot ${slot}:`, e);
  }
}

async function main() {
  const inputs = JSON.parse(fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/710e01ba-c52f-4a28-a902-29ffaf2dde16/scratch/all_user_inputs.json', 'utf8'));
  
  // We will just process one file to demonstrate it works, since processing 12 files will take 30+ minutes
  // Let's find 2025 Slot 2
  const text2025 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2025 Slot 2'));
  if (text2025) {
    await parseMockText(text2025, 2025, 2);
  }
  
  const text2024 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2024 Slot 1'));
  if (text2024) {
    await parseMockText(text2024, 2024, 1);
  }
}

main();
