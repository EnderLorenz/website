class Bisection {
    constructor(func) {
        this.func = func;
    }
    
    bisection = function(a, b, nmax, tol) {
        let fa, fb, c, fc, d, n;
          
        fa = this.func.f(a);
        fb = this.func.f(b);
        if (fa * fb > 0.0) {
            console.log("bisection: Root not bracketed by initial points");
            return(2);
        }
        console.log(0,b,fb);
        console.log(1,a,fa);
        n = 2;
        while (n <= nmax) {
            d = 0.5 * (b - a);
            if (Math.abs(d) < tol) break;
            c = a + d;
            fc = this.func.f(c);
            console.log(n,c,fc);
            if (fa * fc < 0.0) {
                b = c;
                fb = fc;
            }
            else {
                a = c;
                fa = fc;
            }
            n++;
        }
        if (n > nmax) {
            console.log("bisection: Iteration limit of %d reached\n",nmax);
            return(1);
        }
        return(0);
    }

    bisectionStep = function(a, b) {
        let fa, fb, c, fc, d;
        fa = this.func.f(a);
        fb = this.func.f(b);
        d = 0.5 * (b - a);
        c = a + d;
        fc = this.func.f(c);
        console.log(c,fc,a,b,fa,fb);
        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            return [b, a, fb, fa]
        }
        else {
            a = c;
            fa = fc;
            return [a, b, fa, fb]
        }
    }

    bisectionDrawStep = function(a, b) {
        let fa, fb, c, fc, d;
        fa = this.func.f(a);
        fb = this.func.f(b);
        d = 0.5 * (b - a);
        c = a + d;
        fc = this.func.f(c);
        
        this.func.fDraw(graph)
        graph.dottedLine(a, 0, a, this.func.f(a), "rgb(3, 100, 100)");
        graph.point([a], [0], "rgb(60, 200, 200)", 4);//a-zero
        graph.point([a], [this.func.f(a)], "rgb(60, 200, 200)", 4);//func(a)
        graph.dottedLine(b, 0, b, this.func.f(b), "rgb(3, 100, 100)");
        graph.point([b], [0], "rgb(60, 100, 100)", 4);//b-zero
        graph.point([b], [this.func.f(b)], "rgb(60, 100, 100)", 4);//func(b)
        graph.point([c], [0.0], "rgb(200, 0, 0)", 4);//new zero
        graph.graph();

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            return [b, a, fb, fa]
        } else {
            a = c;
            fa = fc;
            return [a, b, fa, fb]
        }
    }
}