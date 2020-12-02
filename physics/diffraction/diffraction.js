function Diffraction(w, D0, D1, lambda1, xSrc, lambda2, xSrc2) {
    this.w = w;
    this.D0 = D0;
    this.D1 = D1;
    this.lambda1 = lambda1;
    this.xSrc = xSrc;
    this.lambda2 = lambda2;
    this.xSrc2 = xSrc2;
    
    this.diffraction = function(x) {
        h = this.w * 1.0e-3;
        x1 = -0.5 * this.w;
        sumEi = 0.0;
        sumEq = 0.0;
        while (x1 < (0.5 * (this.w + h))) {
            d1 = Math.sqrt(((x - x1) * (x - x1)) + (this.D1 * this.D1));
            d0 = Math.sqrt(((x1 - this.xSrc) * (x1 - this.xSrc)) + (this.D0 * this.D0));
            d = d0 + d1;
            phi = 2.0*Math.PI * (d - this.D1 - this.D0) / this.lambda1;
            sumEi += Math.cos(phi);
            sumEq += Math.sin(phi);
            x1 += h;
        }
        return(((sumEi * sumEi) + (sumEq * sumEq)) * h * h / (this.w * this.w))
    }

    this.diffraction2 = function(x) {
        h = this.w * 1.0e-3
        x1 = -0.5 * this.w
        sumEi = 0.0;
        sumEq = 0.0;
        while (x1 < (0.5 * (this.w + h))) {
            d1 = Math.sqrt(((x - x1) * (x - x1)) + (this.D1 * this.D1))
            d0 = Math.sqrt(((x1 - this.xSrc) * (x1 - this.xSrc)) + (this.D0 * this.D0))
            d = d0 + d1
            phi = 2.0*Math.PI * (d - this.D1 - this.D0) / this.lambda1
            sumEi += Math.cos(phi)
            sumEq += Math.sin(phi)
            d0 = Math.sqrt(((x1 - this.xSrc2) * (x1 - this.xSrc2)) + (this.D0 * this.D0));
            d = d0 + d1;
            phi = 2.0*Math.PI * (d - this.D1 - this.D0) / this.lambda2;
            sumEi += Math.cos(phi);
            sumEq += Math.sin(phi);
            x1 += h;
        }
        return(((sumEi * sumEi) + (sumEq * sumEq)) * h * h / (this.w * this.w))
    }

    this.diffractionDouble = function(x) {
        h = this.w * 1.0e-3;
        x1 = -0.5 * this.w;
        split = 0.3;
        sumEi = 0.0;
        sumEq = 0.0;
        while (x1 < (0.5 * (this.w + h))) {
            if(x1 <= (-0.5*(split)) || x1 >=   0.5*split) {
                d1 = Math.sqrt(((x - x1) * (x - x1)) + (this.D1 * this.D1));
                d0 = Math.sqrt(((x1 - this.xSrc) * (x1 - this.xSrc)) + (this.D0 * this.D0));
                d = d0 + d1;
                phi = 2.0*Math.PI * (d - this.D1 - this.D0) / this.lambda1;
                sumEi += Math.cos(phi);
                sumEq += Math.sin(phi);
                
            } 
            x1 += h;
        }
        return(((sumEi * sumEi) + (sumEq * sumEq)) * h * h / (this.w * this.w))
    }

}
