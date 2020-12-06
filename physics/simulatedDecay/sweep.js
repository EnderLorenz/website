function Sweep() {
    this.sweep = function(func, xStart, xStop, xInc) {
        var xSet = [];
        var ySet = [];
        xStop += (xInc * 0.5);
        x = xStart;
        while (((xInc > 0.0) && (x < xStop)) || ((xInc < 0.0) && (x > xStop))) {
            xSet.push(x);
            ySet.push(func(x));
            x += xInc;
        }
        return([xSet, ySet]);
    }
    
    this.sweepSwitch = function(func, xStart, xStop, xInc) {
        var xSet = [];
        var ySet = [];
        xStop += (xInc * 0.5);
        x = xStart;
        while (((xInc > 0.0) && (x < xStop)) || ((xInc < 0.0) && (x > xStop))) {
            xSet.push(x);
            ySet.push(func(x));
            x += xInc;
        }
        return([ySet, xSet]);
    }
}