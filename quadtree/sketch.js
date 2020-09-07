let qtree;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else {
    canvasSize = windowHeight
  }
  canvas = createCanvas(canvasSize-90, canvasSize-90);
  canvas.parent('img');
 let boundary = new Rectangle(0, 0, canvasSize, canvasSize)
 qtree = new QuadTree(boundary, 1);
 for (let i = 0; i < 300; i++) {
   let x = randomGaussian(width/2, width/8);
   let y = randomGaussian(height/2, height/8);
   let p = new Point(x, y);
   qtree.insert(p);
 }

}

function draw() {
  background(0);
  qtree.show();

  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 25, 25);
  rect(range.x, range.y, range.w*2, range.h*2);
  let points = qtree.query(range);

  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
}
