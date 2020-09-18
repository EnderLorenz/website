var tree;
var clickTime;
let input, input2, button, button2;

function setup() {
  canvas = createCanvas(2*windowWidth, windowHeight);
  canvas.parent('canvas');
  background(175);
  tree = new Tree(); 
  for (var i = 0; i < 15; i++) {
    tree.addValue(floor(random(0,1000)))
  }
  tree.traverse();
  input = createInput('').attribute('placeholder', 'Positive Integers');
  input.position(windowWidth-input.width-10, 100,);
  button = createButton('Search');
  button.position(input.x, input.y+input.height);
  button.mousePressed(search);

  button2 = createButton('Add');
  button2.position(input.x+button.width, input.y+input.height);
  button2.mousePressed(add);

  button3 = createButton('Delete');
  button3.position(button2.x+button2.width, input.y+input.height);
  button3.mousePressed(removeNode);
}
function draw() {

}

function search() {
  if (tree.root) {
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
  } else input.attribute('placeholder', 'Make a tree');
  
}

function add() {
  background(175);
  var num = input.value();
  input.value('');
  if (!isInt(num)) {
    tree.traverse();
    input.attribute('placeholder', 'Not an integer');
  } else if (tree.root) {
      tree.traverse();
      result = tree.quietSearch(num);
      if (result === null) {
        tree.addValue(num);
        background(175);
        tree.traverse();
        input.attribute('placeholder', 'Added!!');
      } else {
        input.attribute('placeholder', 'Not unique');
      }
  } else {
    tree.addValue(num);
    input.attribute('placeholder', 'Added!!');
    tree.traverse();
  }
}

function removeNode() {
  background(175);
  if (tree.root) {
    tree.traverse();
    var num = input.value();
    input.value('');
    if (!isInt(num)) {
      input.attribute('placeholder', 'Not an integer');
    } else {
      result = tree.quietSearch(num);
      if (result === null) {
        input.attribute('placeholder', 'Nothing Removed');
      } else {
        tree.remove(num);
        background(175);
        if (tree.root) {
          tree.traverse();
        input.attribute('placeholder', 'Removed');
        }
      }
    }
  } else input.attribute('placeholder', 'Make a tree');
  
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}