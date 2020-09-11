function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

var cols = 150;
var rows = 150;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight

  canvas = createCanvas(canvasSize-90, canvasSize-90);
  canvas.parent('img');
  console.log('A*');
  w = width / cols;
  h = height / rows;
  background(0);
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

function draw() {
  //draw is looping 
  if (openSet.length > 0) {
    //keep looping
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("Done!");
    }

    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
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
      grid[i][j].show(color(255))
    }
  }
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0))
  }
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0))
  }

  //find the path
    path = [];
    var tmp = current;
    path.push(tmp);

    while (tmp.previous) {
      path.push(tmp.previous);
      tmp = tmp.previous;
    }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}
