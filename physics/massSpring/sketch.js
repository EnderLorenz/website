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
          } else{
              ctx.lineTo(xx,yy);
          }
      }
  }
  ctx.stroke();
}

function force(x) {
    return q0.value/1000*Math.cos(wd.value/1000*x);
}

function massSpring(n, x, y, yp) {
  yp[0] = y[1];
  yp[1] = -(2.0*beta.value/1000*y[1] + (w0.value/100)*(w0.value/100)*y[0])/m - force(x);
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

function graph() {
    if (!graphing) {
       graphing = true;
       ctx.clearRect(0, 0, cw, ch);  
    }
}

function display() {
    rk4(order, massSpring, xstart, xstop, xinc, y)
    xstart += xinc;
    xstop += xinc;

    for (var i = 0; i < order/2; i++) {
        if (xstart >= 10) {
            maxX = xstart;
            minX = xstart - 10;
        }
    }
    var xGraph = [25, cw-25]
    var yGraph = [0, 2*cw/3]
    var graphInc = (xGraph[1]-xGraph[0])/1000;
    var y0 = scale(y[0], -maxY, maxY, yGraph[0]+10, yGraph[1]-10);
    oldValues0.unshift(y0);
    unscaled.unshift(y[0]);
    if (Math.abs(y[0]) > maxY) {
        maxY = Math.abs(y[0]);
        if (oldValues0.length > 1) {
            for(var i = 0; i < oldValues0.length; ++i) {
                oldValues0[i] = scale(unscaled[i], -maxY, maxY, yGraph[0]+10, yGraph[1]-10);
            }
        }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);    
    
    ctx.beginPath();
    ctx.rect(xGraph[0], yGraph[0], xGraph[1], yGraph[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xGraph[0]+40, yGraph[1]+5);
    ctx.lineTo(xGraph[0]+40, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(xstart.toFixed(2), 27, 2*cw/3+15);
    
    // x_mid, y0 label
    ctx.beginPath();
    ctx.moveTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]+5);
    ctx.lineTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText((xstart-5).toFixed(2), (xGraph[0] + xGraph[1])/2+5, 2*cw/3+15);

    // x_max, y0 label
    ctx.beginPath();
    ctx.moveTo(xGraph[1]+10, yGraph[1]+5);
    ctx.lineTo(xGraph[1]+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText((xstart+10).toFixed(2), cw-25, 2*cw/3+15);

    // x0,y_mid label
    ctx.beginPath();
    ctx.moveTo(20, cw/3);
    ctx.lineTo(30, cw/3);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(0.0, 5, cw/3+4);

    // x0,y_max label
    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[0]+10);
    ctx.lineTo(xGraph[0]+5, yGraph[0]+10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(maxY.toFixed(1), xGraph[0]-25, yGraph[0]+13);

    //x0,y_min label
    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[1]-10);
    ctx.lineTo(xGraph[0]+5, yGraph[1]-10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(-maxY.toFixed(1), 0, 2*cw/3-7);
    
    
    ctx.beginPath();
    inc = xGraph[0]+40;
    ctx.lineWidth = 4;
    for (var i = 0; i < oldValues0.length; i++) {
        ctx.moveTo(inc, oldValues0[i-1]);
        ctx.lineTo(inc, oldValues0[i]);
        ctx.arc(inc, oldValues0[i], .1, 0, 2*Math.PI);
        inc += graphInc;
    }
    ctx.strokeStyle = "red";
    ctx.stroke();

    if (oldValues0.length > 1000) {
        for (var i = 10000; i < oldValues0.length; i++) {
            oldValues0.pop();
            unscaled.pop();
        }
    }

    ctx.beginPath();
    drawSpring(xGraph[0]+40, yGraph[0], xGraph[0]+40, y0-10, 15, 12, 10, "#383838", "#A9A9A9",1);
    ctx.rect(xGraph[0]+40-10, y0-10, 20, 20);
    ctx.fillStyle = "rgb(203, 100, 100)"
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.fillStyle = "black"
    ctx.strokeStyle = "black";
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



var w, h, cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, xxNow = 0, middle;

var beta, k, m;
k = 1.0;
m = 1.0;
let y = [0.0, 1.0];
let yp = [0, 0];
let order = 2;
let xstart = 0;
let xstop = 0.01;
let xinc = xstop;
let inc = 0;
maxX = 10;
maxY = 1.5//y[2];
minX = 0;
minY = y[0];
let unscaled = new Array(1);
let oldValues0 = new Array(1);

var w0 = document.getElementById("w0");
w0.innerHTML = w0.value;
w0.oninput = function() {
    w0.innerHTML = this.value;
    var w0label = document.getElementById("w0label");
    w0label.innerHTML = "&omega;<sub>0</sub> = " + this.value/100;
};

var beta = document.getElementById("beta");
beta.innerHTML = beta.value;
beta.oninput = function() {
    beta.innerHTML = this.value;
    var betalabel = document.getElementById("betalabel");
    betalabel.innerHTML = "&beta; = " + this.value/1000;
};

var q0 = document.getElementById("q0");
q0.innerHTML = q0.value;
q0.oninput = function() {
    q0.innerHTML = this.value;
    var q0label = document.getElementById("q0label");
    q0label.innerHTML = "q0 = " + this.value/1000;
};

var wd = document.getElementById("wd");
wd.innerHTML = wd.value;
wd.oninput = function() {
    wd.innerHTML = this.value;
    var wdlabel = document.getElementById("wdlabel");
    wdlabel.innerHTML = "wd = " + this.value/1000;
};


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
      canvas.width = innerWidth-50;
      canvas.height = innerWidth/2+155;
      cw = canvas.width;
      ch = canvas.height;
      ctx = canvas.getContext("2d");
      if (typeof setGlobals === "function") {
          setGlobals();
      }
      if (typeof onResize === "function") {
          if(firstRun){
              onResize();
              firstRun = false;
          } else{
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