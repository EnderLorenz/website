var attractors = [];
var particles = [];
var num = 0;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize-50, canvasSize+150);
  canvas.parent('img');
  
  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  background(51);
}

function mousePressed() {
  if (attractors.length%2 == 0) {
    sign = 1;
  } else {
    sign = -1;
  }
  attractors.push(createVector(
    mouseX, mouseY, sign));
}

function draw() {
  background(51);

  strokeWeight(5);
  for (var i = 0; i < attractors.length; i++) {
    if (attractors[i].z == 1) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 0, 255);
    }
    point(attractors[i].x, attractors[i].y);
  }
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
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
