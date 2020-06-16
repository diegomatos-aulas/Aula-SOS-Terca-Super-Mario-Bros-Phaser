export default class Inimigo extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, textura){
    super(scene, x, y, textura);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravity(0, 1000);

    this.velocidade = {
      x: 30,
      y: 300
    }

    this.direcao = -1; // -1 Para a Esquerda, 1 Para a Direita
  }

  update(){
    this.movimentacaoDoInimigo()
  }

  movimentacaoDoInimigo(){
    if(this.direcao == -1) {
      this.setVelocityX(-this.velocidade.x)
    } else {
      this.setVelocityX(this.velocidade.x)
    }
  }
}