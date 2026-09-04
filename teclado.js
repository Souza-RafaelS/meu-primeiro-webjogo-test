let teclas = {};
let cliqueDoMouse = null;
let confirmarPressionado = false;
let teclasAnterior = {};


// =====================================================
// CONTROLES DO PC
// =====================================================

window.addEventListener("keydown", (e) => {

    teclas[e.key] = true;

    // 🔵 X / Espaço = confirmar nos menus
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
// VERIFICAR SE FOI PRESSIONADO AGORA
// =====================================================

function teclaFoiPressionada(comando) {

    const tecla = CONFIG_JOGADOR.controles[comando];

    return !!teclas[tecla] && !teclasAnterior[tecla];
}


// =====================================================
// MOUSE
// =====================================================

window.addEventListener("mousedown", (e) => {

    capturarClique(e);

});


function capturarClique(evento) {

    const canvas = document.getElementById("rpg");

    if (!canvas) {
        return;
    }

    const rect = canvas.getBoundingClientRect();

    cliqueDoMouse = {

        x:
            (evento.clientX - rect.left) *
            (canvas.width / rect.width),

        y:
            (evento.clientY - rect.top) *
            (canvas.height / rect.height)
    };
}


// =====================================================
// BOTÕES TOUCH
// =====================================================

function configurarBotaoTouch(id, comandoJogo, comandoMenu = null) {

    const botao = document.getElementById(id);

    if (!botao) {
        return;
    }


    // -------------------------------------------------
    // PRESSIONAR
    // -------------------------------------------------

    botao.addEventListener("pointerdown", function(event) {

        event.preventDefault();

        let comando;


        // =============================================
        // ESCOLHER O COMANDO PELO ESTADO DO JOGO
        // =============================================

        if (estadoJogo === "JOGO") {

            comando = comandoJogo;

        } else {

            comando = comandoMenu;
        }


        if (!comando) {
            return;
        }


        const tecla =
            CONFIG_JOGADOR.controles[comando];


        if (!tecla) {
            return;
        }


        // =============================================
        // CONFIRMAR
        // =============================================

        if (comando === "confirmar") {

            confirmarPressionado = true;

        }

        // =============================================
        // QUALQUER OUTRO COMANDO
        // =============================================

        else {

            teclas[tecla] = true;
        }


        // =============================================
        // CAPTURAR O DEDO
        // =============================================

        if (botao.setPointerCapture) {

            botao.setPointerCapture(
                event.pointerId
            );
        }

    });


    // -------------------------------------------------
    // SOLTAR
    // -------------------------------------------------

    function soltar(event) {

        event.preventDefault();

        let comando;


        if (estadoJogo === "JOGO") {

            comando = comandoJogo;

        } else {

            comando = comandoMenu;
        }


        if (!comando) {
            return;
        }


        const tecla =
            CONFIG_JOGADOR.controles[comando];


        if (!tecla) {
            return;
        }


        if (comando === "confirmar") {

            confirmarPressionado = false;

        }

        else {

            teclas[tecla] = false;
        }
    }


    botao.addEventListener(
        "pointerup",
        soltar
    );


    botao.addEventListener(
        "pointercancel",
        soltar
    );


    botao.addEventListener(
        "lostpointercapture",
        soltar
    );
}


// =====================================================
// MAPEAMENTO DOS BOTÕES
// =====================================================


// 🔵 X
// JOGO      → correr
// MENUS     → confirmar

configurarBotaoTouch(
    "btn-xis",
    "correr",
    "confirmar"
);


// 🔴 QUADRADO
// JOGO      → atacar

configurarBotaoTouch(
    "btn-quadrado",
    "atacar"
);


// 🟡 TRIÂNGULO
// JOGO      → interagir

configurarBotaoTouch(
    "btn-triangulo",
    "interagir"
);


// 🟢 BOLA
// JOGO      → inventário
// MENUS     → voltar

configurarBotaoTouch(
    "btn-bola",
    "inventario",
    "voltar"
);


// =====================================================
// JOYSTICK
// =====================================================

const joystickBase =
    document.getElementById("joystick-base");

const joystickPino =
    document.getElementById("joystick-pino");


let joystickAtivo = false;
let joystickPointerId = null;
let direcaoJoystick = null;


const raioJoystick = 45;


const DIRECOES = {

    cima: "ArrowUp",
    baixo: "ArrowDown",
    esquerda: "ArrowLeft",
    direita: "ArrowRight"
};


// =====================================================
// INICIAR JOYSTICK
// =====================================================

if (joystickBase) {

    joystickBase.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            if (joystickAtivo) {
                return;
            }


            joystickAtivo = true;

            joystickPointerId =
                event.pointerId;


            if (joystickBase.setPointerCapture) {

                joystickBase.setPointerCapture(
                    event.pointerId
                );
            }


            atualizarJoystick(
                event.clientX,
                event.clientY
            );
        }
    );


    // =================================================
    // MOVIMENTO
    // =================================================

    joystickBase.addEventListener(
        "pointermove",
        function(event) {

            if (!joystickAtivo) {
                return;
            }


            if (
                event.pointerId !==
                joystickPointerId
            ) {
                return;
            }


            event.preventDefault();


            atualizarJoystick(
                event.clientX,
                event.clientY
            );
        }
    );


    // =================================================
    // PARAR
    // =================================================

    function pararJoystick(event) {

        if (
            event &&
            event.pointerId !==
            joystickPointerId
        ) {
            return;
        }


        if (direcaoJoystick) {

            teclas[
                DIRECOES[direcaoJoystick]
            ] = false;
        }


        direcaoJoystick = null;

        joystickAtivo = false;

        joystickPointerId = null;


        if (joystickPino) {

            joystickPino.style.transform =
                "translate(0px, 0px)";
        }
    }


    joystickBase.addEventListener(
        "pointerup",
        pararJoystick
    );


    joystickBase.addEventListener(
        "pointercancel",
        pararJoystick
    );


    joystickBase.addEventListener(
        "lostpointercapture",
        pararJoystick
    );
}


