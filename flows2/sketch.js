var counter = 1;

var scl = 1;
var cols, rows
var particles = [];
var flowfield;

function setup() {
  frameRate(60);
  canvas = createCanvas((windowWidth-90), (windowHeight));
  canvas.parent('img');

  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows)
  for (var i = 0; i < 700; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .7;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .9;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .9;
    color = [red, green, blue, 15];
    particles[i] = new Particle(color, 3);
  }
  for (var i = 0; i < 1000; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .4;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .5;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .5;
    color = [red, green, blue, 30];
    particles[i] = new Particle(color, 3);
  }
  for (var i = 0; i < 900; i++) {
    red   =  (Math.sin(i)        * 127 + 128) * .4;
    green =  (Math.sin(i - PI/2) * 127 + 128) * .5;
    blue =   (Math.sin(i - PI)   * 127 + 128) * .5;
    color = [red, green, blue, 30];
    particles[i] = new Particle(color, 3);
  }
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var x_map = map(x, 0, cols, TWO_PI, TWO_PI*2);
      var y_map = map(y, 0, rows, -TWO_PI * 20, TWO_PI * 20);
      m = -90*Math.sin(x_map)/y_map - x_map/(TWO_PI);
      var v = p5.Vector.fromAngle(random_normal_gen(m * 180/PI, .5));
      v.setMag(.5);
      flowfield[index] = v;
    }
  }
}

function draw() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function random_normal_gen(mu, sigma) {
  var i;
  var sum;

  sum = random();
  for (i = 1; i < 24; i++) sum += random();
  sum -= 12.0;
  return (mu + (sigma * sum));
}

function save_record() {
  capturer.save();
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

function getQuadrant(dy, dx) {
  if (dy/dx == 0) {return 0;}
  if(dx <= 0 && dy >= 0) {
    return PI/2-atan(dy/dx);
  }else if(dx >= 0 && dy >= 0) {
    return -PI/2-atan(dy/dx);
  }else if(dx >= 0 && dy <= 0) {
    return abs(atan(dy/dx))-PI/2;
  }else {
    return PI/2-atan(dy/dx);
  }
}