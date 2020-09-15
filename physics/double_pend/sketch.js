let r1, r2, m1, m2;
let g = 9.80665;
let px2, py2, buffer;
let prev = [];
let y = [3.1415926535897932/4, 3.1415926535897932/8, 0, 0];
let yp = [0, 0, 0, 0]
let order = 4;
let xstart = 0;
let xstop = 0.05;
let xinc = xstop;
let x1, x2, y1, y2;
let bool = true;
let count = 2;
var slider, slider2, slider3, slider4;
var input, input2, input3;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight
  canvasSize = canvasSize - 90;
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas');
  canvasSize = canvasSize - 10

  slider = createSlider(.1, 100, 10, .01);
  slider2 = createSlider(.1, 100, 10, .01);
  slider3 = createSlider(.5, 100, 10, .01);
  slider4 = createSlider(.5, 100, 10, .01);
  input = createInput();
  input2 = createInput();
  input3 = createInput();
  input4 = createInput();
  slider.parent('canvas');
  slider2.parent('canvas');
  slider3.parent('canvas');
  slider4.parent('canvas');
  input.parent('canvas');
  input2.parent('canvas');
  input3.parent('canvas');
  input4.parent('canvas');
  slider.position(windowWidth/2-canvasSize/2, windowHeight/2+canvasSize/2+4*slider.height);
  slider2.position(slider.x, slider.y+4*slider.height);
  slider3.position(slider2.x, slider2.y+4*slider.height);
  slider4.position(slider3.x, slider3.y+4*slider.height);
  input.position(slider.x+slider.width+5, slider.y);
  input2.position(slider2.x+slider2.width+5, slider2.y);
  input3.position(slider3.x+slider3.width+5, slider3.y);
  input4.position(slider4.x+slider4.width+5, slider4.y);
  input.size(45);
  input2.size(45);
  input3.size(45);
  input4.size(45);
  input.value(slider.value());
  input2.value(slider2.value())
  input3.value(slider3.value())
  input4.value(slider4.value())
  slider.input(updateRSlider);
  slider2.input(updateRSlider);
  slider3.input(updateMSlider);
  slider4.input(updateMSlider);
  input.input(inputEvent)
  input2.input(inputEvent)
  input3.input(inputEventM)
  input4.input(inputEventM)
  textR1 = createElement('p', "Length of Rod 1")
  textR1.parent('canvas');
  textR1.position(input.x+input.width+5,input.y-input.width/3.2)
  textR2 = createElement('p', "Length of Rod 2")
  textR2.parent('canvas');
  textR2.position(input2.x+input2.width+5,input2.y-input2.width/3.2)
  textR3 = createElement('p', "Mass 1")
  textR3.parent('canvas');
  textR3.position(input3.x+input3.width+5,input3.y-input3.width/3.2)
  textR4 = createElement('p', "Mass 2")
  textR4.parent('canvas');
  textR4.position(input4.x+input4.width+5,input4.y-input4.width/3.2)
  let col = color(25, 23, 200, 50);
  // slider.style('width', '165px');
  // slider.style('background', '#6effff');
  slider.style.background = 23;
  r1 = slider.value();
  r2 = slider2.value();
  m1 = slider3.value();
  m2 = slider4.value();
  ratio = r1/(r1+r2);
  if (r1 >= r2) {
    r1_scale = (ratio)*(canvasSize/2);
    r2_scale = (1-ratio)*(canvasSize/2);
  } else{
    r1_scale = (ratio)*(canvasSize/2);
    r2_scale = (1-ratio)*(canvasSize/2);
  }

  pixelDensity(1);
  buffer = createGraphics(width, height);
  buffer.background(230);
}

function updateRSlider(){
  background(230);
  r1 = slider.value();
  r2 = slider2.value();
  input.value(r1);
  input2.value(r2);
  ratio = r1/(r1+r2);
  if (r1 >= r2) {
    r1_scale = (ratio)*(canvasSize/2);
    r2_scale = (1-ratio)*(canvasSize/2);
  } else{
    r1_scale = (ratio)*(canvasSize/2);
    r2_scale = (1-ratio)*(canvasSize/2);
  }
  buffer.background(230);
    y[2] = 0;
    y[3] = 0;
    count = 0;
}

function inputEvent(){
  if (parseFloat(input.value()) <= 100 
  && parseFloat(input.value())  > .1
  && parseFloat(input2.value()) <= 100 
  && parseFloat(input2.value()) > .1 
  ) {
    background(230);
    r1 = parseFloat(input.value());
    r2 = parseFloat(input2.value());
    slider.value(r1);
    slider2.value(r2);
    ratio = r1/(r1+r2);
    if (r1 >= r2) {
      r1_scale = (ratio)*(canvasSize/2);
      r2_scale = (1-ratio)*(canvasSize/2);
    } else{
      r1_scale = (ratio)*(canvasSize/2);
      r2_scale = (1-ratio)*(canvasSize/2);
    }
    buffer.background(230);
      y[2] = 0;
      y[3] = 0;
      count = 0;
  }
}

