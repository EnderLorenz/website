function display() {
    if (simulating) {
        if (calcBool == true) calcBool = false;
        count++;     
        runningTotal += sim.simulate();
        var res = runningTotal/(count*sim.nArrows);
        document.getElementById("res").innerHTML = 
            "Mean of 100 arrows in " + count + " forrests: &mu; = " + res.toFixed(1) ;
    }
    if (graphing) {
        
        if (!calcBool) {
            graph = new Graph(ctx)
            binning = new Bin(sim.distances, 5);
            bins = binning.bin();
            graph.point(bins[0], bins[1], "rgb(100, 10, 10)", 1);
            
            fit = new Lsq(binning.bins, binning.freq);
            res = fit.wlsq();

            a = tf.variable(tf.scalar(res[0]));
            tau = tf.variable(tf.scalar(-1/res[1]));
            c = tf.variable(tf.scalar(0.0));

            tf.tidy(() => {
                const ys = tf.tensor1d(bins[1]);
                for (let i = 0; i < 200; i++)
                    optimizer.minimize(() => loss(predict(bins[0]), ys));
            });

            const ys = tf.tidy(() => predict(bins[0]));
            let curveY = [a.dataSync()[0], tau.dataSync()[0], c.dataSync()[0]];
            ys.dispose();

            exp = new Exponential(curveY[0], -1.0/curveY[1], curveY[2]);
            exp.exponentialDraw(graph, 0, binning.bins[binning.bins.length-1], "rgb(20, 150, 250)");
            document.getElementById("res").innerHTML = 
                "Histogram of hit distances and Tensor Flow Exp Regression:<br>" + 
                curveY[2].toFixed(1) + " + " + curveY[0].toFixed(1) + "*Exp(-x/" + (curveY[1]).toFixed(1) + ")" ; 
            graph.graph()
            calcBool = true;
        }
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
let a, tau, c, calcBool = false;

let learningRate = 0.01;
const optimizer = tf.train.adam(learningRate);

function loss(pred, labels) {
    return pred
      .sub(labels)
      .square()
      .mean();
  }

  function predict(x) {
    const xs = tf.tensor1d(x);
    const ys = xs.div(tau).exp().mul(a).add(c);
    return ys;
  }

(function(){
    const RESIZE_DEBOUNCE_TIME = 100;
    var  createCanvas, resizeCanvas, setGlobals, resizeCount = 0;
    createCanvas = function () {
        var c, cs;
        cs = (c = document.createElement("canvas")).style;
        div = document.getElementById("canvas");
        cs.zIndex = -1;
        div.appendChild(c);
        return c;
    }

    resizeCanvas = function () {
        if (canvas === undefined) {
            canvas = createCanvas();            
            canvas.width = innerWidth-75;
            canvas.height = innerWidth-75;
            if (innerWidth > innerHeight) {
                canvas.height = innerHeight - 75;
                canvas.width = canvas.height;
            } 
            document.getElementById('canvas').style.height= (canvas.width) + 'px';
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
        
  }

    function update(timer) { // Main update loop
        if(ctx === undefined) return;
        globalTime = timer;
        sim = new Simulate(100, 1);
        display();
        setInterval(display, 200);
    }
    setTimeout(function(){
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        requestAnimationFrame(update);
    },0);
})();