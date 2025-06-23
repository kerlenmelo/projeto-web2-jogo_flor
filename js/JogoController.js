import { JogoModel } from './Jogo.js';
import { jogoView } from './JogoView.js';

export const JogoController = {
  iniciar() {
    jogoView.mostrarTelaInicial();
    document.addEventListener('modoSelecionado', (e) => {
      JogoController.iniciarJogo(e.detail.modoDeJogo);
    });

    document.addEventListener('palavraGerada', (e) => {
      const estado = e.detail;
      jogoView.ocultarTelaInicial();
      jogoView.ocultarTelaInputJogador2();
      jogoView.mostrarTelaJogo();
      jogoView.mostrarCategoria(estado.categoriaPalavra);
      jogoView.mostrarDica(estado.dicaSobrePalavra);
      jogoView.mostrarPalavra(estado.palavraEscolhida, estado.letrasCorretas);
      jogoView.atualizarLetrasTentadas(
        estado.letrasErradas,
        estado.letrasCorretas
      );
      jogoView.atualizarFlor(estado.tentativasRestantes);
      jogoView.ocultarBotoesReiniciar();
    });

    document.addEventListener('erroCarregamentoPalavras', () => {
      jogoView.mostrarMensagem(
        'Erro ao carregar banco de palavras. Tente novamente mais tarde.',
        'error'
      );
    });

    document.addEventListener('tentativaJogador', (e) => {
      const letraTentada = e.detail.letra;
      if (JogoController.validarLetra(letraTentada)) {
        JogoModel.processarTentativa(letraTentada);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (JogoModel.estadoDoJogo.statusJogo !== 'emAndamento') {
        return;
      }

      const letraPressionada = e.key;

      if (JogoController.validarLetra(letraPressionada)) {
        JogoModel.processarTentativa(letraPressionada);
      } else {
        jogoView.mostrarMensagem(
          `"${letraPressionada}" não é uma letra válida!`,
          'info'
        );
      }
    });

    document.addEventListener('letraCorreta', (e) => {
      const estado = e.detail;
      jogoView.mostrarPalavra(estado.palavraEscolhida, estado.letrasCorretas);
      jogoView.atualizarLetrasTentadas(
        estado.letrasErradas,
        estado.letrasCorretas
      );
      jogoView.mostrarMensagem(
        `"${estado.letrasCorretas.slice(-1)}" está correto!`,
        'success'
      );
    });

    document.addEventListener('letraErrada', (e) => {
      const estado = e.detail;
      jogoView.mostrarPalavra(estado.palavraEscolhida, estado.letrasCorretas);
      jogoView.atualizarLetrasTentadas(
        estado.letrasErradas,
        estado.letrasCorretas
      );
      jogoView.atualizarFlor(estado.tentativasRestantes);
      jogoView.mostrarMensagem(
        `"${estado.letrasErradas.slice(-1)}" está errado! Restam ${
          estado.tentativasRestantes
        } tentativas.`,
        'error'
      );
    });

    document.addEventListener('letraJaTentada', (e) => {
      const letra = e.detail;
      jogoView.mostrarMensagem(`A letra '${letra}' já foi tentada.`, 'info');
    });

    document.addEventListener('jogoVenceu', (e) => {
      const estado = e.detail;
      jogoView.mostrarPalavra(estado.palavraEscolhida, estado.letrasCorretas);
      jogoView.mostrarMensagem('Parabéns! Você venceu o jogo!', 'success');
      jogoView.mostrarBotoesReiniciar();
    });

    document.addEventListener('jogoPerdeu', (e) => {
      const estado = e.detail;
      jogoView.mostrarPalavra(estado.palavraEscolhida, estado.letrasCorretas);
      jogoView.mostrarMensagem(
        `Que pena! Você perdeu! A palavra era: ${estado.palavraEscolhida}`,
        'error'
      );
      jogoView.mostrarBotoesReiniciar();
    });

    document.addEventListener('reiniciarJogo', () => {
      JogoModel.resetarEstadoDoJogo();
      jogoView.limparTelaJogo();
      jogoView.mostrarTelaInicial();
      jogoView.ocultarBotoesReiniciar();
    });
  },

  /**
   * Função para iniciar o jogo de acordo com o modo selecionado.
   * @param {string} modo - O modo de jogo selecionado (1 ou 2 jogadores).
   */
  iniciarJogo(modo) {
    if (modo === '1') {
      JogoModel.selecionarModoDeJogo(modo);
    } else if (modo === '2') {
      jogoView.ocultarTelaInicial();
      jogoView.mostrarTelaInputJogador2();
    }
  },

  /**
   * Função de validação de letra.
   * @param {string} letra - A letra a ser validada.
   * @returns {boolean} True se for uma letra válida (A-Z), false caso contrário.
   */
  validarLetra(letra) {
    return /^[a-zA-Z]$/.test(letra);
  },

  /**
   * Gerencia a palavra e dica enviadas pelo Jogador 1 no modo 2 jogadores.
   * Este método é chamado diretamente pela View (jogoView.js) no modo 2 jogadores.
   * @param {string} palavra - A palavra escolhida pelo jogador 1.
   * @param {string} dica - A dica para a palavra.
   */
  definirPalavraModo2(palavra, dica) {
    if (palavra && dica) {
      JogoModel.estadoDoJogo.palavraEscolhida = palavra.toUpperCase();
      JogoModel.estadoDoJogo.dicaSobrePalavra = dica;
      JogoModel.estadoDoJogo.categoriaPalavra = 'Definida pelo Jogador 1';
      JogoModel.estadoDoJogo.statusJogo = 'emAndamento';

      document.dispatchEvent(
        new CustomEvent('palavraGerada', { detail: JogoModel.estadoDoJogo })
      );
    } else {
      jogoView.mostrarMensagem(
        'Por favor, preencha a palavra e a dica.',
        'error'
      );
    }
  },
};
