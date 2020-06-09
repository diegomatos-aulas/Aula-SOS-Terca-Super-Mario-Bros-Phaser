export default class MenuScene extends Phaser.Scene{
  constructor(){
    super("MenuScene")
  }

  init(){
    const {width, height} = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;
  }

  create(){
    this.map = this.add.tilemap("menu");
    this.tileset = this.map.addTilesetImage("mariotileset", "tileset");

    this.fundo = this.map.createStaticLayer("mundo", this.tileset);

    this.add.sprite(48, this.GAME_HEIGHT-40, "Mario Pequeno");
    this.add.image(this.GAME_WIDTH/2, this.GAME_HEIGHT/3, "menuBanner").setScale(0.2);

    this.marioOpcao = this.add.text(this.GAME_WIDTH/2 + 12, this.GAME_HEIGHT/2 + 16, "Jogar com o Mario", {fontSize: "12px"})
    this.marioOpcao.setOrigin(0.5);

    this.luigiOpcao = this.add.text(this.GAME_WIDTH/2 + 12, this.GAME_HEIGHT/2 + 32, "Jogar com o Luigi", {fontSize: "12px"})
    this.luigiOpcao.setOrigin(0.5);

    this.ponteiro = this.add.image(this.marioOpcao.x - 70, this.marioOpcao.y, "menuPonteiro").setScale(0.3)

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.once("down", () =>{
        this.scene.start("Level1"); // FECHA A CENA ATUAL E INICIA A PRÓXIMO
    })
  }
}