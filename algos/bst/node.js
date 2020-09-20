function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.x = null;
    this.y = null;
    this.angle1 = null;
    this.order = null;
}

    Node.prototype.addNode = function(n) {
        if (n.value < this.value) {
            if (this.left == null) {
                this.left = n;
                this.left.parent = this;
            } else this.left.addNode(n);
        } else if (n.value > this.value){
            if (this.right == null) {
            this.right = n;
            this.right.parent = this;
            } else this.right.addNode(n);
        }
    }

    Node.prototype.removeNode = function(node, key) { 
        if(node === null) return null;
        if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.value) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
            return null;
            } else if(node.left === null) {
                node.right.parent = node.parent;
                return node.right;
            } else if (node.right === null) {
                node.left.parent = node.parent;
                return node.left;
            } else {
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

    Node.prototype.search = function(val) {
        if (this.value == val) {
            return this;   
        } else if (val < this.value && this.left != null) {
            return this.left.search(val);
        } else if (val > this.value && this.right != null) {
            return this.right.search(val);
        }
        return null;
    }

    Node.prototype.invertedSearch = function(val) {
        if (this.value == val) {
            return this;   
        } else if (val > this.value && this.left != null) {
            return this.left.invertedSearch(val);
        } else if (val < this.value && this.right != null) {
            return this.right.invertedSearch(val);
        }
        return null;
    }

    Node.prototype.traverse = async function(type) {
        if (type === 'pre') {
            await this.sleep(1000);
            this.list();
        }
        if (this.left != null) await this.left.traverse(type);
        if (type === 'in') {
            await this.sleep(1000);
            this.list();
        }
        if (this.right != null) await this.right.traverse(type);
        if (type === 'post') {
            await this.sleep(1000);
            this.list();
        }
    }

    Node.prototype.invert = function() {
        if (this.left != null) this.left.invert();
        if (this.right != null) this.right.invert();
        var tmp = this.left;
        this.left = this.right;
        this.right = tmp;
    }

    Node.prototype.drawSearch = async function(val) {
        if (this.value == val) {
            await this.sleep(500);
            this.highlight(color(0, 255, 0))
            return this;   
        } else if (val < this.value && this.left != null) {
            await this.sleep(500);
            this.highlight(color(255, 0, 0))
            return await this.left.drawSearch(val);
        } else if (val > this.value && this.right != null) {
            await this.sleep(500);
            this.highlight(color(255, 0, 0))
            return await this.right.drawSearch(val);
        } return null;
    }

    Node.prototype.invertedDrawSearch = async function(val) {
        if (this.value == val) {
            await this.sleep(500);
            this.highlight(color(0, 255, 0))
            return this;   
        } else if (val > this.value && this.left != null) {
            await this.sleep(500);
            this.highlight(color(255, 0, 0))
            return await this.left.invertedDrawSearch(val);
        } else if (val < this.value && this.right != null) {
            await this.sleep(500);
            this.highlight(color(255, 0, 0))
            return await this.right.invertedDrawSearch(val);
        } return null;
    }

    Node.prototype.invertedAddNode = function(n) {
        if (n.value > this.value) {
            if (this.left == null) {
                this.left = n;
                this.left.parent = this;
            } else this.left.invertedAddNode(n);
        } else if (n.value < this.value){
            if (this.right == null) {
            this.right = n;
            this.right.parent = this;
            } else this.right.invertedAddNode(n);
        }
    }

    Node.prototype.invertedRemoveNode = function(node, key) { 
        if(node === null) return null;
        if (key > node.value) {
            node.left = this.invertedRemoveNode(node.left, key);
            return node;
        } else if (key < node.value) {
            node.right = this.invertedRemoveNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
            return null;
            } else if(node.left === null) {
                node.right.parent = node.parent;
                return node.right;
            } else if (node.right === null) {
                node.left.parent = node.parent;
                return node.left;
            } else {
                var successor = this.findMaxNode(node.right);
                node.value = successor.value;
                node.right = this.invertedRemoveNode(node.right, successor.value)
                return node;
            }
        }
    } 

    Node.prototype.findMaxNode = function(node) {  
        if (node.left === null) return node; 
        else return this.findMaxNode(node.left); 
    } 

    Node.prototype.drawTraverse = function() {
        if (this.parent) {
            if (this.parent.right && this.parent.right.value == this.value) {
                this.drawRight();
            } else this.drawLeft();
            if (this.left != null) this.left.drawTraverse();
            if (this.right != null) this.right.drawTraverse();
        } else {
            this.drawRoot();
            if (this.left != null)  this.left.drawTraverse(this);
            if (this.right != null) this.right.drawTraverse(this);            
        }
    }

    Node.prototype.drawRight = function() {
        this.order = this.parent.order*.9;
        this.angle1 = .65*this.parent.angle1;
        this.x = this.parent.x - (this.order)*sin(this.angle1);
        this.y = this.parent.y + (this.order)*cos(this.angle1);
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
        stroke(55,45,60);
        fill(75,55,60,65)
        ellipse(this.x, this.y, 60)
        stroke(255);
        fill(255);
        textSize(20);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
        textSize(20);
    }

    Node.prototype.drawLeft = function() {
        this.order = this.parent.order*.9;
        this.angle1 = .65*this.parent.angle1;
        this.x = this.parent.x + (this.order)*sin(this.angle1);
        this.y = this.parent.y + (this.order)*cos(this.angle1);
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
        stroke(55,45,60);
        fill(75,55,60,65)
        ellipse(this.x, this.y, 60)
        stroke(255);
        fill(255);
        textSize(20);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
        textSize(20);
    }

    Node.prototype.drawRoot = function() {
        this.x = width/2;
        this.y = 70;
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

    Node.prototype.highlight = async function(color) {
        stroke(color);
        fill(color);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
    }

    Node.prototype.list = async function() {
        this.highlight([0, 0, 255]);
        stroke(0);
        fill(0);
        text(this.value, width/6, count*25+40)
        count ++;
    }

    Node.prototype.sleep = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }