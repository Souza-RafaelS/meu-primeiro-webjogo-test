function atualizarCamera() {
    camera.x = heroi.x + heroi.larguraTela / 2 - canvas.width / 2;
    camera.y = heroi.y + heroi.alturaTela / 2 - canvas.height / 2;

    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;

    if (camera.x > larguraMundo - canvas.width) {
        camera.x = larguraMundo - canvas.width;
    }

    if (camera.y > alturaMundo - canvas.height) {
        camera.y = alturaMundo - canvas.height;
    }
}
