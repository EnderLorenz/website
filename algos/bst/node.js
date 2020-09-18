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
                    // console.log("low left", this)
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

    Node.prototype.removeNode = function(parent, key) { 
        if(this === null) return null;
        
        if (key < this.value && this.left != null) {
            return this.left.removeNode(this, key);
        } else if (key > this.value && this.right != null) {
            return this.right.removeNode(this, key);
        }

        if (this.left === null && this.right === null) {
            if (parent.value == key && this.value == key) {
                parent = null;
                return parent;
            }
            if (parent.left && parent.left.value == this.value) {
                parent.left = null;
                return parent;
            } else {
                parent.right = null;
                return parent; 
            }
        } 

        else if(this.left === null) {
            if (parent.value == key && this.value == key) {
                var tmp = this.right;
                this.value = tmp.value;
                this.right = tmp.right;
                if (tmp.left) this.left = tmp.left;
                tmp = null;
                return this;
            } else if (parent.left && parent.left.value == this.value) {
                parent.left = this.right;
                parent.left.parent = parent;
                return parent;
            } else {
                parent.right = this.right; 
                parent.right.parent = parent;
                return parent;
            }
        } else if(this.right === null) { 
            if (parent.value == key && this.value == key) {
                var tmp = this.left;
                this.value = tmp.value;
                this.left = tmp.left;
                if (tmp.right) this.right = tmp.right;
                tmp = null;
                return this;
            } else if (parent.left && parent.left.value == this.value) {
                parent.left = this.left; 
                parent.left.parent = parent;
                return parent;
            } else {
                parent.right = this.left; 
                parent.right.parent = parent;
                return parent;
            }
        } else {
            succParent = this.right.findMinNode(this);
            if (succParent.value != key){
                succ = succParent.left;
                succParent.left = succ.right;
                if (succ.right) {
                    succ.right.parent = succ.parent; 
                 } 
                this.value = succ.value;
                return parent;
            } else {
                succ = succParent.right;
                this.value = succ.value;
                if (succ.right) {
                   this.right = succ.right;
                   succ.right.parent = this; 
                } else this.right = null;
                return parent;
            }
        }
  
        
    } 

    Node.prototype.findMinNode = function(parent) {  
        if(this.left === null) {
            return parent; 
        } else {
            return this.left.findMinNode(this); 
        }
            
        } 