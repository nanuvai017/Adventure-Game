const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const restartButton = document.getElementById("restartButton");

// Game settings
const boxSize = 20;
const rows = canvas.height / boxSize;
const columns = canvas.width / boxSize;

let snake = [{ x: 5 * boxSize, y: 5 * boxSize }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameSpeed = 150;

// Display high score
highScoreElement.textContent = highScore;

// Game loop
let game = setInterval(updateGame, gameSpeed);

function updateGame() {
  moveSnake();
  if (checkCollision()) return endGame();
  clearCanvas();
  drawFood();
  drawSnake();
  checkFood();
  scoreElement.textContent = score;
}

// Clear canvas
function clearCanvas() {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;

  snake.unshift(head);
  snake.pop();
}

// Draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * columns) * boxSize;
  const y = Math.floor(Math.random() * rows) * boxSize;
  return { x, y };
}

// Check food collision
function checkFood() {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    score++;
    snake.push({}); // Grow the snake
    food = generateFood();

    // Increase speed every 5 points
    if (score % 5 === 0) {
      gameSpeed = Math.max(50, gameSpeed - 10); // Limit speed
      clearInterval(game);
      game = setInterval(updateGame, gameSpeed);
    }

    // Update high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
      highScoreElement.textContent = highScore;
    }
  }
}

// Check collision
function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    return true;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// End game
function endGame() {
  clearInterval(game);
  alert(`Game Over! Your score: ${score}`);
  restartButton.style.display = "block";
}

// Restart game
function restartGame() {
  snake = [{ x: 5 * boxSize, y: 5 * boxSize }];
  direction = "RIGHT";
  food = generateFood();
  score = 0;
  gameSpeed = 150;
  restartButton.style.display = "none";
  game = setInterval(updateGame, gameSpeed);
}

// Listen for keyboard input
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});
    
