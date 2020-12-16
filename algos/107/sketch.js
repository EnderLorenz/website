let input, input2, button, button2, button3, button4, button5;
let kruskalBoolean, dfsBoolean, bfsBoolean, dijkstraBoolean;
let b,d,k;


function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight
  frameRate(1)
  if (windowWidth > 700) canvas = createCanvas(canvasSize-87, canvasSize-257);
  else canvas = createCanvas(canvasSize-87, canvasSize);
  
  canvas.parent('canvas');
  input = createInput('').attribute('placeholder', 'Integer 0 - 100');
  input.parent('canvas')
  input.position(20, 181);
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

  button4 = createButton('Depth First Search');
  button4.parent('canvas')
  button4.position(input2.x, button2.y+button2.height);
  button4.mousePressed(dfsButton);

  button5 = createButton('Breadth First Search');
  button5.parent('canvas')
  button5.position(input.x, button4.y+button4.height);
  button5.mousePressed(bfsButton);

  button3 = createButton('Kruskal\'s Algorithm');
  button3.parent('canvas')
  button3.position(input.x, button5.y+button5.height);
  button3.mousePressed(kButton);

  button6 = createButton('Dijkstra\'s Algorithm');
  button6.parent('canvas')
  button6.position(input.x, button3.y+button3.height);
  button6.mousePressed(dijkstraButton);

  st = new Start();
  st.start();
}



function draw() {
  if (bfsBoolean) b.bfsOpen();
  if (dfsBoolean) d.dfsOpen()
  if (kruskalBoolean) k.kruskalOpen() 
  if (dijkstraBoolean) d.dijktraOpen() 
}

function nodesButton() {
  if (input.value() > 0 && input.value() < 101 && isInt(input.value())) {
    kruskalBoolean = false;
    dfsBoolean = false;
    bfsBoolean = false;
    dijkstraBoolean = false;
    let st = new Start();
    st.start();
  } else input.attribute('placeholder', 'Integer 0 - 100');
}

function sparcityButton() {
  if (input2.value() >= 0 && input2.value() <= 100) {
    kruskalBoolean = false;
    dfsBoolean = false;
    bfsBoolean = false;
    dijkstraBoolean = false;
    let st = new Start(input.value(), input2.value());
    st.start();
  } else input2.attribute('placeholder', '0 - 100%');
}

function kButton() {
  kruskalBoolean = true;
  dfsBoolean = false;
  bfsBoolean = false;
  dijkstraBoolean = false;
  k = new Kruskal;
}

function dfsButton() {
  dfsBoolean = true;
  bfsBoolean = false;
  kruskalBoolean = false;
  dijkstraBoolean = false;
  d = new Dfs;
}

function bfsButton() {
  bfsBoolean = true;
  dfsBoolean = false;
  kruskalBoolean = false;
  dijkstraBoolean = false;
  b = new Bfs;

}

function dijkstraButton() {
  dijkstraBoolean = true;
  bfsBoolean = false;
  dfsBoolean = false;
  kruskalBoolean = false;
  d = new Dijktra;
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}