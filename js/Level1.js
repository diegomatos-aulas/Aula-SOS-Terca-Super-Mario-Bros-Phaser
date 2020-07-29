import Jogador from "./GameObjects/Jogador.js"
import Inimigo from "./GameObjects/Inimigo.js"

export default class BootScene extends Phaser.Scene{
  constructor(){
    super("Level1")
  }

  init(){
    const {width, height} = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;
  }

  create(){
    // World Bounds
    this.physics.world.setBounds(0, 0, 3584, 240);

    // Tilemap
    this.map = this.add.tilemap("level1");
    this.tileset = this.map.addTilesetImage("mariotileset", "tileset");

    this.fundo = this.map.createDynamicLayer("fundo", this.tileset);
    
    this.world = this.map.createDynamicLayer("world", this.tileset);
    this.world.setCollisionByProperty({collide:true})

    // Musicas e Sons
    this.powerUpSFX = this.sound.add("powerUpSFX", {
      volume: 0.3
    })

    this.bumpSFX = this.sound.add("bumpSFX", {
      volume: 0.3
    })

    this.backgroundMusica = this.sound.add("backgroundMusic", {
      volume: 0.1,
      loop: true
    })
    this.backgroundMusica.play();

    // Jogador
    this.jogador = new Jogador(this, 1300, this.GAME_HEIGHT-40, "Mario Pequeno", "Mario", "Pequeno", "Idle");

    this.cursor = this.input.keyboard.createCursorKeys()

    // Inimigos
    this.inimigos = this.add.group();

    this.world.forEachTile(tile => {
      // Little Gomba
      if(tile.index == 64){
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let littleGomba = new Inimigo(this, x, y, "LittleGomba");
        littleGomba.nome = "Little Gomba";
        this.inimigos.add(littleGomba);

        this.world.removeTileAt(tile.x, tile.y);
      }

      if(tile.index == 65){
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let koopaTroopa = new Inimigo(this, x, y, "KoopaTroopa");
        koopaTroopa.nome = "Koopa Troopa";
        this.inimigos.add(koopaTroopa);

        this.world.removeTileAt(tile.x, tile.y);
      }
    })

    // Blocos Interativos
    this.blocosInterativos = this.add.group();
    this.tijolos = this.add.group();

    this.world.forEachTile(tile =>{
      if(tile.index === 2){
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let tijolo = this.physics.add.sprite(x, y, "brick");
        tijolo.setImmovable()

        this.tijolos.add(tijolo);
        this.world.removeTileAt(tile.x, tile.y);
      }

      if(tile.index === 25){
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let blocoSurpresa = this.physics.add.sprite(x, y, "surpriseBlock") ;
        blocoSurpresa.anims.play("Surprise Block Ativo");
        blocoSurpresa.setImmovable()
        blocoSurpresa.canDrop = true;

        this.blocosInterativos.add(blocoSurpresa);
        this.world.removeTileAt(tile.x, tile.y)
      }
    })

    this.itemsColetaveis = this.add.group();

    // Camera
    this.cameras.main.startFollow(this.jogador, true)
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // HUD
    this.pontuacao = 0;
    this.moedasColetadas = 0;
    this.tempo = 250;

    // TODO: NOME DO JOGADOR DINAMICO
    this.txtJogador = this.add.text(25, 10, `MARIO`, {fontSize: "12px"});
    this.txtJogador.setOrigin(0.5);
    this.txtJogador.setScrollFactor(0);

    this.txtPontuacao = this.add.text(25, 25, `${this.pontuacao}`, {fontSize: "12px"});
    this.txtPontuacao.setOrigin(0.5);
    this.txtPontuacao.setScrollFactor(0);

    this.moedaPiscando = this.add.sprite(80, 25, "coin");
    this.moedaPiscando.anims.play("Coin 1");
    this.moedaPiscando.setScale(0.7);
    this.moedaPiscando.setScrollFactor(0);

    this.txtMoedasColetadas = this.add.text(98, 25, `x${this.moedasColetadas}`, {fontSize: "12px"});
    this.txtMoedasColetadas.setOrigin(0.5);
    this.txtMoedasColetadas.setScrollFactor(0);

    this.txtMundo = this.add.text(160, 10, "Mundo");
    this.txtMundo.setOrigin(0.5);
    this.txtMundo.setScrollFactor(0);

    this.txtLevel = this.add.text(160, 25, `1-1`, {fontSize: "12px"});
    this.txtLevel.setOrigin(0.5);
    this.txtLevel.setScrollFactor(0);

    this.txtTempoHUD = this.add.text(220, 10, `Tempo`, {fontSize: "12px"});
    this.txtTempoHUD.setOrigin(0.5);
    this.txtTempoHUD.setScrollFactor(0);

    this.txtTempo = this.add.text(220, 25, `${this.tempo}`, {fontSize: "12px"});
    this.txtTempo.setOrigin(0.5);
    this.txtTempo.setScrollFactor(0);

    // Fisicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.collider(this.jogador, this.inimigos, this.colisaoComOInimigo, null, this);
    this.physics.add.collider(this.jogador, this.blocosInterativos, this.colisaoComBlocosInterativos, null, this);
    this.physics.add.collider(this.jogador, this.tijolos);
    this.physics.add.overlap(this.jogador, this.itemsColetaveis, this.coletarItem, null, this);

    this.physics.add.collider(this.inimigos, this.world);
    this.physics.add.collider(this.inimigos, this.blocosInterativos);
    this.physics.add.collider(this.inimigos, this.tijolos);

    this.physics.add.collider(this.itemsColetaveis, this.world);
    this.physics.add.collider(this.itemsColetaveis, this.blocosInterativos);
    this.physics.add.collider(this.itemsColetaveis, this.tijolos);
  }

