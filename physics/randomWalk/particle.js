function Particle(x, y) {
    this.xSet = [x];
    this.ySet = [y];
    this.prevX = x;
    this.prevY = y;
    this.maxX = 0;
    this.minX = 0;
    this.maxY = 0;
    this.minY = 0;
    this.r = Math.floor(Math.random() * 155);
    this.g = Math.floor(Math.random() * 155);
    this.b = Math.floor(Math.random() * 155);
    this.distance = Math.sqrt(this.x * this.x + this.y * this.y);
  
    this.move = function() {
        var dX = 2.0*(Math.random()-.5);
        var dY = 2.0*(Math.random()-.5);
        var radius =  Math.sqrt(dX * dX + dY*dY)
        while(radius > 1.0) {
            dX = 2.0*(Math.random()-.5);
            dY = 2.0*(Math.random()-.5);
            radius =  Math.sqrt(dX * dX + dY*dY)
        }
        newX = this.prevX+dX/radius;
        newY = this.prevY+dY/radius;
        if (newX > this.maxX) this.maxX = newX;
        if (newX < this.minX) this.minX = newX;
        if (newY > this.maxY) this.maxY = newY;
        if (newY < this.minY) this.minY = newY;

        if (-newX > xMax) xMax = -2*newX;
        if (-newX < xMin) xMin = -2*newX;
        if (newY > yMax) yMax = 2*newY;
        if (newY < yMin) yMin = 2*newY;
        this.xSet.push(newX);
        this.ySet.push(newY);
        this.prevX = newX;
        this.prevY = newY;
    }

    this.show = function() {
        for (var i = 0; i < this.xSet.length; i++) {
            scaleX = scale(this.xSet[i], -xMin, -xMax, xGraph[1], xGraph[0]);
            scaleY = scale(this.ySet[i], yMin, yMax, yGraph[1], yGraph[0]);

            if (this.xSet.length > 1 && i > 0) {
                ctx.beginPath();
                ctx.moveTo(scaleX, scaleY);
                ctx.lineTo(prevScaleX, prevScaleY);
                ctx.strokeStyle = "black";
                ctx.stroke(); 
            }
            prevScaleX = scaleX;
            prevScaleY = scaleY;
        }

        for (var i = 0; i < this.xSet.length; i++) {
            scaleX = scale(this.xSet[i], -xMin, -xMax, xGraph[1], xGraph[0]);
            scaleY = scale(this.ySet[i], yMin, yMax, yGraph[1], yGraph[0]);

            ctx.beginPath();
            ctx.strokeStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
            ctx.arc(scaleX, scaleY, 4, 0, 2*Math.PI);
            ctx.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
            ctx.fill();
        }


        ctx.stroke();
        ctx.fillStyle = "black"
        ctx.strokeStyle = "black";

    }

    

    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

  }






