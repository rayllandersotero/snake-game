const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;
const snake = [{ x: 8 * box, y: 8 * box }];
const food = {
  x: parseInt(Math.random() * 15 + 1) * box,
  y: parseInt(Math.random() * 15 + 1) * box,
};

let direction = "right";

function setBackground() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function setSnake() {
  for (const iterator of snake) {
    context.fillStyle = "green";
    context.fillRect(iterator.x, iterator.y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function start() {
  if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert("Game Over");
    }
  }

  setBackground();
  setSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food.x = parseInt(Math.random() * 15 + 1) * box;
    food.y = parseInt(Math.random() * 15 + 1) * box;
  }

  const snakeHead = { x: snakeX, y: snakeY };

  snake.unshift(snakeHead);
}

function changeDirection(event) {
  const { keyCode } = event;

  if (keyCode === 37 && direction !== "right") direction = "left";
  if (keyCode === 38 && direction !== "down") direction = "up";
  if (keyCode === 39 && direction !== "left") direction = "right";
  if (keyCode === 40 && direction !== "up") direction = "down";
}

document.addEventListener("keydown", changeDirection);
const game = setInterval(start, 100);
