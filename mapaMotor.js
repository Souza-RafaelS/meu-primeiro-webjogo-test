let obstaculos = [];
let saidas = [];
let faseAtual = 0;
let larguraMundo = 0;
let alturaMundo = 0;
let matrizOriginal = [];

let decoracoesGrama = [];


function construirMapaDesdeTexto(numeroDaFase) {
    obstaculos = [];
    saidas = [];
    decoracoesGrama = [];

    let textoMapa = fasesDoJogo[numeroDaFase].trim();
    matrizOriginal = textoMapa.split("\n");
    gerarDecoracoesGrama();
  
    alturaMundo = matrizOriginal.length * CONFIG.tamanhoBloco;
    larguraMundo = matrizOriginal[0].trim().length * CONFIG.tamanhoBloco;

    for (let l = 0; l < matrizOriginal.length; l++) {
        let linhaTexto = matrizOriginal[l].trim();
        for (let c = 0; c < linhaTexto.length; c++) {
            if (linhaTexto[c] === '1') obstaculos.push({ x: c * CONFIG.tamanhoBloco, y: l * CONFIG.tamanhoBloco, largura: CONFIG.tamanhoBloco, altura: CONFIG.tamanhoBloco });
            else if (linhaTexto[c] === 'P') { heroi.x = (c * CONFIG.tamanhoBloco) + 6; heroi.y = (l * CONFIG.tamanhoBloco) + 6; }
                else if (linhaTexto[c] === 'S') saidas.push({ x: c * CONFIG.tamanhoBloco, y: l * CONFIG.tamanhoBloco, largura: CONFIG.tamanhoBloco, altura: CONFIG.tamanhoBloco });
        }
    }
}
function gerarDecoracoesGrama() {
    decoracoesGrama = [];

    for (let l = 0; l < matrizOriginal.length; l++) {
        decoracoesGrama[l] = [];

        let linhaTexto = matrizOriginal[l].trim();

        for (let c = 0; c < linhaTexto.length; c++) {
            decoracoesGrama[l][c] = Math.floor(Math.random() * 4);
        }
    }
}
