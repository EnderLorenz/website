function Particle() {
  this.orig_x = random(0, width);
  this.orig_y = random(0, height);
  this.pos = createVector(this.orig_x, this.orig_y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 5.5;
  this.prevPos = this.pos.copy();
  this.distance = Math.sqrt(this.pos.x*this.pos.x + this.pos.y*this.pos.y);
  this.orig_distance = Math.sqrt(this.orig_x*this.orig_x + this.orig_y * this.orig_y);
  this.color = color;
  this.color[4] = 5;

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
    // var x_c = map(this.pos.x, 0, width, -1, 1)
    // var y_c = map(this.pos.y, 0, height, -1, 1)
    // var v_c = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
    var x_c = map(this.orig_x, 0, width, -1, 1)
    var y_c = map(this.orig_y, 0, height, -1, 1)
    var width_c = map(width, 0, width, -1, 1);
    var height_c = map(height, 0, height, -1, 1);
    //var v_c = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);

    // var v_c = map(Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y),
    //               0, this.maxspeed, 0, 55)
    max_dist = Math.sqrt(width_c * width_c + height_c * height_c);
    var v_c = map(this.orig_distance, 0, max_dist, 0, 255);
    // var v_c = map(Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y),
    //               0, this.maxspeed, 0, 55)
    if(x_c >= 0) {
      var theta = Math.atan(y_c/x_c);
    }else {
      var theta =  Math.atan(y_c/x_c) + PI;
    }
    red   =  Math.sin(theta) * 127 + 128;
    green =  Math.sin(theta - PI/2) * 127 + 128;
    blue =   Math.sin(theta - PI) * 127 + 128;

    stroke(red, green, blue, v_c);
    strokeWeight(4);
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
