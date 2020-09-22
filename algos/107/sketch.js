function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function preload() {
  table = loadTable('p107_network.txt', 'csv')
}

var size = 40;
var ind = 0;
let cost = 0;
let uf, mst;
function setup() {
  if (windowWidth < windowHeight) {
    canvasSize = windowWidth
  } else canvasSize = windowHeight
  frameRate(5)
  canvas = createCanvas(400-87, 400-87);
  canvas.parent('canvas');
  graph = new Graph;

  for (var i = 0; i < size; i++) {
    tmp = new Vertex(i);
    graph.vertices.push(tmp)
  }

  for (var i = 0; i < size; i++) {
    for (var j = i+1; j < size; j++) {
      if (table.getString(i,j) == "-") {
        tmp = new Edge(graph.vertices[i], graph.vertices[j], Infinity)
        graph.edges.push(tmp)
      } else {
        var num = parseInt(table.getString(i,j));
        tmp = new Edge(graph.vertices[i], graph.vertices[j], num)
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
  if (!uf.connected(graph.edges[ind].to.index, graph.edges[ind].from.index)) {
    uf.union(graph.edges[ind].to.index, graph.edges[ind].from.index);
    mst.edges.push(graph.edges[ind])
    mst.vertices.push(graph.edges[ind].to)
    mst.vertices.push(graph.edges[ind].from)
    cost += graph.edges[ind].cost;
    mst.show(color(255,0,0))
  }
  if(mst.edges.length >= graph.vertices.length-1){
    stroke(0)
    fill(0)
    text("Minimum Spanning Cost = " + cost, 10,10)
    noLoop();
  }
  ind++;
}

