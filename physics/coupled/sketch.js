function drawSpring(x1, y1, x2, y2, windings, width, offset, col1, col2, lineWidth){
  var x = x2 - x1;
  var y = y2 - y1;
  var dist = Math.sqrt(x * x + y * y);
  
  var nx = x / dist;
  var ny = y / dist;
  ctx.strokeStyle = col1
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  x1 += nx * offset;
  y1 += ny * offset;
  x2 -= nx * offset;
  y2 -= ny * offset;
  var x = x2 - x1;
  var y = y2 - y1;
  var step = 1 / (windings);
  for(var i = 0; i <= 1-step; i += step){  // for each winding
      for(var j = 0; j < 1; j += 0.05){
          var xx = x1 + x * (i + j * step);
          var yy = y1 + y * (i + j * step);
          xx -= Math.sin(j * Math.PI * 2) * ny * width;
          yy += Math.sin(j * Math.PI * 2) * nx * width;
          ctx.lineTo(xx,yy);
      }
  }
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
  ctx.stroke();
  ctx.strokeStyle = col2
  ctx.lineWidth = lineWidth - 4;
  var step = 1 / (windings);
  ctx.beginPath();
  ctx.moveTo(x1 - nx * offset, y1 - ny * offset);
  ctx.lineTo(x1, y1);
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
  for(var i = 0; i <= 1-step; i += step){  // for each winding
      for(var j = 0.25; j <= 0.76; j += 0.05){
          var xx = x1 + x * (i + j * step);
          var yy = y1 + y * (i + j * step);
          xx -= Math.sin(j * Math.PI * 2) * ny * width;
          yy += Math.sin(j * Math.PI * 2) * nx * width;
          if(j === 0.25){
              ctx.moveTo(xx,yy);
          
          }else{
              ctx.lineTo(xx,yy);
          }
      }
  }
  ctx.stroke();
}

function coupled(n, x, y, yp) {
  yp[0] = y[1];
  yp[1] = omegasq*(-2.0*y[0]+y[2]);
  yp[2] = y[3];
  yp[3] = omegasq*(y[0]-2.0*y[2]+y[4]);
  yp[4] = y[5];
  yp[5] = omegasq*(y[2]-2.0*y[4]);
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
    // console.log(x,y)
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

function display() { 
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.globalAlpha = 1; // reset alpha
  ctx.clearRect(0, 0, cw, ch);
  ctx.lineWidth = 8;
  drawSpring(0, middle, w/4+y[0]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
  drawSpring(w/4 + y[0]*10, middle, w/2 + y[2]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
  drawSpring(w/2 + y[2]*10, middle, 3*w/4 + y[4]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
  drawSpring(w, middle, 3*w/4 + y[4]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
  ctx.beginPath();
  ctx.arc(w/4 + y[0]*10, middle, 19, 0, 2 * Math.PI);
  ctx.fillStyle = "blue"
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w/2 + y[2]*10, middle, 19, 0, 2 * Math.PI);
  ctx.fillStyle = "red"
  ctx.fill();
  ctx.beginPath();
  ctx.arc(3*w/4 + y[4]*10, middle, 19, 0, 2 * Math.PI);
  ctx.fillStyle = "green"
  ctx.fill();
  rk4(order, coupled, xstart, xstop, xinc, y)
  xstart += xinc;
  xstop += xinc;

}

var w, h, cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, xhere = 0, middle;
var omega = 6.283185307179586
var omegasq = omega*omega;
let y = [-1.0, 0.0, 1.0, 0.0, 0.5, 0.0];
let yp = [0, 0, 0, 0, 0, 0];
let order = 6;
let xstart = 0;
let xstop = 0.01;
let xinc = xstop;
 (function(){
  const RESIZE_DEBOUNCE_TIME = 100;
  var  createCanvas, resizeCanvas, setGlobals, resizeCount = 0;
  createCanvas = function () {
      var c,
      cs;
      cs = (c = document.createElement("canvas")).style;
      div = document.getElementById("canvas");
      cs.zIndex = 1000;
      div.appendChild(c);
      w = div.clientWidth;
      h = div.clientHeight;
      return c;
  }
  resizeCanvas = function () {
      if (canvas === undefined) {
          canvas = createCanvas();
      }
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      ctx = canvas.getContext("2d");
      if (typeof setGlobals === "function") {
          setGlobals();
      }
      if (typeof onResize === "function") {
          if(firstRun){
              onResize();
              firstRun = false;
          }else{
              resizeCount += 1;
              setTimeout(debounceResize, RESIZE_DEBOUNCE_TIME);
          }
      }
  }
  function debounceResize() {
      resizeCount -= 1;
      if (resizeCount <= 0) {
          onResize();
      }
  }
  setGlobals = function () {
      cw = (canvas.width);
      ch = (canvas.height);
      middle = ch/2-h/2;
  }

  function update(timer) { // Main update loop
      if(ctx === undefined){
          return;
      }
      globalTime = timer;
      display();
      requestAnimationFrame(update);
  }
  setTimeout(function(){
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      requestAnimationFrame(update);
  },0);
})();
/** SimpleFullCanvasMouse.js end **/