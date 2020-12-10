class Function {
    constructor(form) {
        this.form = form;
    }
    
    f = function (x) {
        if (this.form) return eval(this.form);
        return Math.sin(x);
    }

    fP = function(x, h) {
        return (-this.f(x + 2*h) + 8*this.f(x + h) - 8*this.f(x - h) + this.f(x - 2*h))/(12*h);
    }

    fDraw = function(graph) {
        let zeroLine, set, sw;
        if (graph.yRange[0]*graph.yRange[1] < 0) {
            zeroLine = new Line(0, 0, 0);
            sw = new Sweep(zeroLine);
            set = sw.sweep(zeroLine, graph.xRange[0], graph.xRange[1], .01);
            graph.plot(set[0], set[1], "black");
        }
        sw = new Sweep(this);
        set = sw.sweep(this, graph.xRange[0], graph.xRange[1], .01);
        graph.plot(set[0],set[1], "rgb(100, 200, 100)");
    }
}