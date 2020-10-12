export default function textoAnimado(alvo, pontos){
  let txtpontos = this.add.text(
    alvo.x,
    alvo.y - alvo.body.halfHeight,
    `+${pontos}`,
    { fontSize: "8px" }
  );
  txtpontos.setOrigin(0.5, 1);

  this.tweens.add({
    targets: txtpontos,
    y: txtpontos.y - 20,
    ease: "Circ",
    duration: 400,
    repeat: 0,
    yoyo: false,
    onComplete: function () {
      txtpontos.destroy();
    },
    onCompleteScope: this,
  });

}