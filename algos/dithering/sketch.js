let img1;
var x_img = 700;
var y_img = 790;

function preload() {
  var title = 'data/saturn5_900x722.jpg';
  img1 = loadImage(title);
  img2 = loadImage(title);
}
function setup() {
  canvas = createCanvas(x_img*2, 512);
  image(img2, 0, 0);
  img1.filter(GRAY);
  img2.filter(GRAY);
  noLoop();
}

function index(x , y) {
    return (x + y * img1.width) * 4;
}

function draw() {
  img1.loadPixels();
  for (var y = 0; y < img1.height; y++) {
    for (var x = 0; x < img1.width; x++) {
      oldR = img1.pixels[index(x, y)];
      oldG = img1.pixels[index(x, y) + 1];
      oldB = img1.pixels[index(x, y) + 2];
      var factor = 1;
      newR = Math.round(factor * oldR / 255) * (255/factor);
      newG = Math.round(factor * oldG / 255) * (255/factor);
      newB = Math.round(factor * oldB / 255) * (255/factor);
      img1.pixels[index(x, y)    ] = newR;
      img1.pixels[index(x, y) + 1] = newG;
      img1.pixels[index(x, y) + 2] = newB;
      var errR = oldR - newR;
      var errG = oldG - newG;
      var errB = oldB - newB;

      //x+1;
      rxp1 = img1.pixels[index(x+1, y)];
      img1.pixels[index(x+1, y)] = rxp1 + errR * 7/16;
      gxp1 = img1.pixels[index(x+1, y) + 1];
      img1.pixels[index(x+1, y) + 1] = gxp1 + errG * 7/16;
      bxp1 = img1.pixels[index(x+1, y) + 2];
      img1.pixels[index(x+1, y) + 2] = gxp1 + errB * 7/16;
      //x-1;
      rxm1 = img1.pixels[index(x-1, y+1)];
      img1.pixels[index(x-1, y+1)] = rxm1 + errR * 3/16;
      gxm1 = img1.pixels[index(x-1, y+1) + 1];
      img1.pixels[index(x-1, y+1) + 1] = gxm1 + errG * 3/16;
      bxm1 = img1.pixels[index(x-1, y+1) + 2];
      img1.pixels[index(x-1, y+1) + 2] = bxm1 + errB * 3/16;
      //y+1;
      ryp1 = img1.pixels[index(x, y+1)];
      img1.pixels[index(x, y+1)] = ryp1 + errR * 5/16;
      gyp1 = img1.pixels[index(x, y+1) + 1];
      img1.pixels[index(x, y+1) + 1] = gyp1 + errG * 5/16;
      byp1 = img1.pixels[index(x, y+1) + 2];
      img1.pixels[index(x, y+1) + 2] = byp1 + errB * 5/16;
      //y-1;
      rym1 = img1.pixels[index(x+1, y+1)];
      img1.pixels[index(x+1, y+1)] = rym1 + errR * 1/16;
      gym1 = img1.pixels[index(x+1, y+1) + 1];
      img1.pixels[index(x+1, y+1) + 1] = gym1 + errG * 1/16;
      bym1 = img1.pixels[index(x+1, y+1) + 2];
      img1.pixels[index(x+1, y+1) + 2] = gym1 + errB * 1/16;
    }
  }
  img1.updatePixels();
  image(img1, x_img, 0);
}
