function Cell(x, y, val, cost) {
    this.x = x;//col
    this.y = y;//row;
    this.val = val;
    this.cost = cost;
    this.children = [this];
  
    this.highlight = function() {
      var x = this.i;
      var y = this.j;
      noStroke();
      fill(30, 50, 155);
      rect(x, y, w, w);
    }
    
      this.show = function (color) {
        fill(color)
        noStroke();
        ellipse(this.x, this.y, 50)  
        fill(0)
        text(this.val, this.x-5, this.y+4)
      }
    
}