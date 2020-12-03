function draw1() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);
    var pack = new Packet(45.0, 55.0, kinc1, t1, 50.0, vp01, a1);
        var sw = new Sweep();
        var sets = sw.sweep(pack.packet.bind(pack), -20, 20, .1)
        graph = new Graph(ctx);
        graph.plot(sets[0],sets[1], "rgb(3, 100, 100)");
        graph.graph();
}

function draw2() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);
    var pack = new Packet(45.0, 55.0, kinc1, t1, 50.0, vp01, a1);
    var sw = new Sweep();
    var sets = sw.sweep(pack.packetRe.bind(pack), -20, 20, .03)
    graph = new Graph(ctx);
    graph.plot(sets[0],sets[1], "rgba(150, 10, 10, .5)");
    var sets = sw.sweep(pack.packetIm.bind(pack), -20, 20, .03)
    graph.plot(sets[0],sets[1], "rgba(10, 10, 150, .2)");
    graph.graph();
}


var cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, middle;
var kinc1, a1, vp01, t1, mag, re;
mag = true;
re = false;

    function magButton() {
        mag = true;
        re = false;
        draw1();
    }

    function reButton() {
        if (mag) {
            mag = false;
            re = true;
            draw2();
        }
    }

    var kinc = document.getElementById("kinc");
    kinc.innerHTML = kinc.value;
    kinc.oninput = function() {
        kinc.innerHTML = this.value;
        kinc1 = parseFloat(this.value);
        var kinclabel = document.getElementById("kinclabel");
        tmp = parseFloat(this.value);
        kinclabel.innerHTML = "k<sub>inc</sub> = " + tmp.toFixed(2);
        if (mag) draw1();
        if (re) draw2();
    };

    var a = document.getElementById("a");
    a.innerHTML = a.value;
    a.oninput = function() {
        a.innerHTML = this.value;
        a1 = parseFloat(this.value);
        var alabel = document.getElementById("alabel");
        tmp = parseFloat(this.value);
        alabel.innerHTML = "a = " + tmp.toFixed(2);
        if (mag) draw1();
        if (re) draw2();
    };

    var vp0 = document.getElementById("vp0");
    vp0.innerHTML = vp0.value;
    vp0.oninput = function() {
        vp0.innerHTML = this.value;
        vp01 = parseFloat(this.value);
        var vp0label = document.getElementById("vp0label");
        tmp = parseFloat(this.value);
        vp0label.innerHTML = "V<sub>p0</sub> = " + tmp.toFixed(2);
        if (mag) draw1();
        if (re) draw2();
    };

    var t = document.getElementById("t");
    t.innerHTML = t.value;
    t.oninput = function() {
        t.innerHTML = this.value;
        t1 = parseFloat(this.value);
        var tlabel = document.getElementById("tlabel");
        tmp = parseFloat(this.value);
        tlabel.innerHTML = "t = " + tmp.toFixed(2);
        if (mag) draw1();
        if (re) draw2();
    };



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
      if (canvas.height > innerHeight){
        canvas.height = innerHeight-50
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
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1; 
        ctx.clearRect(0, 0, cw, ch);
        kinc1 = .1;
        vp01 = 1;
        a1 = 1;
        t1 = 0;
        var pack = new Packet(45.0, 55.0, kinc1, 0.0, 50.0, 1.0, 1.0);
        var sw = new Sweep();
        var sets = sw.sweep(pack.packet.bind(pack), -20, 20, .1)
        graph = new Graph(ctx);
        graph.plot(sets[0],sets[1], "rgb(203, 100, 100)")

        var pack = new Packet(45.0, 55.0, .5, 0.0, 50.0, 1.0, 1.0);
        var sets = sw.sweep(pack.packet.bind(pack), -20, 20, .1)
        graph.plot(sets[0],sets[1], "rgb(100, 200, 100)")
        graph.graph();

        var pack = new Packet(45.0, 55.0, .315, 0.0, 50.0, 1.0, 1.0);
        var sets = sw.sweep(pack.packet.bind(pack), -20, 20, .1)
        graph.plot(sets[0], sets[1], "rgb(100, 100, 200)")
        graph.graph();
  }

  setTimeout(function(){
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
  },0);
})();