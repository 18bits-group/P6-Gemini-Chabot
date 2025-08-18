// Pega o elemento <textarea> pelo id "pergunta"
const pergunta = document.getElementById("pergunta");

// Pega o elemento <span> que mostra o contador de caracteres
const charCount = document.getElementById("charCount");

// Lê o valor do atributo maxlength do textarea (limite máximo de caracteres)
const maxLength = pergunta.getAttribute("maxlength");

// Adiciona um evento para quando o usuário digitar no textarea
pergunta.addEventListener("input", () => {
  // Atualiza o contador com a quantidade de caracteres digitados
  charCount.textContent = pergunta.value.length;
});

// Função para limpar os campos
function limpar() {
  // Apaga o texto do textarea
  pergunta.value = "";

  // Apaga o valor do campo de chave da API
  apiKey.value = "";

  // Reseta o contador para zero
  charCount.textContent = 0;
}

//    MODO ESCURO / CLARO

// Busca no localStorage o estado do dark mode salvo anteriormente
let darkmode = localStorage.getItem('darkmode');

// Pega o botão que alterna o tema
const themeSwitch = document.getElementById('theme-switch');

// Função para ativar o modo escuro
const enableDarkmode = () => {
  // Adiciona a classe "darkmode" no <body>
  document.body.classList.add('darkmode');
  // Salva no localStorage que o modo escuro está ativo
  localStorage.setItem('darkmode', 'active');
};

// Função para desativar o modo escuro
const disableDarkmode = () => {
  // Remove a classe "darkmode" do <body>
  document.body.classList.remove('darkmode');
  // Salva no localStorage que o modo escuro está desativado
  localStorage.setItem('darkmode', null);
};

// Se no carregamento da página o localStorage indicar que o modo escuro estava ativo,
// ativa novamente o modo escuro
if (darkmode === "active") enableDarkmode();

// Adiciona evento de clique no botão de troca de tema
themeSwitch.addEventListener("click", () => {
  // Lê o estado atual do dark mode no localStorage
  darkmode = localStorage.getItem('darkmode');

  // Se não estiver ativo, ativa; senão, desativa
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
