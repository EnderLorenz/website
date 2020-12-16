class Kruskal {

    constructor() {
      this.st = new Start();
      this.st.start();
      this.uf = new UnionFind(this.st.graph.vertices.length);
      this.mst = new Graph;
      this.ind = -1;
      this.bool = false;
      this.cost = 0;
    } 
  
    kruskalOpen = function() {
      let ind = this.ind;
        if (this.st.graph.edges[ind]
          && (!this.uf.connected(this.st.graph.edges[ind].to.index, this.st.graph.edges[ind].from.index))) {
          this.uf.union(this.st.graph.edges[ind].to.index, this.st.graph.edges[ind].from.index);
          this.mst.edges.push(this.st.graph.edges[ind]);
          this.mst.vertices.push(this.st.graph.edges[ind].to);
          this.mst.vertices.push(this.st.graph.edges[ind].from);
          this.cost += this.st.graph.edges[ind].cost;
          this.mst.show(color(255,0,0, 20), color(155,0,0));
        }
        if (this.ind > this.st.graph.edges.length && (!this.bool)) {
          stroke(0);
          fill(0);
          text("No spanning tree ", width/2-50, 50);
        } 
        if(this.mst.edges.length == this.st.graph.vertices.length-1 && !this.bool){
          stroke(0);
          fill(0);
          this.bool = true;
          text("Minimum Spanning Tree Cost = " + cost.toFixed(1), width/2-65, 30);
          this.ind = this.st.graph.edges.length;
        }
        if (this.ind > this.st.graph.edges.length + 5) {
          this.st = new Start();
          this.st.start();
          this.uf = new UnionFind(this.st.graph.vertices.length);
          this.mst = new Graph;
          this.ind = -1;
        }
        this.ind++;
      }

      kruskalClosed = function() {
        let ind = this.ind;
        while (this.st.graph.edges[ind]
          && (!this.uf.connected(this.st.graph.edges[ind].to.index, this.st.graph.edges[ind].from.index))) {
            this.uf.union(this.st.graph.edges[ind].to.index, this.st.graph.edges[ind].from.index);
            this.mst.edges.push(this.st.graph.edges[ind]);
            this.mst.vertices.push(this.st.graph.edges[ind].to);
            this.mst.vertices.push(this.st.graph.edges[ind].from);
            this.cost += this.st.graph.edges[ind].cost;
        }
        ind++;
      }
}