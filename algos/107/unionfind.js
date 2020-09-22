function UnionFind(size) {
  this.size = size;
  this.numComponents = size;
  this.id = new Array(size);
  for ( let i = 0; i < this.size; i++) {
    this.id[i] = i;
  }
  
  this.sz = new Array(size).fill(1);
  
  this.find = function(p) {
    var root = p;
    while (root != this.id[root]) {
        root = this.id[root];
    }
    while (p != root) {
        var next = this.id[p];
        this.id[p] = root;
        p = next;
    }
    return root;
  }

  this.connected = function(p, q) {
      return this.find(p) == this.find(q);
  }

  this.componentSize = function(p) {
      return this.sz[this.find(p)];
  }
  
  this.union = function(p, q) {
    root1 = this.find(p);
    root2 = this.find(q);

    if (root1 == root2) return;

    if (this.sz[root1] < this.sz[root2]) {
        this.sz[root2] += this.sz[root1]
        this.id[root1] = root2;
    } else {
        this.sz[root1] += this.sz[root2];
        this.id[root2] = root1;
    }
    this.numComponents--;
  }


}