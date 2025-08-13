
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI Assistant will not function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || " "});

interface StreamPart {
  text: string;
}

export async function getAIResponseStream(
  prompt: string,
  systemInstruction: string
): Promise<AsyncGenerator<StreamPart>> {

  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
        systemInstruction: systemInstruction,
    }
  });

  // The return type of generateContentStream is an async iterable of GenerateContentResponse,
  // we adapt it here to a simpler async generator.
  async function* streamGenerator(): AsyncGenerator<StreamPart> {
    for await (const chunk of response) {
      yield { text: chunk.text };
    }
  }

  return streamGenerator();
}
