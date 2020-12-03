function Packet(kstart, kstop, kinc, t, k0, vp0, a) {
    this.kstart = kstart;
    this.kstop = kstop;
    this.kinc = kinc;
    this.t = t;
    this.k0 = k0;
    this.vp0 = vp0;
    this.a = a;
    
    this.packet = function(x) {
        b = vp0 / this.k0
        real = 0.0
        imag = 0.0
        k = this.kstart
        while (((this.kinc > 0.0) && (k < this.kstop)) || ((this.kinc < 0.0) && (k > this.kstop))) {
            kp = k - this.k0
            omega = b * k * k
            A = Math.exp(-this.a*this.a*kp*kp)
            real += A * Math.cos(k * x - omega * this.t)
            imag += A * Math.sin(k * x - omega * this.t)
            k = k + this.kinc
        }
        return(real * real + imag * imag)
    }

    this.packetRe = function(x) {
        b = vp0 / this.k0
        real = 0.0
        imag = 0.0
        k = this.kstart
        while (((this.kinc > 0.0) && (k < this.kstop)) || ((this.kinc < 0.0) && (k > this.kstop))) {
            kp = k - this.k0
            omega = b * k * k
            A = Math.exp(-this.a*this.a*kp*kp)
            real += A * Math.cos(k * x - omega * this.t)
            imag += A * Math.sin(k * x - omega * this.t)
            k = k + this.kinc
        }
        return(real)
    }

    this.packetIm = function(x) {
        b = vp0 / this.k0
        real = 0.0
        imag = 0.0
        k = this.kstart
        while (((this.kinc > 0.0) && (k < this.kstop)) || ((this.kinc < 0.0) && (k > this.kstop))) {
            kp = k - this.k0
            omega = b * k * k
            A = Math.exp(-this.a*this.a*kp*kp)
            real += A * Math.cos(k * x - omega * this.t)
            imag += A * Math.sin(k * x - omega * this.t)
            k = k + this.kinc
        }
        return(imag)
    }
}
