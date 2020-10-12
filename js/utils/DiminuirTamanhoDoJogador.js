export default function diminuirTamanhoDoJogador(jogador, inimigo){
  if (jogador.x > inimigo.x) {
    this.jogador.body.setVelocity(400, -100);
  } else if (jogador.x < inimigo.x) {
    this.jogador.body.setVelocity(-400, -100);
  }
  jogador.state.tamanho = "Pequeno";

  if (inimigo.name === "Koopa Troopa") {
    inimigo.canWalk = false;
    inimigo.setVelocity(0);
  }
}