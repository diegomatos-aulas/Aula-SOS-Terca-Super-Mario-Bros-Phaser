import spawnMoeda from "./SpawnMoeda.js";
import spawnCogumelo from "./SpawnMoeda.js"
import animarBloco from "./AnimarBloco.js"

export default function colisaoComBlocosInterativos(jogador, bloco) {
  if (Math.ceil(jogador.y - jogador.body.halfHeight) >= Math.ceil(bloco.y + bloco.body.halfHeight)) {
    if (!bloco.canDrop) return;
    bloco.canDrop = false;
    bloco.anims.play("Surprise Block Inativo");
    animarBloco.call(this, bloco);

    jogador.isJumping = false;
    jogador.setVelocityY(0);

    let sorteio = Math.round(Math.random() * 100);

    if (sorteio < 50) {
      spawnMoeda.call(this, bloco);
    } else {
      spawnCogumelo.call(this, bloco);
    }
  }
}