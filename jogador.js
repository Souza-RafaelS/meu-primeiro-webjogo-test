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

    let velocidadeAtual = comandoPressionado("correr")
        ? CONFIG.velocidadeCorrida
        : CONFIG.velocidadeNormal;
    
    let velocidadeAnimacao = comandoPressionado("correr")
        ? CONFIG.framesAnimacaoCorrendo
        : CONFIG.framesAnimacaoNormal;

        //console.log("ANIMAÇÃO:", velocidadeAnimacao);

    
    let proximoX = heroi.x;
    let proximoY = heroi.y;

    if(comandoPressionado("baixo") && heroi.y < alturaMundo - heroi.alturaTela) {
        proximoY += velocidadeAtual;
        heroi.frameY = 0;
        heroi.andando = true;
    }
    else if (comandoPressionado("esquerda") && heroi.x > 0) {
        proximoX -= velocidadeAtual;
        heroi.frameY = 1;
        heroi.andando = true;
    }
    else if (comandoPressionado("direita") && heroi.x < larguraMundo - heroi.larguraTela) {
        proximoX += velocidadeAtual;
        heroi.frameY = 3;
        heroi.andando = true;
    }
    else if (comandoPressionado("cima") && heroi.y > 0) {
        proximoY -= velocidadeAtual;
        heroi.frameY = 2;
        heroi.andando = true;
    }

    atualizarAnimacaoJogador(velocidadeAnimacao);

    return {
        proximoX,
        proximoY,
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

