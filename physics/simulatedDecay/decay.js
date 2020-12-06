function Decay(lambda, init) {
    this.lambda = lambda;
    this.init = init;
    this.x = [];
    this.y = [];
    this.logY = [];

    this.decay = function() {
        var time, remaining, decay, i;
        time = 0;
        remaining = this.init;
        lam = this.lambda;
        while (remaining > 0) {
            decay = 0;
            for (i = 1; i <= remaining; i++) {
                test = Math.random();
                if (test <= lam) {
                    decay += 1;
                }
            }
            // console.log(time, remaining, Math.log(remaining));
            this.x.push(time);
            this.y.push(remaining);
            this.logY.push(Math.log(remaining));
            remaining -= decay;
            time += 1;
        }
    }

    this.decayDraw = function(graph, color) {
        graph.point(decay.x, decay.y, "rgb(100, 20, 240)", 2);
    }
}