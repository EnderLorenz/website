function Bin(data, width) {
    this.data = data;
    this.width = width;
    this.min = Number.MAX_VALUE;
    this.max = -Number.MAX_VALUE;
    this.bins = [];
    this.freq = [];
    for(var i = 0; i < data.length; i++) {
        if (data[i] < this.min) this.min = data[i];
        if (data[i] > this.max) this.max = data[i];
    }

    this.round = function(x, step) {
        return Math.round(x/step)*step;
    }

    this.bin = function() {
        start = this.round(this.min, this.width)
        end = this.round(this.max, this.width)
        var i = 0;
        while (i*width <= end) {
            this.bins.push(i*this.width);
            this.freq.push(0);
            for (var j = 0; j < this.data.length; j++) {
                if (this.data[j] >= i*this.width && this.data[j] < i*this.width+this.width)
                    this.freq[i]++;
            }
            
            i ++;
        }
        return [this.bins, this.freq]
    }
}