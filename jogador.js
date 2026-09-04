const imgHeroi = new Image();
imgHeroi.src = "heroi0A.png"; 

let larguraSprite = 0, alturaSprite = 0, imagemPronta = false, tilesetPronto = false;

imgHeroi.onload = function() {
    larguraSprite = imgHeroi.width / 4;
    alturaSprite = imgHeroi.height / 4;
    heroi.larguraDesenho = larguraSprite * CONFIG.escalaJogador;
    heroi.alturaDesenho = alturaSprite * CONFIG.escalaJogador;
    imagemPronta = true;
};

let heroi = {
    x: 0,
    y: 0,
    larguraTela: 32,
    alturaTela: 20,
    larguraDesenho: 0,
    alturaDesenho: 0,
    velocidade: CONFIG.velocidadeNormal,
    frameX: 0,
    frameY: 0,
    contadorFrames: 0,
    andando: false,

    // STATUS
    vida: 100,
    mana: 100,
    nivel: 1,
    experiencia: 0,
    ouro: 0
};
function atualizarJogador() {

    heroi.andando = false;

    // =====================================================
    // VELOCIDADE
    // =====================================================

    const correndo =
        comandoPressionado("correr");

    const velocidadeAtual =
        correndo
            ? CONFIG.velocidadeCorrida
            : CONFIG.velocidadeNormal;

    const velocidadeAnimacao =
        correndo
            ? CONFIG.framesAnimacaoCorrendo
            : CONFIG.framesAnimacaoNormal;


    // =====================================================
    // DIREÇÃO DO MOVIMENTO
    // =====================================================

    let direcaoX = 0;
    let direcaoY = 0;


    if (comandoPressionado("esquerda")) {
        direcaoX -= 1;
    }

    if (comandoPressionado("direita")) {
        direcaoX += 1;
    }

    if (comandoPressionado("cima")) {
        direcaoY -= 1;
    }

    if (comandoPressionado("baixo")) {
        direcaoY += 1;
    }


    // =====================================================
    // MOVIMENTO
    // =====================================================

    if (direcaoX !== 0 || direcaoY !== 0) {

        heroi.andando = true;


        // Normalização da diagonal
        // Evita que diagonal seja mais rápida.

        const comprimento =
            Math.sqrt(
                direcaoX * direcaoX +
                direcaoY * direcaoY
            );


        direcaoX /= comprimento;
        direcaoY /= comprimento;


        const proximoX =
            heroi.x +
            direcaoX * velocidadeAtual;

        const proximoY =
            heroi.y +
            direcaoY * velocidadeAtual;


        // =================================================
        // DIREÇÃO DA ANIMAÇÃO
        // =================================================

        if (direcaoY > 0) {

            // Baixo
            heroi.frameY = 0;

        } else if (direcaoY < 0) {

            // Cima
            heroi.frameY = 2;

        } else if (direcaoX < 0) {

            // Esquerda
            heroi.frameY = 1;

        } else if (direcaoX > 0) {

            // Direita
            heroi.frameY = 3;
        }


        atualizarAnimacaoJogador(
            velocidadeAnimacao
        );


        return {
            proximoX,
            proximoY
        };
    }


    // =====================================================
    // PARADO
    // =====================================================

    atualizarAnimacaoJogador(
        velocidadeAnimacao
    );


    return {

        proximoX: heroi.x,
        proximoY: heroi.y
    };
}
function atualizarAnimacaoJogador(velocidadeAnimacao) {
    if (heroi.andando) {
        heroi.contadorFrames++;

        if (heroi.contadorFrames >= velocidadeAnimacao) {
            heroi.contadorFrames = 0;
            heroi.frameX++;

            if (heroi.frameX >= 4) {
                heroi.frameX = 0;
            }
        }
    }else {
        heroi.frameX = 0;
        heroi.contadorFrames = 0;
    }
}

