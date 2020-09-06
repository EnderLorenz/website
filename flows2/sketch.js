var capturer = new CCapture({ format: 'webm' , framerate: 60} );
var btn;
var counter = 1;

var scl = 1;
var cols, rows
var particles = [];
var flowfield;

function setup() {
  frameRate(60);
  canvas = createCanvas((windowWidth-100), (windowHeight));
  canvas.parent('img');
  btn = document.createElement('button');
  btn.textContent = "save recording";
  document.body.appendChild(btn);
  btn.onclick = save_record;

  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  // fr = createP('');
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
      // var x_map = map(x, 0, cols, -6, 6);
      // var y_map = map(y, 0, rows, -6, 6);
      //
      // var mu = 2;
      // dx = y_map;
      // dy = mu * (1 - x_map*x_map)*y_map-x_map;
      // dist = Math.sqrt(x_map*x_map + y_map*y_map)
      //m = getQuadrant(dy, dx);
      // if (x_map <= 0) {
      //   m = Math.atan(dy/dx) + PI;
      // } else {
      //   m = Math.atan(dy/dx)
      // }

      var x_map = map(x, 0, cols, TWO_PI, TWO_PI*2);
      var y_map = map(y, 0, rows, -TWO_PI * 20, TWO_PI * 20);
      m = -90*Math.sin(x_map)/y_map - x_map/(TWO_PI);
      var v = p5.Vector.fromAngle(random_normal_gen(m * 180/PI, .5));
      // push();
      // translate(x*scl, y*scl);
      // rotate(v.heading());
      // stroke(255);
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
      v.setMag(.5);
      flowfield[index] = v;
    }
  }
 // noLoop();
  capturer.start();
}

function draw() {
  // for (var y = 0; y < rows; y++) {
  //   for (var x = 0; x < cols; x++) {
  //     var index = x + y * cols;
  //     var x_map = map(x, 0, cols, TWO_PI, TWO_PI*2);
  //     var y_map = map(y, 0, rows, -TWO_PI * 20, TWO_PI * 20);
  //     m = -90*Math.sin(x_map)/y_map - x_map/(TWO_PI);
  //     var v = p5.Vector.fromAngle(random_normal_gen(m, 1.0));
  //     v.setMag(.5);
  //     flowfield[index] = v;
  //   }
  // }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  // fr.html(floor(frameRate()));
  capturer.capture(document.getElementById('defaultCanvas0'));
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

// dy = y_map + y_map*y_map*y_map*y_map;
// dx = x_map + x_map*x_map;
// a = .6;
// b = 10;
// c = .5;
// d = 5;
// e = .11;
// f = 1.4;
// dx = a * x_map * (1 - x_map/b) - c*x_map*y_map/(x_map + d)
// dy = e * y_map * (1 - y_map/(f * x_map));
// // dist = Math.sqrt(x_map*x_map + y_map*y_map)
// if (x_map <= 0) {
//   m = Math.atan(dy/dx);
// } else {
//   m = Math.atan(dy/dx) + PI
// }
//m = (y_map*y_map/2 - (9.81)*Math.atan(x_map) - 20*Math.cos(300*x_map));




//
// stroke(0, 50);
// push();
// translate(x*scl, y*scl);
// rotate(v.heading());
// stroke(0, 50);
// strokeWeight(1);
// line(0, 0, scl, 0);
// pop();





//var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
//dy = y_map - y_map*y_map*y_map;
//dx = x_map - x_map*x_map*x_map;
// dist = Math.sqrt(x_map*x_map + y_map*y_map)
// if (x_map <= 0) {
//   m = Math.atan(-y_map/(x_map - .5)) + PI -
//       Math.atan(-y_map/(x_map + .5)) + .5*PI;
// } else {
//   m = Math.atan(-y_map/(x_map - .5)) + PI -
//       Math.atan(-y_map/(x_map + .5)) + .5*PI;
// }
//cos(x+2*y), sin(x-2*y)
// dy = y_map + cos(x_map+2*y_map);
// dx = x_map + sin(x_map-2*y_map);
// dy = y_map + cos(x_map+2*y_map);
// dx = -Math.sin(x_map)- x_map;
// dy =  - y_map;
// if (dx <= 0) {
//   m = Math.atan(-dy/dx) + PI;
// } else {
//   m = Math.atan(-dy/dx);
// }
//m = (y_map*y_map/2 - (9.81)*Math.atan(x_map) - 20*Math.cos(300*x_map));

// dx =  (x_map - 2*y_map) * x_map + y_map*y_map+30;
// dy =  (x_map - 2) * y_map;
//
// if (dx <= 0) {
//   m = Math.atan(-dy/dx) + PI;
// } else {
//   m = Math.atan(-dy/dx);
// }
//var r = 1;









    // red   =  Math.sin(theta) * 127 + 128;
    // green =  Math.sin(theta - PI/2) * 127 + 128;
    // blue =  Math.sin(theta - PI) * 127 + 128;
    // // redp   =  Math.sin(theta) * 127 + 128;
    // // greenp =  Math.sin(theta - PI/2) * 127 + 128;
    // // bluep =  Math.sin(theta - PI) * 127 + 128;
    // // var inter = map(theta, 0, TWO_PI, 0, 1);
    // //console.log(this.pos.x, x_coordinate, theta, red, green, blue);
    // stroke(red, 0, blue, 3);
    // //stroke(random(this.pos.x), 0, random(this.pos.y), map(this.vel.x, 0, 2, 4, 0));
    // strokeWeight(1);
    //


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
