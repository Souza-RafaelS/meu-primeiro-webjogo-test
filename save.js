// =====================================================
// SISTEMA DE SAVE
// =====================================================

const CHAVE_SAVE = "meuRPG_save";


// =====================================================
// VERIFICAR SE EXISTE SAVE
// =====================================================

function existeSave() {
    return localStorage.getItem(CHAVE_SAVE) !== null;
}


// =====================================================
// SALVAR JOGO
// =====================================================

function salvarJogo() {

    const dadosSave = {
        versao: 1,

        faseAtual: faseAtual,

        jogador: {
            x: heroi.x,
            y: heroi.y,

            vida: heroi.vida ?? 100,
            mana: heroi.mana ?? 100,
            nivel: heroi.nivel ?? 1,
            experiencia: heroi.experiencia ?? 0,
            ouro: heroi.ouro ?? 0
        },

        dataSave: new Date().toISOString()
    };

    try {

        localStorage.setItem(
            CHAVE_SAVE,
            JSON.stringify(dadosSave)
        );

        console.log("Jogo salvo!");

        return true;

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        return false;
    }
}


// =====================================================
// CARREGAR JOGO
// =====================================================

function carregarJogo() {

    try {

        const save = localStorage.getItem(CHAVE_SAVE);

        if (!save) {
            console.log("Nenhum save encontrado.");
            return false;
        }

        const dados = JSON.parse(save);


        // ---------------------------------------------
        // VALIDAR SAVE
        // ---------------------------------------------

        if (
            typeof dados.faseAtual !== "number" ||
            !dados.jogador
        ) {
            console.error("Save inválido.");
            return false;
        }


        // ---------------------------------------------
        // FASE
        // ---------------------------------------------

        faseAtual = dados.faseAtual;


        // ---------------------------------------------
        // RECONSTRUIR MAPA
        // ---------------------------------------------

        construirMapaDesdeTexto(faseAtual);


        // ---------------------------------------------
        // POSIÇÃO DO JOGADOR
        // ---------------------------------------------

        heroi.x = dados.jogador.x;
        heroi.y = dados.jogador.y;


        // ---------------------------------------------
        // STATUS
        // ---------------------------------------------

        heroi.vida = dados.jogador.vida ?? 100;
        heroi.mana = dados.jogador.mana ?? 100;
        heroi.nivel = dados.jogador.nivel ?? 1;
        heroi.experiencia = dados.jogador.experiencia ?? 0;
        heroi.ouro = dados.jogador.ouro ?? 0;


        // ---------------------------------------------
        // RESET DA ANIMAÇÃO
        // ---------------------------------------------

        heroi.frameX = 0;
        heroi.frameY = 0;
        heroi.contadorFrames = 0;
        heroi.andando = false;


        // ---------------------------------------------
        // ATUALIZAR CÂMERA
        // ---------------------------------------------

        atualizarCamera();


        console.log("Jogo carregado!");

        return true;

    } catch (erro) {

        console.error("Erro ao carregar o save:", erro);

        return false;
    }
}

/**
 * Apaga o save.
 */
function apagarSave() {

    localStorage.removeItem(CHAVE_SAVE);

    console.log("Save apagado.");
}


/**
 * Retorna os dados do save sem carregar o jogo.
 *
 * Útil para mostrar informações no menu.
 */
function obterDadosSave() {

    try {

        const save = localStorage.getItem(CHAVE_SAVE);

        if (!save) {
            return null;
        }

        return JSON.parse(save);

    } catch (erro) {

        console.error("Save inválido:", erro);

        return null;
    }
}
