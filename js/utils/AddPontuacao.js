export default function addPontuacao(pontos){
  this.pontuacao += pontos;
  this.txtPontuacao.setText(`${this.pontuacao}`);
}