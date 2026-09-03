function desenharMapa() {
    if (tilesetPronto) {
        
        for (let l = 0; l < matrizOriginal.length; l++) {
            let linhaTexto = matrizOriginal[l].trim();
            for (let c = 0; c < linhaTexto.length; c++) {
                let xTela = c * CONFIG.tamanhoBloco, yTela = l * CONFIG.tamanhoBloco;
                ctx.drawImage(imgTileset, decoracoesGrama[l][c] * CONFIG.tamanhoTileOriginal, 0, CONFIG.tamanhoTileOriginal, CONFIG.tamanhoTileOriginal, xTela, yTela, CONFIG.tamanhoBloco, CONFIG.tamanhoBloco);
                if (linhaTexto[c] === '1') {
                    ctx.drawImage(imgTileset, 2 * CONFIG.tamanhoTileOriginal, 1 * CONFIG.tamanhoTileOriginal, CONFIG.tamanhoTileOriginal, CONFIG.tamanhoTileOriginal, xTela, yTela, CONFIG.tamanhoBloco, CONFIG.tamanhoBloco);
                } else if (linhaTexto[c] === 'S') {
                    ctx.fillStyle = "#111"; ctx.fillRect(xTela + 8, yTela + 8, CONFIG.tamanhoBloco - 16, CONFIG.tamanhoBloco - 8);
                }
            }
        }
    } else {
        ctx.fillStyle = "#2e8b57"; ctx.fillRect(0, 0, larguraMundo, alturaMundo);
    }
}
function desenharJogador() {
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
}
function desenharMenu() {

    // =====================================================
    // FUNDO
    // =====================================================

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // =====================================================
    // TÍTULO
    // =====================================================

    ctx.fillStyle = "#f1c40f";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";

    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;

    ctx.fillText(
        "MEU RPG",
        canvas.width / 2,
        100
    );

    ctx.shadowBlur = 0;


    // =====================================================
    // OPÇÕES
    // =====================================================

    const opcoes = [
        "Novo Jogo",
        "Continuar",
        "Configurações",
        "Créditos"
    ];

    const larguraBotao = 160;
    const alturaBotao = 40;

    const xBotao = (canvas.width - larguraBotao) / 2;
    const yInicial = 150;
    const espacamento = 50;


    // =====================================================
    // DESENHAR BOTÕES
    // =====================================================

    for (let i = 0; i < opcoes.length; i++) {

        const y = yInicial + i * espacamento;

        // Fundo
        ctx.fillStyle = "#0f0f2d";

        ctx.fillRect(
            xBotao,
            y,
            larguraBotao,
            alturaBotao
        );


        // =====================================================
        // CONTINUAR SEM SAVE
        // =====================================================

        if (i === 1 && !possuiSave) {

            ctx.strokeStyle = "#555";
            ctx.lineWidth = 2;

            ctx.fillStyle = "#555";

        }


        // =====================================================
        // OPÇÃO SELECIONADA
        // =====================================================

        else if (opcaoMenu === i) {

            let brilho =
                (Math.sin(animacaoMenu) + 1) / 2;

            ctx.strokeStyle =
                `rgb(255, ${Math.floor(180 + brilho * 75)}, 0)`;

            ctx.lineWidth = 4;

            ctx.fillStyle =
                `rgb(255, ${Math.floor(180 + brilho * 75)}, 0)`;

        }


// =====================================================
// OPÇÃO NORMAL
// =====================================================

else {

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    ctx.fillStyle = "#ffffff";
}



        // Borda
        ctx.strokeRect(
            xBotao,
            y,
            larguraBotao,
            alturaBotao
        );


        // Texto
        ctx.font = "bold 14px sans-serif";

        ctx.fillText(
            opcoes[i],
            canvas.width / 2,
            y + 25
        );
    }


    ctx.textAlign = "left";
}

function desenharConfiguracoes() {

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f1c40f";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(
        "CONFIGURAÇÕES",
        canvas.width / 2,
        70
    );

    const opcoes = [
        "Controles",
        "Som",
        "Gráficos",
        "Salvamento"
    ];

    for (let i = 0; i < opcoes.length; i++) {

        if (i === opcaoConfiguracoes) {
            ctx.fillStyle = "#f1c40f";
        } else {
            ctx.fillStyle = "#ffffff";
        }

        ctx.font = "bold 16px sans-serif";

        ctx.fillText(
            (i === opcaoConfiguracoes ? "> " : "  ") + opcoes[i],
            canvas.width / 2,
            140 + i * 50
        );
    }

    ctx.textAlign = "left";
}
function desenharControles() {

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f1c40f";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(
        "CONTROLES",
        canvas.width / 2,
        60
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";

    ctx.fillText(
        "Cima: ArrowUp",
        canvas.width / 2,
        120
    );

    ctx.fillText(
        "Baixo: ArrowDown",
        canvas.width / 2,
        155
    );

    ctx.fillText(
        "Esquerda: ArrowLeft",
        canvas.width / 2,
        190
    );

    ctx.fillText(
        "Direita: ArrowRight",
        canvas.width / 2,
        225
    );

    ctx.fillText(
        "Correr: Shift",
        canvas.width / 2,
        260
    );

    ctx.fillText(
        "Interagir: E",
        canvas.width / 2,
        295
    );

    ctx.fillText(
        "Inventário: I",
        canvas.width / 2,
        330
    );

    ctx.fillStyle = "#95a5a6";
    ctx.font = "14px sans-serif";

    ctx.fillText(
        "Pressione ESC para voltar",
        canvas.width / 2,
        380
    );

    ctx.textAlign = "left";
}

function desenharFim() {
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
}

