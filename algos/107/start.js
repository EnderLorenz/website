function Start() {
    this.start = function() {
        background(255)
        ind = -1;
        bool = false;
        graph = new Graph;
        visited = [];
        visited2 = [];
      
        for (var i = 0; i < size; i++) {
          tmp = new Vertex(i);
          visited.push(false);
          visited2.push(false);
          graph.vertices.push(tmp)
        }
        // var exTest = random(1)
        for (var i = 0; i < size; i++) {
          for (var j = i+1; j < size; j++) {
            var test = random(1);
            // if (exTest > .25) {
              if (test < sparcity) {
                tmp = new Edge(graph.vertices[i], graph.vertices[j], random(1,1000))
                graph.edges.push(tmp)
                graph.vertices[i].adjacentNodes.push(graph.vertices[j])
                graph.vertices[j].adjacentNodes.push(graph.vertices[i])
              }
            // } else {
                // if (test < .1) {
                //   tmp = new Edge(graph.vertices[i], graph.vertices[j], random(1,1000))
                //   graph.edges.push(tmp)
                //   graph.vertices[i].adjacentNodes.push(graph.vertices[j])
                //   graph.vertices[j].adjacentNodes.push(graph.vertices[i])
                // }
            // }
          }
        }
        
        graph.edges.sort( function(a, b){
          if(a.cost > b.cost) return 1;
          if(a.cost < b.cost) return -1;
          return 0;
        });
        graph.show(color(79, 100), color(80, 80, 174))
        uf = new UnionFind(graph.vertices.length)
        mst = new Graph;
        depthGraph = new Graph;
        s = new Stack;
        q = new Queue;
        edges = new Stack;
        s.push(graph.vertices[0])
        q.enqueue(graph.vertices[0])
        visited[0] = true;
      }
    
}