var cols = 150;
var rows = 150;
var w, h, button;
var aStarBoolean = true;
var dBoolean = false;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight

  canvas = createCanvas(canvasSize-90, canvasSize-90);
  canvas.parent('img');
  w = width / cols;
  h = height / rows;
  background(0);
  button = createButton('A*: Press to change to Djkstra');
  button.parent('img')
  button.size(230, 21)
  button.position(50, 210);
  button.mousePressed(switchType);


  astar = new PathFinder;
}

function draw() {
  if (aStarBoolean) {
    astar.aStarOpen();
  }
  if (dBoolean) {
    astar.dijkstraOpen();
  }
  
}

function switchType() {
  if (aStarBoolean) {
    aStarBoolean = false;
    dBoolean = true;
    astar = new PathFinder;
    button = createButton('Djkstra: Press to change to A*');
    button.parent('img')
    button.size(230, 21)
    button.position(50, 210);
    button.mousePressed(switchType);
  } else {
    dBoolean = false;
    astar = new PathFinder;
    aStarBoolean = true;
    button = createButton('A*: Press to change to Djkstra');
    button.parent('img')
    button.size(230, 21)
    button.position(50, 210);
    button.mousePressed(switchType);
  }
  
}
