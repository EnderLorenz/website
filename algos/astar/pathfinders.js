function PathFinder() {
    this.openSet = [];
    this.closedSet = [];
    this.grid = new Array(cols);
    this.start;
    this.end;
    this.w
    this.h;
    this.path = [];

    for (var i = 0; i < cols; i++) {
        this.grid[i] = new Array(rows)
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            this.grid[i][j] = new Spot(i, j);
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            this.grid[i][j].addNeighbors(this.grid);
        }
    }
    this.start = this.grid[floor(rows/2)][floor(cols/2)];
    this.end = this.grid[cols - 1][rows - 1];
    this.start.wall = false;
    this.end.wall = false;
    this.openSet.push(this.start);

    this.aStarOpen = function() {
        if (this.openSet.length > 0) {
            var winner = 0;
            for (var i = 0; i < this.openSet.length; i++) {
              if (this.openSet[i].f < this.openSet[winner].f) winner = i;
            }
            var current = this.openSet[winner];
        
            if (current === this.end) {
              noLoop();
              console.log("Done!");
            }
        
            this.removeFromArray(this.openSet, current)
            this.closedSet.push(current);
        
            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
              var neighbor = neighbors[i];
        
              if (!this.closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + 1;
        
                var newPath = false;
                if (this.openSet.includes(neighbor)) {
                  if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    newPath = true;
                  }
                } else {
                  neighbor.g = tempG;
                  newPath = true;
                  this.openSet.push(neighbor);
                }
        
                if (newPath) {
                  neighbor.h = this.heuristic(neighbor, this.end);
                  neighbor.f = neighbor.g + neighbor.h;
                  neighbor.previous = current;
                }
              }
            }
          } else {
                console.log('no soln')
                noLoop();
                return;
          }
        
          for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j].show(color(255))
            }
          }
          
          for (var i = 0; i < this.closedSet.length; i++) {
            this.closedSet[i].show(color(255, 0, 0))
          }
          for (var i = 0; i < this.openSet.length; i++) {
            this.openSet[i].show(color(0, 255, 0))
          }
        
          //find the path
            this.path = [];
            var tmp = current;
            this.path.push(tmp);
        
            while (tmp.previous) {
                this.path.push(tmp.previous);
                tmp = tmp.previous;
            }
        
          for (var i = 0; i < this.path.length; i++) {
            this.path[i].show(color(0, 0, 255));
          }
          noFill()
          stroke(0)
          rect(0, 0, width, height)
    };

    this.dijkstraOpen = function() {
        if (this.openSet.length > 0) {
            var winner = 0;
            for (var i = 0; i < this.openSet.length; i++) {
              if (this.openSet[i].f < this.openSet[winner].f) winner = i;
            }
            var current = this.openSet[winner];
        
            if (current === this.end) {
              noLoop();
              console.log("Done!");
            }
        
            this.removeFromArray(this.openSet, current)
            this.closedSet.push(current);
        
            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
              var neighbor = neighbors[i];
        
              if (!this.closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + 1;
        
                var newPath = false;
                if (this.openSet.includes(neighbor)) {
                  if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    newPath = true;
                  }
                } else {
                  neighbor.g = tempG;
                  newPath = true;
                  this.openSet.push(neighbor);
                }
        
                if (newPath) {
                  neighbor.h = 0;
                  neighbor.f = neighbor.g + neighbor.h;
                  neighbor.previous = current;
                }
              }
            }
          } else {
                console.log('no soln')
                noLoop();
                return;
          }
        
          for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j].show(color(255))
            }
          }
          for (var i = 0; i < this.closedSet.length; i++) {
            this.closedSet[i].show(color(255, 0, 0))
          }
          for (var i = 0; i < this.openSet.length; i++) {
            this.openSet[i].show(color(0, 255, 0))
          }
        
          //find the path
            this.path = [];
            var tmp = current;
            this.path.push(tmp);
        
            while (tmp.previous) {
                this.path.push(tmp.previous);
                tmp = tmp.previous;
            }
        
          for (var i = 0; i < this.path.length; i++) {
            this.path[i].show(color(0, 0, 255));
          }
          noFill()
          stroke(0)
          rect(0, 0, width, height)
    };

    this.removeFromArray = function(arr, elt) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] == elt) {
            arr.splice(i, 1);
          }
        }
    };
      
    this.heuristic = function(a, b) {
        var d = dist(a.i, a.j, b.i, b.j);
        return d;
    };
}