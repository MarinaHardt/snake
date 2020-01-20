function preload() {
  fruit1 = loadImage("assets/apple.png");
  fruit2 = loadImage("assets/banana.png");
  fruit3 = loadImage("assets/grapes.png");
  fruit4 = loadImage("assets/orange.png");
  fruit5 = loadImage("assets/straw.png");
  fruit6 = loadImage("assets/watermelon.png");
  fruit7 = loadImage("assets/pear.png");

  cathead = loadImage("assets/cathead.png");
  cattail = loadImage("assets/cattail.png");

  startpng = loadImage("assets/startscreen.png");
  diepng = loadImage("assets/diescreen.png");
  winpng = loadImage("assets/winscreen.png");

  myFont = loadFont("assets/Courier-New-Bold.ttf");
}

function setup() {
  createCanvas(grid.x * scale, grid.y * scale + 100);
  frameRate(30);
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