function updateMSlider(){
  background(100);
  m1 = slider3.value();
  m2 = slider4.value();
  input3.value(m1);
  input4.value(m2);
  buffer.background(230);
    y[2] = 0;
    y[3] = 0;
    count = 0;
}

function inputEventM(){
  if (parseFloat(input3.value()) <= 100 
  && parseFloat(input3.value())  > .5
  && parseFloat(input4.value()) <= 100 
  && parseFloat(input4.value()) > .5 ) {
    background(230);
    m1 = parseFloat(input3.value());
    m2 = parseFloat(input4.value());
    slider3.value(m1);
    slider4.value(m2);
    buffer.background(230);
      y[2] = 0;
      y[3] = 0;
      count = 0;
  }
}


function draw() {
  background(230);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  stroke(77, 28, 28);
  strokeWeight(2);

  x1 = r1_scale * sin(y[0])+width/2;
  y1 = r1_scale * cos(y[0])+height/2;
  x2 = x1 + r2_scale * sin(y[1]);
  y2 = y1 + r2_scale * cos(y[1]);

  line(width/2, height/2, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);

  if (bool) {
    rk4(order, doublePendulum, xstart, xstop, xinc, y)
      a1 = y[0];
      a2 = y[1];
      xstart += xinc;
      xstop += xinc;

      buffer.stroke(0);
      if (frameCount > 1 && count > 1) {
        strokeWeight(1);
        theta = -atan2(y2, x2)-PI
        red   =  Math.sin(theta - 5*PI/4) * 127 + 128;
        green =  Math.sin(theta - 3*PI/4) * 127 + 128;
        blue =   Math.sin(theta -   PI/4) * 127 + 128;
        alpha = map(y[2], -2, 2, 10, 100)
        buffer.stroke(red, green, blue, alpha);
        buffer.line(px2, py2, x2, y2);
      }
      px2 = x2;
      py2 = y2;
      if (count < 9) count++;
  }
  
}

function doublePendulum(n, x, y, yp) {
    yp[0] = y[2];
    yp[1] = y[3];  
    let num1 = -g * (2 * m1 + m2) * sin(y[0]);
    let num2 = -m2 * g * sin(y[0] - 2 * y[1]);
    let num3 = -2 * sin(y[0] - y[1]) * m2;
    let num4 = y[3] * y[3] * r2 + y[2] * y[2] * r1 * cos(y[0] - y[1]);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * y[0] - 2 * y[1]));
    yp[2] = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(y[0] - y[1]);
    num2 = y[2] * y[2] * r1 * (m1 + m2);
    num3 = g * (m1 + m2) * cos(y[0]);
    num4 = y[3] * y[3] * r2 * m2 * cos(y[0] - y[1]);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * y[0] - 2 * y[1]));
    yp[3] = (num1 * (num2 + num3 + num4)) / den;
}

function rk4(order, func, xstart, xstop, xinc, y) {
  var ymid = new Array(order).fill(0);
  var k1 = new Array(order).fill(0);
  var k2 = new Array(order).fill(0);
  var k3 = new Array(order).fill(0);
  var k4 = new Array(order).fill(0);
  xstop = xstop + (xinc * 0.5);
  xhalfinc = xinc * 0.5;
  x = xstart;
  while (1) {
    xnext = x + xinc;
    if (((xinc > 0.0) && (xnext > xstop)) || ((xinc < 0.0) && (xnext < xstop))) break;
    func(order,x,y,k1);
    for (j = 0; j < order; j++) ymid[j] = y[j] + (xhalfinc * k1[j]);
    func(order,x + xhalfinc, ymid, k2);
    for (j = 0; j < order; j++) ymid[j] = y[j] + (xhalfinc * k2[j]);
    func(order,x + xhalfinc,ymid,k3);
    for (j = 0; j < order; j++) ymid[j] = y[j] + (xinc * k3[j]);
    func(order,x + xinc,ymid,k4);
    for (j = 0; j < order; j++) y[j] += xinc * (k1[j] + (2.0 * k2[j]) + (2.0 * k3[j]) + k4[j]) / 6.0;
    x = xnext;
  }
  return(y);
} 

function mousePressed() {
  dist1 = dist(mouseX, mouseY, x1, y1);
  dist2 = dist(mouseX, mouseY, x2, y2);
  if (dist1 <= dist2  && dist1 < 20+m1) {
    mouse = 4;
    bool = false;
  } else if (dist2 < dist1 && dist2 < 20+m2){
    mouse = 5;
    bool = false;
  } else mouse = 1;
}

function mouseDragged() {
  angle = -atan2(mouseY - height / 2, mouseX - width / 2) + PI/2;
  if (mouse == 4) {
    buffer.background(230);
    y[0] = angle;
    y[2] = 0;
    y[3] = 0;  
    count = 0;
  } else if (mouse == 5){
    buffer.background(230);
    y[1] = angle;
    y[2] = 0;
    y[3] = 0;
    count = 0;
  }
}

function mouseReleased() {
  bool = true;
}
