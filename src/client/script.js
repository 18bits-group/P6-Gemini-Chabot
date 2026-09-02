const pergunta = document.getElementById("question");
const charCount = document.getElementById("charCount");
const apiKey = document.getElementById("apiKey");
const btnQuestion = document.getElementById("btnquestion");

// URL do backend
const API_URL = "http://localhost:3000/api/gemini";

// ==========================================
// CONTADOR DE CARACTERES
// ==========================================

pergunta.addEventListener("input", () => {
  charCount.textContent = pergunta.value.length;
});

// ==========================================
// FUNÇÃO PRINCIPAL - PERGUNTAR AO GEMINI
// ==========================================

async function question() {
  const userQuestion = pergunta.value.trim();
  const userApiKey = apiKey.value.trim();

  // Verifica se existe pergunta
  if (!userQuestion) {
    alert("Digite uma pergunta antes de continuar.");
    pergunta.focus();
    return;
  }

  // Verifica se existe chave
  if (!userApiKey) {
    alert("Digite sua chave da API Gemini.");
    apiKey.focus();
    return;
  }

  // Desabilita botão enquanto aguarda
  btnQuestion.disabled = true;
  btnQuestion.textContent = "Consultando...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userQuestion,
        apiKey: userApiKey,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Erro ao chamar a API Gemini. Verifique a chave e tente novamente."
      );
    }

    // Mostra a resposta
    alert(data.response);

  } catch (error) {
    console.error("Erro:", error);

    alert(
      error.message ||
        "Erro ao chamar a API Gemini. Verifique a chave e tente novamente."
    );
  } finally {
    // Reativa botão
    btnQuestion.disabled = false;
    btnQuestion.textContent = "Perguntar";
  }
}

// ==========================================
// FUNÇÃO PARA LIMPAR OS CAMPOS
// ==========================================

function cleaner() {
  pergunta.value = "";
  apiKey.value = "";
  charCount.textContent = "0";
  pergunta.focus();
}

// ==========================================
// TEMA DARK / LIGHT MODE
// ==========================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");

    this.isDarkMode = true;

    this.init();
  }

  init() {
    this.loadStoredTheme();
    this.bindEvents();
    this.initializeTheme();
  }

  loadStoredTheme() {
    const storedTheme = localStorage.getItem("aiAssistant_theme");

    this.isDarkMode = storedTheme
      ? storedTheme === "dark"
      : true;
  }

  initializeTheme() {
    if (this.isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      this.themeToggle.innerHTML = "☀️";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      this.themeToggle.innerHTML = "🌙";
    }
  }

  bindEvents() {
    this.themeToggle.addEventListener("click", () =>
      this.toggleTheme()
    );
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      this.themeToggle.innerHTML = "☀️";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      this.themeToggle.innerHTML = "🌙";
    }

    localStorage.setItem(
      "aiAssistant_theme",
      this.isDarkMode ? "dark" : "light"
    );
  }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});

// Disponibiliza as funções para os eventos do HTML
window.question = question;
window.cleaner = cleaner;

