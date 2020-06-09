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

    // this.load.tilemapTiledJSON("world-1-1", "./assets/tilemap/world1-1.json");
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
    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.once("down", () =>{
        this.scene.start("MenuScene"); // FECHA A CENA ATUAL E INICIA A PRÓXIMO
    })
  }
}