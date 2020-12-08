function Lsq(x, y) {
    this.x = x;
    this.y = y;
    this.lsq = function() {
        var sxlny, slny, sx2, sx, n;
        sxlny = 0;
        slny = 0;
        sx2 = 0;
        sx = 0;
        n = this.x.length
        for (var i = 0; i < x.length; i++) {
            if (y[i] == 0) y[i] = 1;
            sxlny += x[i]*Math.log(y[i]);
            slny += Math.log(y[i]);
            sx2 += x[i]*x[i];
            sx += x[i];
        }
        return [Math.exp((slny*sx2 - sx*sxlny)/(n*sx2 - sx*sx)), (n*sxlny - sx*slny)/(n*sx2 - sx*sx)]
    }

    this.wlsq = function() {
        var sxlny, sx2y, sxy, slny, sx2, sx, sy, sylny, sxylny;
        sxlny = 0.0;
        sx2y = 0.0;
        sxy = 0.0;
        slny = 0.0;
        sx2 = 0.0;
        sx = 0.0;
        sy = 0.0;
        sylny = 0.0;
        sxylny = 0.0;
        for (var i = 0; i < x.length; i++) {
            if (y[i] == 0) y[i] = 1;
            sxlny += x[i]*Math.log(y[i]);
            sx2y += x[i]*x[i]*y[i];
            sxy += x[i]*y[i];
            slny += Math.log(y[i]);
            sx2 += x[i]*x[i];
            sx += x[i];
            sy += y[i];
            sylny += y[i]*Math.log(y[i]);
            sxylny += x[i]*y[i]*Math.log(y[i]);
        }
        return [Math.exp((sx2y*sylny - sxy*sxylny)/(sy*sx2y-sxy*sxy)),
                   (-(sxy*sylny)+sy*sxylny)/(sy*sx2y - (sxy*sxy))];
    }
}