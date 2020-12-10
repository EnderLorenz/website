class Sweep { 
    constructor(func) {
        this.func = func;
    }

    sweep = function(func, xStart, xStop, xInc) {
        let xSet = [];
        let ySet = [];
        xStop += (xInc * 0.5);
        let x = xStart;
        while (((xInc > 0.0) && (x < xStop)) || ((xInc < 0.0) && (x > xStop))) {
            xSet.push(x);
            ySet.push(this.func.f(x));
            x += xInc;
        }
        return([xSet, ySet]);
    }
    
    sweepSwitch = function(func, xStart, xStop, xInc) {
        let xSet = [];
        let ySet = [];
        xStop += (xInc * 0.5);
        let x = xStart;
        while (((xInc > 0.0) && (x < xStop)) || ((xInc < 0.0) && (x > xStop))) {
            xSet.push(x);
            ySet.push(this.func.f(x));
            x += xInc;
        }
        return([ySet, xSet]);
    }
}