class Graph {
    constructor(ctx, xRange, yRange) {
        this.ctx = ctx;
        this.xMin = Number.MAX_VALUE;
        this.xMax = -Number.MAX_VALUE;
        this.yMin = Number.MAX_VALUE;
        this.yMax = -Number.MAX_VALUE;
        this.xRange = xRange;
        this.yRange = yRange;
        if (xRange && this.xRange.length > 1) {
            this.xMin = xRange[0];
            this.xMax = xRange[1];
        }
        if (yRange && this.yRange.length > 1) {
            this.yMin = yRange[0];
            this.yMax = yRange[1];
        }
        this.shift = 70;
        this.shift1 = 10;
        this.shift2 = 5;
        this.xGraph = [this.shift/2, cw - this.shift]
        this.yGraph = [this.shift/2, cw - this.shift]
        ctx.globalAlpha = 1; 
        ctx.clearRect(0, 0, cw, ch);
        this.dataRight = this.xGraph[1] - this.shift1 + this.shift/2;
        this.dataLeft = this.xGraph[0]+this.shift1;
        this.dataTop =  this.yGraph[0]+this.shift1;
        this.dataBottom = this.yGraph[0] + this.yGraph[1]-this.shift1;
    }

    prettyPrint = function(num) {
        if (num == 0) return parseFloat(0);
        if (Math.abs(Math.log10(num)) > 5) return num.toExponential(2)
        if (Math.abs(num >= 10)) return parseFloat(num.toFixed(2));
        if (Math.abs(num < 10 )) return parseFloat(num.toFixed(1));
    }
    
    dataCheck = function(xData, yData) {
        if (xData.length != yData.length) console.log("x,y Lengths do not match: x length = ", this.xData.length, " y length = ", this.yData.length)
        if (!this.xRange || this.xRange.length < 2 || !this.yRange || this.yRange.length < 2) {
            for (var k = 0; k < xData.length; k++) {
                if (xData[k] < this.xMin) this.xMin = xData[k];
                if (xData[k] > this.xMax) this.xMax = xData[k];
                if (yData[k] < this.yMin) this.yMin = yData[k];
                if (yData[k] > this.yMax) this.yMax = yData[k];
            }
        }
    }
    
    scale = function(num, in_min, in_max, out_min, out_max)  {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    scaleX = function(num)  {
        return this.scale(num, this.xMin, this.xMax, this.dataLeft, this.dataRight);
    }

    scaleY = function(num)  {
        return this.scale(num, this.yMin, this.yMax, this.dataBottom, this.dataTop);
    }

    graph = function() {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        let txtBottom = this.dataBottom + 5*this.shift2;
        let txtLeft = this.xGraph[0] - this.shift1;
        this.ctx.rect(this.xGraph[0], this.yGraph[0], this.xGraph[1], this.yGraph[1]);
        this.ctx.stroke();
        // 0, 0
        ctx.textAlign = "left";
        this.line(this.dataLeft, this.dataBottom + this.shift1, this.dataLeft, this.dataBottom);
        this.ctx.fillText(this.prettyPrint(this.xMin), this.dataLeft, txtBottom);
        // x_mid, y0 label
        ctx.textAlign = "center";
        this.line((this.dataLeft + this.dataRight)/2, this.dataBottom + this.shift1, (2*this.xGraph[0] + this.xGraph[1])/2, this.dataBottom);
        this.ctx.fillText( this.prettyPrint((this.xMin+this.xMax)/2), (2*this.xGraph[0] + this.xGraph[1])/2, txtBottom);
        // x_max, y0 label
        ctx.textAlign = "end";
        this.line(this.dataRight, this.dataBottom + this.shift1, this.dataRight, this.dataBottom);
        this.ctx.fillText(this.prettyPrint(this.xMax), this.dataRight, txtBottom);
        
        
        // x0,y_mid label
        this.line(this.xGraph[0], (this.yGraph[1]+2*this.yGraph[0])/2, this.xGraph[0]+this.shift1, (this.yGraph[1]+2*this.yGraph[0])/2)
        this.ctx.fillText(this.prettyPrint((this.yMin+this.yMax)/2), txtLeft, (this.yGraph[1]+2*this.yGraph[0])/2);
        // x0,y_max label
        this.line(this.xGraph[0], this.yGraph[0]+this.shift1, this.xGraph[0]+this.shift1, this.yGraph[0]+this.shift1)
        this.ctx.fillText(this.prettyPrint(this.yMax), txtLeft, this.yGraph[0]+this.shift1);
        // //x0,y_min label
        this.line(this.xGraph[0], this.yGraph[1] + this.yGraph[0] - this.shift1, this.xGraph[0]+this.shift1, this.yGraph[1] + this.yGraph[0] - this.shift1)
        this.ctx.fillText(this.prettyPrint(this.yMin), txtLeft, this.yGraph[1] + this.yGraph[0] - this.shift1);
    }

    line = function(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }

    plot = function(xData, yData, color) {
        let xNow, yNow, xPrev, yPrev, check = false;
        this.dataCheck(xData, yData);
        for(var i = 0; i < xData.length; i++) {
            if (yData[i] <= this.yMax && yData[i] >= this.yMin && 
                xData[i] <= this.xMax && xData[i] >= this.xMin) {
                xNow = this.scaleX(xData[i])
                yNow = this.scaleY(yData[i])
                if(i > 0 && !check) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(xNow, yNow);
                    this.ctx.lineTo(xPrev, yPrev);
                    this.ctx.strokeStyle = color;//
                    this.ctx.stroke();
                } 
                xPrev = xNow;
                yPrev = yNow;
                check = false;
            } else check = true;
        } 
    }

    point = function(xData, yData, color, size) {
        this.dataCheck(xData, yData);
    
        for(var i = 0; i < xData.length; i++) {
            if (yData[i] < this.yMax && yData[i] > this.yMin && 
                xData[i] < this.xMax && xData[i] > this.xMin) {
                var xNow = this.scaleX(xData[i])
                var yNow = this.scaleY(yData[i])
                ctx.strokeStyle = color;
                ctx.fillStyle = color
                ctx.beginPath();
                ctx.arc(xNow, yNow, size, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        } 
    }

    dottedLine = function(x0, y0, x1, y1, color) {    
        if (x0 > this.xMax || x1 > this.xMax || x0 < this.xMin || x1 < this.xMin ) return;
        if (y0 > this.yMax) y0 = this.yMax;
        if (y1 > this.yMax) y1 = this.yMax;
        if (y0 < this.yMin) y0 = this.yMin;
        if (y1 < this.yMin) y1 = this.yMin;
        x0 = this.scaleX(x0)
        y0 = this.scaleY(y0)
        x1 = this.scaleX(x1)
        y1 = this.scaleY(y1)
        ctx.strokeStyle = color;
        ctx.fillStyle = color
        ctx.beginPath();
        ctx.setLineDash([2, 3]);
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.setLineDash([]);
    }

}