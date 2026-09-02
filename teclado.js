let teclas = {};

// Comandos do PC
window.addEventListener("keydown", (e) => teclas[e.key] = true);
window.addEventListener("keyup", (e) => teclas[e.key] = false);

// Função para ativar os comandos de toque do celular
function configurarTouch(idBotao, chaveTeclada) {
    const botao = document.getElementById(idBotao);
    if (!botao) return;

    // Quando o dedo encosta
    botao.addEventListener("touchstart", (e) => {
        e.preventDefault(); 
        teclas[chaveTeclada] = true;
    });
    
    // Quando o dedo sai de cima do botão
    botao.addEventListener("touchend", (e) => {
        e.preventDefault();
        teclas[chaveTeclada] = false;
    });

    // Garante que se o dedo sair arrastando para fora do botão, ele pare de andar
    botao.addEventListener("touchcancel", (e) => {
        e.preventDefault();
        teclas[chaveTeclada] = false;
    });
}

// Vincula os botões da tela com a lógica de movimento após o HTML carregar
window.addEventListener("DOMContentLoaded", () => {
    configurarTouch("btn-cima", "ArrowUp");
    configurarTouch("btn-baixo", "ArrowDown");
    configurarTouch("btn-esquerda", "ArrowLeft");
    configurarTouch("btn-direita", "ArrowRight");
});
