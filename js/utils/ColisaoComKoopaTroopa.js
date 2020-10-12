export default function colisaoComKoopaTroopa(jogador, koopaTroopa, comportamento) {
  if (!koopaTroopa.foiAtingido) {
    let pontos = 400;
    koopaTroopa.foiAtingido = true;
    koopaTroopa.canWalk = false;
    koopaTroopa.anims.play("Koopa Troopa Defend");
    return pontos;
  } else if (koopaTroopa.foiAtingido) {
    if (koopaTroopa.canWalk) {
      koopaTroopa.canWalk = false;
    } else {
      koopaTroopa.velocidade.x = 400;
      let direcao = Math.random() < 0.5 ? -1 : 1;
      koopaTroopa.direcao = direcao;
      koopaTroopa.canWalk = true;
    }
  }
  if (comportamento === "Empurrar"){      
    // Operadores ternários
    koopaTroopa.x > jogador.x ? (koopaTroopa.direcao = 1) : (koopaTroopa.direcao = -1);

    koopaTroopa.velocidade.x = 400;
    koopaTroopa.canWalk = true;
  }
}