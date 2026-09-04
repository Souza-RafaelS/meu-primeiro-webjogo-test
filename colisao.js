// =====================================================
// TESTAR COLISÃO ENTRE DOIS RETÂNGULOS
// =====================================================

function testarColisao(r1, r2) {

    return (
        r1.x < r2.x + r2.largura &&
        r1.x + r1.larguraTela > r2.x &&
        r1.y < r2.y + r2.altura &&
        r1.y + r1.alturaTela > r2.y
    );
}


// =====================================================
// VERIFICAR COLISÃO DO MOVIMENTO
// =====================================================

function verificarColisaoMovimento(proximoX, proximoY) {

    let bloqueadoX = false;
    let bloqueadoY = false;


    // =================================================
    // VERIFICAR TODOS OS OBSTÁCULOS
    // =================================================

    for (let obs of obstaculos) {


        // =============================================
        // COLISÃO NO EIXO X
        // =============================================

        const jogadorX = {

            ...heroi,

            x: proximoX,
            y: heroi.y
        };


        if (testarColisao(jogadorX, obs)) {

            bloqueadoX = true;
        }


        // =============================================
        // COLISÃO NO EIXO Y
        // =============================================

        const jogadorY = {

            ...heroi,

            x: heroi.x,
            y: proximoY
        };


        if (testarColisao(jogadorY, obs)) {

            bloqueadoY = true;
        }


        // =============================================
        // JÁ BLOQUEOU OS DOIS
        // =============================================

        if (bloqueadoX && bloqueadoY) {

            break;
        }
    }


    return {

        bloqueadoX,
        bloqueadoY
    };
}