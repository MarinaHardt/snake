var gridW = 30; // Canvas ist in einem Grid aufgebaut, um Schlange und Früchte immer auf einer Linie zu haben. Größes des Grids hängt vom Scale ab
var gridH = 20;
var scale = 20;
var xHead = floor(gridW / 2); // Kopf der Schlange
var yHead = floor(gridH / 2);
var xTail = []; // Schwanz der Schlange
var yTail = [];
var xFruit = floor(random(1, gridW - 1)); // Früchte
var yFruit = floor(random(1, gridH - 1));
var time = 0; // --------- ??? -------
var speed = 200;
var direction = " "; // Schlange soll sich in die Richtung bewegen und nicht nur einen Schritt machen; deshalb direction und nicht xHead = xHead + 1 etc.
var state = 0; // Screenanzeigen
var Farbe0 = "#ffedf8"; // Hintergrund hellpink
var Farbe1 = "#ea63b5"; // Schlange pink
var Farbe2 = "#29cc33"; // Frucht grün

function setup() {
  createCanvas(gridW * scale, gridH * scale);
  frameRate(30);
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
  text("P R E S S  E N T E R", (gridW * scale) / 2, gridH * scale - 175);

  fill(Farbe1);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("S T A R T", (gridW * scale) / 2, gridH * scale - 100);
}

function snakeBody() {
  noStroke();
  fill(Farbe1);
  circle(xHead * scale, yHead * scale, scale / 2);
  for (var i = 0; i < xTail.length; i++) {
    circle(xTail[i] * scale, yTail[i] * scale, scale / 2);
  }
}

// Richtungen der Schlange durch Pfeiltasten
function keyPressed() {
  if (keyCode === 37) {
    direction = "links";
  }
  if (keyCode === 39) {
    direction = "rechts";
  }
  if (keyCode === 38) {
    direction = "oben";
  }
  if (keyCode === 40) {
    direction = "unten";
  }
}

function snakeSpeed() {
  // ------- ??? -------
  if (millis() - time > speed) {
    // Richtungen werden definiert;
    if (direction === "links") {
      xHead = xHead - 1;
    }

    if (direction === "rechts") {
      xHead = xHead + 1;
    }

    if (direction === "oben") {
      yHead = yHead - 1;
    }

    if (direction === "unten") {
      yHead = yHead + 1;
    }

    // beim Bewegen soll das letzte Stück des Schwanzes an die vorletzte Position bewegt werden, etc. bis Position 1 erreicht wird
    for (var j = xTail.length - 1; j > 0; j--) {
      xTail[j] = xTail[j - 1];
      yTail[j] = yTail[j - 1];
    }
    // Position 1 des Schwanzes wird definiert als Kopf der Schlange und bleibt somit stehen
    xTail[0] = xHead;
    yTail[0] = yHead;

    // Wenn der Kopf der Schlange die Frucht berührt, bekommt der Schwanz ein neues Stück und eine neue Frucht erscheint
    if (xFruit === xHead && yFruit === yHead) {
      // das neue Stück soll an der Position erscheinen, in der sich der restliche Schwanz eben befand
      xTail.push(-1);
      yTail.push(-1);
      moreFruit();
    }
    // ------ ??? --------
    time = millis();
  }
}

function Fruit() {
  noStroke();
  fill(Farbe2);
  circle(xFruit * scale, yFruit * scale, scale / 2);
}

function moreFruit() {
  xFruit = floor(random(1, gridW - 1));
  yFruit = floor(random(1, gridH - 1));
}

function die() {
  // Wenn die Schlange die Wände berührt
  if (xHead === 0 || xHead === gridW || yHead === 0 || yHead === gridH) {
    state = 2;
  }
  /*
  // Wenn die Schlange sich selbst berührt
  if (xHead === xTail[k] && yHead === yTail[k]) {
    dieScreen();
  }
  */
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
  textSize(15);
  textAlign(CENTER, CENTER);
  text(
    "O H  N O  Y O U  L O S T  : (",
    (gridW * scale) / 2,
    gridH * scale - 175
  );

  fill(Farbe2);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("A G A I N?", (gridW * scale) / 2, gridH * scale - 100);

  xTail.splice(0, xTail.length);
  xHead = floor(gridW / 2);
  yHead = floor(gridH / 2);
}

function draw() {
  background(Farbe0);

  snakeBody();
  snakeSpeed();
  Fruit();
  die();

  if (state === 0) {
    startScreen();
  }

  if (state === 2) {
    dieScreen();
  }
}
