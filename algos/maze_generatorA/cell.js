function Cell(i, j) {
    this.i = i;//col
    this.j = j;//row;
    this.walls = [true, true, true, true]; //top right bottom left
    this.visited = false;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
  
    this.checkNeighbors = function () {
      var neighbors = [];
      if (j > 0) var top  = grid[i][j - 1];
      if (i < cols - 1) var right  = grid[i + 1][j];
      if (j < rows - 1) var bottom = grid[i][j + 1];
      if (i > 0) var left = grid[i - 1][j];
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
      var i = this.i;
      var j = this.j;
      if (j > 0) this.neighbors.push(grid[i][j - 1]);
      else this.neighbors.push(this.grid);
      if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
      else this.neighbors.push(this.grid);
      if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
      else this.neighbors.push(this.grid);
      if (i > 0) this.neighbors.push(grid[i - 1][j]);
      else this.neighbors.push(this.grid);
    }

    this.removeWalls = function(a, b) {
      var x = a.i - b.i;
      if(x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
      } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
      }
    
      var y = a.j - b.j;
      if(y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
      } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
      }
    }
  
    this.highlight = function() {
      var x = this.i * w;
      var y = this.j * w;
      noStroke();
      fill(30, 50, 155);
      rect(x, y, w, w);
    }

    this.showPath = function (color) {
      fill(color);
      stroke(color);
      if (this.wall) {
        fill(0)
        stroke(0)
      }
      rect(this.i * w + w/3, this.j * h + h/3, (w - 1) / 4, (h - 1) / 4);
    }
  
    this.show = function () {
      var x = this.i * w;
      var y = this.j * w;
      stroke(150)
      if (this.walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
        line(x, y + w, x, y);
      }
      if (this.visited) {
        noStroke();
        fill(51);
        rect(x, y, w, w);
      }
    }
  }