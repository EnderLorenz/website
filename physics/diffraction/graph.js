function Graph(ctx) {
    this.ctx = ctx;
    this.xMin = 0;
    this.xMax = 0;
    this.yMin = 0;
    this.yMax = 0;
    xGraph = [25, cw-25]
    yGraph = [0, ch-25]
    this.scale = function(num, in_min, in_max, out_min, out_max)  {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    this.graph = function() {
        this.ctx.strokeStyle = "black"
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform    
        
        this.ctx.beginPath();
        this.ctx.rect(xGraph[0], yGraph[0], xGraph[1], yGraph[1]);
        this.ctx.stroke();

        // 0, 0
        var bottomX = 10;
        var bottomY = 5;
        var leftX = 5;
        var leftY = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(xGraph[0]+bottomX, yGraph[1]+bottomY);
        this.ctx.lineTo(xGraph[0]+bottomX, yGraph[1]-bottomY);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText(this.xMin.toFixed(2), xGraph[0]+bottomX, yGraph[1] + 3*bottomY);
        
        // x_mid, y0 label
        this.ctx.beginPath();
        this.ctx.moveTo((xGraph[0] + xGraph[1])/2 + bottomX, yGraph[1] + bottomY);
        this.ctx.lineTo((xGraph[0] + xGraph[1])/2 + bottomX, yGraph[1] - bottomY);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText( ((this.xMin+this.xMax)/2).toFixed(2), (xGraph[0] + xGraph[1])/2+bottomY, yGraph[1] + 3*bottomY);

        // x_max, y0 label
        this.ctx.beginPath();
        this.ctx.moveTo(xGraph[1]+bottomX, yGraph[1]+leftY);
        this.ctx.lineTo(xGraph[1]+bottomX, yGraph[1]-leftY);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText(this.xMax.toFixed(2), xGraph[1], yGraph[1] + 3*bottomY);

        // x0,y_mid label
        this.ctx.beginPath();
        this.ctx.moveTo(xGraph[0]-leftX, (yGraph[1]+yGraph[0])/2);
        this.ctx.lineTo(xGraph[0]+leftX, (yGraph[1]+yGraph[0])/2);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText(((this.yMin+this.yMax)/2).toFixed(1), xGraph[0]-25, (yGraph[1]+yGraph[0])/2+3);

        // x0,y_max label
        this.ctx.beginPath();
        this.ctx.moveTo(xGraph[0]-leftX, yGraph[0]+10);
        this.ctx.lineTo(xGraph[0]+leftX, yGraph[0]+10);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText(this.yMax.toFixed(1), xGraph[0]-25, yGraph[0]+13);

        //x0,y_min label
        this.ctx.beginPath();
        this.ctx.moveTo(xGraph[0]-leftX, yGraph[1]-10);
        this.ctx.lineTo(xGraph[0]+leftX, yGraph[1]-10);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillText(this.yMin.toFixed(1), xGraph[0]-25, ch-30);
    }

    this.plot = function(xData, yData, color) {
        if (xData.length != yData.length) console.log("x,y Lengths do not match: x length = ", this.xData.length, " y length = ", this.yData.length)
        else {
            for (var k = 0; k < xData.length; k++) {
                if (xData[k] < this.xMin) this.xMin = xData[k];
                if (xData[k] > this.xMax) this.xMax = xData[k];
                if (yData[k] < this.yMin) this.yMin = yData[k];
                if (yData[k] > this.yMax) this.yMax = yData[k];
            }
        }
        for(var i = 0; i < xData.length; i++) {
            var xNow = this.scale(xData[i], this.xMin, this.xMax, xGraph[0]+10, xGraph[1]+10)
            var yNow = this.scale(yData[i], this.yMin, this.yMax, yGraph[1]-10, yGraph[0]+10)
            if(i > 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(xNow, yNow);
                this.ctx.lineTo(xPrev, yPrev);
                this.ctx.strokeStyle = color;//
                this.ctx.stroke();
            }
            xPrev = xNow;
            yPrev = yNow;
        } 
    }
}