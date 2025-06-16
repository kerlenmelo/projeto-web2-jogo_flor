const View = {
  mostrarTelaInicial() {
    const modo1 = document.getElementById('modo1');
    const modo2 = document.getElementById('modo2');

    modo1.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('modoSelecionado', { detail: { modo: 1 } })
      );
    });

    modo2.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('modoSelecionado', { detail: { modo: 2 } })
      );
    });
  },

  mostrarMensagem(texto) {
    const app = document.getElementById('app');
    app.innerHTML = `<p>${texto}</p>`;
  },
};
