var snakeX = 4;
var snakeY = 4;
var direction = 0;
var boxSize = 20;
var movementTimer = 0;
var bodyX = [2];
var bodyY = [2];
var foodX = 6;
var foodY = 7;
var w = 13;
var h = 13;
var gridX = 0;
var gridY = 0;

var screen = 0;
var score = 0;

function setup() {
  createCanvas(500, 500);
  frameRate(30);
}

// Snake movement
function snakeMovement() {
  if (keyIsDown(39) && snakeX + 1 !== bodyX[0]) {
    direction = 1; // snakeX = snakeX + 1;
  }

  if (keyIsDown(38) && snakeY - 1 !== bodyY[0]) {
    direction = 2; //snakeY = snakeY - 1;
  }

  if (keyIsDown(40) && snakeY + 1 !== bodyY[0]) {
    direction = 3; //snakeY = snakeY + 1;
  }

  if (keyIsDown(37) && snakeX - 1 !== bodyX[0]) {
    direction = 4; //snakeX = snakeX - 1;
  }

  // Speed der Schlange
  if (millis() - movementTimer > 400) {
    //snake verliert durch Kontackt mit Wand
    if (snakeX > w || snakeX < gridX || snakeY > h || snakeY < gridY) {
      loose();
    }

    // snake verliert durch Kontakt mit eigenem Körper
    for (var a = 0; a < bodyX.length; a++) {
      if (bodyX[a] === snakeX && bodyY[a] === snakeY) {
        loose();
      }
    }

    // Body
    for (var i = bodyX.length - 1; i > 0; i--) {
      bodyX[i] = bodyX[i - 1];
      bodyY[i] = bodyY[i - 1];
    }

    bodyX[0] = snakeX;
    bodyY[0] = snakeY;

    //Direction from Keys
    if (direction === 0) {
      m = 0;
    }

    if (direction === 1) {
      snakeX = snakeX + 1;
    }

    if (direction === 2) {
      snakeY = snakeY - 1;
    }

    if (direction === 3) {
      snakeY = snakeY + 1;
    }

    if (direction === 4) {
      snakeX = snakeX - 1;
    }

    //eat Food
    if (foodX === snakeX && foodY === snakeY) {
      bodyX.push(-1);
      bodyY.push(-1);
      foodAppers();

      //Punkte
      score = score + 1;
    }

    movementTimer = millis();
  }
}

//food
function drawFood() {
  fill(255, 0, 0);
  rect(foodX * boxSize, foodY * boxSize, boxSize, boxSize);
}

function foodAppers() {
  foodX = floor(random(w));
  foodY = floor(random(h));
}

// snake stribt
function loose() {
  fill(255, 0, 255);
  rect(0, 0, 600, 600);

  bodyX.splice(0, bodyX.length, bodyY.length);
  snakeX = 4;
  snakeY = 4;
  score = 0;
}

function draw() {
  clear();
  if (screen === 0) {
    //Startscreen
    rect(0, 0, 600, 600);
    textSize(30);
    fill(random(255), random(100), random(255));
    text("PSYSNAKE", 210, 200);
    text("press mouse to start", 160, 300);
    fill(24, 23, 28);

    if (mouseIsPressed) {
      screen = 1;
    }
  } else if (screen === 1) {
    background("#cfcbd4");

    //Punkte
    fill(255, 255, 255);
    textSize(30);
    text("Punkte:", 200, 650);
    textSize(50);
    text(score, 320, 655);

    //Snake
    for (var i = 0; i < bodyX.length; i++) {
      fill(0, 255, 255);
      rect(snakeX * boxSize, snakeY * boxSize, boxSize, boxSize);
      rect(bodyX[i] * boxSize, bodyY[i] * boxSize, boxSize, boxSize);
    }

    snakeMovement();
    drawFood();
  }
}
