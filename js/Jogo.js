export const JogoModel = {
  estadoDoJogo: {
    modoDeJogo: '',
    palavraEscolhida: '',
    categoriaPalavra: '',
    dicaSobrePalavra: '',
    letrasCorretas: [],
    letrasErradas: [],
    tentativasRestantes: 8,
    statusJogo: 'aguardandoInicio',
  },

  selecionarModoDeJogo(modoEscolhido) {
    this.resetarEstadoDoJogo();
    this.estadoDoJogo.modoDeJogo = modoEscolhido;

    if (modoEscolhido === '1') {
      this.escolherPalavraAleatoria();
    }
  },

  async escolherPalavraAleatoria() {
    try {
      const response = await fetch('banco_palavras.json');
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const palavras = await response.json();
      if (!Array.isArray(palavras) || palavras.length === 0) {
        throw new Error('Banco de palavras vazio ou formato inválido.');
      }
      const palavraAleatoria =
        palavras[Math.floor(Math.random() * palavras.length)];

      this.estadoDoJogo.palavraEscolhida =
        palavraAleatoria.palavra.toUpperCase();
      this.estadoDoJogo.categoriaPalavra = palavraAleatoria.categoria;
      this.estadoDoJogo.dicaSobrePalavra = palavraAleatoria.dica;
      this.estadoDoJogo.statusJogo = 'emAndamento';

      document.dispatchEvent(
        new CustomEvent('palavraGerada', { detail: this.estadoDoJogo })
      );
    } catch (error) {
      console.error('Erro ao carregar o banco de palavras:', error);
      document.dispatchEvent(
        new CustomEvent('erroCarregamentoPalavras', { detail: error.message })
      );
    }
  },

  resetarEstadoDoJogo() {
    this.estadoDoJogo.palavraEscolhida = '';
    this.estadoDoJogo.categoriaPalavra = '';
    this.estadoDoJogo.dicaSobrePalavra = '';
    this.estadoDoJogo.letrasCorretas = [];
    this.estadoDoJogo.letrasErradas = [];
    this.estadoDoJogo.tentativasRestantes = 8;
    this.estadoDoJogo.statusJogo = 'aguardandoInicio';
  },

  processarTentativa(letra) {
    const letraMaiuscula = letra.toUpperCase();
    if (
      this.estadoDoJogo.letrasCorretas.includes(letraMaiuscula) ||
      this.estadoDoJogo.letrasErradas.includes(letraMaiuscula)
    ) {
      document.dispatchEvent(
        new CustomEvent('letraJaTentada', { detail: letraMaiuscula })
      );
      return;
    }

    if (this.estadoDoJogo.palavraEscolhida.includes(letraMaiuscula)) {
      this.estadoDoJogo.letrasCorretas.push(letraMaiuscula);
      document.dispatchEvent(
        new CustomEvent('letraCorreta', { detail: this.estadoDoJogo })
      );
    } else {
      this.estadoDoJogo.letrasErradas.push(letraMaiuscula);
      this.estadoDoJogo.tentativasRestantes--;
      document.dispatchEvent(
        new CustomEvent('letraErrada', { detail: this.estadoDoJogo })
      );
    }
    this.verificarFimDeJogo();
  },

  verificarFimDeJogo() {
    const palavraArray = this.estadoDoJogo.palavraEscolhida.split('');
    const todasLetrasAdivinhadas = palavraArray.every((letra) =>
      this.estadoDoJogo.letrasCorretas.includes(letra)
    );

    if (todasLetrasAdivinhadas) {
      this.estadoDoJogo.statusJogo = 'venceu';
      document.dispatchEvent(
        new CustomEvent('jogoVenceu', { detail: this.estadoDoJogo })
      );
    } else if (this.estadoDoJogo.tentativasRestantes <= 0) {
      this.estadoDoJogo.statusJogo = 'perdeu';
      document.dispatchEvent(
        new CustomEvent('jogoPerdeu', { detail: this.estadoDoJogo })
      );
    } else {
      document.dispatchEvent(
        new CustomEvent('estadoJogoAtualizado', { detail: this.estadoDoJogo })
      );
    }
  },
};
