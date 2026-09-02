import express from "express";
import agentGemini from "./agents/gemini.js";

const app = express();

const port = process.env.PORT || process.env.npm_package_config_port || 3000;

// Permite receber JSON no corpo das requisições
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    message: "Servidor do Assistente 18 Bits está funcionando!",
  });
});

// Rota para enviar perguntas ao Gemini
app.post("/api/gemini", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Digite uma pergunta válida.",
      });
    }

    const response = await agentGemini(question);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Erro ao chamar a API Gemini. Verifique a chave e tente novamente.",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

