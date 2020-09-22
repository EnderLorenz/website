var size = 75;
var ind = 0;
let cost = 0;
let uf, mst;
let bool = false;

function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight
  frameRate(20)
  canvas = createCanvas(400-87, 400-87);
  canvas.parent('canvas');
  graph = new Graph;

  for (var i = 0; i < size; i++) {
    tmp = new Vertex(i);
    graph.vertices.push(tmp)
  }

  for (var i = 0; i < size; i++) {
    for (var j = i+1; j < size; j++) {
      var test = random(1);
      if (test < .5) {
        tmp = new Edge(graph.vertices[i], graph.vertices[j], Infinity)
        graph.edges.push(tmp)
      } else {
        tmp = new Edge(graph.vertices[i], graph.vertices[j], random(1,1000))
        graph.edges.push(tmp)
      }
    }
  }
  
  graph.edges.sort( function( a , b){
    if(a.cost > b.cost) return 1;
    if(a.cost < b.cost) return -1;
    return 0;
  });
  graph.show(color(79, 100))
  uf = new UnionFind(graph.vertices.length)
  mst = new Graph;
}

function draw() {
  if (graph.edges[ind]
    && (!uf.connected(graph.edges[ind].to.index, graph.edges[ind].from.index) 
    && (graph.edges[ind].cost < Infinity))) {
    uf.union(graph.edges[ind].to.index, graph.edges[ind].from.index);
    mst.edges.push(graph.edges[ind]);
    mst.vertices.push(graph.edges[ind].to);
    mst.vertices.push(graph.edges[ind].from);
    cost += graph.edges[ind].cost;
    mst.show(color(255,0,0, 5));
  }
  if ((graph.edges[ind]) && graph.edges[ind].cost === Infinity) ind = graph.edges.length;
  if (ind > graph.edges.length+5 && (!bool)) {
    stroke(0);
    fill(0);
    text("No spanning tree ", 10,10);
    ind++;
  }

  if (ind > graph.edges.length + 500) startOVer();
  if (ind > graph.vertices.length + 500 && bool) startOVer();
  if(mst.edges.length >= graph.vertices.length-1){
    stroke(0);
    fill(0);
    bool = true;
    text("Minimum Spanning Tree Cost = " + cost.toFixed(2), 10,10);
    ind++;
  }
  ind++;
}

function startOVer() {
  background(255)
  ind = -1;
  bool = false;
  graph = new Graph;

  for (var i = 0; i < size; i++) {
    tmp = new Vertex(i);
    graph.vertices.push(tmp)
  }
  var exTest = random(1)
  for (var i = 0; i < size; i++) {
    for (var j = i+1; j < size; j++) {
      var test = random(1);
      
      if (exTest > .25) {
        if (test < .5) {
                tmp = new Edge(graph.vertices[i], graph.vertices[j], Infinity)
                graph.edges.push(tmp)
              } else {
                tmp = new Edge(graph.vertices[i], graph.vertices[j], random(1,1000))
                graph.edges.push(tmp)
              }
      } else {
          if (test < .95) {
            tmp = new Edge(graph.vertices[i], graph.vertices[j], Infinity)
            graph.edges.push(tmp)
          } else {
            tmp = new Edge(graph.vertices[i], graph.vertices[j], random(1,1000))
            graph.edges.push(tmp)
          }
      }
      
    }
  }
  
  graph.edges.sort( function( a , b){
    if(a.cost > b.cost) return 1;
    if(a.cost < b.cost) return -1;
    return 0;
  });
  graph.show(color(79, 100))
  uf = new UnionFind(graph.vertices.length)
  mst = new Graph;
}
