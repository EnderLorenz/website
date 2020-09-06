var canvasSize, canvas;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize*.9, canvasSize*.9);
  // canvas.position(20,100)
  // centerCanvas();
  canvas.parent('img');
  background(0);
  noLoop();
}

function draw() {
  x = 0;
  y = 0;
  opacity = 200;
  for (var i = 0; i < 200000; i++) {
    px = map(x, -2.1820, 2.6558, 0, width);
    py = map(y, 0, 9.9983, height, 0);
    color = map(py, 0, height, 0, 7);
    dist = Math.sqrt(x*x+y*y);

    var freq = map(py, 0, height, 0, TWO_PI);
    red   = Math.sin(freq + PI/2   ) * 127 + 128;
    green = Math.sin(freq + PI) * 127 + 128;
    blue  = Math.sin(freq + 0  ) * 127 + 128;
    stroke(red, green, blue, opacity);
    strokeWeight(1);
    point(px,py);
    var prob = random(0,1);
    if (prob <= .01) {
      nextX =  0;
      nextY = .16 * y;
      opacity = 130;
    }else if (prob <= .86) {
      nextX =  0.85 * x + 0.04 * y;
      nextY = -0.04 * x + 0.85 * y + 1.6;
      opacity -= 1.3;
    }else if (prob <= .93) {
      nextX = 0.20 * x + -0.26 * y;
      nextY = 0.23 * x +  0.22 * y + 1.6;
      opacity -= 2.6;
    }else {
      nextX = -0.15 * x + 0.28 * y;
      nextY =  0.26 * x + 0.24 * y + 0.44;
      opacity -= 3.3;
    }
    x = nextX;
    y = nextY;
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas()
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}