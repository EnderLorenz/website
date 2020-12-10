class Line {
    constructor(m, x1, y1) {
        this.m = m
        this.x1 = x1;
        this.y1 = y1;
    }

    f = function(x) {
        return this.m*(x - this.x1) + this.y1;
    }
    
}