  update(tempoPercorrido, deltaTime){
    // Atualização do Jogador
    this.jogador.update(this.cursor, deltaTime);

    // Atualização dos Inimigos
    this.inimigos.children.each(inimigo =>{
      inimigo.update();
    })
  }

  colisaoComOInimigo(jogador, inimigo){
    console.log(inimigo.y - inimigo.body.halfHeight)
    if(jogador.y + jogador.body.halfHeight <= inimigo.y - inimigo.body.halfHeight){
      let novaPontuacao;
      jogador.setVelocityY(-130);
      jogador.state.stance = "Jump";
      this.inimigos.remove(inimigo, true, true);
      this.bumpSFX.play();

      if(inimigo.nome === "Little Gomba"){
        novaPontuacao = 200;
      } else if (inimigo.nome === "Koopa Troopa"){
        novaPontuacao = 400;
      }

      this.pontuacao += novaPontuacao;
      this.txtPontuacao.setText(`${this.pontuacao}`);

      let txtNovaPontuacao = this.add.text(jogador.x, jogador.y - jogador.body.halfHeight, `+${novaPontuacao}`, {fontSize: "8px"});
      txtNovaPontuacao.setOrigin(0.5, 1);

      this.tweens.add({
        targets: txtNovaPontuacao,
        y: txtNovaPontuacao.y - 20,
        ease: "Circ",
        duration: 400,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          txtNovaPontuacao.destroy();
        },
        onCompleteScope: this
      })

      // console.log("Matou O inimigo");
    } else{
      console.log("Morreu");
    }
  }

  colisaoComBlocosInterativos(jogador, bloco){
    if(jogador.y - jogador.body.halfHeight >= bloco.y + bloco.body.halfHeight){
      if (!bloco.canDrop) return
      bloco.canDrop = false;
      bloco.anims.play("Surprise Block Inativo");
      this.tweens.add({
        targets: bloco,
        y: bloco.y - bloco.body.halfHeight,
        ease: "Circ",
        duration: 100,
        repeat: 0,
        yoyo: true
      })

      let sorteio = Math.round(Math.random() * 100)

      if(sorteio <= 95){
        let moeda = this.add.sprite(bloco.x, bloco.y - bloco.body.height, "coin");
        let animMoeda = this.tweens.add({
          targets: moeda,
          y: moeda.y - bloco.body.height,
          ease: "Circ",
          duration: 200,
          repeat: 0,
          yoyo: true
        })
        animMoeda.on('complete', function(tween, targets){
          this.pontuacao += 200;
          this.txtPontuacao.setText(`${this.pontuacao}`)

          this.moedasColetadas ++;
          this.txtMoedasColetadas.setText(`x${this.moedasColetadas}`)
          moeda.destroy();
        }, this);
      } else{
        let cogumeloMagico = this.physics.add.sprite(bloco.x, bloco.y - bloco.body.height, "magicMushroom");
        cogumeloMagico.setVelocityY(-200);
        cogumeloMagico.setGravity(0, 1000);
        cogumeloMagico.nome = "Cogumelo";
        this.itemsColetaveis.add(cogumeloMagico);
      }
    }
  }

  coletarItem(jogador, item){
    if(item.nome === "Cogumelo"){
      this.itemsColetaveis.remove(item, true, true);
      this.powerUpSFX.play();
      if (this.jogador.state.tamanho === "Pequeno"){
        this.jogador.setVelocityY(-160);
      }
      this.jogador.state.tamanho = "Grande";
    }
  }
}