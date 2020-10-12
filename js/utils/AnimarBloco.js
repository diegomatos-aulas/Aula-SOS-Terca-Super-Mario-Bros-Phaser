export default function animarBloco(tijolo){
  this.tweens.add({
    targets: tijolo,
    y: tijolo.y - tijolo.body.halfHeight,
    ease: "Circ",
    duration: 100,
    repeat: 0,
    yoyo: true,
  });
}