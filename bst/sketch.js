var tree;
var clickTime;
let input, button, button2;
var greeting;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('img');
  background(175);
  tree = new Tree(); 
  for (var i = 0; i < 15; i++) {
    tree.addValue(floor(random(0,1000)))
  }
  tree.traverse();
  // input = createInput();
  input = createInput('').attribute('placeholder', 'Search for an integer');
  input.position(windowWidth/3, 100,);
  button = createButton('Search');
  button.position(input.x+input.width, input.y);
  button.mousePressed(greet);
}

function draw() {
  //tree.traverse();
}

function greet() {
  var num = input.value();
  input.value('');
  if (!isInt(num)) {
    background(175);
    tree.traverse();
    input.attribute('placeholder', 'Not an integer');
  } else {
    background(175);
    tree.traverse();
    result = tree.search(num);
    if (result === null) {
      input.attribute('placeholder', 'Not found');
    } else {
      input.attribute('placeholder', 'Found!!');
    }
  }
  
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas()
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}
