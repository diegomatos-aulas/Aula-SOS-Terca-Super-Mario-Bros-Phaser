import BootScene from "./Scenes/Boot.js"
import LoadScene from "./Scenes/LoadScene.js"
import MenuScene from "./Scenes/MenuScene.js"
import GameOverScene from "./Scenes/GameOverScene.js"
import Level1 from "./Scenes/Level1.js"

const config = {
  width: 240,
  height: 240,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0},
      debug: false
    }
  },
  backgroundColor: "#5c94fc",
  pixelArt: true,
  scene: [BootScene, LoadScene, MenuScene, Level1, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

let game = new Phaser.Game(config)