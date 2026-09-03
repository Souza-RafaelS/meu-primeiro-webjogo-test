let opcaoMenu = 0;
let quantidadeOpcoesMenu = 4;
let animacaoMenu = 0;
let possuiSave = false;



// =====================================================
// MENU PRINCIPAL
// =====================================================

function atualizarMenu() {

    if (estadoJogo !== "MENU") {
        return;
    }
    
    possuiSave = existeSave();

    animacaoMenu += 0.08;


    // ---------------------------------------------
    // NAVEGAÇÃO PARA BAIXO
    // ---------------------------------------------

    if (teclaFoiPressionada("baixo")) {

        opcaoMenu++;

        if (opcaoMenu >= quantidadeOpcoesMenu) {
            opcaoMenu = 0;
        }
    }


    // ---------------------------------------------
    // NAVEGAÇÃO PARA CIMA
    // ---------------------------------------------

    if (teclaFoiPressionada("cima")) {

        opcaoMenu--;

        if (opcaoMenu < 0) {
            opcaoMenu = quantidadeOpcoesMenu - 1;
        }
    }


    // ---------------------------------------------
    // CONFIRMAR
    // ---------------------------------------------

    if (confirmarPressionado) {

        selecionarOpcaoMenu(opcaoMenu);

        confirmarPressionado = false;

        return;
    }


    // ---------------------------------------------
    // CLIQUE DO MOUSE
    // ---------------------------------------------

    if (cliqueDoMouse) {

        if (cliqueDoMouse.x >= 120 &&
            cliqueDoMouse.x <= 280) {

            // NOVO JOGO
            if (cliqueDoMouse.y >= 180 &&
                cliqueDoMouse.y <= 220) {

                selecionarOpcaoMenu(0);
            }


            // CONTINUAR
            else if (cliqueDoMouse.y >= 230 &&
                     cliqueDoMouse.y <= 270) {

                selecionarOpcaoMenu(1);
            }


            // CONFIGURAÇÕES
            else if (cliqueDoMouse.y >= 280 &&
                     cliqueDoMouse.y <= 320) {

                selecionarOpcaoMenu(2);
            }


            // CRÉDITOS
            else if (cliqueDoMouse.y >= 330 &&
                     cliqueDoMouse.y <= 370) {

                selecionarOpcaoMenu(3);
            }
        }

        cliqueDoMouse = null;
    }
}


// =====================================================
// SELECIONAR OPÇÃO
// =====================================================

function selecionarOpcaoMenu(opcao) {

    // ---------------------------------------------
    // NOVO JOGO
    // ---------------------------------------------

    if (opcao === 0) {

        estadoJogo = "JOGO";

        faseAtual = 0;

        construirMapaDesdeTexto(faseAtual);

        return;
    }


    // ---------------------------------------------
    // CONTINUAR
    // ---------------------------------------------

    if (opcao === 1) {

    if (!existeSave()) {

        console.log("Nenhum save encontrado.");

        return;
    }

    const carregou = carregarJogo();

    if (carregou) {

        estadoJogo = "JOGO";

        opcaoMenu = 0;
    }

    return;
    }



    // ---------------------------------------------
    // CONFIGURAÇÕES
    // ---------------------------------------------

    if (opcao === 2) {

        estadoJogo = "CONFIGURACOES";

        return;
    }


    // ---------------------------------------------
    // CRÉDITOS
    // ---------------------------------------------

    if (opcao === 3) {

        estadoJogo = "CREDITOS";

        return;
    }
}


// =====================================================
// FIM DE JOGO
// =====================================================

function atualizarFim() {

    if (estadoJogo !== "FIM") {
        return;
    }

    if (cliqueDoMouse) {

        if (
            cliqueDoMouse.x >= botaoVoltarMenu.x &&
            cliqueDoMouse.x <= botaoVoltarMenu.x + botaoVoltarMenu.largura &&
            cliqueDoMouse.y >= botaoVoltarMenu.y &&
            cliqueDoMouse.y <= botaoVoltarMenu.y + botaoVoltarMenu.altura
        ) {

            estadoJogo = "MENU";
            opcaoMenu = 0;
        }

        cliqueDoMouse = null;
    }
}