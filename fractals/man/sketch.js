let slider1;
let slider;
var slider2;
var slider3;
var button;
var button2;
var sketchWidth;
var sketchHeight;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize-50, canvasSize+150);
  canvas.parent('img');
  background(0)
  slider1 = createCSlider(-5, 5, 0, .0001);
  slider2 = createCSlider(-5, 5, 0, .0001);
  slider3 = createCSlider(0, 2.5, 4.1, .0001);
  startStop();
  pixelDensity(1);
}

function draw() {

  background(255);
  slider1.position(0,canvasSize);
  slider2.position(canvasSize-185,canvasSize);
  slider3.position(canvasSize-185,canvasSize+100);
  text(round_2_str(slider1.value()) + '\nx-center', slider1.x + slider1.width/3, slider1.y+40)
  text(-round_2_str(slider2.value()) + '\ny-center', slider2.x+slider2.width/3, slider2.y+40);
  text('Zoom', slider3.x+slider3.width/3, slider3.y+40);
  

  var max_iterations = 100;
  x_center = slider1.value();
  y_center = slider2.value();
  length = slider3.value();
  loadPixels();
  for (var xi = 0; xi < canvasSize-50; xi++) {
    for (var yi = 0; yi < canvasSize-50; yi++) {
      var x0 = map(xi, 0, canvasSize-50, x_center-length, x_center+length);
      var y0 = map(yi, 0, canvasSize-50, y_center-length, y_center+length);
      var x = 0;
      var y = 0;
      var x2 = 0;
      var y2 = 0;
      var n = 0;
      while (n < max_iterations && x2+y2 <= 4) {
        y = (x+x)*y + y0;
        x = x2 - y2 + x0;
        x2 = x*x;
        y2 = y*y;
        n++;
      }
      if (n === max_iterations) {
        bright_red = 0;
        bright_green = 0;
        bright_blue = 0;
      } else {
          var bright = map(n, 0, max_iterations, 0, 1)
          bright_red = map(sqrt(sqrt(bright)), 0 ,1, 0, 210)
          bright_green = map(sqrt(sqrt(bright)), 0 ,1, 0, 0)
          bright_blue = map(sqrt(sqrt(bright)), 0 ,1, 0, 255)
      }
      var pix = (xi + yi * width) * 4;
      let pink = color(bright_red, bright_green, bright_blue);
      pixels[pix + 0] = red(pink);
      pixels[pix + 1] = green(pink);
      pixels[pix + 2] = blue(pink);
      pixels[pix + 3] = alpha(pink);
    }
  }
  updatePixels();
}

function round_2_str(num) {
  return Math.round(parseFloat(num) * 100) / 100;
}

function startStop() {
  noLoop();
  var button = createButton("Enable Sliders");
  var button2 = createButton("Stop Sketch");

  button.mousePressed(startSketch);
  button.position(25, canvasSize+355)

  button2.mousePressed(stopSketch);
  button2.position(25, canvasSize+400)

  function stopSketch() {
    noLoop();
  }

  function startSketch() {
    loop();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   centerCanvas()
// }

// function centerCanvas() {
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   canvas.position(x, y);
// }

// ========== cslider.js ===========

function createCSlider(a, b, c, d) {
  r = new CSlider(a, b, c, d);
  return r;
}

class CSlider {
  constructor(min, max, value = (min + max) / 2, step = 1) {
    this.width = 130;
    this.height = 20;
    let widthtoheight = this.width - this.height;
    this.ratio = this.width / widthtoheight;
    this.x = 10;
    this.y = -1000;
    this.spos = this.x + this.width / 2 - this.height / 2;
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    this.vmin = min;
    this.vmax = max;
    this.svalue = constrain(value, this.vmin, this.vmax);
    this.vstep = step;
    this.loose = 1;
    this.over = false;
    this.locked = false;
    this.scale = 1;
  }

  update() {
    if (this.overEvent()) {
      this.over = true;
    } else {
      this.over = false;
    }
    if (mouseIsPressed && this.over) {
      this.locked = true;
    }
    if (!mouseIsPressed) {
      this.locked = false;
    }
    if (this.locked) {
      this.newspos = constrain(mouseX / this.scale - this.height / 2, this.sposMin, this.sposMax);
      this.svalue = this.vmin + (this.vmax - this.vmin) * ((this.newspos - this.sposMin) / (this.sposMax - this.sposMin));
      if (this.vstep > 0) {
        this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
      }
      this.newspos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin));
    }
    if (abs(this.newspos - this.spos) > 1) {
      this.spos = this.spos + (this.newspos - this.spos) / this.loose;
    }
  }

  overEvent() {
    if (mouseX / this.scale > this.x && mouseX / this.scale < this.x + this.width &&
      mouseY / this.scale > this.y && mouseY / this.scale < this.y + this.height) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    noStroke();
    fill(204);
    rect(this.x, this.y, this.width, this.height);
    if (this.over || this.locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(this.spos, this.y, this.height, this.height);
  }

  getPos() {
    return this.spos * this.ratio;
  }

  value() {
    return this.svalue;
  }

  setScale(sc) {
    this.scale = sc;
  }

  position(xp, yp) {
    this.x = xp;
    this.y = yp;
    if (this.vstep > 0) {
      this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
    }
    this.spos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin));
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    push();
    this.update();
    this.display();
    pop();
  }
}