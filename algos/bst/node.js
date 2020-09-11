function Node(val, x, y, angle1, angle2, order) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.angle1 = angle1;
    this.order = order;
}

    Node.prototype.search = function(val) {
        if (this.value == val) {
            stroke(0, 255, 0);
            fill(0, 255, 0);
            textAlign(CENTER);
            text(this.value, this.x, this.y);
            return this;   
        } else if (val < this.value && this.left != null) {
            stroke(255, 0, 0);
            fill(255, 0, 0);
            textAlign(CENTER);
            text(this.value, this.x, this.y);
            return this.left.search(val);
        } else if (val > this.value && this.right != null) {
            stroke(255, 0, 0);
            fill(255, 0, 0);
            textAlign(CENTER);
            text(this.value, this.x, this.y);
            return this.right.search(val);
        }
        stroke(255, 0, 0);
        fill(255, 0, 0);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
        return null;
    }

    Node.prototype.visit = function(parent) {
        if (this.left != null) {
            this.left.visit(this);
        }
        if (this.right != null) {
            this.right.visit(this);
        }
        if(parent.right != null) {
            if (parent.right.value == this.value) {
                var m = (this.y-parent.y)/(this.x-parent.x);
                var b = -m*parent.x+parent.y;
                var r = 30;
                var xp = parent.x;
                var yp = parent.y;
                var xt = this.x;
                var yt = this.y;
                var xtop = (xp+m*m*xp+sqrt((1+m*m)*r*r))/(1+m*m)
                var ytop = m*xtop+b;
                var xbottom = (xt+m*m*xt-sqrt((1+m*m)*r*r))/(1+m*m);
                var ybottom = m*xbottom+b;
                fill(255);
                stroke(0);
                line(xtop, ytop, xbottom, ybottom);
            }
        }
        if(parent.left != null) {
            if (parent.left.value == this.value) {
                fill(255);
                stroke(0);
                var m = (this.y-parent.y)/(this.x-parent.x);
                var b = -m*parent.x+parent.y;
                var r = 30;
                var xp = parent.x;
                var yp = parent.y;
                var xt = this.x;
                var yt = this.y;
                var xtop = (xp+m*m*xp-sqrt((1+m*m)*r*r))/(1+m*m)
                var ytop = m*xtop+b;
                var xbottom = (xt+m*m*xt+sqrt((1+m*m)*r*r))/(1+m*m);
                var ybottom = m*xbottom+b;
                line(xtop, ytop, xbottom, ybottom);
            }
        }
        stroke(55,45,60);
        fill(75,55,60,65)
        ellipse(this.x, this.y, 60)
        stroke(255);
        fill(255);
        textSize(25);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
    }

    Node.prototype.addNode = function(n) {
        if (n.value < this.value) {
            if (this.left == null) {
                this.left = n;
                this.left.order = this.order*.9;
                this.left.x = this.x + (this.order)*sin(this.angle1);
                this.left.y = this.y + (this.order)*cos(this.angle1);
                this.left.angle1 = .65*this.angle1;
            } else {
                this.left.addNode(n);
            } 
        } else if (n.value > this.value){
            if (this.right == null) {
            this.right = n;
            this.right.order = this.order*.9;
            this.right.x = this.x + (this.order)*sin(-this.angle1);
            this.right.y = this.y + (this.order)*cos(-this.angle1);
            this.right.angle1 = .65*this.angle1;
            } else {
            this.right.addNode(n);
            }
        }
    }