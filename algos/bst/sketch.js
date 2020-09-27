var tree, count;
let input, input2, button, button2, button3, button4, button5, button6, button7;


function setup() {
  if (windowWidth < 800) canvas = createCanvas(2*windowWidth, windowHeight);
  else canvas = createCanvas(1.25*windowWidth, windowHeight);
  canvas.parent('canvas');
  background(255);
  tree = new Tree(); 
  for (var i = 0; i < 15; i++) {
    tree.addValue(floor(random(0,1000)))
  }
  tree.drawTraverse();
  input = createInput('').attribute('placeholder', 'Positive Integers');
  input.position(windowWidth-input.width-50, 100,);
  button = createButton('Search');
  button.position(input.x, input.y+input.height);
  button.mousePressed(search);

  button2 = createButton('Add');
  button2.position(input.x+button.width, input.y+input.height);
  button2.mousePressed(add);

  button3 = createButton('Delete');
  button3.position(button2.x+button2.width, input.y+input.height);
  button3.mousePressed(removeNode);

  button4 = createButton('invert');
  button4.position(button.x, button.y+button.height);
  button4.mousePressed(invertTree);

  button5 = createButton('pre');
  button5.position(button.x + button4.width, button.y+button.height);
  button5.mousePressed(preTraverseTree);

  button6 = createButton('in');
  button6.position(button5.x + button5.width, button.y+button.height);
  button6.mousePressed(inTraverseTree);

  button7 = createButton('post');
  button7.position(button6.x + button6.width, button.y+button.height);
  button7.mousePressed(postTraverseTree);
}

function search() {
  if (tree.root) {
    var num = input.value();
    input.value('');
    if (!isInt(num)) {
      background(255);
      tree.drawTraverse();
      input.attribute('placeholder', 'Not an integer');
    } else {
      num = parseFloat(num);
      background(255);
      tree.drawTraverse();
      result = tree.drawSearch(num);
      if (result === null) {
        input.attribute('placeholder', 'Not found');
      } else {
        input.attribute('placeholder', 'Found!!');
      }
    } 
  } else input.attribute('placeholder', 'Make a tree');
  
}

function add() {
  background(255);
  var num = input.value();
  input.value('');
  if (!isInt(num)) {
    tree.drawTraverse();
    input.attribute('placeholder', 'Not an integer');
  } else if (tree.root) {
      num = parseFloat(num);
      tree.drawTraverse();
      result = tree.search(num);
      if (result === null) {
        tree.addValue(num);
        background(255);
        tree.drawTraverse();
        input.attribute('placeholder', 'Added!!');
      } else {
        input.attribute('placeholder', 'Not unique');
      }
  } else {
    num = parseFloat(num);
    tree.addValue(num);
    input.attribute('placeholder', 'Added!!');
    tree.drawTraverse();
  }
}

function removeNode() {
  background(255);
  if (tree.root) {
    tree.drawTraverse();
    var num = input.value();
    input.value('');
    if (!isInt(num)) {
      input.attribute('placeholder', 'Not an integer');
    } else {
      num = parseFloat(num);
      result = tree.search(num);
      if (result === null) {
        input.attribute('placeholder', 'Nothing Removed');
      } else {
        tree.remove(num);
        background(255);
        if (tree.root) {
          tree.drawTraverse();
        input.attribute('placeholder', 'Removed');
        }
      }
    }
  } else input.attribute('placeholder', 'Make a tree');
}

function invertTree() {
  if (tree.root) {
      background(255);
      tree.invert();
      tree.drawTraverse();
      input.attribute('placeholder', 'Inverted!!');
  } else input.attribute('placeholder', 'Make a tree');
}

function preTraverseTree() {
  if (tree.root) {
      background(255);
      tree.drawTraverse();
      count = 0;
      tree.traverse('pre')
      input.attribute('placeholder', 'Traversing!!');
  } else input.attribute('placeholder', 'Make a tree');
}

function inTraverseTree(type) {
  if (tree.root) {
      background(255);
      tree.drawTraverse();
      count = 0;
      tree.traverse('in')
      input.attribute('placeholder', 'Traversing!!');
  } else input.attribute('placeholder', 'Make a tree');
}

function postTraverseTree() {
  if (tree.root) {
      background(255);
      tree.drawTraverse();
      count = 0;
      tree.traverse('post')
      input.attribute('placeholder', 'Traversing!!');
  } else input.attribute('placeholder', 'Make a tree');
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}