
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");

let isJumping = false;
let gravity = 0.8;
let jumpHeight = 150;
let jumpSpeed = 20;    
let obstacleSpeed = 5; 
let score = 0;

function jump() {
    if (isJumping) return;

    isJumping = true;
    let jumpUpInterval = setInterval(() => {
        let playerBottom = parseInt(player.style.bottom);
        if (playerBottom < jumpHeight) {
            player.style.bottom = playerBottom + 5 + 'px';
        } else {
            clearInterval(jumpUpInterval);
            let fallInterval = setInterval(() => {
                if (parseInt(player.style.bottom) > 0) {
                    player.style.bottom = parseInt(player.style.bottom) - 5 + 'px';
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, jumpSpeed);
        }
    }, jumpSpeed);
}
function moveObstacle() {
    let obstaclePosition = parseInt(obstacle.style.right);

    if (obstaclePosition > gameArea.clientWidth) {
      
        obstacle.style.right = '-30px';
        score++;
        scoreElement.textContent = score;
    } else {
        obstacle.style.right = obstaclePosition + obstacleSpeed + 'px';
    }

    if (obstaclePosition > 50 && obstaclePosition < 90 && parseInt(player.style.bottom) < 40) {
        // Colisão detectada
        alert("Game Over! Sua pontuação foi: " + score);
        location.reload(); // Reinicia o jogo
    }
}

function increaseDifficulty() {
    if (score % 5 === 0) {
        obstacleSpeed += 1;  // Aumenta a velocidade a cada 5 pontos
    }
}

function startGame() {
    player.style.bottom = '0px'; // Coloca o player de volta ao chão
    obstacle.style.right = '-30px'; // Coloca o obstáculo fora da tela
    score = 0;
    scoreElement.textContent = score;
    obstacleSpeed = 5;
    
    setInterval(moveObstacle, 20); // Chama a função de movimentação
    setInterval(increaseDifficulty, 1000); // Aumenta a dificuldade
}

document.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
        jump();
    }
});

startGame();
