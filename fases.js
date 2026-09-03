function verificarSaida() {
    for (let s of saidas) {
        if (testarColisao(heroi, { ...s, larguraTela: s.largura, alturaTela: s.altura })) {
            faseAtual++; 
            if (faseAtual >= fasesDoJogo.length) {
                estadoJogo = "FIM";
            } else {
                construirMapaDesdeTexto(faseAtual); 
            }
            return; 
        }
    }
}