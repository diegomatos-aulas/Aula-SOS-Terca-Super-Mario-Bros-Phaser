export default class Jogador extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, textura, jogador, tamanho, stance){
    super(scene, x, y, textura);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravity(0, 1000);
    this.setCollideWorldBounds(true);

    this.canJump = true;
    this.velocidade = {
      x: 100,
      y: 400
    }

    this.state = {
      jogador,
      tamanho,
      stance,
    }
  }

  update(cursor){
    this.movimentacaoDoJogador(cursor);
    this.animacaoDoJogador();
  }

  movimentacaoDoJogador(cursor){
    this.setVelocityX(0);

    if(this.body.velocity.x === 0 && this.body.velocity.y === 0 && (this.body.onFloor() || this.body.touching.down)){
      this.state.stance = "Idle"
    }

    if(cursor.right.isDown){
      this.flipX = false;
      this.setVelocityX(this.velocidade.x)
      if(this.body.onFloor() || this.body.touching.down){
        this.state.stance = "Walking";
      }
    }
    else if(cursor.left.isDown){
      this.flipX = true;
      this.setVelocityX(-this.velocidade.x);
      if(this.body.onFloor() || this.body.touching.down){
        this.state.stance = "Walking";
      }
    }

    if(cursor.up.isDown && this.canJump && (this.body.onFloor() || this.body.touching.down)){
      this.setVelocityY(-this.velocidade.y);
      this.state.stance = "Jump";
      this.canJump = false;
    }

    if(cursor.up.isUp){
      this.canJump = true;
    }
  }

  animacaoDoJogador(){
    const {jogador, tamanho, stance} = this.state;
    // console.log(`${jogador} ${tamanho} ${stance}`);
    this.anims.play(`${jogador} ${tamanho} ${stance}`, true);
    this.body.setSize();
  }
}