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

function graph() {
    if (!graphing) {
       graphing = true;
       ctx.clearRect(0, 0, cw, ch);  
    }
}

function simulate() {
    if (graphing) {
       graphing = false;
       ctx.clearRect(0, 0, cw, ch);  
    }
}

function display() { 
  rk4(order, coupled, xstart, xstop, xinc, y)
  xstart += xinc;
  xstop += xinc;
  for (var i = 0; i < order/2; i++) {
    if (Math.abs(y[2*i]) > maxY) maxY = Math.abs(y[2*i]);
    if (xstart >= 10) {
        maxX = xstart;
        minX = xstart - 10;
    }
}
  var xGraph = [25, cw-25]
    var yGraph = [0, 2*cw/3]
    var graphInc = (xGraph[1]-xGraph[0])/1000;
    var y0 = scale(y[0], -maxY, maxY, yGraph[0]+10, yGraph[1]-10)
    var y1 = scale(y[2], -maxY, maxY, yGraph[0]+10, yGraph[1]-10)
    var y2 = scale(y[4], -maxY, maxY, yGraph[0]+10, yGraph[1]-10)
    oldValues0.unshift(y0);
    oldValues1.unshift(y1);
    oldValues2.unshift(y2);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; // reset alpha
    ctx.clearRect(0, 0, cw, ch);

  if (!graphing) {
    ctx.lineWidth = 8;
    drawSpring(0, middle, w/4+y[0]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
    drawSpring(cw/4 + y[0]*10, middle, cw/2 + y[2]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
    drawSpring(cw/2 + y[2]*10, middle, 3*cw/4 + y[4]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
    drawSpring(cw, middle, 3*cw/4 + y[4]*10, middle, 5, 15, 20, "#383838", "#A9A9A9",1);
    ctx.beginPath();
    ctx.arc(cw/4 + y[0]*10, middle, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cw/2 + y[2]*10, middle, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "green"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(3*cw/4 + y[4]*10, middle, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "blue"
    ctx.fill();
  } else {
    
    
    ctx.beginPath();
    ctx.rect(xGraph[0], yGraph[0], xGraph[1], yGraph[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xGraph[0]+10, yGraph[1]+5);
    ctx.lineTo(xGraph[0]+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(minX.toFixed(2), 27, 2*cw/3+15);
    
    ctx.beginPath();
    ctx.moveTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]+5);
    ctx.lineTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText((maxX-5).toFixed(2), (xGraph[0] + xGraph[1])/2+5, 2*cw/3+15);

    ctx.beginPath();
    ctx.moveTo(xGraph[1]+10, yGraph[1]+5);
    ctx.lineTo(xGraph[1]+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(maxX.toFixed(2), cw-25, 2*cw/3+15);

    ctx.beginPath();
    ctx.moveTo(20, cw/3);
    ctx.lineTo(30, cw/3);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(0.0, 5, cw/3+4);

    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[0]+10);
    ctx.lineTo(xGraph[0]+5, yGraph[0]+10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(maxY.toFixed(1), xGraph[0]-25, yGraph[0]+13);

    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[1]-10);
    ctx.lineTo(xGraph[0]+5, yGraph[1]-10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(-maxY.toFixed(1), 0, 2*cw/3-7);
    ctx.beginPath();
    var xNow = scale(xstart, maxX-10, maxX, xGraph[0]+10, xGraph[1]+10)

    inc = xNow;
    for (var i = 1; i < 1000; i++) {
        if (oldValues0[i] != 0) {
            ctx.moveTo(inc, oldValues0[i-1]);
            ctx.lineTo(inc, oldValues0[i]);
            inc -= graphInc;
        }
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
    
    inc = xNow;
    ctx.beginPath();
    for (var i = 1; i < 1000; i++) {
        if (oldValues1[i] != 0) {
            ctx.moveTo(inc, oldValues1[i-1]);
            ctx.lineTo(inc, oldValues1[i]);
            inc -= graphInc;
        }
    }
    ctx.strokeStyle = "green";
    ctx.stroke();

    inc = xNow;
    ctx.beginPath();
    for (var i = 1; i < 1000; i++) {
        if (oldValues2[i] != 0) {
            ctx.moveTo(inc, oldValues2[i-1]);
            ctx.lineTo(inc, oldValues2[i]);
            inc -= graphInc;
        }
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();
    if (oldValues0.length > 1000) {
        for (var i = 10000; i < oldValues0.length; i++) {
        oldValues0.pop();
        oldValues1.pop();
        oldValues2.pop();
     }
    }
    

    ctx.beginPath();
    ctx.arc(xNow,  y0, 4, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(203, 100, 100)"
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xNow,  y1, 4, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(100, 255, 100)"
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xNow,  y2, 4, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(100, 100, 255)"
    ctx.fill();

    ctx.fillStyle = "black"
    ctx.strokeStyle = "black";
  }
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var w, h, cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, xxNow = 0, middle;
var omega = 6.283185307179586
var omegasq = omega*omega;
let y = [-1.0, 0.0, 1.0, 0.0, 0.5, 0.0];
let oldValues0 = new Array(1000).fill(0);
let oldValues1 = new Array(1000).fill(0);
let oldValues2 = new Array(1000).fill(0);
let yp = [0, 0, 0, 0, 0, 0];
let order = 6;
let xstart = 0;
let xstop = 0.01;
let xinc = xstop;
let graphing = false;
let inc = 0;
maxX = 10;
maxY = y[2];
minX = 0;
minY = y[0];

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
      if (innerWidth < innerHeight){}
      canvas.width = innerWidth-50;
      canvas.height = innerWidth/2+200;
      cw = (canvas.width);
      ch = (canvas.height);
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
      middle = ch/2;
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