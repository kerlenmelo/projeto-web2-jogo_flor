import { JogoController } from './JogoController.js';

export const jogoView = {
  // Referências aos elementos HTML principais (para fácil acesso)
  appContainer: document.getElementById('app'),
  telaInicial: null,
  telaJogo: null,
  telaInputJogador2: null,
  mensagemDisplay: null,
  palavraDisplay: null,
  categoriaDisplay: null,
  dicaDisplay: null,
  letrasErradasDisplay: null,
  tecladoContainer: null,
  florImagem: null,

  /**
   * Constrói e mostra a tela inicial do jogo.
   */
  mostrarTelaInicial() {
    this.appContainer.innerHTML = `
      <div id="tela-inicial" class="tela-inicial">
        <h1>Bem-vindo ao Jogo da Flor</h1>
        <p>Descubra a palavra antes que todas as pétalas caiam!</p>
        <div class="botoes-iniciais">
          <button id="modo1">1 Jogador</button>
          <button id="modo2">2 Jogadores</button>
        </div>
      </div>
    `;
    this.telaInicial = document.getElementById('tela-inicial');

    const modo1 = document.getElementById('modo1');
    const modo2 = document.getElementById('modo2');

    modo1.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('modoSelecionado', { detail: { modoDeJogo: '1' } })
      );
    });

    modo2.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('modoSelecionado', { detail: { modoDeJogo: '2' } })
      );
    });
  },

  /**
   * Oculta a tela inicial.
   */
  ocultarTelaInicial() {
    if (this.telaInicial) {
      this.telaInicial.style.display = 'none';
    }
  },

  /**
   * Constrói e mostra a tela principal do jogo.
   */
  mostrarTelaJogo() {
    this.appContainer.innerHTML = `
      <div id="tela-jogo" class="tela-jogo">
        <div id="flor-container">
            <img id="flor-imagem" src="assets/images/flor_6.png" alt="Flor com 6 pétalas">
        </div>
        <div class="info-jogo">
            <p>Categoria: <span id="categoria-display"></span></p>
            <p>Dica: <span id="dica-display"></span></p>
            <p class="palavra-adivinhada" id="palavra-display"></p>
            <p>Letras Erradas: <span id="letras-erradas-display"></span></p>
            <div id="teclado-container" class="teclado-container"></div>
            <div id="mensagem-display" class="mensagem-display"></div>
            <div class="botoes-fim-jogo" style="display: none;">
                <button id="reiniciar-btn">Jogar Novamente</button>
            </div>
        </div>
      </div>
    `;
    this.telaJogo = document.getElementById('tela-jogo');
    this.florImagem = document.getElementById('flor-imagem');
    this.palavraDisplay = document.getElementById('palavra-display');
    this.categoriaDisplay = document.getElementById('categoria-display');
    this.dicaDisplay = document.getElementById('dica-display');
    this.letrasErradasDisplay = document.getElementById(
      'letras-erradas-display'
    );
    this.tecladoContainer = document.getElementById('teclado-container');
    this.mensagemDisplay = document.getElementById('mensagem-display');

    this.criarTecladoVirtual();
  },

  /**
   * Constrói e mostra a tela para o Jogador 1 inserir a palavra e dica.
   */
  mostrarTelaInputJogador2() {
    this.appContainer.innerHTML = `
      <div id="tela-input-jogador2" class="tela-input-jogador2">
        <h2>Modo 2 Jogadores: Defina a Palavra</h2>
        <div class="form-jogador2">
            <label for="input-palavra">Palavra Secreta:</label>
            <input type="text" id="input-palavra" placeholder="Ex: Girassol" />
            <label for="input-dica">Dica:</label>
            <input type="text" id="input-dica" placeholder="Ex: Flor amarela que segue o sol" />
            <button id="iniciar-jogo-2-jogadores">Iniciar Jogo</button>
        </div>
        <div id="mensagem-display-jogador2" class="mensagem-display"></div>
      </div>
    `;
    this.telaInputJogador2 = document.getElementById('tela-input-jogador2');

    const inputPalavra = document.getElementById('input-palavra');
    const inputDica = document.getElementById('input-dica');
    const iniciarBtn = document.getElementById('iniciar-jogo-2-jogadores');
    // const mensagemJogador2 = document.getElementById('mensagem-display-jogador2'); // Removido, mostrarMensagem já lida

    iniciarBtn.addEventListener('click', () => {
      const palavra = inputPalavra.value.trim();
      const dica = inputDica.value.trim();
      JogoController.definirPalavraModo2(palavra, dica);
    });
  },

  /**
   * Oculta a tela de input do Jogador 2.
   */
  ocultarTelaInputJogador2() {
    if (this.telaInputJogador2) {
      // Adicionada verificação
      this.telaInputJogador2.style.display = 'none';
    }
  },

  /**
   * Limpa o conteúdo da tela de jogo.
   */
  limparTelaJogo() {
    if (this.telaJogo) {
      this.telaJogo.remove();
      this.telaJogo = null;
    }
    if (this.telaInputJogador2) {
      // Adicionado para limpar a tela do J2 também
      this.telaInputJogador2.remove();
      this.telaInputJogador2 = null;
    }
  },

  /**
   * Exibe a palavra com as letras adivinhadas e os sublinhados.
   * @param {string} palavra - A palavra completa.
   * @param {string[]} letrasCorretas - Array de letras adivinhadas corretamente.
   */
  mostrarPalavra(palavra, letrasCorretas) {
    if (!this.palavraDisplay) return;
    const palavraAdivinhadaFormatada = palavra
      .split('')
      .map((letra) => {
        return letrasCorretas.includes(letra) ? letra : '_';
      })
      .join(' ');
    this.palavraDisplay.textContent = palavraAdivinhadaFormatada;
  },

  /**
   * Exibe a categoria da palavra.
   * @param {string} categoria - A categoria da palavra.
   */
  mostrarCategoria(categoria) {
    if (this.categoriaDisplay) {
      this.categoriaDisplay.textContent = categoria;
    }
  },

  /**
   * Exibe a dica da palavra.
   * @param {string} dica - A dica da palavra.
   */
  mostrarDica(dica) {
    if (this.dicaDisplay) {
      this.dicaDisplay.textContent = dica;
    }
  },

  /**
   * NOVIDADE: Obtém a referência do botão do teclado para uma letra específica.
   * @param {string} letra - A letra do botão.
   * @returns {HTMLElement|null} O elemento do botão ou null se não encontrado.
   */
  obterBotaoTeclado(letra) {
    if (this.tecladoContainer) {
      return this.tecladoContainer.querySelector(
        `button.teclado-letra[data-letra="${letra.toUpperCase()}"]`
      );
    }
    return null;
  },

  /**
   * Atualiza a exibição das letras erradas e o estado dos botões do teclado.
   * @param {string[]} letrasErradas - Array de letras adivinhadas incorretamente.
   * @param {string[]} letrasCorretas - Array de letras adivinhadas corretamente.
   */
  atualizarLetrasTentadas(letrasErradas, letrasCorretas) {
    if (this.letrasErradasDisplay) {
      this.letrasErradasDisplay.textContent = letrasErradas.join(', ');
    }

    document
      .querySelectorAll('.teclado-container button.teclado-letra')
      .forEach((button) => {
        const letraDoBotao = button.textContent;
        if (letrasCorretas.includes(letraDoBotao)) {
          button.disabled = true;
          button.classList.add('tentada', 'correta');
          button.classList.remove('errada');
        } else if (letrasErradas.includes(letraDoBotao)) {
          button.disabled = true;
          button.classList.add('tentada', 'errada');
          button.classList.remove('correta');
        } else {
          button.disabled = false;
          button.classList.remove('tentada', 'correta', 'errada');
        }
      });
  },

  /**
   * Cria e anexa o teclado virtual à tela.
   */
  criarTecladoVirtual() {
    if (!this.tecladoContainer) return;
    this.tecladoContainer.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    letras.forEach((letra) => {
      const button = document.createElement('button');
      button.textContent = letra;
      button.classList.add('teclado-letra');
      button.dataset.letra = letra;
      button.addEventListener('click', () => {
        document.dispatchEvent(
          new CustomEvent('tentativaJogador', { detail: { letra: letra } })
        );
      });
      this.tecladoContainer.appendChild(button);
    });
  },

  /**
   * Atualiza a imagem da flor com base nas tentativas restantes.
   * @param {number} tentativasRestantes - Número de tentativas restantes.
   */
  atualizarFlor(tentativasRestantes) {
    if (this.florImagem) {
      this.florImagem.src = `assets/flor_${tentativasRestantes}.png`;
      this.florImagem.alt = `Flor com ${tentativasRestantes} pétalas`;
    }
  },

  /**
   * Exibe uma mensagem para o usuário.
   * @param {string} texto - O texto da mensagem.
   * @param {string} tipo - 'success', 'error', 'info' para estilização.
   */
  mostrarMensagem(texto, tipo = 'info') {
    if (this.mensagemDisplay) {
      this.mensagemDisplay.textContent = texto;
      this.mensagemDisplay.className = `mensagem-display ${tipo}`;
      setTimeout(() => {
        this.mensagemDisplay.textContent = '';
        this.mensagemDisplay.className = 'mensagem-display';
      }, 3000);
    }
  },

  /**
   * Mostra os botões para reiniciar o jogo.
   */
  mostrarBotoesReiniciar() {
    const botoesFimJogo = document.querySelector('.botoes-fim-jogo');
    if (botoesFimJogo) {
      botoesFimJogo.style.display = 'block';
      const reiniciarBtn = document.getElementById('reiniciar-btn');
      if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('reiniciarJogo'));
        });
      }
    }
    if (this.tecladoContainer) {
      this.tecladoContainer.style.display = 'none';
    }
  },

  /**
   * Oculta os botões de reiniciar e mostra o teclado.
   */
  ocultarBotoesReiniciar() {
    const botoesFimJogo = document.querySelector('.botoes-fim-jogo');
    if (botoesFimJogo) {
      botoesFimJogo.style.display = 'none';
    }
    if (this.tecladoContainer) {
      this.tecladoContainer.style.display = 'grid';
      document
        .querySelectorAll('.teclado-container button')
        .forEach((button) => {
          button.disabled = false;
          button.classList.remove('tentada', 'correta', 'errada');
        });
    }
  },
};
