import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { message, history, profile } = await request.json();

    const contents = history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    contents.push({ role: 'user', parts: [{ text: message }] });

    const systemInstruction = `You are CAT AI Coach, a specialized AI tutor for students preparing for the CAT (Common Admission Test) for IIMs in India.
Your student is named ${profile?.name || 'Student'}. Their target percentile is ${profile?.targetPercentile || 99}%.
Their current quant level is ${profile?.currentLevel || 'intermediate'}.

Be encouraging, concise, and helpful. Format your responses in markdown. Use LaTeX for math equations if needed (e.g., $x^2$).
When a student asks for a practice question or explanation, be clear and step-by-step.`;

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(new TextEncoder().encode("\n[Error: Stream interrupted]"));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return new Response('Failed to generate response', { status: 500 });
  }
}

export const runtime = 'edge';
