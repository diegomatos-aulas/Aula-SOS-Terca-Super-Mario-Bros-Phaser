export default class Jogador extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, textura){
    super(scene, x, y, textura);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravity(0, 1000);
    this.setCollideWorldBounds(true);

    this.canJump = true;
    this.velocidade = {
      x: 100,
      y: 300
    }
  }

  update(cursor){
    this.movimentacaoDoJogador(cursor)
  }

  movimentacaoDoJogador(cursor){
    this.setVelocityX(0)
    if(cursor.right.isDown){
      this.setVelocityX(this.velocidade.x)
    }
    else if(cursor.left.isDown){
      this.setVelocityX(-this.velocidade.x)
    }

    if(cursor.up.isDown && this.canJump && this.body.onFloor()){
      this.setVelocityY(-this.velocidade.y);
      this.canJump = false;
    }

    if(cursor.up.isUp){
      this.canJump = true;
    }
  }
}