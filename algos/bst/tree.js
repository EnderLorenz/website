function Tree() {
    this.root = null;
}
  
  Tree.prototype.traverse = function() {
    this.root.visit(this.root);
  }
  
  Tree.prototype.search = function(val) {
      var found = this.root.search(val);
      return found;
  }

  Tree.prototype.addValue = function(val) {
    var n = new Node(val);
    if (this.root == null) {
      this.root = n;
      this.root.x = width/2;
      this.root.y = 70;
      this.root.order = 140;
      this.root.dy =  -0;
      this.root.dx = 0.00001;
      this.root.angle1 = -PI/2.3;
      this.root.angle2 = PI/2.3;
    } else {
      this.root.addNode(n) 
    }
  }