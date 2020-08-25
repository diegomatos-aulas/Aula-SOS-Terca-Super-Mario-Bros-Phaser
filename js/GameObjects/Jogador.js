export default class Jogador extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, textura, jogador, tamanho, stance){
    super(scene, x, y, textura);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravity(0, 1000);
    this.setCollideWorldBounds(true);
    this.body.setMaxVelocity(100, 420)

    this.canJump = true;
    this.hasJumped = false;
    this.jumpTime = 0;
    this.tempoNoAr = 280; // Em ms
    this.velocidade = {
      x: 100,
      y: 420
    }

    this.aceleracao = {
      y: 210
    }

    this.state = {
      jogador,
      tamanho,
      stance,
    }
  }

  update(cursor, deltaTime){
    this.animacaoDoJogador();

    if (!this.active) return

    this.movimentacaoDoJogador(cursor, deltaTime);
  }

  movimentacaoDoJogador(cursor, deltaTime){
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

    if(cursor.up.isDown){
      // É responsável por verificar se o jogador PODE pular
      if(this.canJump && (this.body.onFloor() || this.body.touching.down)){
        if(this.state.tamanho === "Pequeno") this.scene.jumpSmallSFX.play()
        else if(this.state.tamanho === "Grande") this.scene.jumpSuperSFX.play()

        this.jumpTime = 0; // Resetar o "cronometro"
        this.state.stance = "Jump"; // Estado do jogador, relacionado com a animação
        this.hasJumped = true; // Se o jogador pulou
        this.canJump = false; // Não pode mais pular
      }

      if (this.hasJumped){
        this.jumpTime += deltaTime;
        if (this.jumpTime > this.tempoNoAr) return
        this.setVelocityY(-this.aceleracao.y);
      }
    }

    if(cursor.up.isUp){
      this.canJump = true;
      this.hasJumped = false;
    }
  }

  animacaoDoJogador(){
    const {jogador, tamanho, stance} = this.state;
    // console.log(`${jogador} ${tamanho} ${stance}`);
    this.anims.play(`${jogador} ${tamanho} ${stance}`, true);
    this.body.setSize();
  }
}