function Dijktra() {
    this.dijktraOpen = function() {
        openS = new Graph;
        closedS = new Graph;
        pathS = new Graph;
        pathS.vertices.push(graph.vertices[0])
        if (openSet.length > 0 && !done) {
          var winner = 0;
          for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
              winner = i;
            }
          }
          var current = openSet[winner];
          if (current === end) done = true;
          this.removeFromArray(openSet, current)
          closedSet.push(current);
          var neighbors = current.adjacentNodes;
          for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            var neighborCost = current.adjacentNodesCost[i];
            if (!closedSet.includes(neighbor) && neighbor) {
              var tempG = current.g + neighborCost;
              var newPath = false;
              if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                  neighbor.g = tempG;
                  newPath = true;
                }
              } else {
                neighbor.g = tempG;
                newPath = true;
                openSet.push(neighbor);
              }
              if (newPath) {
                neighbor.h = 0;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
              }
            }
          }
      
        } else extraDone = true;
        if (!extraDone) {
            for (var i = 0; i < closedSet.length; i++) {
          closedS.vertices.push(closedSet[i])
          if (closedSet.length > 1 && i > 0) {
            var tmpE = new Edge(closedSet[i], closedSet[i].parent, 0)
            closedS.edges.push(tmpE);
          }
        }
        closedS.show(color(103, 0, 0), color(103, 0, 0))
      
        for (var i = 0; i < openSet.length; i++) {
          openS.vertices.push(openSet[i])
          if (openSet.length > 1 && i > 0) {
            tmpE = new Edge(openSet[i], openSet[i].parent, 0)
            openS.edges.push(tmpE)
          }
        }
        openS.show(color(88, 97, 194), color(88, 97, 194))
        path = [];
        var tmp = current;
          
        path.push(tmp);
        while (tmp && tmp.parent) {
          path.push(tmp.parent);
          tmp = tmp.parent;
        }
      
        for (var i = 0; i < path.length; i++) {
          pathS.vertices.push(path[i])   
          if (path.length > 1 && i > 0 && i < path.length) {
            tmpE = new Edge(path[i], path[i-1], 0)
            pathS.edges.push(tmpE)
          }
        }
        pathS.show(color(102, 161, 60), color(102, 161, 60))
        }
        
        
        if (done) {
          fill(224);
          stroke(224);
          rect(width/2-50, 15, 150, 50);
          for (var i = 0; i < pathS.edges.length; i++) {
            for (var j = 0; j < graph.edges.length; j++) {
              if (pathS.edges[i].to   == graph.edges[j].to
               && pathS.edges[i].from == graph.edges[j].from)
               total += graph.edges[j].cost
            }
          }
          fill(0);
          stroke(0);
          textAlign(CENTER)
          text("Minimum Path Cost", width/2+25, 32)
          text(total.toFixed(1), width/2+25, 50);
          ind++;
        } else if (!done && extraDone){
          fill(224);
          stroke(224);
          rect(width/2-50, 15, 150, 50);
          fill(0);
          stroke(0);
          textAlign(CENTER)
          text("No Solution", width/2+25, 32)
          ind++;
        }
        if (extraDone && ind > 1) {
          st = new Start
          st.start()
      }
    };


    this.removeFromArray = function(arr, elt) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] == elt) {
            arr.splice(i, 1);
          }
        }
      }
}