regulaFalsiButton = function() {
    newton = false;
    secant = false;
    regula = true;
    bisection = false;
    setupPlot();
}

bisectionButton = function() {
    newton = false;
    secant = false;
    regula = false;
    bisection = true;
    setupPlot();
}

secantButton = function() {
    newton = false;
    secant = true;
    regula = false;
    bisection = false;
    setupPlot();
}

newtonRaphsonButton = function() {
    newton = true;
    secant = false;
    regula = false;
    bisection = false;
    setupPlot();
}

stepButton = function () {
    ranges = getRanges();
    fn = new Function(document.getElementById("func").value);
    if(newton && Math.abs(fn.f(guess[0])) > 1.0e-15) newtonStep(fn);
    else if(secant && Math.abs(fn.f(guess[0])) > 1.0e-15) secantStep(fn);
    else if(regula && Math.abs(fn.f(guess[0])) > 1.0e-15) regulaStep(fn);
    else if(bisection && Math.abs(fn.f(guess[0])) > 1.0e-15) bisectionStep(fn);
}

newtonStep = function(fn) {
    graph = new Graph(ctx, [ranges[0], ranges[1]], [ranges[2], ranges[3]]);
    if (Math.abs(fn.fP(guess[0], 1.0e-8)) < 1.0e-14 || Math.abs(guess[0]) > 1000*xMax) {
        document.getElementById("res").innerHTML = "Answer diverged. Try a different starting point";
        setupPlot();
    } else {
        nr = new NewtonRaphson(fn, 1.0e-14);
        guess[0] = nr.newtonRaphsonStepDraw(guess[0], graph);
        document.getElementById("res").innerHTML = "Result = " + guess[0];
    }
}

secantStep = function(fn) {
    graph = new Graph(ctx, [ranges[0], ranges[1]], [ranges[2], ranges[3]]);
    if (Math.abs(guess[0]) > 1000*xMax || (guess.length == 5 && Math.abs(guess[4]) < 1.0e-10)) {
        document.getElementById("res").innerHTML = "Answer diverged. Try different initial points";
        setupPlot();
    } else {
        sec = new Secant(fn);
        guess = sec.secantDrawStep(guess[0], guess[1]);
        document.getElementById("res").innerHTML = "Result = " + guess[0];
    }
}

regulaStep = function(fn) {
    graph = new Graph(ctx, [ranges[0], ranges[1]], [ranges[2], ranges[3]]);
    if (fn.f(guess[0])*fn.f(guess[1]) > 0.0) {
        document.getElementById("res").innerHTML = "Root not bracketed by starting points";
        setupPlot();
    } else if (Math.abs(guess[0]) > 1000*xMax) {
        document.getElementById("res").innerHTML = "Answer diverged. Try different initial points";
        setupPlot();
    } else {
        reg = new RegulaFalsi(fn);
        guess = reg.regulaFalsiDrawStep(guess[0], guess[1]);
        document.getElementById("res").innerHTML = "Result = " + guess[0];
    }
}

bisectionStep = function(fn) {
    graph = new Graph(ctx, [ranges[0], ranges[1]], [ranges[2], ranges[3]]);
    if (fn.f(guess[0])*fn.f(guess[1]) > 0.0) {
        document.getElementById("res").innerHTML = "Root not bracketed by starting points";
        setupPlot();
    } else if (Math.abs(guess[0]) > 1000*xMax) {
        document.getElementById("res").innerHTML = "Answer diverged. Try different initial points";
        setupPlot();
    } else {
        bis = new Bisection(fn);
        guess = bis.bisectionDrawStep(guess[0], guess[1]);
        document.getElementById("res").innerHTML = "Result = " + guess[0];
    }
}

setupPlot = function() {
    ranges = getRanges();
    graph = new Graph(ctx, [ranges[0], ranges[1]], [ranges[2], ranges[3]]);
    fn = new Function(document.getElementById("func").value);
    fn.fDraw(graph)
    guess = [document.getElementById("inputGuess").value * 1.0, document.getElementById("inputGuess2").value * 1.0];
    graph.point([guess[0]], [0], "rgb(60, 200, 200)", 4);
    if (!newton) graph.point([guess[1]], [0], "rgb(10, 250, 240)", 4);
    graph.graph()
}

getRanges = function() {
    var xMin, xMax, yMin, yMax;
    xMin = parseFloat(document.getElementById("xMin").value);
    xMax = parseFloat(document.getElementById("xMax").value);
    yMin = parseFloat(document.getElementById("yMin").value);
    yMax = parseFloat(document.getElementById("yMax").value);
    return [xMin, xMax, yMin, yMax];
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
        graph = new Graph(ctx, [-6, 6], [-1, 1]);
        graph.graph();
  }

  setTimeout(function(){
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
  },0);
})();