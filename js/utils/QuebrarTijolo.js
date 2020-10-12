export default function quebrarTijolo(tijolo){
  this.breakBlockSFX.play();

  let particles = this.add.particles("brickParticle");
  particles.createEmitter({
    speed: { min: 100, max: 130 },
    gravityY: 300,
    quantity: 20,
    maxParticles: 20,
    rotate: { start: 0, end: 360 },
    x: tijolo.x,
    y: tijolo.y,
  });

  tijolo.destroy();
}