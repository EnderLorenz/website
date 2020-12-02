function draw1() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);
    var diff = new Diffraction(1.0,D01,D11,lambda1,xSrc1);
    var sw = new Sweep();
    var sets = sw.sweep(diff.diffraction.bind(diff), -10, 10, .2)
    graph = new Graph(ctx);
    graph.plot(sets[0],sets[1], "rgb(203, 100, 100)")
    graph.graph();
}

function draw2() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);
    var diff = new Diffraction(1.0,D01,D11,lambda1,xSrc1,lambda21,xSrc21);
    var sw = new Sweep();
    var sets = sw.sweep(diff.diffraction2.bind(diff), -10, 10, .1)
    graph = new Graph(ctx);
    graph.plot(sets[0],sets[1], "rgb(203, 100, 100)")
    graph.graph();
}

function draw3() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, ch);
    var diff = new Diffraction(1.0,D01,D11,lambda1,xSrc1,lambda21,xSrc21);
    var sw = new Sweep();
    var sets = sw.sweep(diff.diffractionDouble.bind(diff), -10, 10, .01)
    graph = new Graph(ctx);
    graph.plot(sets[0],sets[1], "rgb(203, 100, 100)")
    graph.graph();
}

var cw, ch, canvas, ctx, mouse, globalTime = 0, firstRun = true, middle;
var lambda1, D01, D11, xSrc1, lambda21, xSrc21, onePoint, twoPoints, double;
onePoint = true;
twoPoints = false;
double = false;



    var D0 = document.getElementById("D0");
    D0.innerHTML = D0.value;
    D0.oninput = function() {
        D0.innerHTML = this.value;
        D01 = this.value;
        var D0label = document.getElementById("D0label");
        tmp = parseFloat(this.value);
        D0label.innerHTML = "D0 = " + tmp.toFixed(2);
        if(onePoint) draw1();
        if(twoPoints) draw2();
        if(double) draw3();
    };

    var D1 = document.getElementById("D1");
    D1.innerHTML = D1.value;
    D1.oninput = function() {
        D1.innerHTML = this.value;
        D11 = this.value;
        var D1label = document.getElementById("D1label");
        tmp = parseFloat(this.value);
        D1label.innerHTML = "D1 = " + tmp.toFixed(2);
        if(onePoint) draw1();
        if(twoPoints) draw2();
        if(double) draw3();
    };

    var lambda = document.getElementById("lambda");
    lambda.innerHTML = lambda.value;
    lambda.oninput = function() {
        lambda.innerHTML = this.value;
        lambda1 = this.value;
        var lambdalabel = document.getElementById("lambdalabel");
        tmp = parseFloat(this.value);
        lambdalabel.innerHTML = "&lambda;<sub>1</sub> = " + tmp.toFixed(2);
        if(onePoint) draw1();
        if(twoPoints) draw2(); 
        if(double) draw3();       
    };

    var xSrc = document.getElementById("xSrc");
    xSrc.innerHTML = xSrc.value;
    xSrc.oninput = function() {
        xSrc.innerHTML = this.value;
        xSrc1 = this.value;
        var xSrclabel = document.getElementById("xSrclabel");
        tmp = parseFloat(this.value);
        xSrclabel.innerHTML = "x-src<sub>1</sub> = " + tmp.toFixed(2);
        if(onePoint) draw1();
        if(twoPoints) draw2();
        if(double) draw3();
    };

    var lambda2 = document.getElementById("lambda2");
    lambda2.innerHTML = lambda2.value;
    lambda2.oninput = function() {
        lambda2.innerHTML = this.value;
        lambda21 = this.value;
        var lambda2label = document.getElementById("lambda2label");
        tmp = parseFloat(this.value);
        lambda2label.innerHTML = "&lambda;<sub>2</sub> = " + tmp.toFixed(2);
        if(twoPoints) draw2();        
    };

    var xSrc2 = document.getElementById("xSrc2");
    xSrc2.innerHTML = xSrc2.value;
    xSrc2.oninput = function() {
        xSrc2.innerHTML = this.value;
        xSrc21 = this.value;
        var xSrc2label = document.getElementById("xSrc2label");
        tmp = parseFloat(this.value);
        xSrc2label.innerHTML = "x-src<sub>2</sub> = " + tmp.toFixed(2);
        if(twoPoints) draw2();
    };

    function twoButton() {
        if (!twoPoints) {
            twoPoints = true;
            onePoint = false;
            double = false;
            lambda21 = .25;
            xSrc21 = -3.0;
            xSrc1 = 3.0;
            draw2()
        }
    }

    function oneButton() {
        if (!onePoint) {
            onePoint = true;
            twoPoints = false;
            double = false;
            draw1();
        }
    }

    function doubleButton() {
        if (!double) {
            onePoint = false;
            twoPoints = false;
            double = true;
            draw3();
        }
    }
    // function twoButton() {
    //     if (!twoPoints) {
    //         twoPoints = true;
    //         var newDiv = document.createElement('div');
    //         newDiv.setAttribute('class', 'button');
    //         newDiv.setAttribute('id', 'secondSource');
    //         document.getElementById("buttons").appendChild(newDiv);
    //         var newSlider = document.createElement('input');
    //         newSlider.setAttribute('type', 'range');
    //         newSlider.setAttribute('min', '.01');
    //         newSlider.setAttribute('max', '1.0');
    //         newSlider.setAttribute('value', '.25');
    //         newSlider.setAttribute('step', '0.01');
    //         newSlider.setAttribute('id', 'lambda2')
    //         newDiv.appendChild(newSlider);
    //         var newLabel = document.createElement('label')
    //         newLabel.setAttribute('id', 'lambda2label');
    //         newLabel.innerHTML = "&lambda;<sub>2</sub> = 0.25"
    //         newDiv.appendChild(newLabel);


    //         var newDiv = document.createElement('div');
    //         newDiv.setAttribute('class', 'button');
    //         newDiv.setAttribute('id', 'secondSource');
    //         document.getElementById("buttons").appendChild(newDiv);
    //         var newSlider = document.createElement('input');
    //         newSlider.setAttribute('type', 'range');
    //         newSlider.setAttribute('min', '-5');
    //         newSlider.setAttribute('max', '5');
    //         newSlider.setAttribute('value', '-1');
    //         newSlider.setAttribute('step', '0.01');
    //         newSlider.setAttribute('id', 'xsrc2')
    //         newDiv.appendChild(newSlider);
    //         var newLabel = document.createElement('label')
    //         newLabel.setAttribute('id', 'xsrc2label');
    //         newLabel.innerHTML = "x-src<sub>2</sub> = 0.25"
    //         newDiv.appendChild(newLabel);
    //     }
    // }


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
      lambda1 = .25;
      D01 = 15.0;
      D11 = 15.0;
      xSrc1 = 0.0;
      var diff = new Diffraction(1.0, 50, D11, lambda1, xSrc1);
      var sw = new Sweep();
      var sets = sw.sweep(diff.diffraction.bind(diff), -15, 15, .2)
      graph = new Graph(ctx);  
      graph.plot(sets[0],sets[1], "rgb(203, 100, 100)")
      graph.graph();
  }

//   function update(timer) { // Main update loop
//       if(ctx === undefined){
//           return;
//       }
//     //   globalTime = timer;
//     //   display();
//     //   requestAnimationFrame(update);
//   }
  setTimeout(function(){
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    //   requestAnimationFrame(update);
  },0);
})();