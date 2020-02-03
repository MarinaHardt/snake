/* 
Grafiken von: https://www.vecteezy.com/free-vector/fruit + https://www.vecteezy.com/free-vector/cat-do-not-disturb
Hilfe von: Patrik Keufen, Leander Schmidt, Sadie Schmidt, Jan Meininghaus
*/

let start = true;
let grid = { x: 30, y: 20 }; // Canvas ist in einem Grid aufgebaut, um Schlange und Früchte immer auf einer Linie zu haben. Größes des Grids hängt vom Scale ab
let head = { x: floor(grid.x / 2), y: floor(grid.y / 2), rotation: 0 }; // Kopf der Schlange
let tail = [{ x: 0, y: 0 }]; // Schwanz der Schlange
let fruit = {
  x: floor(random(1, grid.x - 1)),
  y: floor(random(1, grid.y - 1)),
  skin: 0
};
let fruitImages; // random Früchte sollen erscheinen

let scale = 30;
let time = 0; // Zeit
let speed = 200; // Geschwindgkeit
let dir = "unten"; // direction / Richtung
let state = 0; // Screenanzeigen
let score = 0; // Punktestand
let level = 1;

let colorLightPink = "#ffddf3";
let colorPink = "#ea63b5";
let colorGreen = "#29cc33";
let colorGold = "#f2ba19";
let colorWhite = "#ffffff";
let colorBlack = "#000000";

function startScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  image(startpng, 0, 0, grid.x * scale, grid.y * scale);

  rectMode(CENTER);
  noStroke();
  fill(colorWhite);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("C A T", (grid.x * scale) / 2, grid.y * scale - 565);
  text("S N A K E", (grid.x * scale) / 2, grid.y * scale - 540);

  textSize(15);
  text("P R E S S   E N T E R", (grid.x * scale) / 2, grid.y * scale - 85);
}

function field() {
  fill(colorLightPink);
  rect(0, 0, grid.x * scale * 2, grid.y * scale * 2);
}

function snakeBody() {
  push();
  translate(head.x * scale, head.y * scale);
  rotate(head.rotation);
  image(cathead, 0, 0, scale * 1.5, scale * 1.5);
  pop();

  fill(colorBlack);
  for (let i = 1; i < tail.length; i++) {
    rect(tail[i].x * scale, tail[i].y * scale, scale, scale);
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
    speed = 150;
    level = 1;
  }
  if (score >= 10 && score < 20) {
    speed = 120;
    level = 2;
  }
  if (score >= 20 && score < 30) {
    speed = 100;
    level = 3;
  }
  if (score >= 30 && score < 40) {
    speed = 75;
    level = 4;
  }
  if (score >= 40 && score < 50) {
    speed = 50;
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

      push();
      translate(head.x * scale, head.y * scale);
      rotate((head.rotation = HALF_PI));
      image(cathead, 0, 0, scale * 1.5, scale * 1.5);
      pop();
    }

    if (dir === "rechts") {
      head.x = head.x + 1;

      push();
      translate(head.x * scale, head.y * scale);
      rotate((head.rotation = PI + HALF_PI));
      image(cathead, 0, 0, scale * 1.5, scale * 1.5);
      pop();
    }

    if (dir === "oben") {
      head.y = head.y - 1;

      push();
      translate(head.x * scale, head.y * scale);
      rotate((head.rotation = PI));
      image(cathead, 0, 0, scale * 1.5, scale * 1.5);
      pop();
    }

    if (dir === "unten") {
      head.y = head.y + 1;

      push();
      translate(head.x * scale, head.y * scale);
      rotate((head.rotation = 0));
      image(cathead, 0, 0, scale * 1.5, scale * 1.5);
      pop();
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
    state = 0;
    score = 0;
    level = 1;
  }

  imageMode(CORNER);
  image(winpng, 0, 0, grid.x * scale, grid.y * scale);

  rectMode(CENTER);
  noStroke();
  fill(colorWhite);
  textSize(15);
  textAlign(LEFT);
  text("OH YES YOU WIN :D", grid.x * scale - 400, grid.y * scale - 315);
  text(
    "PRESS ENTER TO PLAY AGAIN!",
    grid.x * scale - 400,
    grid.y * scale - 295
  );

  fill(colorGold);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(
    "SCORE:" + score + "  " + "LEVEL:" + level,
    (grid.x * scale) / 2,
    grid.y * scale + 25
  );

  tail = [{ x: 0, y: 0 }];
  head.x = floor(grid.x / 2);
  head.y = floor(grid.y / 2);
}

function dieScreen() {
  if (keyIsDown(13)) {
    state = 1;
    score = 0;
    level = 1;
  }
  imageMode(CORNER);
  image(diepng, 0, 0, grid.x * scale, grid.y * scale);

  rectMode(CENTER);
  noStroke();
  fill(colorWhite);
  textSize(15);
  textAlign(LEFT);
  text("OH NO YOU LOST :(", grid.x * scale - 400, grid.y * scale - 315);
  text("PRESS ENTER TO TRY AGAIN!", grid.x * scale - 400, grid.y * scale - 295);

  fill(colorBlack);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(
    "SCORE:" + score + "  " + "LEVEL:" + level,
    (grid.x * scale) / 2,
    grid.y * scale + 25
  );

  tail = [{ x: 0, y: 0 }];
  head.x = floor(grid.x / 2);
  head.y = floor(grid.y / 2);
}

function draw() {
  clear();

  if (start) {
    fruitImages = [fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7];
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
    textSize(14);
    textAlign(CENTER, CENTER);
    text(
      "SCORE:" + score + "  " + "LEVEL:" + level,
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
