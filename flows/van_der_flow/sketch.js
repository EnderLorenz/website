var scl = 1;
var cols, rows
var particles = [];
var vectorX = [];
var vectorY = [];

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize, canvasSize);
  background(255);
  canvas.parent('canvas');
  cols = floor(width / scl)-1;
  rows = floor(height / scl)-1;
  createParticles()
  createFlow();
}

function draw() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(vectorX, vectorY)
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
function createFlow(){
  for (var y_ = 0; y_ < rows; y_++) {
    for (var x_ = 0; x_ < cols; x_++) {
      var index = x_ + y_ * cols;
      var x = map(x_, 0, cols, -6, 6);
      var y = map(y_, 0, rows, -6, 6);
      mu = 1.5;
      vectorX[index] = mu*(x-(1/3)*x*x*x-y);
      vectorY[index] = 1/mu*x;
      // vectorX[index] = -2.0 * cos(y);
      // vectorY[index] = -2.0 * cos(x);
    }
  }
}

function createParticles() {
  for (var i = 0; i < 100; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .1;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .1;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .1;
    color = [red, green, blue, 15];
    particles[i] = new Particle(color);
  }
  for (var i = 0; i < 100; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .2;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .3;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .3;
    color = [red, green, blue, 20];
    particles[i] = new Particle(color);
  }
  for (var i = 0; i < 100; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .2;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .3;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .3;
    color = [red, green, blue, 20];
    particles[i] = new Particle(color);
  }
}
