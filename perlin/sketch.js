var incx = 0.000005;
var incy = 0.000005;
var scl = 10;
var cols, rows

var zoff = 0;
var fr;

var particles = [];
var color = [];
var flowfield;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(windowWidth-50, windowHeight-50);
  canvas.parent('img');
  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  flowfield = new Array(cols * rows)

  for (var i = 0; i < 100; i++) {
    red   =  Math.sin(i/8) * 127 + 150;
    green =  Math.sin(i/8 - PI/2) * 127 + 115;
    blue =   Math.sin(i/8 - PI) * 127 + 190;
    color = [red, green, blue, 2];
    particles[i] = new Particle(color);
  }
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * 9999999 * TWO_PI; //39999999
      var v = p5.Vector.fromAngle(angle);
      v.setMag(.5);
      flowfield[index] = v;
      xoff += incx;
    }
    yoff += incy;
    zoff += .00000001
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}
