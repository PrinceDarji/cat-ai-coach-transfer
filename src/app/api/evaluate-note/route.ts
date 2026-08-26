import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    const systemInstruction = `You are a CAT Exam Tutor evaluating a student's study note.
Review the note for correctness, completeness, and clarity.
Provide brief, actionable feedback. Point out any errors if present. 
If the note is good, praise them. Return the feedback in markdown format.`;

    const prompt = `Title: ${title}\n\nContent:\n${content}\n\nPlease evaluate this note.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return NextResponse.json({ evaluation: response.text });
  } catch (error) {
    console.error('Error evaluating note:', error);
    return NextResponse.json({ error: 'Failed to evaluate note' }, { status: 500 });
  }
}
