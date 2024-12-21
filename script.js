const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const gameArea = document.getElementById("gameArea");

let playerSpeed = 10;

// Function to move player
document.addEventListener("keydown", (event) => {
  const playerRect = player.getBoundingClientRect();
  const gameAreaRect = gameArea.getBoundingClientRect();

  if (event.key === "ArrowUp" && playerRect.top > gameAreaRect.top) {
    player.style.top = `${player.offsetTop - playerSpeed}px`;
  }
  if (event.key === "ArrowDown" && playerRect.bottom < gameAreaRect.bottom) {
    player.style.top = `${player.offsetTop + playerSpeed}px`;
  }
  if (event.key === "ArrowLeft" && playerRect.left > gameAreaRect.left) {
    player.style.left = `${player.offsetLeft - playerSpeed}px`;
  }
  if (event.key === "ArrowRight" && playerRect.right < gameAreaRect.right) {
    player.style.left = `${player.offsetLeft + playerSpeed}px`;
  }

  checkCollision();
});

// Function to check collision
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  if (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  ) {
    alert("Game Over! You collided with the enemy!");
    resetGame();
  }
}

// Reset game
function resetGame() {
  player.style.top = "275px";
  player.style.left = "375px";
}
