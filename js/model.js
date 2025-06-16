const JogoModel = {
  estado: {
    palavra: '',
    dica: '',
    letrasCorretas: [],
    letrasErradas: [],
  },

  iniciarJogo(palavra, dica) {
    this.estado = {
      palavra,
      dica,
      letrasCorretas: [],
      letrasErradas: [],
    };

    document.dispatchEvent(
      new CustomEvent('jogoIniciado', {
        detail: this.estado,
      })
    );
  },
};
