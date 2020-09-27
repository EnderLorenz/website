var cols = 150;
var rows = 150;
var w, h, button, button2;
var aStarBoolean = true;
var dBoolean = false;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight

  canvas = createCanvas(canvasSize-90, canvasSize-90);
  canvas.parent('img');
  w = (width + 1) / cols;
  h = (height + 1) / rows;
  background(0);
  button = createButton('A');
  button.parent('img')
  button.position(50, 205);
  button.mousePressed(aStarPressed);
  button2 = createButton('Djkstra');
  button2.parent('img')
  button2.position(button.x+button.width, 205);
  button2.mousePressed(aStarPressed);


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

function aStarPressed() {
    aStarBoolean = false;
    dBoolean = true;
    astar = new PathFinder;
}

function dPressed() {
    dBoolean = false;
    astar = new PathFinder;
    aStarBoolean = true;
}

