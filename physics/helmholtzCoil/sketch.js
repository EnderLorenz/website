setupPlot = function() {
    D = parseFloat(document.getElementById('d').value)*.01;
    R = parseFloat(document.getElementById('r').value)*.01;
    bz = new BZ(R, D);
    graph = new Graph(ctx);
    bz.bzDraw(graph, -10, 10);
    graph.graph()
}

var d = document.getElementById("d");
d.oninput = function() {
    d.innerHTML = this.value;
    document.getElementById("dLabel").innerHTML = "D = " + this.value + "cm";
    setupPlot()
};

var r = document.getElementById("r");
r.oninput = function() {
    r.innerHTML = this.value;
    document.getElementById("rLabel").innerHTML = "R = " + this.value + " cm";
    setupPlot()
};

var cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, middle;
var d1;

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