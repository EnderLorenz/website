function display() { 
  ntrials++;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.beginPath();
  ctx.rect(0, 0, cw, 45);
  ctx.fillStyle = "#384048"
  ctx.fill();
  ctx.beginPath();
  x = getRnd(50, cw-50);
  y = getRnd(50, cw-50);
  if ( (x-50)*(x-50)+(y-50)*(y-50) < (cw-100)*(cw-100)) {
    ctx.arc(x,  y, 1, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(203, 69, 37)"
    ctx.fill();
    nhits++;
  } else {
    ctx.arc(x,  y, 1, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(88,125,74)"
    ctx.fill();
  }
  
  var pi = 4.0*nhits/ntrials;
  ctx.fillStyle = "rgb(185,156,107)"
  ctx.font = "30px Open Sans Condensed";
  ctx.fillText("Pi = " + pi.toFixed(5), 10, 30);
  ctx.fillText(ntrials + " Trials", cw-130, 30);
}

function getRnd(min, max) {
    return Math.random() * (max - min) + min;
  }

var cw, ch, canvas, ctx, globalTime = 0, firstRun = true;
var nhits = 0;
var ntrials = 0;

 (function(){
  const RESIZE_DEBOUNCE_TIME = 100;
  var  createCanvas, resizeCanvas, resizeCount = 0;
  createCanvas = function () {
      var c, cs;
      cs = (c = document.createElement("canvas")).style;
      div = document.getElementById("canvas");
      cs.zIndex = 1000;
      div.appendChild(c);
      return c;
  }

  resizeCanvas = function () {
      if (canvas === undefined) {
          canvas = createCanvas();
      }
      if ( innerWidth < innerHeight ) {
        canvas.width = innerWidth - 50;
        canvas.height = innerWidth - 50;
      } else {
        canvas.width = innerHeight-50;
        canvas.height = innerHeight-50;
      }
      
      cw = (canvas.width);
      ch = (canvas.height);
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#384048";
      ctx.fillRect(0, 0, cw, cw);

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
  
  function update(timer) { // Main update loop
      if(ctx === undefined) return;
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

