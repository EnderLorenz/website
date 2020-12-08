function Exponential(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.exponential = function (x) {
        return a * Math.exp(b*x) + c;
    }

    this.exponentialDraw = function(graph, min, max, color) {
        var sw = new Sweep();
        var set = sw.sweep(this.exponential.bind(this), min, max, .1);
        graph.plot(set[0],set[1], color);
    }
}

