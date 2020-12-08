function Forrest(nTrees, size) {
    this.trees = [];
    for (var i = 0; i < nTrees; i++) {
        tmp = new Tree(0, size);
        this.trees.push(tmp);
    }
    this.trees.sort(function(a, b) {
        return a.dist - b.dist;
    });
    this.forrest = function() {

    }

    this.show = function(graph) {
        for (i = 0; i < nTrees; i++) this.trees[i].show(graph);
    }
}