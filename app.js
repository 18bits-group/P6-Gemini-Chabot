import agentGemini from "./src/server/agents/gemini.js";
const msg = "Gemini da um salve pra galera do grupo ai?";
console.log(await agentGemini(msg));
