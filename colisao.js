function testarColisao(r1, r2) {
    return r1.x < r2.x + r2.largura &&
           r1.x + r1.larguraTela > r2.x &&
           r1.y < r2.y + r2.altura &&
           r1.y + r1.alturaTela > r2.y;
}
function verificarColisaoMovimento(proximoX, proximoY) {
    let bloqueadoX = false;
    let bloqueadoY = false;

    for (let obs of obstaculos) {
        if (testarColisao({ ...heroi, x: proximoX }, obs)) {
            bloqueadoX = true;
        }

        if (testarColisao({ ...heroi, y: proximoY }, obs)) {
            bloqueadoY = true;
        }
    }

    return {
        bloqueadoX,
        bloqueadoY
    };
}
