const canvas = document.getElementById("rpg");
const ctx = canvas.getContext("2d");

// --- CARREGAMENTO DAS IMAGENS ---

const imgTileset = new Image();
imgTileset.src = "tileset0A.png"; 

imgTileset.onload = function() {
    tilesetPronto = true;
};

// --- PROPRIEDADES DO JOGO ---
let estadoJogo = "MENU"; 
let botaoJogar = { x: 140, y: 280, largura: 120, altura: 40 };
let botaoVoltarMenu = { x: 140, y: 300, largura: 120, altura: 40 };

let camera = { x: 0, y: 0 };

construirMapaDesdeTexto(faseAtual);

function atualizar() {
    if (estadoJogo === "MENU") {
        atualizarMenu();
        return;
    }
    
    if (estadoJogo === "CONFIGURACOES") {
        atualizarConfiguracoes();
        return;
    }
    
    if (estadoJogo === "CREDITOS") {
        atualizarCreditos();
        return;
    }

    if (estadoJogo === "CONTROLES") {
        atualizarControles();
        return;
    }

    if (estadoJogo === "FIM") {
        atualizarFim();
        return;
    }

    const movimento = atualizarJogador();

    let proximoX = movimento.proximoX;
    let proximoY = movimento.proximoY;

    const colisao = verificarColisaoMovimento(proximoX, proximoY);

    let bloqueadoX = colisao.bloqueadoX;
    let bloqueadoY = colisao.bloqueadoY;

    if (!bloqueadoX) heroi.x = proximoX;
    if (!bloqueadoY) heroi.y = proximoY;

    atualizarCamera();

    verificarSaida();

//  console.log("andando:", heroi.andando,"contador:", heroi.contadorFrames,"frameX:", heroi.frameX,"velocidadeAnimacao:", movimento.velocidadeAnimacao);

}

function desenhar() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (estadoJogo === "MENU") {
        desenharMenu();
        return;
    }
    
    if (estadoJogo === "CONFIGURACOES") {
        desenharConfiguracoes();
        return;
    }
    
    if (estadoJogo === "CONTROLES") {
        desenharControles();
        return;
    }

    if (estadoJogo === "CREDITOS") {
        desenharCreditos();
        return;
    }

    if (estadoJogo === "FIM") {
        desenharFim();
        return;
    }

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    desenharMapa();
    desenharJogador();

    ctx.restore();
}

function gameLoop() { 
    atualizar(); 
    desenhar();    
    teclasAnterior = { ...teclas };
    requestAnimationFrame(gameLoop); 
}
gameLoop();
