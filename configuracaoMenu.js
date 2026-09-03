let opcaoConfiguracoes = 0;

function atualizarConfiguracoes() {

    if (estadoJogo !== "CONFIGURACOES") {
        return;
    }
    //console.log("Comando voltar",CONFIG_JOGADOR.controles.voltar);
    // VOLTAR PARA O MENU
    if (teclaFoiPressionada("voltar")) {
        estadoJogo = "MENU";
        opcaoMenu = 1;
        return;
    }

    // BAIXO
    if (teclaFoiPressionada("baixo")) {
        opcaoConfiguracoes++;

        if (opcaoConfiguracoes > 3) {
            opcaoConfiguracoes = 0;
        }
    }

    // CIMA
    if (teclaFoiPressionada("cima")) {
        opcaoConfiguracoes--;

        if (opcaoConfiguracoes < 0) {
            opcaoConfiguracoes = 3;
        }
    }

    // CONFIRMAR
    if (teclaFoiPressionada("confirmar")) {

        if (opcaoConfiguracoes === 0) {
        estadoJogo = "CONTROLES";
        }

        if (opcaoConfiguracoes === 1) {
        console.log("Som selecionado");
        }

        if (opcaoConfiguracoes === 2) {
        console.log("Gráficos selecionado");
        }

        if (opcaoConfiguracoes === 3) {
        console.log("Salvamento selecionado");
        }
    }

}
function atualizarControles() {

    if (estadoJogo !== "CONTROLES") {
        return;
    }

    if (teclaFoiPressionada("voltar")) {
        estadoJogo = "CONFIGURACOES";
        opcaoConfiguracoes = 0;
        return;
    }
}
