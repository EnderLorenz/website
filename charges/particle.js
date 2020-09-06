function Particle(x, y, sign) {
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  // this.vel = p5.Vector.random2D();///createVector();
  this.vel = createVector();
  //this.vel.setMag(random(2, 5));
  this.acc = createVector();
  this.sign = sign;

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.show = function() {
    stroke(255, 10);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  this.attracted = function(target) {
    var force = p5.Vector.sub(target, this.pos);
    var dissquared = force.magSq();
    dissquared = constrain(dissquared, 1, 3)
    var g = .000001;//6.67408*10;
    var strength = sign*g / dissquared;
    force.setMag(strength*random(-1, 1));
    this.acc.add(force);
  }
}
