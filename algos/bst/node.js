function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = null;
    this.y = null;
    this.angle1 = null;
    this.order = null;
    this.parent = null;
    this.visited = false;
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

    Node.prototype.visit = function() {
        if (this.parent) {
            this.visited = true;
            this.order = this.parent.order*.9;
            this.angle1 = .65*this.parent.angle1;
            if ( this.parent.right && this.parent.right.value == this.value) {
                this.x = this.parent.x - (this.order)*sin(this.angle1);
                this.y = this.parent.y + (this.order)*cos(this.angle1);
            } else {
                this.x = this.parent.x + (this.order)*sin(this.angle1);
                this.y = this.parent.y + (this.order)*cos(this.angle1);
            }
            if (this.left != null) {
                this.left.visit();
            }
            if (this.right != null) {
                this.right.visit();
            }
            if(this.parent.right != null) {
                if (this.parent.right.value == this.value) {
                    var m = (this.y-this.parent.y)/(this.x-this.parent.x);
                    var b = -m*this.parent.x+this.parent.y;
                    var r = 30;
                    var xp = this.parent.x;
                    var xt = this.x;
                    var xtop = (xp+m*m*xp+sqrt((1+m*m)*r*r))/(1+m*m)
                    var ytop = m*xtop+b;
                    var xbottom = (xt+m*m*xt-sqrt((1+m*m)*r*r))/(1+m*m);
                    var ybottom = m*xbottom+b;
                    fill(255);
                    stroke(0);
                    line(xtop, ytop, xbottom, ybottom);
                }
            }
            if(this.parent.left != null) {
                if (this.parent.left.value == this.value) {
                    var m = (this.y-this.parent.y)/(this.x-this.parent.x);
                    var b = -m*this.parent.x+this.parent.y;
                    var r = 30;
                    var xp = this.parent.x;
                    var xt = this.x;
                    var xtop = (xp+m*m*xp-sqrt((1+m*m)*r*r))/(1+m*m)
                    var ytop = m*xtop+b;
                    var xbottom = (xt+m*m*xt+sqrt((1+m*m)*r*r))/(1+m*m);
                    var ybottom = m*xbottom+b;
                    fill(255);
                    stroke(0); 
                    line(xtop, ytop, xbottom, ybottom);
                }
            }
            stroke(55,45,60);
            fill(75,55,60,65)
            ellipse(this.x, this.y, 60)
            stroke(255);
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text(this.value, this.x, this.y);
            textSize(20);
        } else {
            this.x = width/2;
            this.y = 70;
            if (this.left != null) {
                this.left.visit(this);
            }
            if (this.right != null) {
                this.right.visit(this);
            }
            stroke(55,45,60);
            fill(75,55,60,65)
            ellipse(this.x, this.y, 60)
            stroke(255);
            fill(255);
            textSize(25);
            textAlign(CENTER);
            textSize(20);
            text(this.value, this.x, this.y);
        }
    }

    Node.prototype.addNode = function(n) {
        if (n.value < this.value) {
            if (this.left == null) {
                this.left = n;
                this.left.parent = this;
            } else {
                this.left.addNode(n);
            } 
        } else if (n.value > this.value){
            if (this.right == null) {
            this.right = n;
            this.right.parent = this;
            } else {
                this.right.addNode(n);
            }
        }
    }

    Node.prototype.quietSearch = function(val) {
        if (this.value == val) {
            return this;   
        } else if (val < this.value && this.left != null) {
            return this.left.quietSearch(val);
        } else if (val > this.value && this.right != null) {
            return this.right.quietSearch(val);
        }
        return null;
    }

    Node.prototype.removeNode = function(node, key) { 
        // console.log("remove", node, this)//this is the root
        if(node === null) return null;
        
        if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.value) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {

            if (node.left === null && node.right === null) {
            // console.log("no kids", this, node);
            return null;
            }
        
            if(node.left === null) {
                // console.log("one right kid", this, node, node.right);
                node.right.parent = node.parent;
                return node.right;
            }

            if (node.right === null) {
                // console.log("one left kid", this);
                node.left.parent = node.parent;
                return node.left;
            }
        
            else {
                // console.log("2 kids", node);
                var successor = this.findMinNode(node.right);
                node.value = successor.value;
                node.right = this.removeNode(node.right, successor.value)
                return node;
            }
        }
    } 

    Node.prototype.findMinNode = function(node) {  
        if (node.left === null) return node; 
        else return this.findMinNode(node.left); 
    } 