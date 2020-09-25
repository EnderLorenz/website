function Bfs() {
    
    this.bfsOpen = function() {
        if (!bool) {
            var d = new Dfs;
            max = d.dfsClosed();
            console.log(max)
            bool = true;
        }
        if (!q.isEmpty()) {
            v = q.dequeue();
            v.show([0, 144, 0]);
            if (v.index == max) {
              v.show([255, 0, 0]);
              while(v.parent) {
                tmpE = new Edge(v, v.parent, 0)
                v = v.parent;
                v.show([255, 0, 0]);
                tmpE.show([255, 0, 0]);
              }
              ind = size*size;
            }
            for (var i = 0; i < v.adjacentNodes.length; i++) {
              if (!visited[v.adjacentNodes[i].index]) {
                visited[v.adjacentNodes[i].index]= true;
                v.adjacentNodes[i].parent = v;
                q.enqueue(v.adjacentNodes[i]);
                tmp = new Edge(v, v.adjacentNodes[i], 0);
                tmp.show([0, 155, 110]);
              }
                
            }
        }
        ind++;
        st = new Start;
        if (ind == size*size+5) {
            st = new Start;
            st.start();
        }
    }

    this.bfsClosed = function() {
        if (!bool) {
            var d = new Dfs;
            max = d.dfsClosed();
            console.log(max)
            bool = true;
        }
        while (!q.isEmpty()) {
            v = q.dequeue();
            if (v.index == graph.vertices.length-1) {
              while(v.parent) {
                tmpE = new Edge(v, v.parent, 0)
                v = v.parent;
              }
            }
            for (var i = 0; i < v.adjacentNodes.length; i++) {
              if (!visited[v.adjacentNodes[i].index]) {
                visited[v.adjacentNodes[i].index]= true;
                v.adjacentNodes[i].parent = v;
                q.enqueue(v.adjacentNodes[i]);
                tmp = new Edge(v, v.adjacentNodes[i], 0);
              }
                
            }    
        }
    }
}