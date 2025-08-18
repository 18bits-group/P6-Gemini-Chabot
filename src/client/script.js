    // Pega o elemento <textarea> pelo id "pergunta"
    const pergunta = document.getElementById("question");

    // Pega o elemento <span> que mostra o contador de caracteres
    const charCount = document.getElementById("charCount");

    // Lê o valor do atributo maxlength do textarea (limite máximo de caracteres)
    const maxLength = pergunta.getAttribute("maxlength");

    // Adiciona um evento para quando o usuário digitar no textarea
    pergunta.addEventListener("input", () => {
      // Atualiza o contador com a quantidade de caracteres digitados
      charCount.textContent = question.value.length;
    });

    // Função para limpar os campos
    function cleaner() {
      // Apaga o texto do textarea
      pergunta.value = "";

      // Apaga o valor do campo de chave da API
      const apiKey = document.getElementById("apiKey");
      apiKey.value = "";

      // Reseta o contador para zero
      charCount.textContent = 0;
    }

    // TEMA DARK/LIGHT MODE
    class ThemeManager {
        constructor() {
            // Elementos do DOM
            this.themeToggle = document.getElementById('themeToggle');
            
            // Estado do tema (dark por padrão)
            this.isDarkMode = true;
            
            // Inicializar
            this.init();
        }

        // Inicializar tema
        init() {
            this.loadStoredTheme();
            this.bindEvents();
            this.initializeTheme();
        }

        // Carregar tema armazenado
        loadStoredTheme() {
            const storedTheme = localStorage.getItem('aiAssistant_theme');
            // Carregar tema salvo ou usar dark como padrão
            this.isDarkMode = storedTheme ? storedTheme === 'dark' : true;
        }

        // Inicializar tema baseado no estado carregado
        initializeTheme() {
            if (this.isDarkMode) {
                document.documentElement.removeAttribute('data-theme');
                this.themeToggle.innerHTML = '☀️';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                this.themeToggle.innerHTML = '🌙';
            }
        }

        // Vincular eventos
        bindEvents() {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Alternar entre tema dark e light
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            
            if (this.isDarkMode) {
                // Mudar para dark mode
                document.documentElement.removeAttribute('data-theme');
                this.themeToggle.innerHTML = '☀️';
            } else {
                // Mudar para light mode
                document.documentElement.setAttribute('data-theme', 'light');
                this.themeToggle.innerHTML = '🌙';
            }
            
            // Salvar preferência do tema
            localStorage.setItem('aiAssistant_theme', this.isDarkMode ? 'dark' : 'light');
        }
    }

    // Inicializar gerenciador de tema quando DOM estiver carregado
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });