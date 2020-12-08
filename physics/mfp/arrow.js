function Arrow() {
    this.angle = Math.PI/2.0*Math.random();
    this.m = Math.tan(this.angle);
    this.dist = nSize;
    this.hitX;
    this.hitY;
    this.arrow = function(x) {
        return this.m*x;
    }

    this.show = function(graph) {
        if(this.hitX)
            graph.plot([0, this.hitX], [0, this.hitY], "rgb(" + 255*Math.random() + "," + 255*Math.random() + "," + 255*Math.random() + ")");
        else
            graph.plot([0, this.dist*Math.sin(this.angle)], [0, this.dist*Math.cos(this.angle)], "black");
    }

}