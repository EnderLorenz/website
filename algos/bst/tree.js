function Tree() {
    this.root = null;
}

  Tree.prototype.addValue = function(val) {
    var n = new Node(val);
    if (this.root == null) {
      this.root = n;
      this.root.order = 140;
      this.root.angle1 = -PI/2.3;
      this.root.angle2 = PI/2.3;
      this.num = 0;
    } else {
      this.root.addNode(n)
    }
  }

  Tree.prototype.remove = function(data) {
      this.root = this.root.removeNode(this.root, data)
  }  
  
  Tree.prototype.search = function(val) {
    var found = this.root.search(val);
    return found;
  }

  Tree.prototype.traverse = async function(type) {
    await Promise.all([this.root.traverse(type)]);
  }

  Tree.prototype.invert = function() {
    this.root.invert();
  }
    
  Tree.prototype.drawTraverse = function() {
     this.root.drawTraverse();
  }

  Tree.prototype.drawSearch = function(val) {
      var found = this.root.drawSearch(val);
      return found;
  }

  Tree.prototype.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



