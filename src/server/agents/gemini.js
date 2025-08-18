import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const gemini = new GoogleGenAI({});

export default async function agentGemini(userPrompt) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userPrompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });
  return response.text;
}
