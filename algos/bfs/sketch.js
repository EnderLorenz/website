var data = [];
var rows = 9;
var counter = 2;
var count = rows;
var n_data;

function max_paths_obj(first, second){
  if (first.cost > second.cost) return first;
  else return second;
}

function myRoutine(i) {
    for(var j = 0; j < rows-i; j++) {
      var tmp = max_paths_obj(data[j], data[j+1])
      data[j].cost = tmp.cost + data[n_data].val;
      for (var k = 0; k < data[j].children.length; k++) {
        data[j].children[k] = tmp.children[k]
        data[j].children[k].show(color(240,230,140))
      }
      data[j].children.push(data[n_data]);
      text(data[j].cost, data[n_data].x-5, data[n_data].y+40)
      n_data++;
    }
}

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight

  canvas = createCanvas(canvasSize*2, canvasSize*2);
  canvas.parent('canvas');
  frameRate(.7);
  var xhere = width/2;
  var yhere = 0;
  var size = 50;
  for ( var i = 0; i < rows; i++) {
    for (var j = 0; j < i; j++) {
      var rnd = floor(random(30));
      tmp = new Cell(xhere, yhere, rnd, rnd)      
      if (i < rows-1) {
        data.unshift(tmp);
        stroke(0)
        line(xhere, yhere, xhere-size, yhere + size*1.5)
        line(xhere, yhere, xhere+size, yhere + size*1.5)
        tmp.show(color(112,128,144));
      } else {
        tmp.show(color(112,128,144))
        data.unshift(tmp);
      }
      xhere += size*2;
    }
    yhere += size*1.5;
    xhere = width/2.0 - size*i;
  }
  n_data = rows-1;
}

function draw() {

  if (frameCount % 2 != 0){
    for (var i = n_data-count+1; i < n_data; i++) {
      data[i].show(color(178,34,34))
    } 
    count--;
  }  else {
    myRoutine(counter);
    counter++;
  }
  if (counter == rows+1) {
    for (var i = 0; i < data[0].children.length; i++) {
      data[0].children[i].show(color(57,99,89))
    }
    noLoop();
  }  
}