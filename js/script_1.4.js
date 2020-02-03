let start = true;
let grid = { x: 30, y: 20 }; // Canvas ist in einem Grid aufgebaut, um Schlange und Früchte immer auf einer Linie zu haben. Größes des Grids hängt vom Scale ab
let head = { x: floor(grid.x / 2), y: floor(grid.y / 2) }; // Kopf der Schlange
let tail = [{ x: 0, y: 0 }]; // Schwanz der Schlange
let fruit = {
  x: floor(random(1, grid.x - 1)),
  y: floor(random(1, grid.y - 1)),
  skin: 0 //
};
let fruitImages; // random Früchte sollen erscheinen

let scale = 30;
let time = 0; // Zeit
let speed = 200; // Geschwindgkeit
let dir = "links"; // direction / Richtung
let state = 0; // Screenanzeigen
let score = 0; // Punktestand
let level = 1;

let colorLightPink = "#ffddf3";
let colorPink = "#ea63b5";
let colorGreen = "#29cc33";
let colorDarkPink = "#c4157f";
let colorGold = "#f2ba19";
let colorWhite = "#ffffff";

function startScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(colorPink);
  rect(0, 0, grid.x * scale * 2, grid.y * scale * 2);

  fill(colorWhite);
  rectMode(CENTER);
  rect((grid.x * scale) / 2, grid.y * scale - 100, 200, 75);

  noStroke();
  fill(colorWhite);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("P R E S S   E N T E R", (grid.x * scale) / 2, grid.y * scale - 165);

  fill(colorPink);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("S T A R T", (grid.x * scale) / 2, grid.y * scale - 100);
}

function field() {
  fill(colorLightPink);
  rect(0, 0, grid.x * scale * 2, grid.y * scale * 2);
}

function snakeBody() {
  noStroke();
  fill(colorDarkPink);
  image(cathead, head.x * scale, head.y * scale, scale * 1.5, scale * 1.5);

  fill(colorPink);
  for (let i = 1; i < tail.length; i++) {
    circle(tail[i].x * scale, tail[i].y * scale, scale / 2);
  }
}

// Richtungen der Schlange durch Pfeiltasten
function keyPressed() {
  if (keyCode === 37 && dir !== "rechts") {
    dir = "links";
  }
  if (keyCode === 39 && dir !== "links") {
    dir = "rechts";
  }
  if (keyCode === 38 && dir !== "unten") {
    dir = "oben";
  }
  if (keyCode === 40 && dir !== "oben") {
    dir = "unten";
  }
}

function gameLevel() {
  if (score < 10) {
    speed = 200;
    level = 1;
  }
  if (score >= 10 && score < 20) {
    speed = 150;
    level = 2;
  }
  if (score >= 20 && score < 30) {
    speed = 100;
    level = 3;
  }
  if (score >= 30 && score < 40) {
    speed = 50;
    level = 4;
  }
  if (score >= 40 && score < 50) {
    speed = 25;
    level = 5;
  }
  if (score === 50) {
    state = 3;
  }
}

function snakeSpeed() {
  // Misst die Zeit, die verstrichen ist, seitdem das Spiel angefangen hat: Die Schlange soll sich in der Differenz zu dieser Zeit in einer bestimmten Geschwindigkeit bewegen
  if (millis() - time > speed) {
    // Schlange soll sich in die Richtung bewegen und nicht nur einen Schritt machen; deshalb direction und nicht xHead = xHead + 1 etc.
    if (dir === "links") {
      head.x = head.x - 1;
    }

    if (dir === "rechts") {
      head.x = head.x + 1;
    }

    if (dir === "oben") {
      head.y = head.y - 1;
    }

    if (dir === "unten") {
      head.y = head.y + 1;
    }

    // beim Bewegen soll das letzte Stück des Schwanzes an die vorletzte Position bewegt werden, etc. bis Position 1 erreicht wird
    for (let j = tail.length - 1; j > 0; j--) {
      tail[j].x = tail[j - 1].x;
      tail[j].y = tail[j - 1].y;
    }
    // Position 1 des Schwanzes wird definiert als Kopf der Schlange und bleibt somit stehen
    tail[0].x = head.x;
    tail[0].y = head.y;

    // Wenn der Kopf der Schlange die Frucht berührt, bekommt der Schwanz ein neues Stück und eine neue Frucht erscheint
    if (fruit.x === head.x && fruit.y === head.y) {
      // das neue Stück soll an der Position erscheinen, in der sich der restliche Schwanz eben befand
      tail.push({ x: -1, y: -1 });
      moreFruit();

      // Punktestand
      score++;
    }
    // die vergangene Zeit wird immer wieder mit der jetzigen Zeit verglichen
    time = millis();
  }
}

