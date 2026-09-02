const canvas = document.getElementById("rpg");
const ctx = canvas.getContext("2d");

// --- CONFIGURAÇÃO DA IMAGEM ---
const imgHeroi = new Image();
imgHeroi.src = "heroi0A_teste.png"; 

let larguraSprite = 0, alturaSprite = 0, imagemPronta = false;
imgHeroi.onload = function() {
    larguraSprite = imgHeroi.width / 4;
    alturaSprite = imgHeroi.height / 4;
    imagemPronta = true;
};

// --- PROPRIEDADES DO JOGO ---
let heroi = { x: 0, y: 0, larguraTela: 32, alturaTela: 20, larguraDesenho: 48, alturaDesenho: 64, velocidade: 3, frameX: 0, frameY: 0, contadorFrames: 0, andando: false };
const TAMANHO_BLOCO = 48; 
let obstaculos = [], saidas = [], faseAtual = 0, larguraMundo = 0, alturaMundo = 0, camera = { x: 0, y: 0 };

function construirMapaDesdeTexto(numeroDaFase) {
    if (numeroDaFase >= fasesDoJogo.length) { alert("Você Venceu o Jogo!"); faseAtual = 0; numeroDaFase = 0; }
    obstaculos = []; saidas = [];
    
    let textoMapa = fasesDoJogo[numeroDaFase].trim();
    let lines = textoMapa.split("\n");
    
    alturaMundo = lines.length * TAMANHO_BLOCO;
    larguraMundo = lines[0].trim().length * TAMANHO_BLOCO; // CORRIGIDO: Mede a primeira linha de texto limpa

    for (let l = 0; l < lines.length; l++) {
        let linhaTexto = lines[l].trim();
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
    heroi.andando = false;
    let velocidadeAtual = teclas["Shift"] ? 5 : 3;
    let velocidadeAnimacao = teclas["Shift"] ? 5 : 10;
    
    let proximoX = heroi.x, proximoY = heroi.y;

    if (teclas["ArrowDown"] && heroi.y < alturaMundo - heroi.alturaTela) { proximoY += velocidadeAtual; heroi.frameY = 0; heroi.andando = true; }
    else if (teclas["ArrowLeft"] && heroi.x > 0) { proximoX -= velocidadeAtual; heroi.frameY = 1; heroi.andando = true; }
    else if (teclas["ArrowRight"] && heroi.x < larguraMundo - heroi.larguraTela) { proximoX += velocidadeAtual; heroi.frameY = 3; heroi.andando = true; }
    else if (teclas["ArrowUp"] && heroi.y > 0) { proximoY -= velocidadeAtual; heroi.frameY = 2; heroi.andando = true; }

    let hX = { ...heroi, x: proximoX }, hY = { ...heroi, y: proximoY };
    let colX = false, colY = false;

    for (let obs of obstaculos) {
        if (testarColisao(hX, obs)) colX = true;
        if (testarColisao(hY, obs)) colY = true;
    }

    if (!colX) heroi.x = proximoX;
    if (!colY) heroi.y = proximoY;

    camera.x = heroi.x + heroi.larguraTela / 2 - canvas.width / 2;
    camera.y = heroi.y + heroi.alturaTela / 2 - canvas.height / 2;
    if (camera.x < 0) camera.x = 0; if (camera.y < 0) camera.y = 0;
    if (camera.x > larguraMundo - canvas.width) camera.x = larguraMundo - canvas.width;
    if (camera.y > alturaMundo - canvas.height) camera.y = alturaMundo - canvas.height;

    for (let s of saidas) {
        if (testarColisao(heroi, { ...s, larguraTela: s.largura, alturaTela: s.altura })) {
            faseAtual++; construirMapaDesdeTexto(faseAtual); return;
        }
    }

    if (heroi.andando && (!colX || !colY)) {
        heroi.contadorFrames++;
        if (heroi.contadorFrames >= velocidadeAnimacao) { heroi.contadorFrames = 0; heroi.frameX++; if (heroi.frameX >= 4) heroi.frameX = 0; }
    } else { heroi.frameX = 0; }
}

function desenhar() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    ctx.fillStyle = "#2e8b57"; ctx.fillRect(0, 0, larguraMundo, alturaMundo);
    ctx.fillStyle = "#8b4513"; 
    for (let obs of obstaculos) { ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura); ctx.strokeRect(obs.x, obs.y, obs.largura, obs.altura); }
    ctx.fillStyle = "#111"; 
    for (let s of saidas) ctx.fillRect(s.x, s.y, s.largura, s.altura);

    if (imagemPronta) {
        let ajusteX = heroi.x - (heroi.larguraDesenho - heroi.larguraTela) / 2;
        let ajusteY = heroi.y - (heroi.alturaDesenho - heroi.alturaTela);
        ctx.drawImage(imgHeroi, heroi.frameX * larguraSprite, heroi.frameY * alturaSprite, larguraSprite, alturaSprite, ajusteX, ajusteY, heroi.larguraTela, heroi.alturaTela);
    } else {
        ctx.fillStyle = "#3498db";
        ctx.fillRect(heroi.x, heroi.y, heroi.larguraTela, heroi.alturaTela);
    }
    ctx.restore();
}

function gameLoop() { atualizar(); desenhar(); requestAnimationFrame(gameLoop); }
gameLoop();
