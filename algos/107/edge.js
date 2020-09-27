function Edge(from, to, cost) {
    this.from = from;
    this.to = to;
    this.cost = cost;

    this.show = function(color) {
      stroke(color);
      line(this.from.x, this.from.y, this.to.x, this.to.y)
    }
}