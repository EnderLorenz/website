function Kruskal() {
    this.kruskalOpen = function() {
        if (graph.edges[ind]
          && (!uf.connected(graph.edges[ind].to.index, graph.edges[ind].from.index))) {
          uf.union(graph.edges[ind].to.index, graph.edges[ind].from.index);
          mst.edges.push(graph.edges[ind]);
          mst.vertices.push(graph.edges[ind].to);
          mst.vertices.push(graph.edges[ind].from);
          cost += graph.edges[ind].cost;
          mst.show(color(255,0,0, 20), color(155,0,0));
        }
        if (ind > graph.edges.length && (!bool)) {
          stroke(0);
          fill(0);
          text("No spanning tree ", width/2-50, 50);
        } 
        if(mst.edges.length == graph.vertices.length-1 && !bool){
          stroke(0);
          fill(0);
          bool = true;
          text("Minimum Spanning Tree Cost = " + cost.toFixed(2), width/2-90, 30);
          ind = graph.edges.length;
        }
        if (ind > graph.edges.length + 5) {
            st = new Start;
            st.start();
        }
        ind++;
      }

      this.kruskalClosed = function() {
        while (graph.edges[ind]
          && (!uf.connected(graph.edges[ind].to.index, graph.edges[ind].from.index))) {
          uf.union(graph.edges[ind].to.index, graph.edges[ind].from.index);
          mst.edges.push(graph.edges[ind]);
          mst.vertices.push(graph.edges[ind].to);
          mst.vertices.push(graph.edges[ind].from);
          cost += graph.edges[ind].cost;
        }
        ind++;
      }
}