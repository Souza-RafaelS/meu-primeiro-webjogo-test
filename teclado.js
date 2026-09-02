let teclas = {};
let cliqueDoMouse = null;

// Comandos do PC
window.addEventListener("keydown", (e) => teclas[e.key] = true);
window.addEventListener("keyup", (e) => teclas[e.key] = false);

// Captura cliques no PC e Toques no Celular para os menus
window.addEventListener("mousedown", (e) => capturarClique(e));
window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) capturarClique(e.touches[0]);
});

function capturarClique(evento) {
    const canvas = document.getElementById("rpg");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    cliqueDoMouse = {
        x: (evento.clientX - rect.left) * (canvas.width / rect.width),
        y: (evento.clientY - rect.top) * (canvas.height / rect.height)
    };
}

// Função para ativar os comandos de toque direcionais do celular
function configurarTouch(idBotao, chaveTeclada) {
    const botao = document.getElementById(idBotao);
    if (!botao) return;

    botao.addEventListener("touchstart", (e) => {
        e.preventDefault(); 
        teclas[chaveTeclada] = true;
    });
    
    botao.addEventListener("touchend", (e) => {
        e.preventDefault();
        teclas[chaveTeclada] = false;
    });

    botao.addEventListener("touchcancel", (e) => {
        e.preventDefault();
        teclas[chaveTeclada] = false;
    });
}

// Vincula os botões da tela após o HTML carregar por completo
window.addEventListener("DOMContentLoaded", () => {
    configurarTouch("btn-cima", "ArrowUp");
    configurarTouch("btn-baixo", "ArrowDown");
    configurarTouch("btn-esquerda", "ArrowLeft");
    configurarTouch("btn-direita", "ArrowRight");
});
