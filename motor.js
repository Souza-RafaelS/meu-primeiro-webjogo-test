const canvas = document.getElementById("rpg");
const ctx = canvas.getContext("2d");

// --- CARREGAMENTO DAS IMAGENS ---
const imgHeroi = new Image();
imgHeroi.src = "heroi0A.png"; 

const imgTileset = new Image();
imgTileset.src = "tileset0A.png"; 

let larguraSprite = 0, alturaSprite = 0, imagemPronta = false, tilesetPronto = false;

imgHeroi.onload = function() {
    larguraSprite = imgHeroi.width / 4;
    alturaSprite = imgHeroi.height / 4;
    const ESCALA = 3;
    heroi.larguraDesenho = larguraSprite * ESCALA;
    heroi.alturaDesenho = alturaSprite * ESCALA;
    imagemPronta = true;
};

imgTileset.onload = function() {
    tilesetPronto = true;
};

// --- PROPRIEDADES DO JOGO ---
let estadoJogo = "MENU"; 
let botaoJogar = { x: 140, y: 280, largura: 120, altura: 40 };
let botaoVoltarMenu = { x: 140, y: 300, largura: 120, altura: 40 };

let heroi = { x: 0, y: 0, larguraTela: 32, alturaTela: 20, larguraDesenho: 0, alturaDesenho: 0, velocidade: 3, frameX: 0, frameY: 0, contadorFrames: 0, andando: false };
const TAMANHO_BLOCO = 48; 
const TAMANHO_TILE_ORIGINAL = 16; 

let obstaculos = [], saidas = [], faseAtual = 0, larguraMundo = 0, alturaMundo = 0, camera = { x: 0, y: 0 };
let matrizOriginal = []; 
let decoracoesGrama = [];

function construirMapaDesdeTexto(numeroDaFase) {
    obstaculos = []; saidas = [];
    let textoMapa = fasesDoJogo[numeroDaFase].trim();
    matrizOriginal = textoMapa.split("\n");
    
    alturaMundo = matrizOriginal.length * TAMANHO_BLOCO;
    larguraMundo = matrizOriginal[0].trim().length * TAMANHO_BLOCO;

    for (let l = 0; l < matrizOriginal.length; l++) {
        let linhaTexto = matrizOriginal[l].trim();
        for (let c = 0; c < linhaTexto.length; c++) {
            if (linhaTexto[c] === '1') obstaculos.push({ x: c * TAMANHO_BLOCO, y: l * TAMANHO_BLOCO, largura: TAMANHO_BLOCO, altura: TAMANHO_BLOCO });
            else if (linhaTexto[c] === 'P') { heroi.x = (c * TAMANHO_BLOCO) + 6; heroi.y = (l * TAMANHO_BLOCO) + 6; }
            else if (linhaTexto[c] === 'S') saidas.push({ x: c * TAMANHO_BLOCO, y: l * TAMANHO_BLOCO, largura: TAMANHO_BLOCO, altura: TAMANHO_BLOCO });
        }
    }
}

construirMapaDesdeTexto(faseAtual);

function testarColisao(r1, r2) {
    return r1.x < r2.x + r2.largura && r1.x + r1.larguraTela > r2.x && r1.y < r2.y + r2.altura && r1.y + r1.alturaTela > r2.y;
}

function atualizar() {
    if (estadoJogo === "MENU") {
        if (cliqueDoMouse) {
            if (cliqueDoMouse.x >= botaoJogar.x && cliqueDoMouse.x <= botaoJogar.x + botaoJogar.largura &&
                cliqueDoMouse.y >= botaoJogar.y && cliqueDoMouse.y <= botaoJogar.y + botaoJogar.altura) {
                estadoJogo = "JOGANDO"; 
                faseAtual = 0; 
                construirMapaDesdeTexto(faseAtual);
            }
            cliqueDoMouse = null; 
        }
        return; 
    }

    if (estadoJogo === "FIM") {
        if (cliqueDoMouse) {
            if (cliqueDoMouse.x >= botaoVoltarMenu.x && cliqueDoMouse.x <= botaoVoltarMenu.x + botaoVoltarMenu.largura &&
                cliqueDoMouse.y >= botaoVoltarMenu.y && cliqueDoMouse.y <= botaoVoltarMenu.y + botaoVoltarMenu.altura) {
                estadoJogo = "MENU"; 
            }
            cliqueDoMouse = null;
        }
        return;
    }

    heroi.andando = false;
    let velocidadeAtual = teclas["Shift"] ? 5 : 3;
    let velocidadeAnimacao = teclas["Shift"] ? 5 : 10;
    
    let proximoX = heroi.x, proximoY = heroi.y;

    if (teclas["ArrowDown"] && heroi.y < alturaMundo - heroi.alturaTela) { proximoY += velocidadeAtual; heroi.frameY = 0; heroi.andando = true; }
    else if (teclas["ArrowLeft"] && heroi.x > 0) { proximoX -= velocidadeAtual; heroi.frameY = 1; heroi.andando = true; }
    else if (teclas["ArrowRight"] && heroi.x < larguraMundo - heroi.larguraTela) { proximoX += velocidadeAtual; heroi.frameY = 3; heroi.andando = true; }
    else if (teclas["ArrowUp"] && heroi.y > 0) { proximoY -= velocidadeAtual; heroi.frameY = 2; heroi.andando = true; }

    let bloqueadoX = false, bloqueadoY = false;
    for (let obs of obstaculos) {
        if (testarColisao({ ...heroi, x: proximoX }, obs)) bloqueadoX = true;
        if (testarColisao({ ...heroi, y: proximoY }, obs)) bloqueadoY = true;
    }
    if (!bloqueadoX) heroi.x = proximoX;
    if (!bloqueadoY) heroi.y = proximoY;

    camera.x = heroi.x + heroi.larguraTela / 2 - canvas.width / 2;
    camera.y = heroi.y + heroi.alturaTela / 2 - canvas.height / 2;
    if (camera.x < 0) camera.x = 0; if (camera.y < 0) camera.y = 0;
    if (camera.x > larguraMundo - canvas.width) camera.x = larguraMundo - canvas.width;
    if (camera.y > alturaMundo - canvas.height) camera.y = alturaMundo - canvas.height;

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

    if (heroi.andando && (!bloqueadoX || !bloqueadoY)) {
        heroi.contadorFrames++;
        if (heroi.contadorFrames >= velocidadeAnimacao) { heroi.contadorFrames = 0; heroi.frameX++; if (heroi.frameX >= 4) heroi.frameX = 0; }
    } else { heroi.frameX = 0; }
}

