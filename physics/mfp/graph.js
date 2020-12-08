function Graph(ctx, xRange, yRange) {
    this.ctx = ctx;
    this.xMin = Number.MAX_VALUE;
    this.xMax = -Number.MAX_VALUE;
    this.yMin = Number.MAX_VALUE;;
    this.yMax = -Number.MAX_VALUE;;
    this.xRange = xRange;
    this.yRange = yRange;
    if (xRange && this.xRange.length > 1 && yRange && this.yRange.length > 1) {
        this.xMin = xRange[0];
        this.xMax = xRange[1];
        this.yMin = yRange[0];
        this.yMax = yRange[1];
    }
    if (cw > ch) {
        xGraph = [65, ch-121]
        yGraph = [1, ch-121]
    } else {
        xGraph = [65, cw-121]
        yGraph = [1, cw-121]
    }
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.globalAlpha = 1; 
    ctx.clearRect(0, 0, cw, cw);

    this.scale = function(num, in_min, in_max, out_min, out_max)  {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    this.prettyPrint = function(num) {
        if (num == 0) return parseFloat(0);
        if (Math.abs(Math.log10(num)) > 5) return num.toExponential(2)
        if (Math.abs(num >= 10)) return parseFloat(num.toFixed(2));
        if (Math.abs(num < 10 )) return parseFloat(num.toFixed(5));
    }

    this.drawLine = function(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }

    this.dataCheck = function(xData, yData) {
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

    this.graph = function() {
        this.ctx.strokeStyle = "black"
        this.ctx.fillStyle = "black"
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform    
        
        this.ctx.beginPath();
        this.ctx.rect(xGraph[0], yGraph[0], xGraph[1], yGraph[1]);
        this.ctx.stroke();
        
        var bottomX = 10;
        var bottomY = 5;
        var leftX = 5;
        var leftY = 5;
        // 0, 0
        ctx.textAlign = "left";
        this.drawLine(xGraph[0]+bottomX, yGraph[1]+bottomY, xGraph[0]+bottomX, yGraph[1] - bottomY);
        this.ctx.fillText(this.prettyPrint(this.xMin), xGraph[0]+bottomX, yGraph[1] + 3*bottomY);
        // x_mid, y0 label
        ctx.textAlign = "center";
        this.drawLine((2*xGraph[0] + xGraph[1])/2, yGraph[1] + bottomY, (2*xGraph[0] + xGraph[1])/2, yGraph[1] - bottomY);
        this.ctx.fillText( this.prettyPrint((this.xMin+this.xMax)/2), (2*xGraph[0] + xGraph[1])/2, yGraph[1] + 3*bottomY);
        // x_max, y0 label
        ctx.textAlign = "right";
        this.drawLine(xGraph[1] + xGraph[0] - bottomX, yGraph[1]+leftY, xGraph[1] + xGraph[0] - bottomX, yGraph[1]-leftY);
        this.ctx.fillText(this.prettyPrint(this.xMax), xGraph[1] + xGraph[0] - bottomX, yGraph[1] + 3*bottomY);
        // x0,y_mid label
        ctx.textAlign = "end";
        this.drawLine(xGraph[0]-leftX, (yGraph[1]+yGraph[0])/2, xGraph[0]+leftX, (yGraph[1]+yGraph[0])/2);
        this.ctx.fillText(this.prettyPrint((this.yMin+this.yMax)/2), xGraph[0]-6, (yGraph[1]+yGraph[0])/2+3);
        // x0,y_max label
        ctx.textAlign = "end";
        this.drawLine(xGraph[0]-leftX, yGraph[0]+10, xGraph[0]+leftX, yGraph[0]+10) 
        this.ctx.fillText(this.prettyPrint(this.yMax), xGraph[0]-6, yGraph[0] + 13);
        //x0,y_min label
        ctx.textAlign = "end";
        this.drawLine(Graph[0]-leftX, yGraph[1]-10, xGraph[0]+leftX, yGraph[1]-10)
        this.ctx.fillText(this.prettyPrint(this.yMin), xGraph[0]-6, yGraph[1]- yGraph[0] - bottomY);
    }

    this.plot = function(xData, yData, color) {
        var xPrev, yPrev, check = false;
        for(var i = 0; i < xData.length; i++) {
            if (yData[i] <= this.yMax && yData[i] >= this.yMin && 
                xData[i] <= this.xMax && xData[i] >= this.xMin) {
                var xNow = this.scale(xData[i], this.xMin, this.xMax, xGraph[0]+10, xGraph[1] + xGraph[0] - 10)
                var yNow = this.scale(yData[i], this.yMin, this.yMax, yGraph[1]-10, yGraph[0]+10)
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

    this.point = function(xData, yData, color, size) {
        this.dataCheck(xData, yData);
        for(var i = 0; i < xData.length; i++) {
            if (yData[i] <= this.yMax && yData[i] >= this.yMin && 
                xData[i] <= this.xMax && xData[i] >= this.xMin) {
                var xNow = this.scale(xData[i], this.xMin, this.xMax, xGraph[0]+10, xGraph[1] + xGraph[0] - 10)
                var yNow = this.scale(yData[i], this.yMin, this.yMax, yGraph[1]-10, yGraph[0]+10)
                ctx.strokeStyle = color;
                ctx.fillStyle = color
                ctx.beginPath();
                ctx.arc(xNow, yNow, size, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
            }
            xPrev = xNow;
            yPrev = yNow;
        } 
    }
}