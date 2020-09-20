function Tree() {
    this.root = null;
}

  Tree.prototype.addValue = function(val) {
    var n = new Node(val);
    if (this.root == null) {
      this.root = n;
      this.inverted = false;
      this.root.order = 140;
      this.root.angle1 = -PI/2.3;
      this.root.angle2 = PI/2.3;
    } else {
      if (this.root.inverted) this.root.invertedAddNode(n);
      else this.root.addNode(n)
    }
  }

  Tree.prototype.remove = function(data) {
      if (this.root.inverted) this.root = this.root.invertedRemoveNode(this.root, data)
      else this.root = this.root.removeNode(this.root, data)
  }  
  
  Tree.prototype.search = function(val) {
    if (this.root.inverted) var found = this.root.invertedSearch(val);
    else var found = this.root.search(val);
    return found;
  }

  Tree.prototype.traverse = async function(type) {
    await Promise.all([this.root.traverse(type)]);
  }

  Tree.prototype.invert = function() {
    if(this.root.inverted) {
      this.root.inverted = false;
    } else this.root.inverted = true;
    this.root.invert();
  }
    
  Tree.prototype.drawTraverse = function() {
     this.root.drawTraverse();
  }

  Tree.prototype.drawSearch = function(val) {
    if (this.root.inverted) var found = this.root.invertedDrawSearch(val);
    else var found = this.root.drawSearch(val);
      return found;
  }

  Tree.prototype.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



