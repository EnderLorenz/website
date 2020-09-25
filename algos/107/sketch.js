var size, sparcit;
var ind = 0;
let cost = 0;
let graph, uf, mst, visited, visited2, s, q, edges, depthGraph;
let input, input2, button, button2, button3, button4, button5, button6, button7;
let kruskalBoolean, dfsBoolean, bfsBoolean;;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight
  frameRate(1)
  canvas = createCanvas(windowWidth-87, windowWidth-87);
  canvas.parent('canvas');
  
  input = createInput('').attribute('placeholder', 'Integer 0 - 100');
  input.parent('canvas')
  input.position(20, 180);
  input.size(90)
  button = createButton('Number of Nodes');
  button.parent('canvas')
  button.position(input.x+98, input.y);
  button.mousePressed(nodesButton);

  input2 = createInput('').attribute('placeholder', '0 - 100%');
  input2.parent('canvas')
  input2.position(input.x, input.y+input.height);
  input2.size(90)
  button2 = createButton('Sparcity');
  button2.parent('canvas')
  button2.position(input2.x+input2.width, input2.y);
  button2.mousePressed(sparcityButton);

  button3 = createButton('Kruskal\'s Algorithm');
  button3.parent('canvas')
  button3.position(input2.x, input2.y+input2.height);
  button3.mousePressed(kButton);

  button4 = createButton('Depth First Search');
  button4.parent('canvas')
  button4.position(input.x, button3.y+button3.height);
  button4.mousePressed(dfsButton);

  button5 = createButton('Breadth First Search');
  button5.parent('canvas')
  button5.position(input.x, button4.y+button4.height);
  button5.mousePressed(bfsButton);

  

  size = 5;
  sparcity = .5;
  st = new Start
  st.start();
}

function draw() {
  if (bfsBoolean) {
    b = new Bfs;
    b.bfsOpen();
  }
  if (dfsBoolean) {
    d = new Dfs;
    d.dfsOpen()
  }
  if (kruskalBoolean) {
    k = new Kruskal;
    k.kruskalOpen() 
  }
}

function nodesButton() {
  num = input.value();
  input.value('');
  if (num > 0 && num < 101 && isInt(num)) {
    input.attribute('placeholder', num);
    size = num;
    st = new Start;
    st.start();  
  } else input.attribute('placeholder', 'Integer 0 - 100');
}

function sparcityButton() {
  num = input2.value();
  input2.value('');
  if (num > 0 && num <= 100) {
    input2.attribute('placeholder', num);
    sparcity = num*.01;
    st = new Start;
    st.start();  
  } else input2.attribute('placeholder', '0 - 100%');
}

function kButton() {
  kruskalBoolean = true;
  dfsBoolean = false;
  bfsBoolean = false;
  st = new Start;
  st.start();
}

function dfsButton() {
  dfsBoolean = true;
  bfsBoolean = false;
  kruskalBoolean = false;
  st = new Start;
  st.start();
}

function bfsButton() {
  bfsBoolean = true;
  dfsBoolean = false;
  kruskalBoolean = false;
  st = new Start;
  st.start();
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}