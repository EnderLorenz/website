function Graph() {
    this.vertices = [];
    this.edges = [];


    this.show = function(col) {
        for (var i = 0; i < this.vertices.length; i++)
            this.vertices[i].show(color(80, 80, 174))
        for (var i = 0; i < this.edges.length; i++)
            this.edges[i].show(col)
    }
}