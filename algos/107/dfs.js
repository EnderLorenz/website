function Dfs() {
    this.dfsOpen = function() {
        if (!s.isEmpty()) {
            v = s.pop();
            if (edges.size > 0) e = edges.pop();
            if (!visited[v.index] || v.index === 0) {
                visited[v.index] = true;
                depthGraph.vertices.push(v)
                if (depthGraph.vertices.length > 1) {
                    depthGraph.edges.push(e)
                    depthGraph.show(color(155, 90, 0), color(40, 155, 100))
                }
                for (var i = 0; i < v.adjacentNodes.length; i++) {
                    s.push(v.adjacentNodes[i]);
                    tmp = new Edge(v, v.adjacentNodes[i], 0);
                    edges.push(tmp)
                }      
            }  
        } else {
            st = new Start;
            st.start();
        }   
    };

    this.dfsClosed = function() {
        var max = 0;
        while (!s.isEmpty()) {
            v = s.pop();
            if (edges.size > 0) e = edges.pop();
            if (!visited2[v.index] || v.index === 0) {
                visited2[v.index] = true;
                depthGraph.vertices.push(v)
                if (depthGraph.vertices.length > 1) depthGraph.edges.push(e)
                for (var i = 0; i < v.adjacentNodes.length; i++) {
                    s.push(v.adjacentNodes[i]);
                    if (v.adjacentNodes[i].index > max) max = v.adjacentNodes[i].index;
                    tmp = new Edge(v, v.adjacentNodes[i], 0);
                    edges.push(tmp)
                }      
            }  
        }
        console.log(max)
        return max; 
    };
}