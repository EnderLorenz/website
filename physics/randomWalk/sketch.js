function display() {

    
    xGraph = [25, cw-25]
    yGraph = [0, cw-25]

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);    
    
    ctx.beginPath();
    ctx.rect(xGraph[0], yGraph[0], xGraph[1], yGraph[1]);
    ctx.stroke();

    // 0, 0
    ctx.beginPath();
    ctx.moveTo(xGraph[0]+10, yGraph[1]+5);
    ctx.lineTo(xGraph[0]+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(xMin.toFixed(1), xGraph[0], yGraph[1]+15);
    
    // x_mid, y0 label
    ctx.beginPath();
    ctx.moveTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]+5);
    ctx.lineTo((xGraph[0] + xGraph[1])/2+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText( ((xMin+xMax)/2).toFixed(1), (xGraph[0] + xGraph[1])/2, yGraph[1]+15);

    // x_max, y0 label
    ctx.beginPath();
    ctx.moveTo(xGraph[1]+10, yGraph[1]+5);
    ctx.lineTo(xGraph[1]+10, yGraph[1]-5);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(xMax.toFixed(1), xGraph[1], yGraph[1]+15);
    
    //x0,y_0 label
    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[1]-10);
    ctx.lineTo(xGraph[0]+5, yGraph[1]-10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(yMin.toFixed(1), yGraph[0], yGraph[1] - 7);

    // x0,y_mid label
    ctx.beginPath();
    ctx.moveTo(20, (yGraph[1]+yGraph[0])/2);
    ctx.lineTo(30, (yGraph[1]+yGraph[0])/2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText( ((yMin+yMax)/2).toFixed(1), 5, (yGraph[1]+yGraph[0])/2+3);

    // x0,y_max label
    ctx.beginPath();
    ctx.moveTo(xGraph[0]-5, yGraph[0]+10);
    ctx.lineTo(xGraph[0]+5, yGraph[0]+10);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillText(yMax.toFixed(1), xGraph[0]-25, yGraph[0]+13);
    var rms = 0;
    for(var i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].move();
        rms += Math.sqrt(particles[i].prevX * particles[i].prevX + particles[i].prevY * particles[i].prevY);
    }

    document.getElementById("rms").innerHTML = 
        "Expected distance traveled for a particle = Sqrt(N<sub>steps</sub>) = Sqrt(" + 
        particles[0].xSet.length.toFixed(0) + ") = " +
        Math.sqrt(particles[0].xSet.length).toFixed(1); 
    document.getElementById("rms2").innerHTML = 
        "RMS = " + (rms/particles.length).toFixed(1);
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



var w, h, cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, xxNow = 0, middle;

var yMax,yMin,xMax,xMin;
xMin = -5;
xMax = 5;
yMin = -5;
yMax = 5;
var nParticles
let particles = [];
var xGraph = [];
var yGraph = [];
particles.push(new Particle(0, 0));

function start() {
    nParticles = document.getElementById("inputN").value;
    xMin = -5;
    xMax = 5;
    yMin = -5;
    yMax = 5;
    particles = [];
    xGraph = [];
    yGraph = [];
    for (var i = 0; i < nParticles; ++i)
        particles.push(new Particle(0, 0));
    ctx.clearRect(0, 0, cw, ch);  
}

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
      canvas.height = innerWidth/2+555;
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