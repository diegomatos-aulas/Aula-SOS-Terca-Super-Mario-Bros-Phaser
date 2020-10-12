export default function colisaoComLittleGomba(jogador, littleGomba){
  littleGomba.anims.play("Little Gomba Dead")
  littleGomba.alive = false;
  littleGomba.disableBody(true);
  littleGomba.setVelocityX(0);

  this.time.addEvent({
      delay: 500,                // ms
      callback: function () {
          this.inimigos.remove(littleGomba, true, true);
      },
      //args: [],
      callbackScope: this
  });
  let pontos = 200
  return pontos;
}