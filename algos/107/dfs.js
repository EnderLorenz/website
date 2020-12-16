class Dfs {
    constructor() {
        this.st = new Start();
        this.st.start();
        this.s = new Stack;
        this.edges = new Stack;
        this.s.push(this.st.graph.vertices[0]);
        this.visited = st.visited;
        this.visited[0] = true;
        this.depthGraph = new Graph;
        this.visited2 = st.visited2;
        this.visited2[0] = true;
    }

    dfsOpen = function() {
        if (!this.s.isEmpty()) {
            let v = this.s.pop();
            let e;
            if (this.edges.size > 0) e = this.edges.pop();
            if (!this.visited[v.index] || v.index === 0) {
                this.visited[v.index] = true;
                this.depthGraph.vertices.push(v);
                if (this.depthGraph.vertices.length > 1) {
                    this.depthGraph.edges.push(e);
                    this.depthGraph.show(color(155, 90, 0), color(40, 155, 100));
                }
                for (var i = 0; i < v.adjacentNodes.length; i++) {
                    this.s.push(v.adjacentNodes[i]);
                    let tmp = new Edge(v, v.adjacentNodes[i], 0);
                    this.edges.push(tmp);
                }      
            }  
        } else {
            this.st = new Start();
            this.st.start();
            this.s = new Stack;
            this.edges = new Stack;
            this.s.push(this.st.graph.vertices[0])
            this.visited = [];
            this.visited[0] = true;
            this.depthGraph = new Graph;
        }   
    };

    dfsClosed = function() {
        var max = 0;
        while (!this.s.isEmpty()) {
            let v = this.s.pop();
            let e;
            if (this.edges.size > 0) e = this.edges.pop();
            if (!this.visited2[v.index] || v.index === 0) {
                this.visited2[v.index] = true;
                this.depthGraph.vertices.push(v);
                if (this.depthGraph.vertices.length > 1) this.depthGraph.edges.push(e);
                for (var i = 0; i < v.adjacentNodes.length; i++) {
                    this.s.push(v.adjacentNodes[i]);
                    if (v.adjacentNodes[i].index > max) max = v.adjacentNodes[i].index;
                    let tmp = new Edge(v, v.adjacentNodes[i], 0);
                    this.edges.push(tmp);
                }      
            }  
        }
        return max; 
    };
}