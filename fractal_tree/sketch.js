let slider1;
let slider2;
let slider3;
let button;
let button2

function setup() {
  
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize, canvasSize+350);
  canvas.parent('img');
  slider1 = createCSlider(-TWO_PI*4, TWO_PI*4, 5*PI/16, .0001);
  slider2 = createCSlider(-TWO_PI*4, TWO_PI*4, -PI/16, .0001);
  slider3 = createCSlider(1, 17, 4, 1);
  startStop();
}

function draw() {
  background(256)
  slider1.position(5,canvasSize+20);
  slider2.position(canvasSize/3,canvasSize+50);
  slider3.position(1.9*canvasSize/3,canvasSize+90);
  text(round_2_str(slider1.value()) + '\nLeft Angle', slider1.x + slider1.width/3, slider1.y+40)
  text(-round_2_str(slider2.value()) + '\nRight Angle', slider2.x+slider2.width/3, slider2.y+40);
  text(slider3.value() + '\nOrder', slider3.x+slider3.width/3, slider3.y+40);
  angle1 = slider1.value();
  angle2 = slider2.value();
  order = slider3.value();
  strokeWeight(order/10);
  stroke(20, 62, 22);
  line(width/2, canvasSize-50, width/2, canvasSize-150);
  branch(width/2, canvasSize-150, 50, -0, 0.00001, order);
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

function branch(x1, y1, size, dy, dx, order) {
  if(order > 0) {
    x2L = x1 - size*sin(getQuadrant(dy, dx)+angle1);
    y2L = y1 - size*cos(getQuadrant(dy, dx)+angle1);
    x2R = x1 - size*sin(getQuadrant(dy, dx)+angle2);
    y2R = y1 - size*cos(getQuadrant(dy, dx)+angle2);
    dxL = x2L - x1;
    dyL = y2L - y1;
    strokeWeight(order/10);
    stroke(20, 150/(order/3.5), 100/order);
    line(x1, y1, x2L, y2L);
    line(x1, y1, x2R, y2R);
    branch(x2L, y2L, size*.8, dyL, dxL, order-1);
    x2R = x1 - size*sin(getQuadrant(dy, dx)+angle2);
    y2R = y1 - size*cos(getQuadrant(dy, dx)+angle2);
    dxR = x2R - x1;
    dyR = y2R - y1;
    branch(x2R, y2R, size*.8, dyR, dxR, order-1);
  }
}

function startStop() {
  noLoop();
  var button = createButton("Enable Sliders");
  var button2 = createButton("Stop Sketch");

  button.mousePressed(startSketch);
  button.position(windowWidth, height-250);

  button2.mousePressed(stopSketch);
  button2.position(windowWidth, height-200)

  function stopSketch() {
    noLoop();
  }

  function startSketch() {
    loop();
  }
}


function round_2_str(num) {
  return Math.round(parseFloat(num) * 100) / 100;
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
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
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
    //console.log(this.smin);
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    push();
    this.update();
    this.display();
    pop();
  }
}