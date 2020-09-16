function display() { 
  ntrials++;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.beginPath();
  ctx.rect(0, 0, cw, 45);
  ctx.fillStyle = "#384048"
  ctx.fill();
  ctx.beginPath();
  a = 8;
  b = 1.0;
  x = getRnd(0, a);
  y = getRnd(0, b);
  scaleX = scale(x, 0, 8, 10, cw-10);
  scaleY = scale(y, 0, 1, ch/2-50, 50);;
  if ( y <= 1/(1+x*x)) {
    ctx.arc(scaleX,  scaleY, 1, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(203, 69, 37)"
    ctx.fill();
    nhits++;
  } else {
    ctx.arc(scaleX,  scaleY, 1, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(88,125,74)"
    ctx.fill();
  }
  var arctan = a*b*(nhits/ntrials);
  ctx.fillStyle = "rgb(185,156,107)"
  ctx.font = "30px Open Sans Condensed";
  ctx.fillText("Atan(" + 8 + ") = " + arctan.toFixed(5), 10, 30);
  ctx.fillText(ntrials + " Trials", cw-130, 30);

  x = 0;
  inc = .1;
  ctx.beginPath();
  ctx.moveTo(10,50);
  ctx.lineWidth=0.02;
  while(x < 8) {
    scaleX = scale(x, 0, 8, 10, cw-10);
    y = 1/(1+x*x)
    scaleY = scale(y, 0, 1, ch/2-50, 50);;
    ctx.lineTo(scaleX, scaleY);
    x += inc;
  }
  ctx.strokeStyle = "black";
  ctx.stroke();

  x = 0;
  inc = .1;
  ctx.beginPath();
  ctx.moveTo(10,ch/2+50);
  ctx.lineWidth=0.02;
  while(x < 8) {
    scaleX = scale(x, 0, 8, 10, cw-10);
    y = 1/(1+x*x)
    scaleY = scale(y, 0, 1, ch-50, ch/2+50);;
    ctx.lineTo(scaleX, scaleY);
    x += inc;
  }
  ctx.strokeStyle = "black";
  ctx.stroke();

  a = 8;
  b = 1.0;
  x = getRnd(0, a);
  y = 1/(1+x*x)
  total += y;
  scaleX = scale(x, 0, 8, 10, cw-10);
  scaleY = scale(y, 0, 1, ch - 50, ch/2 + 50);
  ctx.lineWidth=0.2;
  ctx.beginPath();
  ctx.moveTo(scaleX, ch-50);
  ctx.lineTo(scaleX, scaleY);
  ctx.strokeStyle = getRandomColor();
  ctx.stroke();

  ctx.moveTo(0, 0);
  ctx.beginPath();
  ctx.rect(0, ch/2-50, cw, ch/2-230);
  ctx.fillStyle = "#384048"
  ctx.fill();
  var arctan2 = total*(a/ntrials);
  ctx.fillStyle = "rgb(185,156,107)"
  ctx.font = "30px Open Sans Condensed";
  ctx.fillText("Atan(" + 8 + ") = " + arctan2.toFixed(5), 10, ch/2 + 25);
  ctx.fillText(ntrials + " Trials", cw-130, ch/2 + 25);
  ctx.beginPath();
  ctx.rect(cw/5, ch/2+35, cw, ch/2 - 200);
  ctx.fillStyle = "#384048"
  ctx.fill();
  ctx.fillStyle = "rgb(185,156,107)"
  ctx.font = "30px Open Sans Condensed";
  ctx.fillText("Actual = " + Math.atan(8).toFixed(5), cw-250, ch/2 + 60);


}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRnd(min, max) {
    return Math.random() * (max - min) + min;
  }

var cw, ch, canvas, ctx, globalTime = 0, firstRun = true;
var nhits = 0;
var ntrials = 0;
var total = 0;

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
      // if ( innerWidth < innerHeight ) {
        canvas.width = innerWidth - 50;
        // canvas.height = innerWidth - 50;
      // } else {
        // canvas.width = innerHeight-50;
        canvas.height = innerHeight-50;
      // }
      console.log(innerHeight)
      cw = (canvas.width);
      ch = (canvas.height);
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#384048";
      ctx.fillRect(0, 0, cw, ch);

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

