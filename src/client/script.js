
// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const pergunta = document.getElementById("question");
const charCount = document.getElementById("charCount");
const btnQuestion = document.getElementById("btnquestion");

// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================

// Durante o desenvolvimento local:
const API_URL = "http://localhost:3000/api/gemini";

// Quando publicar o backend no Render,
// troque pela URL do seu backend.
//
// Exemplo:
// const API_URL = "https://seu-backend.onrender.com/api/gemini";


// ==========================================
// CONTADOR DE CARACTERES
// ==========================================

if (pergunta && charCount) {
  pergunta.addEventListener("input", () => {
    charCount.textContent = pergunta.value.length;
  });
}


// ==========================================
// FUNÇÃO PARA ENVIAR A PERGUNTA
// ==========================================

async function question() {

  const userQuestion = pergunta.value.trim();

  // Verifica se o usuário digitou alguma coisa
  if (!userQuestion) {
    alert("Digite uma pergunta antes de continuar.");
    pergunta.focus();
    return;
  }

  // Desabilita o botão enquanto aguarda a resposta
  if (btnQuestion) {
    btnQuestion.disabled = true;
    btnQuestion.textContent = "Consultando...";
  }

  try {

    console.log("Enviando pergunta para o servidor...");

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        question: userQuestion
      })
    });


    // Tenta transformar a resposta em JSON
    const data = await response.json();


    // Verifica se o servidor retornou erro
    if (!response.ok) {
      throw new Error(
        data.error ||
        "Erro ao chamar a API Gemini."
      );
    }


    // Verifica se existe resposta
    if (!data.response) {
      throw new Error(
        "O servidor não retornou uma resposta do Gemini."
      );
    }


    console.log("Resposta do Gemini:", data.response);


    // ==========================================
    // MOSTRAR RESPOSTA
    // ==========================================

    // Se existir um elemento chamado "response",
    // mostra a resposta nele.
    const responseElement =
      document.getElementById("response");

    if (responseElement) {

      responseElement.textContent = data.response;

    } else {

      // Caso o projeto ainda não tenha
      // um elemento específico para resposta,
      // usamos um alert temporariamente.
      alert(data.response);

    }


  } catch (error) {

    console.error(
      "Erro ao chamar o Gemini:",
      error
    );


    alert(
      error.message ||
      "Erro ao chamar a API Gemini. Verifique o servidor e tente novamente."
    );


  } finally {

    // Reativa o botão
    if (btnQuestion) {

      btnQuestion.disabled = false;
      btnQuestion.textContent = "Perguntar";

    }

  }
}


// ==========================================
// LIMPAR CAMPOS
// ==========================================

function cleaner() {

  if (pergunta) {
    pergunta.value = "";
  }

  if (charCount) {
    charCount.textContent = "0";
  }

  if (pergunta) {
    pergunta.focus();
  }

}


// ==========================================
// TEMA DARK / LIGHT
// ==========================================

class ThemeManager {

  constructor() {

    this.themeToggle =
      document.getElementById("themeToggle");

    this.isDarkMode = true;

    this.init();

  }


  // ------------------------------------------
  // Inicialização
  // ------------------------------------------

  init() {

    this.loadStoredTheme();

    this.bindEvents();

    this.initializeTheme();

  }


  // ------------------------------------------
  // Recupera tema salvo
  // ------------------------------------------

  loadStoredTheme() {

    const storedTheme =
      localStorage.getItem("aiAssistant_theme");

    if (storedTheme) {

      this.isDarkMode =
        storedTheme === "dark";

    } else {

      this.isDarkMode = true;

    }

  }


  // ------------------------------------------
  // Aplica tema
  // ------------------------------------------

  initializeTheme() {

    if (!this.themeToggle) {
      return;
    }


    if (this.isDarkMode) {

      document.documentElement
        .removeAttribute("data-theme");

      this.themeToggle.innerHTML = "☀️";

    } else {

      document.documentElement
        .setAttribute(
          "data-theme",
          "light"
        );

      this.themeToggle.innerHTML = "🌙";

    }

  }


  // ------------------------------------------
  // Eventos
  // ------------------------------------------

  bindEvents() {

    if (!this.themeToggle) {
      return;
    }


    this.themeToggle.addEventListener(
      "click",
      () => this.toggleTheme()
    );

  }


  // ------------------------------------------
  // Alternar tema
  // ------------------------------------------

  toggleTheme() {

    this.isDarkMode =
      !this.isDarkMode;


    if (this.isDarkMode) {

      document.documentElement
        .removeAttribute("data-theme");

      if (this.themeToggle) {
        this.themeToggle.innerHTML = "☀️";
      }

    } else {

      document.documentElement
        .setAttribute(
          "data-theme",
          "light"
        );

      if (this.themeToggle) {
        this.themeToggle.innerHTML = "🌙";
      }

    }


    localStorage.setItem(
      "aiAssistant_theme",
      this.isDarkMode
        ? "dark"
        : "light"
    );

  }

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    new ThemeManager();

  }
);


// ==========================================
// DISPONIBILIZA FUNÇÕES PARA O HTML
// ==========================================
//
// Isso permite que o HTML continue usando:
//
// onclick="question()"
// onclick="cleaner()"
//

window.question = question;
window.cleaner = cleaner;

