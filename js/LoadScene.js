export default class LoadScene extends Phaser.Scene {
  constructor() {
    super("LoadScene")
  }

  preload() {
    this.canvas = this.sys.game.canvas;
    let loadingBar = this.add.image(this.canvas.width / 2 - 100, this.canvas.height / 2 - 21, "barraDeCarregamento").setOrigin(0);

    let txtLoadingPerc = this.add.text(loadingBar.x + 100, loadingBar.y + 20, "0%").setOrigin(0.5)

    let txtLoadingFile = this.add.text(loadingBar.x, loadingBar.y + 42, "0%")

    this.load.on("progress", function (value) {
      const fixedValue = value.toFixed(4)
      console.log(fixedValue)
      loadingBar.displayWidth = loadingBar.width * value;
      txtLoadingPerc.setText(`${fixedValue * 100} %`)
    })

    this.load.on("fileprogress", function (file) {
      console.log("fileprogress: " + file.src)
      txtLoadingFile.setText(`Carregando: ${file.key}`)
    })

    this.load.on("complete", function () {
      console.log("complete")
      txtLoadingFile.setText(` Jogo Carregado \n Pressione Enter`)
    })

    // SPRITE SHEETS

    this.load.spritesheet("Mario Pequeno", "./assets/imagens/Mario-Pequeno.png", {
      frameWidth: 16, frameHeight: 16
    })

    this.load.spritesheet("Mario Grande", "./assets/imagens/Mario-Grande.png", {
      frameWidth: 16, frameHeight: 32
    })

    this.load.spritesheet("Luigi Pequeno", "./assets/imagens/Luigi-Pequeno.png", {
      frameWidth: 16, frameHeight: 16
    })

    this.load.spritesheet("Luigi Grande", "./assets/imagens/Luigi-Grande.png", {
      frameWidth: 16, frameHeight: 32
    })

    this.load.spritesheet("LittleGomba", "./assets/imagens/Little-Gomba.png", {
      frameWidth: 16, frameHeight: 16
    })

    this.load.spritesheet("surpriseBlock", "./assets/imagens/surpriseBlock.png", {
      frameWidth: 16, frameHeight: 16
    })

    this.load.spritesheet("coin", "./assets/imagens/coin.png", {
      frameWidth: 16, frameHeight: 16
    })

    this.load.spritesheet("KoopaTroopa", "./assets/imagens/Koopa-Troopa.png", {
      frameWidth: 16, frameHeight: 24
    })


    // IMAGENS PNG
    this.load.image("brick", "./assets/imagens/brick.png");
    this.load.image("magicMushroom", "./assets/imagens/MagicMushroom.png");
    this.load.image("mushroom", "./assets/imagens/Mushroom.png");
    this.load.image("starMan", "./assets/imagens/Starman.png");
    this.load.image("menuBanner", "./assets/imagens/menu-banner.png");
    this.load.image("menuPonteiro", "./assets/imagens/menu-ponteiro.png");
    this.load.image("brickParticle", "./assets/imagens/brick-particle.png");

    // TILEMAP

    this.load.tilemapTiledJSON("level1", "./assets/tilemap/level1.json");
    this.load.tilemapTiledJSON("menu", "./assets/tilemap/menu.json");

    // TILESET  

    this.load.image("tileset", "./assets/tilemap/tileset.png");

    // AUDIO FILES

    this.load.audio("jumpSmallSFX", "./assets/audio/smb_jump-small.wav");
    this.load.audio("jumpSuperSFX", "./assets/audio/smb_jump-super.wav");
    this.load.audio("powerupAppearsSFX", "./assets/audio/smb_powerup_appears.wav");
    this.load.audio("powerUpSFX", "./assets/audio/smb_powerup.wav");
    this.load.audio("coinSFX", "./assets/audio/smb_coin.wav");
    this.load.audio("bumpSFX", "./assets/audio/smb_bump.wav");
    this.load.audio("backgroundMusic", "./assets/audio/BackgroundMusic.wav")
    this.load.audio("gameOverSFX", "./assets/audio/smb_gameover.wav");
    this.load.audio("breakBlockSFX", "./assets/audio/smb_breakblock.wav");
    this.load.audio("world_clear", "./assets/audio/smb_world_clear.wav");
  }


  create() {

    // ANIMAÇÕES DO JOGADOR

    this.criarAnimacaoDoMario();
    this.criarAnimacaoDoLuigi();

    // BLOCOS INTERATIVOS

    this.anims.create(
      {
        key: "Surprise Block Ativo",
        frames: this.anims.generateFrameNumbers("surpriseBlock", { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1,
        repeatDelay: 10
      });

    // INIMIGOS

    this.anims.create(
      {
        key: "Surprise Block Inativo",
        frames: [{ key: "surpriseBlock", frame: 4 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Little Gomba Walking",
        frames: this.anims.generateFrameNumbers("LittleGomba", { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });

    this.anims.create(
      {
        key: "Little Gomba Dead",
        frames: [{ key: "LittleGomba", frame: 2 }],
        duration: 500,
        repeat: 0
      });
    this.anims.create(
      {
        key: "Koopa Troopa Walking",
        frames: this.anims.generateFrameNumbers("KoopaTroopa", { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Koopa Troopa Defend",
        frames: [{ key: "KoopaTroopa", frame: 2 }],
        duration: 500,
        repeat: 0
      });

    // HUD

    this.anims.create(
      {
        key: "Coin 1",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 2 }),
        frameRate: 6,
        repeat: -1
      });

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.once("down", () => {
      this.scene.start("MenuScene"); // FECHA A CENA ATUAL E INICIA A PRÓXIMO
    })
  }
  
  criarAnimacaoDoMario() {
    // MARIO
    this.anims.create(
      {
        key: "Mario Pequeno Walking",
        frames: this.anims.generateFrameNumbers("Mario Pequeno", { start: 6, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Pequeno Jump",
        frames: [{ key: "Mario Pequeno", frame: 1 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Pequeno Idle",
        frames: [{ key: "Mario Pequeno", frame: 0 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Pequeno Changing Direction",
        frames: [{ key: "Mario Pequeno", frame: 5 }],
        frameRate: 10,
        repeat: -1
      });

    this.anims.create(
      {
        key: "Mario Pequeno Dead",
        frames: [{ key: "Mario Pequeno", frame: 2 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Grande Walking",
        frames: this.anims.generateFrameNumbers("Mario Grande", { start: 7, end: 9 }),
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Grande Jump",
        frames: [{ key: "Mario Grande", frame: 1 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Grande Idle",
        frames: [{ key: "Mario Grande", frame: 0 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Mario Grande Changing Direction",
        frames: [{ key: "Mario Grande", frame: 6 }],
        frameRate: 10,
        repeat: -1
      });
  }

  criarAnimacaoDoLuigi() {
    // LUIGI
    this.anims.create(
      {
        key: "Luigi Pequeno Idle",
        frames: [{ key: "Luigi Pequeno", frame: 0 }],
        frameRate: 10,
        repeat: -1
      });

    this.anims.create(
      {
        key: "Luigi Pequeno Jump",
        frames: [{ key: "Luigi Pequeno", frame: 1 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Luigi Pequeno Dead",
        frames: [{ key: "Luigi Pequeno", frame: 2 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Luigi Pequeno Walking",
        frames: this.anims.generateFrameNumbers("Luigi Pequeno", { start: 6, end: 7 }),
        frameRate: 10,
        repeat: -1
      });

    this.anims.create(
      {
        key: "Luigi Pequeno Changing Direction",
        frames: [{ key: "Luigi Pequeno", frame: 5 }],
        frameRate: 10,
        repeat: -1
      });

    this.anims.create(
      {
        key: "Luigi Grande Walking",
        frames: this.anims.generateFrameNumbers("Luigi Grande", { start: 7, end: 9 }),
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Luigi Grande Jump",
        frames: [{ key: "Luigi Grande", frame: 1 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Luigi Grande Idle",
        frames: [{ key: "Luigi Grande", frame: 0 }],
        frameRate: 10,
        repeat: -1
      });
    this.anims.create(
      {
        key: "Luigi Grande Changing Direction",
        frames: [{ key: "Luigi Grande", frame: 6 }],
        frameRate: 10,
        repeat: -1
      });


  }
}