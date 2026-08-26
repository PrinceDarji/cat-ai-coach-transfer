import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { topicName, difficulty } = await request.json();

    const systemInstruction = `You are a CAT Exam Tutor. Generate exactly ONE highly realistic CAT exam practice question for the topic "${topicName}" at "${difficulty}" difficulty.
Return the output strictly as a JSON object with this exact structure:
{
  "text": "The question text here. Use LaTeX for math like $x^2$.",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0, // index of the correct option
  "difficulty": "${difficulty}",
  "hint": "A short hint to help solve it.",
  "explanation": "Detailed step-by-step explanation of the correct answer.",
  "wrongExplanations": ["", "Why option 2 is wrong.", "Why option 3 is wrong.", "Why option 4 is wrong."]
}
Ensure the JSON is valid and complete. Do NOT return markdown formatting around it, just the raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Generate a practice question now.",
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(response.text);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
