function Vertex(index) {
    this.index = index;
    this.adjacentNodes = [];
    this.degree = this.adjacentNodes.length;
    this.parent = null;
    this.x = random(15, width-10);
    this.y = random(85, width-10);

    this.degree = function() {
      return this.adjacentNodes.length;
    };

    this.show = function (color) {
      stroke(color);
      fill(color);
      ellipse(this.x, this.y, 5);
      text(this.index,this.x, this.y+10)
    };
}