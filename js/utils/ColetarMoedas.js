import addPontuacao from "./AddPontuacao.js"

export default function coletarMoedas(tweens, moeda){
  addPontuacao.call(this, 200);

  this.moedasColetadas++;
  this.txtMoedasColetadas.setText(`x${this.moedasColetadas}`);
  moeda[0].destroy();
}