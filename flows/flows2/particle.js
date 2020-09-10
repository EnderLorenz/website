function Particle(color, choice) {

  if (choice == 3) {
    this.orig_x = random(width/2.01, width/1.99);
    this.orig_y = random(height/2.01, height/1.99);
  }
  this.pos = createVector(this.orig_x, this.orig_y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.color = color;
  this.maxspeed = 1;
  this.prevPos = this.pos.copy();
  this.distance = Math.sqrt(this.pos.x*this.pos.x + this.pos.y*this.pos.y);

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vector) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vector[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(color);
    strokeWeight(2);

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
