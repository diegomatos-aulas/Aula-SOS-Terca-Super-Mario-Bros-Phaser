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
    this.jogador = new Jogador(this, 48, this.GAME_HEIGHT-40, "Mario Pequeno", "Mario", "Pequeno", "Idle");

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
    this.tijolos = this.add.group()

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

        this.blocosInterativos.add(blocoSurpresa);
        this.world.removeTileAt(tile.x, tile.y)
      }
    })

    // Camera
    this.cameras.main.startFollow(this.jogador, true)
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // Fisicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.overlap(this.jogador, this.inimigos, this.colisaoComOInimigo, null, this);
    this.physics.add.collider(this.jogador, this.blocosInterativos, this.colisaoComBlocosInterativos, null, this);
    this.physics.add.collider(this.jogador, this.tijolos);


    this.physics.add.collider(this.inimigos, this.world);
    this.physics.add.collider(this.inimigos, this.blocosInterativos);
  }

  update(){
    // Atualização do Jogador
    this.jogador.update(this.cursor);

    // Atualização dos Inimigos
    this.inimigos.children.each(inimigo =>{
      inimigo.update();
    })
  }

  colisaoComOInimigo(jogador, inimigo){
    if(jogador.y + jogador.body.halfHeight <= inimigo.y - inimigo.body.halfHeight){
      this.inimigos.remove(inimigo, true, true);
      console.log("Matou O inimigo")
    } else{
      console.log("Morreu")
    }
  }

  colisaoComBlocosInterativos(jogador, bloco){
    console.log("FOI")
    if(jogador.y - jogador.body.halfHeight <= bloco.y + bloco.body.halfHeight){
      console.log("Spawnou um item")
    }
  }
}