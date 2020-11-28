function Particle(x, y, sign) {
  this.pos = createVector(x, y, 0);
  this.prev = createVector(x, y, 0);
  this.vel = createVector(0, 0, 0);
  this.acc = createVector();
  this.sign = sign;

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.show = function() {
    stroke(255, 30);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  this.attracted = function(target) {
    var force = p5.Vector.sub(target, this.pos);
    var dissquared = force.magSq();
    dissquared = constrain(dissquared, 1, 2)
    var g = 6.67408*.005;
    var strength = target.z*g / dissquared;
    force.setMag(strength);
    this.acc.add(force);
  }
}
