export default function gameOver() {
  this.isGameOver = true;
  this.sound.pauseAll();
  this.anims.pauseAll();
  this.cameras.main.stopFollow();
  this.idTimer.destroy();

  this.jogador.setVelocity(0);
  this.jogador.setAccelerationX(0);

  this.inimigos.children.iterate((inimigo, index) => {
    inimigo.setVelocity(0, 0);
    inimigo.disableBody(true);
  });

  this.itemsColetaveis.children.iterate((item, index) => {
    item.setVelocity(0, 0);
    item.disableBody(true);
  });

  this.physics.world.colliders.destroy();

  this.gameOverSFX.play();

  this.jogador.setActive(false);
  this.jogador.state.stance = "Dead";

  let data = {
    level: "Level1",
    nome: "World 1-1",
  };

  this.tweens.add({
    targets: this.jogador,
    y: this.jogador.y - this.jogador.body.halfHeight * 5,
    ease: "Circ",
    duration: 700,
  });

  this.gameOverSFX.once("complete", (music) => {
    this.scene.start("GameOverScene", data);
  });
}