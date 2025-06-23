# Jogo da Flor 🌸

Este é um projeto de jogo web simples e lúdico, desenvolvido como parte da disciplina de **Programação para Internet 2** na faculdade de Análise e Desenvolvimento de Sistemas no Instituto Federal de Pernambuco (IFPE). O jogo é uma reinterpretação criativa do clássico "jogo da forca", onde a cada erro, uma pétala da flor é perdida, proporcionando um feedback visual mais suave e divertido.

## 🚀 Demonstração Online

Experimente o Jogo da Flor diretamente no seu navegador:

[**Acesse o Jogo da Flor no Vercel!**](https://projeto-web2-jogo-flor.vercel.app)

## ✨ Funcionalidades

- **Modo 1 Jogador:** O jogo seleciona aleatoriamente uma palavra e uma dica de um banco de palavras interno.
- **Modo 2 Jogadores:** Permite que um jogador defina a palavra secreta e a dica para o outro jogador adivinhar.
- **Mecânica Lúdica da Flor:** A progressão do jogo é visualmente representada por uma flor que perde pétalas a cada tentativa incorreta.
- **Teclado Virtual Interativo:** Interface de adivinhação com feedback visual intuitivo:
  - **Verde:** Para letras corretas.
  - **Vermelho:** Para letras erradas.
- **Entrada de Letras via Teclado Físico:** O jogador pode digitar as letras diretamente do seu teclado do computador.
- **Validação de Entrada Inteligente:** Permite apenas a inserção de letras válidas (A-Z), ignorando números, símbolos e caracteres especiais.
- **Sistema de Mensagens:** Feedback claro para o jogador sobre acertos, erros, letras já tentadas e status do jogo.
- **Botão de Reiniciar:** Opção para jogar novamente após uma vitória ou derrota.

## 🛠 Tecnologias Utilizadas

- **HTML5:** Para a estrutura semântica da página.
- **CSS3:** Para a estilização visual, layout e responsividade básica. Utiliza variáveis CSS para um gerenciamento de cores eficiente.
- **JavaScript:** Toda a lógica do jogo, manipulação dinâmica do DOM e interação. O projeto segue uma arquitetura baseada em módulos funcionais (Model, View, Controller) com comunicação via eventos globais, garantindo boa separação de responsabilidades.
- **JSON:** Para armazenar o banco de palavras e dicas de forma estruturada.

## 📂 Estrutura de Pastas

A organização do projeto segue uma estrutura modular e clara:

```
projeto-web2-jogo-flor/
├── assets/                  # Contém as imagens da flor
├── css/
│   └── style.css            # Folha de estilos principal
├── js/
│   ├── Jogo.js              # Modelo: gerencia o estado e a lógica do jogo.
│   ├── JogoController.js    # Controlador: orquestra a comunicação entre Modelo e Visão.
│   ├── JogoView.js          # Visão: manipula o DOM e exibe a interface.
│   └── main.js              # Ponto de entrada da aplicação, inicializa o controlador.
├── banco_palavras.json      # Arquivo JSON com palavras e dicas para o modo 1 Jogador.
├── favicon.ico              # Ícone da aba do navegador.
└── index.html               # Página HTML principal do jogo.
```

## 🎮 Como Jogar Localmente

Para rodar o projeto em sua máquina local:

1.  **Clone o Repositório:**
    Abra seu terminal ou prompt de comando e execute:
    ```bash
    git clone [https://github.com/kerlenmelo/projeto-web2-jogo_flor](https://github.com/kerlenmelo/projeto-web2-jogo_flor)
    ```
2.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd projeto-web2-jogo_flor
    ```
3.  **Abra o `index.html`:**
    Simplesmente arraste o arquivo `index.html` para o seu navegador web favorito ou clique duas vezes nele. Para uma melhor experiência e para garantir que o carregamento do `banco_palavras.json` funcione corretamente (devido a restrições de CORS para `file://` URLs), é recomendado usar uma extensão como "Live Server" no VS Code, ou um servidor web local simples.

## 💡 Próximas Melhorias Possíveis

- Adicionar efeitos sonoros para eventos do jogo (acertos, erros, vitória, derrota).
- Implementar animações mais elaboradas para a flor (ex: pétalas caindo com movimento).
- Criar um menu de configurações (nível de dificuldade, opções de som, temas de cores).
- Aprimorar a responsividade para uma experiência otimizada em dispositivos móveis de diversos tamanhos.
- Adicionar um contador de pontuação ou placar.

---

Feito por Kerlen Melo.
