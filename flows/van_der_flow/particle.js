function Particle(color) {
  this.pos = createVector(random(width), random(height-10));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.color = color;
  this.maxspeed = 2;
  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.limit(this.maxspeed);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    var rnd = random(100)
    if (rnd < 3) {
      this.pos.x = random(width)
      this.pos.y = random(height-10);
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    } 
  }

  this.follow = function(vectorX, vectorY) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    this.vel.add([vectorX[index], vectorY[index]]);
  }

  this.show = function() {
    stroke(this.color);
    strokeWeight(3);

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
