// Variáveis do jogo
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameArea = document.getElementById("gameArea");

let isJumping = false;
let gravity = 0.9;
let jumpHeight = 15;
let obstacleSpeed = 5;
let score = 0;

// Função para pular
function jump() {
    if (isJumping) return;

    isJumping = true;
    let jumpUpInterval = setInterval(() => {
        if (parseInt(player.style.bottom) < 150) {
            clearInterval(jumpUpInterval);
            let fallInterval = setInterval(() => {
                if (parseInt(player.style.bottom) > 0) {
                    player.style.bottom = parseInt(player.style.bottom) - 5 + 'px';
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        } else {
            player.style.bottom = parseInt(player.style.bottom) + 5 + 'px';
        }
    }, 20);
}

// Função para mover o obstáculo
function moveObstacle() {
    let obstaclePosition = parseInt(obstacle.style.right);

    if (obstaclePosition > gameArea.clientWidth) {
        // Reseta o obstáculo
        obstacle.style.right = '-30px';
        score++;
        console.log("Pontos: " + score); // Exibe os pontos no console
    } else {
        obstacle.style.right = obstaclePosition + obstacleSpeed + 'px';
    }

    // Verificar colisão
    if (obstaclePosition > 50 && obstaclePosition < 90 && parseInt(player.style.bottom) < 40) {
        // Colisão detectada
        alert("Game Over! Sua pontuação foi: " + score);
        location.reload(); // Reinicia o jogo
    }
}

// Inicia o movimento do obstáculo a cada intervalo
setInterval(moveObstacle, 20);

// Detecta quando a tecla de espaço é pressionada
document.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
        jump();
    }
});

// Configura o estilo inicial do player e do obstáculo
player.style.bottom = '0px';
obstacle.style.right = '-30px';
