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

  createCanvas(768, 768);
  background(255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows)

  for (var i = 0; i < 10000; i++) {
    // red   =  Math.sin(i/8) * 127 + 70;
    // green =  Math.sin(i/8 - PI/2) * 127 + 25;
    // blue =   Math.sin(i/8 - PI) * 127 + 90;
    // color = [red, green, blue, 2];
    // particles[i] = new Particle(color);
    particles[i] = new Particle();
  }
  //noLoop();

}

function draw() {
// background(255);
  //randomSeed(10);
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

      // stroke(0, 50);
      // push();
      // translate(x*scl, y*scl);
      // rotate(v.heading());
      // stroke(0, 50);
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
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


// function draw() {
//   var yoff = 0;
//   loadPixels();
//   for (var y = 0; y < width; y++) {
//     var xoff = 0;
//     for (var x = 0; x < height; x++) {
//       var index = (x + y * width) * 4;
//       var r = noise(xoff, yoff)*255;
//       pixels[index + 0] = r;
//       pixels[index + 1] = r;
//       pixels[index + 2] = r;
//       pixels[index + 3] = 255;
//       xoff += inc;
//     }
//     yoff += inc;
//   }
//   updatePixels();
//   noLoop();
// }
// background(51);
// stroke(255);
// noFill();
// beginShape();
// var xoff = start;
// for (var x = 0; x < width; x++) {
//   stroke(255);
//   //var y = random(height)
//   var n = map(noise(xoff), 0, 1, -150, 150);
//   var s = map(sin(xoff), -1, 1, 100, height-100);
//   // var y = noise(xoff)*height/2
//   var y = s + n;
//   vertex(x, y)
//   //point(x, noise(xoff)*height);
//   xoff += inc;






// var x = random(width);
// var x = noise(xoff1)* width;
// var y = noise(xoff2)* width;
// xoff1 += 0.01;
// xoff2 += 0.01;
//
// ellipse(x, y, 20, 20);
