setupPlot = function() {
    lambda = parseFloat(document.getElementById('lambda').value);
    init = parseFloat(document.getElementById('init').value);
    
    decay = new Decay(lambda, init);
    decay.decay();
    graph = new Graph(ctx);
    decay.decayDraw(graph, "rgb(150, 50, 200)");
    
    fit = new Lsq(decay.x, decay.y);
    res = fit.lsq();
    exp = new Exponential(res[0], res[1], 0);//, [0, decay.x[decay.x.length-1]], [0, init]
    exp.exponentialDraw(graph, 0, decay.x[decay.x.length-1], "rgb(20, 150, 250)")

    fit = new Lsq(decay.x, decay.y);
    res1 = fit.wlsq();
    exp = new Exponential(res1[0], res1[1], 0);//, [0, decay.x[decay.x.length-1]], [0, init]
    exp.exponentialDraw(graph, 0, decay.x[decay.x.length-1], "rgb(200, 50, 50)")
    graph.graph()

    lsq = document.getElementById("lsq").innerHTML = 
        "The blue curve shows a least squares fit: " + 
        res[0].toFixed(0) + "*Exp(" + res[1].toFixed(2) + "*x)"
    wlsq = document.getElementById("wlsq").innerHTML = 
        "The red curve shows a weighted least squares fit: " + 
        res1[0].toFixed(0) + "*Exp(" + res1[1].toFixed(2) + "*x)"
}



var cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, middle;
var guess = [], newton, secant, regula, bisection;

 (function(){
  const RESIZE_DEBOUNCE_TIME = 100;
  var  createCanvas, resizeCanvas, setGlobals, resizeCount = 0;
  createCanvas = function () {
      var c, cs;
      cs = (c = document.createElement("canvas")).style;
      div = document.getElementById("canvas");
      cs.zIndex = 1000;
      div.appendChild(c);
      return c;
  }

  resizeCanvas = function () {
      if (canvas === undefined) canvas = createCanvas();
      canvas.width = innerWidth-50;
      canvas.height = 2*(canvas.width)/3+50;
      if (canvas.height > innerHeight) {
        canvas.height = innerHeight-50;
        canvas.width = 3*canvas.height/2;
      }
      ctx = canvas.getContext("2d");
      if (typeof setGlobals === "function") {
          setGlobals();
      }
      if (typeof onResize === "function") {
          if(firstRun){
              onResize();
              firstRun = false;
          } else {
              resizeCount += 1;
              setTimeout(debounceResize, RESIZE_DEBOUNCE_TIME);
          }
      }
  }
  function debounceResize() {
      resizeCount -= 1;
      if (resizeCount <= 0) onResize();
  }
  setGlobals = function () {
        cw = canvas.width;
        ch = canvas.height;
        middle = ch/2;
        setupPlot();
  }

  setTimeout(function(){
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
  },0);
})();