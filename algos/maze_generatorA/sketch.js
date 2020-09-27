function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = abs(a.i - b.i) + abs(a.j - b.j)
  return d;
}

function index(i, j) {
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1) return -1;
  return i + j * cols;
}

var cols, rows;
var w = 30;
var grid = [];
var current = [];
var stack = [];
drawn = false;
var openSet = [];
var closedSet = [];
var start;
var end;
var h;
var path = [];


function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvasSize = w * (floor(canvasSize / w) - 3);
  h = w;
  
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('img');
  cols = floor(width / w);
  rows = floor(height / w);

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid[i][j] = new Cell(i, j);
    }
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  current = grid[0][0];
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  openSet.push(start);
}

function draw() {
  background(51);
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid[i][j].show();
    }
  }

  if (!drawn){
    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      current.removeWalls(current, next)
      current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
    if(current.i == 0 && current.j == 0){
      drawn = true;
    }
  }//end maze creation

  if(drawn === true) {
  //draw is looping 
  if (openSet.length > 0) {
    //keep looping
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var currentA = openSet[winner];

    if (currentA === end) {
      noLoop();
    }

    removeFromArray(openSet, currentA)
    closedSet.push(currentA);
    
    var neighbors = currentA.neighbors;
    for (var i = 0; i < currentA.walls.length; i++) {
      var neighbor = neighbors[i];
        if (!closedSet.includes(neighbor) && !currentA.walls[i] && neighbor) {
          var tempG = currentA.g + 1;
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
            neighbor.previous = currentA;
          }
        }
    }

  } else {
    noLoop();
    return;
  }
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].showPath(color(255, 0, 0))
  }
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].showPath(color(0, 255, 0))
  }

  //find the path
    path = [];
    var tmp = currentA;
    path.push(tmp);

    while (tmp.previous) {
      path.push(tmp.previous);
      tmp = tmp.previous;
    }

    for (var i = 0; i < path.length; i++) {
      path[i].showPath(color(0, 0, 155));
    }
  }

}