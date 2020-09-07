var incx = 0.01;
var incy = 0.01;
var scl = 17;
var cols, rows

var zoff = 0;
var fr;

var particles = [];
var color = [];
var flowfield;

function setup() {
  canvas = createCanvas(windowWidth-50, windowHeight-50);
  canvas.parent('img');
  background(255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows)

  for (var i = 0; i < 10000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * 29999 * TWO_PI
      var v = p5.Vector.fromAngle(angle);
      v.setMag(.01);
      flowfield[index] = v;
      xoff += incx;
    }
    yoff += incy;

    zoff += .001
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}