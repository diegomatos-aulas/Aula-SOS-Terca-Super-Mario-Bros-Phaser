import Jogador from "../GameObjects/Jogador.js";
import Inimigo from "../GameObjects/Inimigo.js";

import colisaoComOInimigo from "../utils/ColisaoComOInimigo.js";
import colisaoComBlocosInterativos from "../utils/ColisaoComBlocosInterativos.js";
import colisaoComOsTijolos from "../utils/ColisaoComOsTijolos.js";
import coletarItem from "../utils/ColetarItem.js";
import gameOver from "../utils/GameOver.js";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  init({ opcao }) {
    const { width, height } = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;

    this.jogadorEscolhido = opcao;
  }

  create() {
    this.anims.resumeAll();

    // World Bounds
    this.physics.world.setBounds(0, 0, 3584, 272);

    // Tilemap
    this.map = this.add.tilemap("level1");
    this.tileset = this.map.addTilesetImage("mariotileset", "tileset");

    this.fundo = this.map.createDynamicLayer("fundo", this.tileset);

    this.world = this.map.createDynamicLayer("world", this.tileset);
    this.world.setCollisionByProperty({ collide: true });

    // Musicas e Sons
    this.powerUpSFX = this.sound.add("powerUpSFX", {
      volume: 0.3,
    });

    this.bumpSFX = this.sound.add("bumpSFX", {
      volume: 0.3,
    });

    this.jumpSmallSFX = this.sound.add("jumpSmallSFX", {
      volume: 0.3,
    });

    this.jumpSuperSFX = this.sound.add("jumpSuperSFX", {
      volume: 0.3,
    });

    this.powerupAppearsSFX = this.sound.add("powerupAppearsSFX", {
      volume: 0.3,
    });

    this.coinSFX = this.sound.add("coinSFX", {
      volume: 0.3,
    });

    this.gameOverSFX = this.sound.add("gameOverSFX", {
      volume: 0.3,
    });

    this.backgroundMusic = this.sound.add("backgroundMusic", {
      volume: 0.1,
      loop: true,
    });

    this.breakBlockSFX = this.sound.add("breakBlockSFX", {
      volume: 0.5,
    });

    this.worldClear = this.sound.add("world_clear", { volume: 0.3 });

    this.backgroundMusic.play();

    // Jogador
    this.jogador = new Jogador(
      this,
      100,
      this.GAME_HEIGHT - 40,
      `${this.jogadorEscolhido} Pequeno`,
      this.jogadorEscolhido,
      "Pequeno",
      "Idle"
    );
    this.jogador.depth = 4;
    this.gameCompleted = false;

    this.cursor = this.input.keyboard.createCursorKeys();

    this.isGameOver = false;
    // Inimigos
    this.inimigos = this.add.group();

    this.world.forEachTile((tile) => {
      // Little Gomba
      if (tile.index == 64) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let littleGomba = new Inimigo(this, x, y, "LittleGomba");
        littleGomba.nome = "Little Gomba";
        littleGomba.anims.play("Little Gomba Walking", true);
        littleGomba.depth = 3;
        this.inimigos.add(littleGomba);

        this.world.removeTileAt(tile.x, tile.y);
      }

      // Koopa Troopa
      if (tile.index == 65) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let koopaTroopa = new Inimigo(this, x, y - 4, "KoopaTroopa");
        koopaTroopa.nome = "Koopa Troopa";
        koopaTroopa.anims.play("Koopa Troopa Walking", true);
        koopaTroopa.foiAtingido = false;
        koopaTroopa.depth = 3;
        this.inimigos.add(koopaTroopa);

        this.world.removeTileAt(tile.x, tile.y);
      }
    });

    // Blocos Interativos
    this.blocosInterativos = this.add.group();
    this.tijolos = this.add.group();

    this.world.forEachTile((tile) => {
      if (tile.index === 2) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let tijolo = this.physics.add.sprite(x, y, "brick");
        tijolo.setImmovable();
        tijolo.depth = 1;
        // Correção do Problema de Colisão
        tijolo.body.setSize(15.5, 15.9, true);

        this.tijolos.add(tijolo);
        this.world.removeTileAt(tile.x, tile.y);
      }

      if (tile.index === 25) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let blocoSurpresa = this.physics.add.sprite(x, y, "surpriseBlock");
        blocoSurpresa.anims.play("Surprise Block Ativo");
        blocoSurpresa.depth = 1;
        // Correção do Problema de Colisão
        blocoSurpresa.body.setSize(15.5, 16, true);
        blocoSurpresa.setImmovable();
        blocoSurpresa.canDrop = true;

        this.blocosInterativos.add(blocoSurpresa);
        this.world.removeTileAt(tile.x, tile.y);
      }
    });

    this.itemsColetaveis = this.add.group();

    // Camera
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // HUD
    this.pontuacao = 0;
    this.moedasColetadas = 0;
    this.tempo = 250;

    this.txtJogador = this.add.text(25, 10, this.jogadorEscolhido, {
      fontSize: "12px",
    });
    this.txtJogador.setOrigin(0.5);
    this.txtJogador.setScrollFactor(0);
    this.txtJogador.depth = 10;

    this.txtPontuacao = this.add.text(25, 25, `${this.pontuacao}`, {
      fontSize: "12px",
    });
    this.txtPontuacao.setOrigin(0.5);
    this.txtPontuacao.setScrollFactor(0);
    this.txtPontuacao.depth = 10;

    this.moedaPiscando = this.add.sprite(80, 25, "coin");
    this.moedaPiscando.anims.play("Coin 1");
    this.moedaPiscando.setScale(0.7);
    this.moedaPiscando.setScrollFactor(0);
    this.moedaPiscando.depth = 10;

    this.txtMoedasColetadas = this.add.text(
      98,
      25,
      `x${this.moedasColetadas}`,
      { fontSize: "12px" }
    );
    this.txtMoedasColetadas.setOrigin(0.5);
    this.txtMoedasColetadas.setScrollFactor(0);
    this.txtMoedasColetadas.depth = 10;

    this.txtMundo = this.add.text(160, 10, "Mundo");
    this.txtMundo.setOrigin(0.5);
    this.txtMundo.setScrollFactor(0);
    this.txtMundo.depth = 10;

    this.txtLevel = this.add.text(160, 25, `1-1`, { fontSize: "12px" });
    this.txtLevel.setOrigin(0.5);
    this.txtLevel.setScrollFactor(0);
    this.txtLevel.depth = 10;

    this.txtTempoHUD = this.add.text(220, 10, `Tempo`, { fontSize: "12px" });
    this.txtTempoHUD.setOrigin(0.5);
    this.txtTempoHUD.setScrollFactor(0);
    this.txtTempoHUD.depth = 10;

    this.txtTempo = this.add.text(220, 25, `${this.tempo}`, {
      fontSize: "12px",
    });
    this.txtTempo.setOrigin(0.5);
    this.txtTempo.setScrollFactor(0);
    this.txtTempo.depth = 10;

    this.idTimer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.tempo--;
        this.txtTempo.text = this.tempo;
        if (this.tempo === 0) {
          this.gameOver();
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Fisicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.collider(
      this.jogador,
      this.inimigos,
      colisaoComOInimigo,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador,
      this.blocosInterativos,
      colisaoComBlocosInterativos,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador,
      this.tijolos,
      colisaoComOsTijolos,
      null,
      this
    );
    this.physics.add.overlap(
      this.jogador,
      this.itemsColetaveis,
      coletarItem,
      null,
      this
    );

    this.physics.add.collider(this.inimigos, this.world);
    this.physics.add.collider(this.inimigos, this.blocosInterativos);
    this.physics.add.collider(this.inimigos, this.tijolos);

    this.physics.add.collider(this.itemsColetaveis, this.world);
    this.physics.add.collider(this.itemsColetaveis, this.blocosInterativos);
    this.physics.add.collider(this.itemsColetaveis, this.tijolos);
  }

  update(tempoPercorrido, deltaTime) {
    const { x: viewPortPosX } = this.cameras.main.worldView;
    const posicaoRelativaDoJogador = this.jogador.x - viewPortPosX;

    // Atualização do Jogador
    this.jogador.update(this.cursor, deltaTime, posicaoRelativaDoJogador);
    if (this.jogador.x >= 3064 && !this.gameCompleted) {
      this.finalizarFase();
    }

    if (this.jogador.y >= 256 && !this.isGameOver) {
      gameOver.call(this);
    }

    // Atualização dos Inimigos
    this.inimigos.children.each((inimigo) => {
      inimigo.update();
    });

    // Lógica da Camera
    if (posicaoRelativaDoJogador > this.GAME_WIDTH / 2) {
      this.cameras.main.startFollow(this.jogador, true, 0.01, 0.01);
    } else {
      this.cameras.main.stopFollow();
    }
    this.jogador.collidingWithEnemy = false;
  }

  finalizarFase() {
    this.backgroundMusic.stop();
    this.worldClear.play();

    this.worldClear.once("complete", (music) => {
      this.scene.start("GameOverScene", { level: "Level1", name: "World 1-1" });
    });

    this.gameCompleted = true;
    this.jogador.fim();
  }
}
