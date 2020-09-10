var i, canvasSize;

function setup() {
  if (windowWidth < windowHeight) {canvasSize = windowWidth} 
  else { canvasSize = windowHeight; }
  createCanvas(canvasSize, canvasSize);
    frameRate(.75);
    background(256);
    i = 0;

}

function draw() {
  background(256);
  var length = 7;
  ++i;
    if(i <= length) { serpinskii(50, 0, canvasSize/1.5, i, [100, 100, 100, 50]); }
    if (i > length)  { serpinskii(50, 0, canvasSize/1.5, (2*length)-i, [200, 200, 200]); }
    if (i === length*2-2)  i = 0;
}

function serpinskii(leftX, leftY, size, order, color) {
    if(order > 0) {
        halfSize = size/2.0;
        rightX = leftX+size;
        centerX = leftX+halfSize;
        centerY = size*sin(PI/3)+leftY;
        stroke(color)
        line(leftX, leftY, rightX, leftY);//across the top
        line(leftX, leftY, centerX, centerY);//left to bottom
        line(centerX, centerY, rightX, leftY);//right to bottom
        serpinskii(leftX, leftY, halfSize, order-1, [0, 0, 255, 75]);
        halfSize = size/2.0;
        centerX = leftX+halfSize;
        serpinskii(centerX, leftY, halfSize, order-1, [0, 255, 0, 75]);
        halfSize = size/2.0;
        middleX = leftX+size/4.0;
        middleY = halfSize*sin(PI/3)+leftY;//sin(60)*2
        serpinskii(middleX, middleY, halfSize, order-1, [255, 0, 0, 75]);
    }
}

