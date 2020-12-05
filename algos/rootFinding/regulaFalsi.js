function RegulaFalsi(func) {
    this.func = func;
    
    this.regulaFalsi = function(a, b, nmax, tol) {
        var fa, fb, c, cprev, fc, n, keep, keepF;
        fa = this.func.f(a);
        fb = this.func.f(b);

        if (fa * fb > 0.0) {
            console.log("regula_falsi: Root not bracketed by initial points");
            return(2);
        }
        n = 2;
        while (n <= nmax) {
            if (n == 2) c = (fb * a - fa * b) / (fb - fa);
            else {
                cprev = c;
                c = (fb * a - fa * b) / (fb - fa);
                if (Math.abs(c - cprev) < tol) break;
            }
            fc = this.func.f(c);
            if (fa * fc < 0.0) {
                b = c;
                fb = fc;
                keep = a;
                keepF = fa;
            }
            else {
                a = c;
                fa = fc;
                keep = b;
                keepF = fb;
            }
            n++;
        }
        if (n > nmax) {
            console.log("regula_falsi: Iteration limit of %d reached", nmax);
            return(1);
        }
        console.log(c, keep, fc, keepF);
        return([c, keep, fc, keepF]);
    }

    this.regulaFalsiStep = function(a, b) {
        var fa,fb,c,fc,keep,keepF;
        fa = this.func.f(a);
        fb = this.func.f(b);

        if (fa * fb > 0.0) {
            console.log("regula_falsi: Root not bracketed by initial points");
            return(2);
        }
        c = (fb * a - fa * b) / (fb - fa);
        fc = this.func.f(c);
        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            keep = a;
            keepF = fa;
        }
        else {
            a = c;
            fa = fc;
            keep = b;
            keepF = fb;
        }
        return([c, keep, fc, keepF]);
    }

    this.regulaFalsiDrawStep = function(a, b) {
        var fa,fb,c,fc,keep,keepF;
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

        secM = ((fb - fa)/(b - a))
        var secLine = new Line(secM, a, fa);//sec line
        var set = sw.sweep(secLine.line.bind(secLine), graph.xRange[0], graph.xRange[1], .01)
        graph.plot(set[0],set[1], "rgb(3, 100, 100)");//sec line

        
        c = (fb * a - fa * b) / (fb - fa);
        fc = this.func.f(c);
        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            keep = a;
            keepF = fa;
        }
        else {
            a = c;
            fa = fc;
            keep = b;
            keepF = fb;
        }
        graph.point([c], [0.0], "rgb(200, 0, 0)", 4);//new zero
        graph.graph();
        return([c, keep, fc, keepF]);
    }
}