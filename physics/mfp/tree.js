function Tree(min, max) {
    this.dist = max + 1;
    while (this.dist > max) {
        this.x = (max-min)*Math.random()+min;
        this.y = (max-min)*Math.random()+min;
        this.dist = Math.sqrt(this.x*this.x + this.y*this.y);
    }
    
    
    this.show = function(graph) {
        graph.point([this.x], [this.y], "rgb(10, 100, 10)", 1);
    }
}