function Cell(i, j, cost) {
    this.i = i;//col
    this.j = j;//row;
    this.cost = cost;
    this.visited = false;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
  
    this.checkNeighbors = function () {
      var neighbors = [];
      if (j > 0) var left  = grid[i][j - 1];
      if (i < size - 1) var bottom  = grid[i + 1][j];
      if (j < size - 1) var right = grid[i][j + 1];
      if (i > 0) var top = grid[i - 1][j];
      if (top && !top.visited) neighbors.push(top);
      if (right && !right.visited) neighbors.push(right);
      if (bottom && !bottom.visited) neighbors.push(bottom);
      if (left && !left.visited) neighbors.push(left);      
      if (neighbors.length > 0) {
        var r = floor(random(0, neighbors.length))
        return neighbors[r];
      } else return undefined;
    }

    this.addNeighbors = function (grid) {
      var i = this.i;//y?  rows top,bottom
      var j = this.j;//x?  cols left, right
      if (j > 0) this.neighbors.push(grid[i][j - 1]);
      else this.neighbors.push(this.grid);//left
      if (i < size - 1) this.neighbors.push(grid[i + 1][j]);
      else this.neighbors.push(this.grid);//bottom
      if (j < size - 1) this.neighbors.push(grid[i][j + 1]);
      else this.neighbors.push(this.grid);//right
      if (i > 0) this.neighbors.push(grid[i - 1][j]);
      else this.neighbors.push(this.grid);//top
    }
  
    this.show = function (color) {
      var y = this.i * w;
      var x = this.j * w;
      stroke(150)
      noStroke();
      fill(color);
      rect(x, y, w, w);
      stroke(255);
      fill(255);
      textAlign(CENTER);
      text(this.cost, x+w/2, y+w/2)
    }
  }