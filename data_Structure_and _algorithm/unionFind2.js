//两种方式 quick find 和 quick union

/***
 * quick find   find O(1)               union O(n)
 * quick union  find(logn)              union O(logn)
 * quick union  可以使用路径压缩优化      可以通过size 和 rank优化，防止退化为链表
 */


class QuickFind {
    constructor(capacity) {
        this.capacity = capacity;
        this.ids = [];
        for (var i = 0; i < capacity; i++) {
            this.ids[i] = i;
        }
    }

    find(p) {
        if (p < 0 || p > this.capacity) {
            throw new Error('out of bounds');
        }
        return this.ids[p];
    }

    isConnected(q, p) {
        return this.find(q) == this.find(p);
    }

    union(p, q) {
        var pid = this.find(p);
        var qid = this.find(q);

        if (pid == qid) return;

        for (var i = 0; i < this.capacity; i++) {
            if (this.ids[i] == pid) {
                this.ids[i] = qid;
            }
        }

    }

}

var qf = new QuickFind(9);

qf.union(1, 2);
qf.union(1, 3);
qf.union(0, 4);
qf.union(3, 4);

console.log(qf.isConnected(0, 3));


class QuickUnion {
    constructor(capacity) {
        this.capacity = capacity;
        this.parents = [];
        this.ranks = [];
        for (var i = 0; i < capacity; i++) {
            this.parents[i] = i;
            this.ranks[i] = 1;
        }
    }

    find(p) {
        if (p < 0 || p > this.capacity) {
            throw new Error('out of bounds');
        }

        while (p != this.parents[p]) {
            p = this.parents[this.parents[p]];
        }

        return p;
    }


    union(p, q) {
        var pid = this.find(p);
        var qid = this.find(q);

        if (pid == qid) return;

        if (this.ranks[pid] > this.ranks[qid]) {
            this.parents[qid] = pid;
        } else if (this.ranks[pid] < this.ranks[qid]) {
            this.parents[pid] = qid;
        } else {
            this.ranks[pid] += 1;
            this.parents[qid] = pid;
        }


    }

    isConnected(p, q) {
        return this.find(p) == this.find(q);
    }
}


var qu = new QuickUnion(9);

qu.union(1, 4);
qu.union(2, 3);
qu.union(4, 3);

console.log(qu.isConnected(2, 3));
console.log(qu.isConnected(2, 6));


class Node{
    constructor(value){
        this.value = value;
        this.parent = this;
        this.rank = 1;
    }
}

class UnionFind{
    constructor(){
        this.nodes = new Map();
    }

    makeSet(v){
        if(this.nodes.has(v)) return;
        this.nodes.set(v,new Node(v));
    }

    find(v){
        var node = this.nodes.get(v);
        if(node == null) return null;
        while(node != node.parent){
            node = node.parent.parent;
        }

        return node;
    }

    union(p,q){
        var pNode = this.find(p);
        var qNode = this.find(q);

        if(pNode == null || qNode == null) return;

        if(pNode == qNode) return;

        if(pNode.rank < qNode.rank){
            pNode.parent = qNode;
        }else if(pNode.rank > qNode.rank){
            qNode.parent = pNode;
        }else{
            qNode.parent = pNode;
            pNode.rank += 1;
        }


    }

    isConnected(p, q) {
        return this.find(p) == this.find(q);
    }

}

var uf = new UnionFind();

var zs = {name: 'zs',age: 10};
var ls = {name: 'ls',age: 42};
var ww = {name: 'ww',age: 50};
var zl = {name: 'zl',age: 33};
var xh = {name: 'xh',age: 34};
var ft = {name: 'ft',age: 32};

uf.makeSet(zs);
uf.makeSet(ls);
uf.makeSet(ww);
uf.makeSet(zl);
uf.makeSet(xh);
uf.makeSet(ft);

uf.union(zs,ls);
uf.union(zs,ww);

uf.union(xh,ft);

console.log(uf.isConnected(ls,ww));