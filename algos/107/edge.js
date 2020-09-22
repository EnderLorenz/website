function Edge(to, from, cost) {
    this.to = to;
    this.from = from;
    this.cost = cost;

    this.show = function(color) {
      if (this.cost < Number.MAX_VALUE) {
        stroke(color);
      line(this.from.x, this.from.y, this.to.x, this.to.y)
      }
    }
}