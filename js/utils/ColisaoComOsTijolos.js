import animarBloco from "./AnimarBloco.js"
import quebrarTijolo from "./QuebrarTijolo.js"

export default function colisaoComOsTijolos(jogador, tijolo) {
  if (Math.ceil(jogador.y - jogador.body.halfHeight) >= Math.ceil(tijolo.y + tijolo.body.halfHeight)) {
    jogador.isJumping = false;
    jogador.setVelocityY(0);

    if (jogador.state.tamanho === "Pequeno") {
      animarBloco.call(this, tijolo);
    } else if (jogador.state.tamanho === "Grande") {
      quebrarTijolo.call(this, tijolo);
    }
  }
}