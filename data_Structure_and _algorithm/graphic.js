function Graph(){
    this.vertices = [];
    this.adList = {};
    this.color = {};
}
Graph.prototype.addVertex= function(v){
    this.vertices.push(v);
    this.adList[v] = [];
    this.color[v] = 'white';
}

Graph.prototype.addEdge= function(v,w){
    this.adList[v].push(w);
    this.adList[w].push(v);
}

Graph.prototype.bfs = function(v,callback){
    var color = this.initializeColor();
    var queue = new Queue();
    var d = {};
    var pred = {};

    queue.enqueue(v);

    this.vertices.forEach((ele) => {
        d[ele] = 0;
        pred[ele] = null;
    });

    while(!queue.isEmpty()){
        var u = queue.dequeue();
        var siblings = this.adList[u];
        color[u] = 'grey';
        siblings.forEach((ele) => {
            if(color[ele] == 'white'){
                d[ele] = d[u] + 1;
                pred[ele] = u;
                queue.enqueue(ele);
                color[ele] = 'grey';
            }
        });
        color[u] = 'black';
        if(callback){
            callback(u);
        }
    }

    return {
        distance: d,
        predecessors: pred
    }

}

Graph.prototype.dfs = function(v,callback){
    var color = this.initializeColor();
    var self = this;
    dfsVisit(v,callback);

    function dfsVisit(v,callback){
        color[v] = 'grey';
        if(callback){
            callback(v);
        }
        var siblings = self.adList[v];
        siblings.forEach((ele) => {
            if(color[ele] == 'white'){
                dfsVisit(ele,callback);
            }
        })
        color[v] = 'black';
    }

}

Graph.prototype.initializeColor = function(){
    var color = {};
    this.vertices.forEach((ele) => {
        color[ele] = 'white';
    });
    return color;
}

Graph.prototype.toString= function(){
    var s = '';
    this.vertices.forEach((ele,index) => {
        s += ele + ' -> ';
        var siblings = this.adList[ele];
        siblings.forEach((ele1,index1) => {
            s += ele1 + ' ';
        });
        s += '\n';
    })
    return s;
}

var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I']; //{7}
for (var i=0; i<myVertices.length; i++){ //{8}
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
