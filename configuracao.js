const CONFIG = {
    canvasLargura: 400,
    canvasAltura: 400,

    tamanhoBloco: 48,
    tamanhoTileOriginal: 16,

    velocidadeNormal: 3,
    velocidadeCorrida: 5,

    escalaJogador: 3,

    framesAnimacaoNormal: 10,
    framesAnimacaoCorrendo: 5
};
const CONFIG_JOGADOR = {
    controles: {
        cima: "ArrowUp",
        baixo: "ArrowDown",
        esquerda: "ArrowLeft",
        direita: "ArrowRight",
        correr: "Shift",
        confirmar: " ",
        interagir: "e",
        inventario: "i",
        voltar: "Escape"
    },

    audio: {
        volumeGeral: 1,
        volumeMusica: 1,
        volumeEfeitos: 1,
        musicaAtivada: true,
        efeitosAtivados: true
    },

    graficos: {
        escala: 1,
        telaCheia: false
    }
};
