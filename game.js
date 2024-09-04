const canvas = document.getElementById("gameCanvas");
const Score1 = document.getElementById("score1");
const Score2 = document.getElementById("score2");
const ctx = canvas.getContext("2d");
// Paddle dimensionsconst
paddleWidth = 10;
const paddleHeight = 100;
// Ball dimensions
const ballSize = 10;
// Initial positions
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2.5;
let score1 = 0;
let score2 = 0;

// Controls
let upPressed1 = false;
let downPressed1 = false;
let upPressed2 = false;
let downPressed2 = false;
// Paddle movement speed
const paddleSpeed = 4;
// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.key === "w") upPressed1 = true;
  if (e.key === "s") downPressed1 = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "w") upPressed1 = false;
  if (e.key === "s") downPressed1 = false;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed2 = true;
  if (e.key === "ArrowDown") downPressed2 = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed2 = false;
  if (e.key === "ArrowDown") downPressed2 = false;
});
// Game loop
function update() {
  // Update paddle positions
  if (upPressed1 && paddle1Y > 0) paddle1Y -= paddleSpeed;
  if (downPressed1 && paddle1Y < canvas.height - paddleHeight)
    paddle1Y += paddleSpeed;

  if (upPressed2 && paddle2Y > 0) paddle2Y -= paddleSpeed;
  if (downPressed2 && paddle2Y < canvas.height - paddleHeight)
    paddle2Y += paddleSpeed;
  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // Ball collision with top and bottom
  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY = -ballSpeedY;
  // Ball collision with paddles
  if (
    (ballX <= paddleWidth &&
      ballY >= paddle1Y &&
      ballY <= paddle1Y + paddleHeight) ||
    (ballX >= canvas.width - paddleWidth - ballSize &&
      ballY >= paddle2Y &&
      ballY <= paddle2Y + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }
  // Ball out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    if (ballX < 0) {
      score1 += 1;
      Score1.innerHTML = score1;
    } else if (ballX > canvas.width) {
      score2 += 1;
      Score2.innerHTML = score2;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();
}
// Update the game at 60 frames per second
setInterval(update, 1000 / 60);
