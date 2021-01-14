class Start {

    constructor(size, sparcity) {
      if (input.value() > 0 && input2.value() > .001) {
        this.size = input.value();
        this.sparcity = input2.value()*.01;
      } else if (size && sparcity) {
          this.size = size;
          this.sparcity = sparcity;
      } else if (input.value() > 0) {
        this.size = input.value();
        this.sparcity = .25;
      } else if (input2.value() > 0 && input2.value() <= 100) {
        this.size = 5;
        this.sparcity = input2.value()*.01;
      } else {
        this.size = 5;
        this.sparcity = .25;
      }
      this.graph = new Graph;
      this.visited = [];
      this.visited2 = [];
    }

    start = function() {
        background(255)
        this.createGraph();
        this.sortGraph();
        this.graph.show(color(79, 100), color(80, 80, 174))
      }

      createGraph = function() {
        for (let i = 0; i < this.size; i++) {
          let tmp = new Vertex(i);
          this.visited.push(false);
          this.visited2.push(false);
          this.graph.vertices.push(tmp)
        }

        for (let i = 0; i < this.size; i++) {
          for (let j = i+1; j < this.size; j++) {
              let test = random(1);
              if (test > this.sparcity) {
                let c = random(1,1000);
                let tmp = new Edge(this.graph.vertices[i], this.graph.vertices[j], c)
                this.graph.edges.push(tmp)
                this.graph.vertices[i].adjacentNodesCost.push(c)
                this.graph.vertices[i].adjacentNodes.push(this.graph.vertices[j])
                this.graph.vertices[j].adjacentNodesCost.push(c)
                this.graph.vertices[j].adjacentNodes.push(this.graph.vertices[i])
              }
            }
        }
      }

      sortGraph = function() {
        this.graph.edges.sort( function(a, b){
        if(a.cost > b.cost) return 1;
        if(a.cost < b.cost) return -1;
        return 0;});
      }
      
}