// =====================================================
// ATUALIZAR JOYSTICK
// =====================================================

function atualizarJoystick(x, y) {

    if (!joystickBase) {
        return;
    }


    const rect =
        joystickBase.getBoundingClientRect();


    const centroX =
        rect.left +
        rect.width / 2;


    const centroY =
        rect.top +
        rect.height / 2;


    let dx = x - centroX;
    let dy = y - centroY;


    const distancia =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    // =============================================
    // LIMITAR O PINO
    // =============================================

    if (distancia > raioJoystick) {

        dx =
            (dx / distancia) *
            raioJoystick;

        dy =
            (dy / distancia) *
            raioJoystick;
    }


    if (joystickPino) {

        joystickPino.style.transform =
            `translate(${dx}px, ${dy}px)`;
    }


    // =============================================
    // DETERMINAR DIREÇÃO
    // =============================================

    let novaDirecao = null;


    // Zona morta
    if (distancia > 15) {

        if (
            Math.abs(dx) >
            Math.abs(dy)
        ) {

            novaDirecao =
                dx > 0
                    ? "direita"
                    : "esquerda";

        } else {

            novaDirecao =
                dy > 0
                    ? "baixo"
                    : "cima";
        }
    }


    // =============================================
    // MUDOU DE DIREÇÃO
    // =============================================

    if (
        novaDirecao !==
        direcaoJoystick
    ) {


        // Liberar direção anterior

        if (direcaoJoystick) {

            teclas[
                DIRECOES[direcaoJoystick]
            ] = false;
        }


        direcaoJoystick =
            novaDirecao;


        // Ativar nova direção

        if (direcaoJoystick) {

            teclas[
                DIRECOES[direcaoJoystick]
            ] = true;
        }
    }
}


// =====================================================
// SEGURANÇA
// =====================================================

window.addEventListener("blur", function() {

    teclas = {};

    confirmarPressionado = false;

    teclasAnterior = {};

    joystickAtivo = false;

    joystickPointerId = null;

    direcaoJoystick = null;


    if (joystickPino) {

        joystickPino.style.transform =
            "translate(0px, 0px)";
    }
});