function NewtonRaphson(func, min) {
    this.func = func;
    this.min = min;

    this.newtonRaphson = function(x, nmax, tol, min) {
        var fx, fp, d, n;
        fx = this.func.f(x);
        console.log("0 ", x, fx);
        n = 1;
        while (n <= nmax) {
            fp = this.func.fP(x);
            if (Math.abs(fp) < min) {
              console.log("newton_raphson: Derivative too small");
              return(2);
            }
            d =  fx / fp;
            x = x - d;
            fx = this.func.f(x);
            console.log(n, x, fx);
            if (Math.abs(d) < tol) break;
            n++;
          }
          if (n > nmax) {
            console.log("newton_raphson: Iteration limit of %d reached: ", nmax);
            return(1);
        }
        return(0);
    }

    this.newtonRaphsonStep = function(x, tol, min) {
        var fx, fp, d;
        fx = this.func.f(x);
        fp = this.func.fP(x);
        if (Math.abs(fp) < min) {
            console.log("newton_raphson: Derivative too small");
            return(2);
        }
        d =  fx / fp;
        x = x - d;
        fx = this.func.f(x);
        if (Math.abs(d) < tol) return(1);
        return([fp, x, fx, d]);
    }

    this.newtonRaphsonStepDraw = function(guess, graph) {
        var sw = new Sweep();
        this.func.fDraw(graph)
        
        var verticleLine = new Line(0, 0, guess);
        if (this.func.f(guess) <= 0) var set3 = sw.sweepSwitch(verticleLine.line.bind(verticleLine), this.func.f(guess), -0.1, .6);//line to func(est)
        else var set3 = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0.1, this.func.f(guess), .6);//line to func(est)
        graph.point(set3[0],set3[1], "rgb(3, 100, 100)", .5);
        graph.point([guess], [0], "rgb(60, 200, 200)", 4);//est-zero
        graph.point([guess], [this.func.f(guess)], "rgb(90, 90, 200)", 4);//func(est)

        var tanLine = new Line(this.func.fP(guess, 1.0e-8), guess, this.func.f(guess));//tangent line
        var set = sw.sweep(tanLine.line.bind(tanLine), graph.xRange[0], graph.xRange[1], .01)
        graph.plot(set[0],set[1], "rgb(3, 100, 100)");//tangent line
        if (Math.abs(this.func.fP(guess, 1.0e-8)) < min) {
            console.log("newton_raphson: Derivative too small");
            return(2);
        }
        guess -= this.func.f(guess)/this.func.fP(guess, 1.0e-8);
        graph.point([guess], [0.0], "rgb(200, 0, 0)", 4);//new zero
        graph.graph();

        return guess;
    }
}