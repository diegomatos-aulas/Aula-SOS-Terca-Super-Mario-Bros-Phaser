import colisaoComLittleGomba from "./ColisaoComLittleGomba.js"
import colisaoComKoopaTroopa from "./ColisaoComKoopaTroopa.js"
import addPontuacao from "./AddPontuacao.js"
import textoAnimado from "./TextoAnimado.js"
import diminuirTamanhoDoJogador from "./DiminuirTamanhoDoJogador.js"
import gameOver from "./GameOver.js"

export default function colisaoComOInimigo(jogador, inimigo) {
  if (jogador.active === false) return;

  // Como o Inimigo possui body, o Phaser considera ele como um objeto sólido que esta tocando o jogador, o que gera problemas com a lógica de animação e pulo do jogador. Por isso, preciso saber quando eu estou tocando o inimigo.
  jogador.collidingWithEnemy = true;

  if (Math.ceil(jogador.y + jogador.body.halfHeight) <= Math.ceil(inimigo.y - inimigo.body.halfHeight + 5)) {
    // Comportamento Padrão
    let pontos;
    jogador.setVelocityY(-150);
    jogador.state.stance = "Jump";
    jogador.canJump = false;
    this.bumpSFX.play();

    if (inimigo.nome === "Little Gomba") {
      pontos = colisaoComLittleGomba.call(this, jogador, inimigo);
    } else if (inimigo.nome === "Koopa Troopa") {
      // TODO: SEPARAR EM PROPRIA FUNÇÃO
      pontos = colisaoComKoopaTroopa.call(this, jogador, inimigo);
    }

    // Se não tiver pontuação para ser ganha, retorna
    if (!pontos) return;

    addPontuacao.call(this, pontos);

    textoAnimado.call(this, jogador, pontos);
  } else if (inimigo.nome === "Koopa Troopa" && inimigo.foiAtingido && !inimigo.canWalk) {
    colisaoComKoopaTroopa.call(this, jogador, inimigo, "Empurrar");
  } else if (jogador.state.tamanho === "Grande") {
    diminuirTamanhoDoJogador.call(this, jogador, inimigo);
  } else {
    gameOver.call(this);
  }
}