function Secant(func) {
    this.func = func;

    this.secant = function(a, b, nmax, tol) {
        var fa, fb, d, swap, n;
        fa = this.func.f(a);
        fb = this.func.f(b);
        n = 2;
        while (n <= nmax) {
            if (Math.abs(fa) > Math.abs(fb)) {  /*  arrange so |f(b)| > |f(a)|  */
                swap = a;
                a = b;
                b = swap;
                swap = fa;
                fa = fb;
                fb = swap;
            }
            d = ((b - a) / (fb - fa)) * fa;
            if (Math.abs(d) < tol) {
                console.log(a, b, fa, fb);
                return 0;
            }
            b = a;
            fb = fa;
            a = a - d;
            fa = this.func.f(a);
            n++;
        }
        if (n > nmax) {
            console.log("secant: Iteration limit of %d reached\n",nmax);
            return 0;
        }
        
    }

    this.secantStep = function(a, b) {
        var fa, fb, d, swap;
        fa = this.func.f(a);
        fb = this.func.f(b);
        if (Math.abs(fa) > Math.abs(fb)) {  /*  arrange so |f(b)| > |f(a)|  */
            swap = a;
            a = b;
            b = swap;
            swap = fa;
            fa = fb;
            fb = swap;
        }
        d = ((b - a) / (fb - fa)) * fa;
        b = a;
        fb = fa;
        a = a - d;
        fa = this.func.f(a);//res

        console.log(a, b, fa, fb, (fb - fa))
        return([a, b, fa, fb, (fb - fa)]);
    }


    this.secantDrawStep = function(a, b) {
        var fa, fb, d, swap;
        fa = this.func.f(a);
        fb = this.func.f(b);
        var sw = new Sweep();
        this.func.fDraw(graph)

        var verticleLine = new Line(0, 0, a);
        if (this.func.f(a) <= 0) var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), this.func.f(a), -0.1, .1);//line to func(est)
        else var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0.1, this.func.f(a), .1);//line to func(est)
        graph.point(set[0],set[1], "rgb(3, 100, 100)", .5);
        graph.point([a], [0], "rgb(60, 200, 200)", 4);//a-zero
        graph.point([a], [this.func.f(a)], "rgb(60, 200, 200)", 4);//func(a)
        
        var verticleLine = new Line(0, 0, b);
        if (this.func.f(b) <= 0) var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), this.func.f(b), -0.1, .1);//line to func(est)
        else var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0.1, this.func.f(b), .1);//line to func(est)
        graph.point(set[0],set[1], "rgb(3, 100, 100)", .5);
        graph.point([b], [0], "rgb(60, 100, 100)", 4);//b-zero
        graph.point([b], [this.func.f(b)], "rgb(60, 100, 100)", 4);//func(b)

        if (Math.abs(fa) > Math.abs(fb)) {  /*  arrange so |f(b)| > |f(a)|  */
            swap = a;
            a = b;
            b = swap;
            swap = fa;
            fa = fb;
            fb = swap;

            var verticleLine = new Line(0, 0, a);
            console.log(this.func.f(a))
            if (this.func.f(a) <= 0) var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0, this.func.f(a), .1);//line to func(est)
            else var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0, this.func.f(a), .1);//line to func(est)
            graph.point(set[0],set[1], "rgb(3, 100, 100)", .5);
            graph.point([a], [0], "rgb(60, 200, 200)", 4);//a-zero
            graph.point([a], [this.func.f(a)], "rgb(60, 200, 200)", 4);//func(a)

            var verticleLine = new Line(0, 0, b);
            if (this.func.f(b) <= 0) var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0, this.func.f(b) + .2, .1);//line to func(est)
            else var set = sw.sweepSwitch(verticleLine.line.bind(verticleLine), 0, this.func.f(b), .1);//line to func(est)
            graph.point(set[0],set[1], "rgb(3, 100, 100)", .5);
            graph.point([b], [0], "rgb(60, 100, 100)", 4);//b-zero
            graph.point([b], [this.func.f(b)], "rgb(60, 100, 100)", 4);//func(b)
        }

        secM = ((fb - fa)/(b - a))
        var secLine = new Line(secM, a, fa);//sec line
        var set = sw.sweep(secLine.line.bind(secLine), graph.xRange[0], graph.xRange[1], .01)
        graph.plot(set[0],set[1], "rgb(3, 100, 100)");//sec line

        d = ((b - a) / (fb - fa)) * fa;
        b = a;
        fb = fa;
        a = a - d;
        fa = this.func.f(a);

        graph.point([a], [0.0], "rgb(200, 0, 0)", 4);//new zero
        graph.graph();

        return([a, b, fa, fb, (fb - fa)]);
    }

}