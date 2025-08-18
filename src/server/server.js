import express from "express";
import agentGemini from "./agents/gemini";

const app = express();
const port = process.env.npm_package_config_port || 3000;

app.get("/", async (req, res) => {
  const userPrompt = req.body;
  const response = await agentGemini(userPrompt);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server execute in port ${port}`);
});
