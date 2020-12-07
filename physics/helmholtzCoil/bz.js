function BZ(R, D) {
    this.R = R;
    this.D = D;

    this.bz = function (z) {
        Vpermitivity = 1.2566370614e-6;
        return (Vpermitivity*this.R*this.R)/(2.0*Math.pow((this.R*this.R + (.01*z-this.D)*(.01*z-this.D)), 1.5))+(Vpermitivity*this.R*this.R)/(2.0*Math.pow((this.R*this.R + (.01*z+this.D)*(.01*z+this.D)), 1.5));
    }

    this.bzDraw = function(graph, min, max) {
        var sw = new Sweep()
        var set = sw.sweep(this.bz.bind(this), min, max, .01);
        graph.plot(set[0],set[1], "rgb(100, 200, 100)");
    }
}