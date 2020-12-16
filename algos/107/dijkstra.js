class Dijktra {
    constructor() {
      this.st = new Start();
      this.st.start();
      this.ind = -1;
      this.openSet = [this.st.graph.vertices[0]];
      this.closedSet = [];
      this.total = 0;
      this.done = false;
      this.extraDone = false;
      this.end = this.st.graph.vertices[this.st.graph.vertices.length-1];
    }

    dijktraOpen = function() {
        let openS = new Graph;
        let closedS = new Graph;
        let pathS = new Graph;
        let current;
        pathS.vertices.push(this.st.graph.vertices[0])//
        if (this.openSet.length > 0 && !this.done) {//
          let winner = 0;//
          for (let i = 0; i < this.openSet.length; i++) {//
            if (this.openSet[i].f < this.openSet[winner].f) winner = i;//
          }
          current = this.openSet[winner];//
          if (current === this.end) this.done = true;//
          this.removeFromArray(this.openSet, current)//
          this.closedSet.push(current);//
          let neighbors = current.adjacentNodes;//
          for (let i = 0; i < neighbors.length; i++) {//
            let neighbor = neighbors[i];//
            let neighborCost = current.adjacentNodesCost[i];//
            if (!this.closedSet.includes(neighbor) && neighbor) {//
              let tempG = current.g + neighborCost;//
              let newPath = false;//
              if (this.openSet.includes(neighbor)) {//
                if (tempG < neighbor.g) {////
                  neighbor.g = tempG;//
                  newPath = true;//
                }//
              } else {//
                neighbor.g = tempG;//
                newPath = true;//
                this.openSet.push(neighbor);//
              }
              if (newPath) {//
                neighbor.h = 0;//
                neighbor.f = neighbor.g + neighbor.h;//
                neighbor.parent = current;//
              }//
            }
          }
      
        } else this.extraDone = true;//
        if (!this.extraDone) {//
            for (var i = 0; i < this.closedSet.length; i++) {//
          closedS.vertices.push(this.closedSet[i]);//
          if (this.closedSet.length > 1 && i > 0) {//
            let tmpE = new Edge(this.closedSet[i], this.closedSet[i].parent, 0);//
            closedS.edges.push(tmpE);//
          }
        }
        closedS.show(color(103, 0, 0), color(103, 0, 0));//
        let tmpE;
        for (let i = 0; i < this.openSet.length; i++) {//
          openS.vertices.push(this.openSet[i]);//
          if (this.openSet.length > 1 && i > 0) {//
            tmpE = new Edge(this.openSet[i], this.openSet[i].parent, 0);//
            openS.edges.push(tmpE);//
          }
        }
        openS.show(color(88, 97, 194), color(88, 97, 194));//
        let path = [];//
        let tmp = current;//
          
        path.push(tmp);//
        while (tmp && tmp.parent) {//
          path.push(tmp.parent);//
          tmp = tmp.parent;//
        }
      
        for (var i = 0; i < path.length; i++) {
          pathS.vertices.push(path[i]);  // 
          if (path.length > 1 && i > 0 && i < path.length) {
            tmpE = new Edge(path[i], path[i-1], 0);//
            pathS.edges.push(tmpE);//
          }
        }
        pathS.show(color(102, 161, 60), color(102, 161, 60));//
        }
        
        
        if (this.done) {
          fill(224);//
          stroke(224);//
          rect(width/2-50, 15, 150, 50);//
          for (let i = 0; i < pathS.edges.length; i++) {
            for (let j = 0; j < this.st.graph.edges.length; j++) {
              if (pathS.edges[i].to   == this.st.graph.edges[j].to
               && pathS.edges[i].from == this.st.graph.edges[j].from)
               this.total += this.st.graph.edges[j].cost
            }
          }
          fill(0);
          stroke(0);
          textAlign(CENTER)
          text("Minimum Path Cost", width/2+25, 32)
          text(this.total.toFixed(1), width/2+25, 50);
          this.ind++;
        } else if (!this.done && this.extraDone){
          fill(224);
          stroke(224);
          rect(width/2-50, 15, 150, 50);
          fill(0);
          stroke(0);
          textAlign(CENTER)
          text("No Solution", width/2+25, 32)
          this.ind++;
        }
        if (this.extraDone && this.ind > 1) {
          this.st = new Start();
          this.st.start();
          this.ind = -1;
          this.openSet = [this.st.graph.vertices[0]];
          this.closedSet = [];
          this.total = 0;
          this.done = false;
          this.extraDone = false;
          this.end = this.st.graph.vertices[this.st.graph.vertices.length-1];
      }
    };


    removeFromArray = function(arr, elt) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] == elt) {
            arr.splice(i, 1);
          }
        }
      }
}