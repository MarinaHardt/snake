var gridW = 30; // Canvas ist in einem Grid aufgebaut, um Schlange und Früchte immer auf einer Linie zu haben. Größes des Grids hängt vom Scale ab
var gridH = 20;
var scale = 20;
var xHead = floor(gridW / 2); // Kopf der Schlange
var yHead = floor(gridH / 2);
var Tail = []; // Schwanz der Schlange
var xFruit = floor(random(1, gridW - 1)); // Früchte
var yFruit = floor(random(1, gridH - 1));
var time = 0; // Zeit
var speed = 200; // Geschwindgkeit
var dir = " "; // direction / Richtung
var state = 0; // Screenanzeigen
var score = 0; // Punktestand
var level = 1;
var Farbe0 = "#ffddf3"; // Hintergrund hellgrün
var Farbe1 = "#ea63b5"; // Schlange pink
var Farbe2 = "#29cc33"; // Frucht grün
var Farbe3 = "#c4157f"; // Schlange Kopf
var Farbe4 = "#f2ba19"; // Gewinnerfarbe

function setup() {
  createCanvas(gridW * scale, gridH * scale + 100);
  frameRate(60);
}

function startScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(Farbe1);
  rect(0, 0, gridW * scale * 2, gridH * scale * 2);

  fill(Farbe0);
  rectMode(CENTER);
  rect((gridW * scale) / 2, gridH * scale - 100, 200, 75);

  noStroke();
  fill(Farbe0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("P R E S S   E N T E R", (gridW * scale) / 2, gridH * scale - 165);

  fill(Farbe1);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("S T A R T", (gridW * scale) / 2, gridH * scale - 100);
}

function field() {
  fill(Farbe0);
  rect(0, 0, gridW * scale * 2, gridH * scale * 2);
}

function snakeBody() {
  noStroke();
  fill(Farbe3);
  circle(xHead * scale, yHead * scale, scale / 2);

  fill(Farbe1);
  for (var i = 1; i < Tail.length; i++) {
    circle(Tail[i][0] * scale, Tail[i][1] * scale, scale / 2);
  }
}

// Richtungen der Schlange durch Pfeiltasten
function keyPressed() {
  if (keyCode === 37) {
    dir = "links";
  }
  if (keyCode === 39) {
    dir = "rechts";
  }
  if (keyCode === 38) {
    dir = "oben";
  }
  if (keyCode === 40) {
    dir = "unten";
  }
}

function gameLevel() {
  if (score <= 10) {
    speed = 200;
    level = 1;
  }
  if (score > 10 && score <= 20) {
    speed = 150;
    level = 2;
  }
  if (score > 20 && score <= 30) {
    speed = 100;
    level = 3;
  }
  if (score > 30 && score <= 40) {
    speed = 50;
    level = 4;
  }
  if (score > 40 && score < 50) {
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
      xHead = xHead - 1;
    }

    if (dir === "rechts") {
      xHead = xHead + 1;
    }

    if (dir === "oben") {
      yHead = yHead - 1;
    }

    if (dir === "unten") {
      yHead = yHead + 1;
    }

    // beim Bewegen soll das letzte Stück des Schwanzes an die vorletzte Position bewegt werden, etc. bis Position 1 erreicht wird
    for (var j = Tail.length - 1; j > 0; j--) {
      Tail[j][0] = Tail[j - 1][0];
      Tail[j][1] = Tail[j - 1][1];
    }
    // Position 1 des Schwanzes wird definiert als Kopf der Schlange und bleibt somit stehen
    Tail[0][0] = xHead;
    Tail[0][1] = yHead;

    // Wenn der Kopf der Schlange die Frucht berührt, bekommt der Schwanz ein neues Stück und eine neue Frucht erscheint
    if (xFruit === xHead && yFruit === yHead) {
      // das neue Stück soll an der Position erscheinen, in der sich der restliche Schwanz eben befand
      Tail[length] = [-1, -1];
      moreFruit();

      // Punktestand
      score++;
    }
    // die vergangene Zeit wird immer wieder mit der jetzigen Zeit verglichen
    time = millis();
  }
}

function Fruit() {
  noStroke();
  fill(Farbe2);
  circle(xFruit * scale, yFruit * scale, scale / 2);
}

function moreFruit() {
  b = isFieldClear();
  xFruit = floor(random(1, gridW - 1));
  yFruit = floor(random(1, gridH - 1));
}

function isFieldClear(x, y) {
  if (xHead === x && yHead === y) return true;
  for (var i in xBody) return false;
}

function die() {
  // Wenn die Schlange die Wände berührt
  if (xHead === 0 || xHead === gridW || yHead === 0 || yHead === gridH) {
    state = 2;
  }

  // Wenn die Schlange sich selbst berührt
  for (var i = 1; i < xTail.length; i++) {
    if (xTail[i] === xHead && yTail[i] === yHead) {
      state = 2;
    }
  }
}

function winScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(Farbe4);
  rect(0, 0, gridW * scale * 2, gridH * scale * 2);

  fill(Farbe0);
  rectMode(CENTER);
  rect((gridW * scale) / 2, gridH * scale - 100, 200, 75);

  noStroke();
  fill(Farbe0);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(
    "O H  Y E S  Y O U  W I N  :D",
    (gridW * scale) / 2,
    gridH * scale - 165
  );

  fill(Farbe4);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("A G A I N ?", (gridW * scale) / 2, gridH * scale - 100);

  xTail.splice(0, xTail.length);
  xHead = floor(gridW / 2);
  yHead = floor(gridH / 2);
  score = 0;
}

function dieScreen() {
  if (keyIsDown(13)) {
    state = 1;
  }

  fill(Farbe2);
  rect(0, 0, gridW * scale * 2, gridH * scale * 2);

  fill(Farbe0);
  rectMode(CENTER);
  rect((gridW * scale) / 2, gridH * scale - 100, 200, 75);

  noStroke();
  fill(Farbe0);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(
    "O H  N O  Y O U  L O S T  :(",
    (gridW * scale) / 2,
    gridH * scale - 165
  );
  /*  text(
    "L A S T  S C O R E: " + lastScore,
    (gridW * scale) / 2,
    gridH * scale - 20
  );
  */

  fill(Farbe2);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("E N T E R", (gridW * scale) / 2, gridH * scale - 100);

  xTail.splice(0, xTail.length);
  xHead = floor(gridW / 2);
  yHead = floor(gridH / 2);
  score = 0;
}

function draw() {
  clear();
  if (state === 0) {
    startScreen();
  }

  if (state === 1) {
    field();
    snakeBody();
    snakeSpeed();
    gameLevel();
    Fruit();
    die();

    fill(Farbe1);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(
      "S C O R E: " + score + "    " + "L E V E L: " + level,
      (gridW * scale) / 2,
      gridH * scale + 25
    );
  }

  if (state === 2) {
    dieScreen();
  }

  if (state === 3) {
    winScreen();
  }
}
