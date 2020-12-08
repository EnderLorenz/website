function Simulate(nArrows, nForrests) {
    this.distances = [];
    this.nArrows = nArrows;
    this.nForrests = nForrests;
    
    this.simulate = function() {        
        nSize = 900;
        nTrees = (Math.PI*nSize*(nSize/4.0))*.005;
        nArrows = this.nArrows;
        nForrests = this.nForrests;
        distTotal = 0;
        error = 1;
        
        for ( var k = 0; k < nForrests; k++) {
            graph = new Graph(ctx, [0,nSize], [0, nSize])
            forrest = new Forrest(nTrees, nSize);
            forrest.show(graph);
            for (var j = 0; j < nArrows; j++) {
                arrow = new Arrow(nSize);
                for(var i = 0; i < nTrees; i++) {
                    inddistance = [];
                    hitX = [];
                    hitY = [];
                    x0 = forrest.trees[i].x;
                    y0 = forrest.trees[i].y;
                    m = arrow.m;
                    x = (1.0+m*m*(1.0-x0*x0)+2.0*m*x0*y0-y0*y0)
                    if (x > 0) {
                        d = Math.abs(y0 - (m*x0))/Math.sqrt(m*m + 1);
                        e = 1.0 - d*d;
                        inddistance.push(Math.sqrt(x0*x0+y0*y0)-Math.sqrt(e))
                        hitX.push(x0);
                        hitY.push(y0);
                        res = Math.sqrt(x0*x0+y0*y0)-Math.sqrt(e)
                        if( res < arrow.dist) {
                            arrow.dist = res;
                            arrow.hitX = x0;
                            arrow.hitY = y0;
                            break;
                        }
                    }
                }
                if (arrow.dist == nSize) {
                    arrow.dist += 10*error++;
                }
                distTotal += arrow.dist;
                this.distances.push(arrow.dist);
                arrow.show(graph);
            }
        }
        graph.graph();
        return distTotal;
    }
}