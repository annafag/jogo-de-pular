const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");

let isJumping = false;
let gravity = 0.9;
let jumpHeight = 15;
let obstacleSpeed = 5;
let score = 0;
let jumpHeightCurrent = 0;
let obstaclePosition = 0;
let gameInterval;
let obstacleInterval;

function jump() {
    if (isJumping) return;

    isJumping = true;
    jumpHeightCurrent = 0;
    let jumpUpInterval = setInterval(() => {
        if (jumpHeightCurrent < 150) {
            player.style.bottom = parseInt(player.style.bottom) + 5 + 'px';
            jumpHeightCurrent += 5;
        } else {
            clearInterval(jumpUpInterval);
            let fallInterval = setInterval(() => {
                if (parseInt(player.style.bottom) > 0) {
                    player.style.bottom = parseInt(player.style.bottom) - 5 + 'px';
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

function moveObstacle() {
    obstaclePosition = parseInt(obstacle.style.right);

    if (obstaclePosition > gameArea.clientWidth) {
        
        obstacle.style.right = '-30px';
        score++;
        scoreElement.textContent = score;
    } else {
        obstacle.style.right = obstaclePosition + obstacleSpeed + 'px';
    }

    if (obstaclePosition > 50 && obstaclePosition < 90 && parseInt(player.style.bottom) < 40) {
        // Colisão detectada
        clearInterval(obstacleInterval);
        alert("Game Over! Sua pontuação foi: " + score);
        location.reload(); // Reinicia o jogo
    }
}

function increaseDifficulty() {
    if (score % 5 === 0) {
        obstacleSpeed += 1;  // Aumenta a velocidade a cada 5 pontos
    }
}

obstacleInterval = setInterval(moveObstacle, 20);

gameInterval = setInterval(increaseDifficulty, 1000);

document.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
        jump();
    }
});

player.style.bottom = '0px';
obstacle.style.right = '-30px';