function drawFruit() {
  imageMode(CENTER);
  image(
    fruitImages[fruit.skin],
    fruit.x * scale,
    fruit.y * scale,
    scale,
    scale
  );
}

function moreFruit() {
  do {
    fruit.x = floor(random(1, grid.x - 1));
    fruit.y = floor(random(1, grid.y - 1));
    fruit.skin = floor(random(fruitImages.length));
  } while (isFieldClear(fruit.x, fruit.y) === false);
}

// Früchte erscheinen nicht da, wo die Schlange ist
function isFieldClear(x, y) {
  if (head.x === x && head.y === y) {
    return false;
  }
  for (let i in tail) {
    if (tail[i].x === x && tail[i].y === y) {
      return false;
    }
  }
  return true;
}

function die() {
  // Wenn die Schlange die Wände berührt
  if (head.x === 0 || head.x === grid.x || head.y === 0 || head.y === grid.y) {
    state = 2;
  }

  // Wenn die Schlange sich selbst berührt
  for (let i = 1; i < tail.length; i++) {
    if (tail[i].x === head.x && tail[i].y === head.y) {
      state = 2;
    }
  }
}

function winScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(colorGold);
  rect(0, 0, grid.x * scale * 2, grid.y * scale * 2);

  fill(colorWhite);
  rectMode(CENTER);
  rect((grid.x * scale) / 2, grid.y * scale - 100, 200, 75);

  noStroke();
  fill(colorWhite);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(
    "O H  Y E S  Y O U  W I N  :D",
    (grid.x * scale) / 2,
    grid.y * scale - 165
  );

  fill(colorGold);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("A G A I N ?", (grid.x * scale) / 2, grid.y * scale - 100);

  tail = [{ x: 0, y: 0 }];
  head.x = floor(grid.x / 2);
  head.y = floor(grid.y / 2);
  score = 0;
  level = 1;
}

function dieScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(colorGreen);
  rect(0, 0, grid.x * scale * 2, grid.y * scale * 2);

  fill(colorWhite);
  rectMode(CENTER);
  rect((grid.x * scale) / 2, grid.y * scale - 100, 200, 75);

  noStroke();
  fill(colorWhite);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(
    "O H  N O  Y O U  L O S T  :(",
    (grid.x * scale) / 2,
    grid.y * scale - 165
  );

  fill(colorGreen);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("E N T E R", (grid.x * scale) / 2, grid.y * scale - 100);

  tail = [{ x: 0, y: 0 }];
  head.x = floor(grid.x / 2);
  head.y = floor(grid.y / 2);
  //score = 0;
  level = 1;
}

function draw() {
  clear();
  if (start) {
    fruitImages = [fruit1, fruit2, fruit3, fruit4, fruit5, fruit6];
    start = false;
  }
  if (state === 0) {
    startScreen();
  }

  if (state === 1) {
    field();
    snakeBody();
    snakeSpeed();
    gameLevel();
    drawFruit();
    die();

    fill(colorPink);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(
      "S C O R E: " + score + "    " + "L E V E L: " + level,
      (grid.x * scale) / 2,
      grid.y * scale + 25
    );
  }

  if (state === 2) {
    dieScreen();
  }

  if (state === 3) {
    winScreen();
  }
}
