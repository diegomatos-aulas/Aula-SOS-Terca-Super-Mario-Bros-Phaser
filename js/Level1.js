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
    console.log("Que comece o Jogo !!")
  }

  update(){

  }
}