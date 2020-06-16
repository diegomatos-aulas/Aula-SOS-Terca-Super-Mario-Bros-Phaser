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

    // Jogador
    this.jogador = new Jogador(this, 48, this.GAME_HEIGHT-40, "Mario Pequeno")

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

      // Koopa Troopa
      // if(tile.index == 65){
      //   const x = tile.getCenterX();
      //   const y = tile.getCenterY();

        
      // }
    })

    // Camera
    this.cameras.main.startFollow(this.jogador, true)
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // Fisicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.collider(this.inimigos, this.world);
  }

  update(){
    // Atualização do Jogador
    this.jogador.update(this.cursor);

    // Atualização dos Inimigos
    this.inimigos.children.each(inimigo =>{
      inimigo.update();
    })
  }
}