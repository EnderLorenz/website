function display() {
    if (simulating) {
        count++;     
        runningTotal += sim.simulate();
        var res = runningTotal/(count*sim.nArrows);
        document.getElementById("res").innerHTML = 
            "Mean of 100 arrows in " + count + " forrests: &mu; = " + res.toFixed(1) ;
    }
    if (graphing) {
        graph = new Graph(ctx)
        binning = new Bin(sim.distances, 5);
        bins = binning.bin()
        graph.point(bins[0], bins[1], "rgb(100, 10, 10)", 1);
        fit = new Lsq(binning.bins, binning.freq);
        res = fit.wlsq();
        exp = new Exponential(res[0], res[1], 0);
        exp.exponentialDraw(graph, 0, binning.bins[binning.bins.length-1], "rgb(20, 150, 250)");
        document.getElementById("res").innerHTML = "Binning the hit distances and performing a Weighted Least Sqaures Exponential Fit:<br>" + res[0].toFixed(1) + "*Exp(-x/" + (-1/res[1]).toFixed(1) + ")"; 
        graph.graph()
    }    
}

function simulateButton() {
    simulating = true;
    graphing = false;
}

function graphButton() {
    simulating = false;
    graphing = true;
}

var cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, middle;
var runningTotal = 0, count = 0, graphing = false, simulating = true, sim;

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
        canvas.width = innerWidth - 50;
        canvas.height = innerHeight - 50;
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
  }

    function update(timer) { // Main update loop
        if(ctx === undefined) return;
        globalTime = timer;
        sim = new Simulate(100, 1);
        display();
        setInterval(display, 500);
    }
    setTimeout(function(){
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        requestAnimationFrame(update);
    },0);
})();