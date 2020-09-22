function Edge(to, from, cost) {
    this.to = to;
    this.from = from;
    this.cost = cost;

    this.show = function(color) {
      if (this.cost < Infinity) {
        stroke(color);
      line(this.from.x, this.from.y, this.to.x, this.to.y)
      }
    }
}