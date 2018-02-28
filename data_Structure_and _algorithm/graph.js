function bfs(graph,root){
    var nodesLen = {};

    for (var i = 0; i < graph.length; i++) {
        nodesLen[i] = Infinity;
    }

    nodesLen[root] = 0;

    var queue = [root];
    var current;

    while(queue.length){
        current = queue.shift();
        var curConnected = graph[current];
        var neighborIdx = [];
        var index = curConnected.indexOf(1);
        while(index != -1){
            neighborIdx.push(index);
            index = curConnected.indexOf(1,index + 1);
        }

        for(var j = 0;j < neighborIdx.length;j++){
            if(nodesLen[neighborIdx[j]] == Infinity){
                nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                queue.push(neighborIdx[j]);
            }
        }


    }

    return nodesLen;

}

var bxBFSGraph = [
    [0,1,1,1,0],
    [0,0,1,0,0],
    [1,1,0,0,0],
    [0,0,0,0,0],
    [0,1,0,0,0]
]

console.log(bfs(bxBFSGraph,2));
