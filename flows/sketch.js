var scl = 5;
var cols, rows

var particles = [];
var flowfield;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize-75, canvasSize);
  canvas.parent('img');
  background(255);
  cols = floor(width / scl)-1;
  rows = floor(height / scl)-1;
  flowfield = new Array(cols * rows)
  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}
function draw() {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var x_map = map(x, 0, cols, -TWO_PI-PI/2, TWO_PI+PI/2);
      var y_map = map(y, 0, rows, -PI+2, PI-2);
      a = 1.6;
      b = 10;
      c = .5;
      d = 4;
      e = .11;
      f = 1.4;
      dy = y_map - y_map*y_map*y_map*Math.sin(y_map);
      dx = x_map - x_map*x_map*x_map;
      if (x_map <= 0) {
        m = Math.atan(dy/dx);
      } else {
        m = Math.atan(dy/dx) + PI
      }
      m = -9*Math.sin(x_map*.4)/y_map + x_map/TWO_PI;
      var v = p5.Vector.fromAngle(random_normal_gen(m, 1));
      v.setMag(.5);
      flowfield[index] = v;
    }
  }
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
  for (i = 1; i < 12; i++) sum += random();
  sum -= 6.0;
  return (mu + (sigma * sum));
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