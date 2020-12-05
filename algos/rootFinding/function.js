function Function(form) {
    this.form = form;
    this.f = function (x) {
        if (this.form) return eval(this.form);
        return Math.sin(x);
    }

    this.fP = function(x, h) {
        return (-this.f(x + 2*h) + 8*this.f(x + h) - 8*this.f(x - h) + this.f(x - 2*h))/(12*h);
    }

    this.fDraw = function(graph) {
        var sw = new Sweep();
        if (graph.yRange[0]*graph.yRange[1] < 0) {
            var zeroLine = new Line(0, 0, 0);
            var set = sw.sweep(zeroLine.line.bind(zeroLine), graph.xRange[0], graph.xRange[1], .01);
            graph.plot(set[0], set[1], "black");
        }
        var set = sw.sweep(this.f.bind(this), graph.xRange[0], graph.xRange[1], .01);
        graph.plot(set[0],set[1], "rgb(100, 200, 100)");
    }
}