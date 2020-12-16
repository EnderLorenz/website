class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }
    
    show = function(colEdges, colVert) {
        for (var i = 0; i < this.edges.length; i++)
            if (this.edges[i] != 0)
            this.edges[i].show(colEdges)
        for (var i = 0; i < this.vertices.length; i++)
            this.vertices[i].show(colVert)
    }
}