function desenhar() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (estadoJogo === "MENU") {
        ctx.fillStyle = "#1a1a2e"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f1c40f"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
        ctx.shadowColor = "black"; ctx.shadowBlur = 6;
        ctx.fillText("MEU RPG MAKER GAME", canvas.width / 2, 160);
        
        ctx.fillStyle = "#0f0f2d"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
        ctx.fillRect(botaoJogar.x, botaoJogar.y, botaoJogar.largura, botaoJogar.altura);
        ctx.strokeRect(botaoJogar.x, botaoJogar.y, botaoJogar.largura, botaoJogar.altura);

        ctx.fillStyle = "#fff"; ctx.font = "bold 14px sans-serif"; ctx.shadowBlur = 0;
        ctx.fillText("Novo Jogo", botaoJogar.x + botaoJogar.largura / 2, botaoJogar.y + 24);
        ctx.textAlign = "left"; 
        return; 
    }

    if (estadoJogo === "FIM") {
        ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#e74c3c"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)"; ctx.shadowBlur = 8;
        ctx.fillText("FIM DE JOGO", canvas.width / 2, 160);

        ctx.fillStyle = "#95a5a6"; ctx.font = "16px sans-serif";
        ctx.fillText("Você completou a demonstração!", canvas.width / 2, 210);

        ctx.fillStyle = "#1c1c1c"; ctx.strokeStyle = "#7f8c8d"; ctx.lineWidth = 2;
        ctx.fillRect(botaoVoltarMenu.x, botaoVoltarMenu.y, botaoVoltarMenu.largura, botaoVoltarMenu.altura);
        ctx.strokeRect(botaoVoltarMenu.x, botaoVoltarMenu.y, botaoVoltarMenu.largura, botaoVoltarMenu.altura);

        ctx.fillStyle = "#fff"; ctx.font = "bold 13px sans-serif"; ctx.shadowBlur = 0;
        ctx.fillText("Menu Inicial", botaoVoltarMenu.x + botaoVoltarMenu.largura / 2, botaoVoltarMenu.y + 24);
        ctx.textAlign = "left"; 
        return;
    }

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    if (tilesetPronto) {
        if (decoracoesGrama.length === 0) {
            for (let l = 0; l < matrizOriginal.length; l++) {
                decoracoesGrama[l] = [];
                let linhaTexto = matrizOriginal[l].trim();
                for (let c = 0; c < linhaTexto.length; c++) decoracoesGrama[l][c] = Math.floor(Math.random() * 4);
            }
        }
        for (let l = 0; l < matrizOriginal.length; l++) {
            let linhaTexto = matrizOriginal[l].trim();
            for (let c = 0; c < linhaTexto.length; c++) {
                let xTela = c * TAMANHO_BLOCO, yTela = l * TAMANHO_BLOCO;
                ctx.drawImage(imgTileset, decoracoesGrama[l][c] * TAMANHO_TILE_ORIGINAL, 0, TAMANHO_TILE_ORIGINAL, TAMANHO_TILE_ORIGINAL, xTela, yTela, TAMANHO_BLOCO, TAMANHO_BLOCO);
                if (linhaTexto[c] === '1') {
                    ctx.drawImage(imgTileset, 2 * TAMANHO_TILE_ORIGINAL, 1 * TAMANHO_TILE_ORIGINAL, TAMANHO_TILE_ORIGINAL, TAMANHO_TILE_ORIGINAL, xTela, yTela, TAMANHO_BLOCO, TAMANHO_BLOCO);
                } else if (linhaTexto[c] === 'S') {
                    ctx.fillStyle = "#111"; ctx.fillRect(xTela + 8, yTela + 8, TAMANHO_BLOCO - 16, TAMANHO_BLOCO - 8);
                }
            }
        }
    } else {
        ctx.fillStyle = "#2e8b57"; ctx.fillRect(0, 0, larguraMundo, alturaMundo);
    }

    if (imagemPronta) {
        let ajusteX = heroi.x - (heroi.larguraDesenho - heroi.larguraTela) / 2;
        let ajusteY = heroi.y - (heroi.alturaDesenho - heroi.alturaTela);
        
        ctx.beginPath();
        ctx.ellipse(heroi.x + heroi.larguraTela / 2, heroi.y + heroi.alturaTela / 2, heroi.larguraTela / 2, heroi.alturaTela / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)"; ctx.fill(); ctx.closePath();

        ctx.drawImage(imgHeroi, heroi.frameX * larguraSprite, heroi.frameY * alturaSprite, larguraSprite, alturaSprite, ajusteX, ajusteY, heroi.larguraDesenho, heroi.alturaDesenho);
    } else {
        ctx.fillStyle = "#3498db"; ctx.fillRect(heroi.x, heroi.y, heroi.larguraTela, heroi.alturaTela);
    }
    ctx.restore();
}

function gameLoop() { atualizar(); desenhar(); requestAnimationFrame(gameLoop); }
gameLoop();
