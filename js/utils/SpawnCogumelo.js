export default function spawnCogumelo(bloco){
  this.powerupAppearsSFX.play();
  let cogumeloMagico = this.physics.add.sprite(
    bloco.x,
    bloco.y - bloco.body.height,
    "magicMushroom"
  );
  cogumeloMagico.depth = 2;
  cogumeloMagico.setVelocityY(-200);
  cogumeloMagico.setGravity(0, 1000);
  cogumeloMagico.nome = "Cogumelo";
  this.itemsColetaveis.add(cogumeloMagico);
}