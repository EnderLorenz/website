class Vertex {
    constructor(index) {
      this.index = index;
      this.adjacentNodes = [];
      this.adjacentNodesCost = [];
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.degree = this.adjacentNodes.length;
      this.parent = null;
      this.x = random(15, width-10);
      this.y = random(85, height-10);
    }
    

    degree = function() {
      return this.adjacentNodes.length;
    };

    show = function (color) {
      stroke(color);
      fill(color);
      ellipse(this.x, this.y, 5);
    };
}