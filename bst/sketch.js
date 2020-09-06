var tree;
var clickTime;
let input, button, button2;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('img');
  // canvas.position(0,0)
  console.log("here  ", canvas.y)
  background(175);
  tree = new Tree(); 
  for (var i = 0; i < 15; i++) {
    tree.addValue(floor(random(0,1000)))
  }
  tree.traverse();
  input = createInput();
  input.position(windowWidth/3, 100,);
  button = createButton('Search');
  button.position(input.x+input.width, input.y);
  button.mousePressed(greet);
  button2 = createButton('Clear');
  button2.position(input.x + input.width+button.width, input.y);
  button2.mousePressed(clearSC);
}

function draw() {
  //tree.traverse();
}

function greet() {
  var num = input.value();
  input.value('');
  console.log(num, Number.isInteger(num), !Number.isInteger(num));
  if (!isInt(num)) {
    background(175);
    tree.traverse();
    fill(255, 0, 0);
    stroke(255, 0, 0);
    textSize(25);
    // textAlign(CENTER);
    text("Not an Integer", windowWidth/3, windowHeight);
  } else {
    background(175);
    tree.traverse();
    result = tree.search(num);
    if (result === null) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
      textSize(25);
      textAlign(CENTER);
      text("Not Found!!", input.x, input.y+input.height);
    }
  }
  
}

function clearSC() {
  background(175);
  tree.traverse();
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
