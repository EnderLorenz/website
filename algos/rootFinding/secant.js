class Secant {
    constructor(func) {
        this.func = func;
    }
    
    secant = function(a, b, nmax, tol) {
        let fa, fb, d, swap, n;
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

    secantStep = function(a, b) {
        let fa, fb, d, swap;
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


    secantDrawStep = function(a, b) {
        let fa, fb, d, swap, sw, secM, secLine, set;
        fa = this.func.f(a);
        fb = this.func.f(b);
        this.func.fDraw(graph)
        graph.dottedLine(a, 0, a, this.func.f(a), "rgb(3, 100, 100)");
        graph.point([a], [0], "rgb(60, 200, 200)", 4);//a-zero
        graph.point([a], [this.func.f(a)], "rgb(60, 200, 200)", 4);//func(a)
        graph.dottedLine(b, 0, b, this.func.f(b), "rgb(3, 100, 100)");
        graph.point([b], [0], "rgb(60, 100, 100)", 4);//b-zero
        graph.point([b], [this.func.f(b)], "rgb(60, 100, 100)", 4);//func(b)       

        if (Math.abs(fa) > Math.abs(fb)) {  /*  arrange so |f(b)| > |f(a)|  */
            swap = a;
            a = b;
            b = swap;
            swap = fa;
            fa = fb;
            fb = swap;
            graph.dottedLine(a, 0, a, this.func.f(a), "rgb(3, 100, 100)");
            graph.point([a], [0], "rgb(60, 200, 200)", 4);//a-zero
            graph.point([a], [this.func.f(a)], "rgb(60, 200, 200)", 4);//func(a)
            graph.dottedLine(b, 0, b, this.func.f(b), "rgb(3, 100, 100)");
            graph.point([b], [0], "rgb(60, 100, 100)", 4);//b-zero
            graph.point([b], [this.func.f(b)], "rgb(60, 100, 100)", 4);//func(b) 
        }
        secM = ((fb - fa)/(b - a))
        secLine = new Line(secM, a, fa);//sec line
        sw = new Sweep(secLine);
        set = sw.sweep(secLine, graph.xRange[0], graph.xRange[1], .01)
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