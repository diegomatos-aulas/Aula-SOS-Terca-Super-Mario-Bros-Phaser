import coletarMoedas from "./ColetarMoedas.js"

export default function spawnMoeda(bloco){
  this.coinSFX.play();

  let moeda = this.add.sprite(
    bloco.x,
    bloco.y - bloco.body.height,
    "coin"
  );
  moeda.depth = 2;

  let animMoeda = this.tweens.add({
    targets: moeda,
    y: moeda.y - bloco.body.height,
    ease: "Circ",
    duration: 200,
    repeat: 0,
    yoyo: true,
  });

  animMoeda.on(
    "complete",
    coletarMoedas,
    this
  );
}