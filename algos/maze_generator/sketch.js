var cols, rows;
var w = 20;
var grid = [];
var current = [];
var stack = [];
drawn = false;


function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvasSize = 400;
  canvasSize = w * (floor(canvasSize / w) - 3);
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('img');
  cols = floor(width / w);
  rows = floor(height / w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];

}

function draw() {
  background(51);

  if (!drawn){
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    current.visited = true;
    current.highlight();
    //Step 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      //Step 2
      stack.push(current);
      //Step 3
      removeWalls(current, next);
      //Step 4
      current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
    if(current.i == 0 && current.j == 0){
      drawn = true;
      for (var i = 0; i < grid.length; i++) {
        grid[i].show();
      }
      noLoop();
    }
  }

}

function index(i, j) {
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1) return -1;
  return i + j * cols;
}

function removeWalls(a, b) {
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}
