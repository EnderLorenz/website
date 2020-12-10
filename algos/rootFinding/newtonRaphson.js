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
        return([x]);
    }

    this.newtonRaphsonStepDraw = function(guess, graph) {
        let sw, tanLine, set;
        this.func.fDraw(graph);
        graph.dottedLine(guess, 0, guess, this.func.f(guess), "rgb(3, 100, 100)");
        graph.point([guess], [0], "rgb(60, 200, 200)", 4);//est-zero
        graph.point([guess], [this.func.f(guess)], "rgb(90, 90, 200)", 4);//func(est)
        tanLine = new Line(this.func.fP(guess, 1.0e-8), guess, this.func.f(guess));//tangent line
        sw = new Sweep(tanLine);
        set = sw.sweep(tanLine, graph.xRange[0], graph.xRange[1], .01)
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