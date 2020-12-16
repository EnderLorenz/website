class Bfs {
    constructor() {
      this.st = new Start();
      this.st.start();
      this.bool = false;
      this.q = new Queue;
      this.q.enqueue(this.st.graph.vertices[0]);
      this.ind = -1;
      this.visited = this.st.visited;
      this.visited[0] = true;
      this.visited2 = this.st.visited2;
      this.visited2[0] = true;
      this.max = this.dfsClosed(this);
    }
    
    bfsOpen = function() {
        if (!this.q.isEmpty()) {
            let v = this.q.dequeue();
            v.show([0, 144, 0]);
            if (v.index == this.max) {
              v.show([255, 0, 0]);
              while(v.parent) {
                let tmpE = new Edge(v, v.parent, 0);
                v = v.parent;
                v.show([255, 0, 0]);
                tmpE.show([255, 0, 0]);
              }
              this.ind = this.st.size*this.st.size;
            }
            for (let i = 0; i < v.adjacentNodes.length; i++) {
              if (!this.visited[v.adjacentNodes[i].index]) {
                this.visited[v.adjacentNodes[i].index]= true;
                v.adjacentNodes[i].parent = v;
                this.q.enqueue(v.adjacentNodes[i]);
                let tmp = new Edge(v, v.adjacentNodes[i], 0);
                tmp.show([0, 155, 110]);
              }
            }
        }
        this.ind++;
        if (this.ind == this.st.size*this.st.size+5) {
          this.st = new Start();
          this.st.start();
          this.bool = false;
          this.q = new Queue;
          this.q.enqueue(this.st.graph.vertices[0]);
          this.ind = -1;
          this.visited = this.st.visited;
          this.visited[0] = true;
          this.visited2 = this.st.visited2;
          this.visited2[0] = true;
          this.max = this.dfsClosed(this);
        }
    }

    bfsClosed = function() {
        while (!this.q.isEmpty()) {
            v = this.q.dequeue();
            if (v.index == st.graph.vertices.length-1) {
              while(v.parent) {
                tmpE = new Edge(v, v.parent, 0)
                v = v.parent;
              }
            }
            for (var i = 0; i < v.adjacentNodes.length; i++) {
              if (!visited[v.adjacentNodes[i].index]) {
                visited[v.adjacentNodes[i].index]= true;
                v.adjacentNodes[i].parent = v;
                this.q.enqueue(v.adjacentNodes[i]);
                tmp = new Edge(v, v.adjacentNodes[i], 0);
              }
            }    
        }
    }

    dfsClosed = function() {
      let sD = new Stack;
      let edgesD = new Stack;
      sD.push(this.st.graph.vertices[0]);
      let depthGraph = new Graph;
      let visited2 = this.visited2;
      var max = 0;
      while (!sD.isEmpty()) {
          let v = sD.pop();
          let e;
          if (edgesD.size > 0) e = edgesD.pop();
          if (!visited2[v.index] || v.index === 0) {
              visited2[v.index] = true;
              depthGraph.vertices.push(v);
              if (depthGraph.vertices.length > 1) depthGraph.edges.push(e);
              for (var i = 0; i < v.adjacentNodes.length; i++) {
                  sD.push(v.adjacentNodes[i]);
                  if (v.adjacentNodes[i].index > max) max = v.adjacentNodes[i].index;
                  let tmp = new Edge(v, v.adjacentNodes[i], 0);
                  edgesD.push(tmp);
              }      
          }  
      }
      return max; 
  };
}