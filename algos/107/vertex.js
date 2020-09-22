function Vertex(index) {
    this.index = index;
    this.degree = 0;
    this.x = random(15, width-10);
    this.y = random(15, width-10);

    this.show = function (color) {
      stroke(color);
      fill(color);
      ellipse(this.x, this.y, 5);
    }
}