function UnionFind(capacity){
    this.ids = [];
    for (let index = 0; index < capacity; index++) {
        this.ids[index] = index;
    }
}

UnionFind.prototype.find = function(p){
    if(p < 0 || p > this.ids.length){
        throw new Error('out of range');
    }
    return this.ids[p];
}

UnionFind.prototype.isConnected = function(p,q){
    return this.find(p) == this.find(q);
}


UnionFind.prototype.unionElements = function(p,q){
    var pId = this.find(p);
    var qId = this.find(q);

    if(pId == qId){
        return;
    }

    this.ids.forEach((id,index) => {
        if(this.ids[index] == pId){
            this.ids[index] = qId;
        }
    })
}

function UnionFind2(capacity){
    this.parent = [];
    for (let index = 0; index < capacity; index++) {
        this.parent[index] = index;
    }
}

UnionFind2.prototype.find = function(p){
    if(p < 0 || p > this.parent.length){
        throw new Error('out of range');
    }
    while( p != this.parent[p]){
        p = this.parent[p];
    }
    return p;
}

UnionFind2.prototype.isConnected = function(p,q){
    return this.find(p) == this.find(q);
}


UnionFind2.prototype.unionElements = function(p,q){
    var pRoot = this.find(p);
    var qRoot = this.find(q);

    if(pRoot == qRoot){
        return;
    }

    this.parent[pRoot] = qRoot;
}

//维护子节点数
function UnionFind3(capacity){
    this.parent = [];
    this.sz = [];
    for (let index = 0; index < capacity; index++) {
        this.parent[index] = index;
        this.sz[index] = 1;
    }
}

UnionFind3.prototype.find = function(p){
    if(p < 0 || p > this.parent.length){
        throw new Error('out of range');
    }
    while( p != this.parent[p]){
        p = this.parent[p];
    }
    return p;
}

UnionFind3.prototype.isConnected = function(p,q){
    return this.find(p) == this.find(q);
}


UnionFind3.prototype.unionElements = function(p,q){
    var pRoot = this.find(p);
    var qRoot = this.find(q);

    if(pRoot == qRoot){
        return;
    }

    if(this.sz[pRoot] > this.sz[qRoot]){
        this.sz[pRoot] += this.sz[qRoot];
        this.parent[qRoot] = pRoot;
    }else{
        this.sz[qRoot] += this.sz[pRoot];
        this.parent[pRoot] = qRoot;
    }
}


function UnionFind4(capacity){
    this.parent = [];
    this.rank = [];
    for (let index = 0; index < capacity; index++) {
        this.parent[index] = index;
        this.rank[index] = 1;
    }
}

UnionFind4.prototype.find = function(p){
    if(p < 0 || p > this.parent.length){
        throw new Error('out of range');
    }
    //路径压缩
    while( p != this.parent[p]){
        p = this.parent[this.parent[p]];
    }
    //递归 最多2层但性能不好
    //if(p != this.parent[p]){
        //this.parent[p] = this.find[this.parent[p]];
    //}
    //return this.parent[p];
    return p;
}

UnionFind4.prototype.isConnected = function(p,q){
    return this.find(p) == this.find(q);
}


UnionFind4.prototype.unionElements = function(p,q){
    var pRoot = this.find(p);
    var qRoot = this.find(q);

    if(pRoot == qRoot){
        return;
    }

    if(this.rank[pRoot] > this.rank[qRoot]){
        this.parent[qRoot] = pRoot;
    }else if(this.rank[pRoot] < this.rank[qRoot]){
        this.parent[pRoot] = qRoot;
    }else{
        this.rank[pRoot] += 1;
        this.parent[qRoot] = pRoot;
    }
}

var uf = new UnionFind4(9);

uf.unionElements(1,4);
uf.unionElements(2,3);
uf.unionElements(4,3);

console.log(uf.isConnected(2,3))
console.log(uf.isConnected(2,6))
