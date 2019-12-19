class Node{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class AvlTree{
    constructor(){
        this.root = null;
        this.size = 0;
    }
    add(key){
        this.root = this.addRe(this.root,key);
        this.size++;
    }
    addRe(node,key){
        if(node == null){
            return new Node(key);
        }

        if(node.key < key){
            node.right = this.addRe(node.right,key);
        }else{
            node.left = this.addRe(node.left,key);
        }

        return node;
    }
}

var avl = new AvlTree();

avl.add(2);
avl.add(3);
avl.add(7);
avl.add(6);
avl.add(69);
console.log(avl);
