const Controller = {
  iniciar() {
    View.mostrarTelaInicial();

    document.addEventListener('modoSelecionado', (e) => {
      const modo = e.detail.modo;
      if (modo === 1) {
        JogoModel.iniciarJogo('girassol', 'Flor amarela que segue o sol');
      } else {
        View.mostrarMensagem('Modo 2 jogadores ainda não implementado.');
      }
    });

    document.addEventListener('jogoIniciado', (e) => {
      const { palavra, dica } = e.detail;
      View.mostrarMensagem(`Dica: ${dica} - Adivinhe a palavra!`);
    });
  },
};
