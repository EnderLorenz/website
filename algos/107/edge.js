class Edge {

    constructor(from, to, cost) {
      this.from = from;
      this.to = to;
      this.cost = cost;
    }

    show = function(color) {
      stroke(color);
      line(this.from.x, this.from.y, this.to.x, this.to.y)
    }
}