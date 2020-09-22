function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

var grid;
var size = 11;
var cols, rows;
var w;
var current = [];
var stack = [];
drawn = false;
var openSet = [];
var closedSet = [];
var start;
var end;
var h;
var path = [];
cols = size;
rows = size;
total = 0;
var done = false;


function setup() {
  canvas = createCanvas(windowWidth-87, windowWidth-87);
  canvas.parent('canvas');
  grid = new Array(size);
  w = Math.floor(windowWidth/(size))-10;
  for (var i = 0; i < size; i++) {
    grid[i] = new Array(size).fill(0);
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, floor(random(10000)))
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
      grid[i][j].show(color(69));
    }
  }
  
  current = grid[0][0];
  start = grid[0][0];
  end = grid[size - 1][size - 1];
  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      console.log("Done!");
      noLoop();
      
      done = true;
    }

    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && neighbor) {
        var tempG = current.g + current.cost;

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
          neighbor.h = 0;//heuristic(neighbor, end);
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
  if (done) {
    fill(255);
    stroke(255);
    rect(width/2-75,height/2-75, 150, 50);
    for (var i = 0; i < path.length; i++) {
      total += path[i].cost
    }
    fill(0);
    stroke(0);
    text("Minimum Path Cost", width/2, height/2-53)
    text(total, width/2, height/2-40)
  }
  
}

