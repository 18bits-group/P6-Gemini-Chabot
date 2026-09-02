import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY não encontrada. Configure a variável de ambiente."
  );
}

const gemini = new GoogleGenAI({
  apiKey,
});

export default async function agentGemini(userPrompt) {
  if (!userPrompt || typeof userPrompt !== "string") {
    throw new Error("A pergunta enviada para o Gemini é inválida.");
  }

  try {
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
  } catch (error) {
    console.error("Erro na API Gemini:", error);

    throw new Error(
      error?.message || "Não foi possível obter uma resposta do Gemini."
    );
  }
}


