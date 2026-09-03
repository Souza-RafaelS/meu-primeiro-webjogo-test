let teclas = {};
let cliqueDoMouse = null;
let confirmarPressionado = false;
let teclasAnterior = {};


// =====================================================
// CONTROLES DO PC
// =====================================================

window.addEventListener("keydown", (e) => {

    teclas[e.key] = true;

    if (e.key === CONFIG_JOGADOR.controles.confirmar) {
        confirmarPressionado = true;
    }
});


window.addEventListener("keyup", (e) => {

    teclas[e.key] = false;

    if (e.key === CONFIG_JOGADOR.controles.confirmar) {
        confirmarPressionado = false;
    }
});


// =====================================================
// VERIFICAR COMANDO
// =====================================================

function comandoPressionado(comando) {

    const tecla = CONFIG_JOGADOR.controles[comando];

    return !!teclas[tecla];
}


// =====================================================
// VERIFICAR SE A TECLA FOI PRESSIONADA AGORA
// =====================================================

function teclaFoiPressionada(comando) {

    const tecla = CONFIG_JOGADOR.controles[comando];

    return !!teclas[tecla] && !teclasAnterior[tecla];
}


// =====================================================
// MOUSE E TOUCH DO CANVAS
// =====================================================

window.addEventListener("mousedown", (e) => {
    capturarClique(e);
});


// Não usamos touchstart global para os botões.
// Os botões touch possuem seu próprio sistema.


function capturarClique(evento) {

    const canvas = document.getElementById("rpg");

    if (!canvas) {
        return;
    }

    const rect = canvas.getBoundingClientRect();

    cliqueDoMouse = {

        x: (evento.clientX - rect.left) *
           (canvas.width / rect.width),

        y: (evento.clientY - rect.top) *
           (canvas.height / rect.height)
    };
}


// =====================================================
// CONTROLES TOUCH
// =====================================================

function configurarBotaoTouch(id, comando) {

    const botao = document.getElementById(id);

    if (!botao) {
        return;
    }


    // ---------------------------------------------
    // PRESSIONAR
    // ---------------------------------------------

    botao.addEventListener("pointerdown", function(event) {

        event.preventDefault();

        const tecla = CONFIG_JOGADOR.controles[comando];

        if (!tecla) {
            return;
        }

        teclas[tecla] = true;

        // Mantém o controle mesmo se o dedo sair
        // ligeiramente do botão.
        if (botao.setPointerCapture) {
            botao.setPointerCapture(event.pointerId);
        }
    });


    // ---------------------------------------------
    // SOLTAR
    // ---------------------------------------------

    function soltar(event) {

        event.preventDefault();

        const tecla = CONFIG_JOGADOR.controles[comando];

        if (!tecla) {
            return;
        }

        teclas[tecla] = false;
    }


    botao.addEventListener("pointerup", soltar);

    botao.addEventListener("pointercancel", soltar);

    botao.addEventListener("lostpointercapture", soltar);
}


// =====================================================
// DIRECIONAIS
// =====================================================

configurarBotaoTouch("btn-cima", "cima");
configurarBotaoTouch("btn-baixo", "baixo");
configurarBotaoTouch("btn-esquerda", "esquerda");
configurarBotaoTouch("btn-direita", "direita");


// =====================================================
// BOTÃO CONFIRMAR
// =====================================================

const btnConfirmar =
    document.getElementById("btn-confirmar");


if (btnConfirmar) {

    btnConfirmar.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            confirmarPressionado = true;

            if (btnConfirmar.setPointerCapture) {
                btnConfirmar.setPointerCapture(
                    event.pointerId
                );
            }
        }
    );


    function soltarConfirmar(event) {

        event.preventDefault();

        confirmarPressionado = false;
    }


    btnConfirmar.addEventListener(
        "pointerup",
        soltarConfirmar
    );

    btnConfirmar.addEventListener(
        "pointercancel",
        soltarConfirmar
    );

    btnConfirmar.addEventListener(
        "lostpointercapture",
        soltarConfirmar
    );
}