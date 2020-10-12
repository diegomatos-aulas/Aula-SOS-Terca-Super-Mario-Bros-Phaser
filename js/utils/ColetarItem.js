export default function coletarItem(jogador, item) {
  if (item.nome === "Cogumelo") {
    this.itemsColetaveis.remove(item, true, true);
    this.powerUpSFX.play();
    if (this.jogador.state.tamanho === "Pequeno") {
      this.jogador.setVelocityY(-160);
    }
    this.jogador.state.tamanho = "Grande";
  }
}