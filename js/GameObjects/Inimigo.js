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

    this.inSight = false;
    this.canWalk = true;
    this.direcao = -1; // -1 Para a Esquerda, 1 Para a Direita
  }

  update(){
    if(this.x - this.scene.jogador.x < 140 && this.scene.jogador.x < this.x && !this.inSight || this.scene.jogador.x - this.x < 140 && this.scene.jogador.x > this.x && !this.inSight){
      this.inSight = true;
    }
    if(this.canWalk && this.inSight){
      this.movimentacaoDoInimigo();
    }else{
      this.setVelocityX(0)
    }
  }

  // Princípios SOLID
  movimentacaoDoInimigo(){
    this.verificarSeTemParedeNoCaminho();
    // if (this.nome === "Koopa Troopa") console.log(this.direcao)
    if(this.direcao === -1) {
      this.setVelocityX(-this.velocidade.x)
    } else {
      this.setVelocityX(this.velocidade.x)
    }
  }

  verificarSeTemParedeNoCaminho(){
    if(this.body.onWall()) this.direcao *= -1;
  }
}