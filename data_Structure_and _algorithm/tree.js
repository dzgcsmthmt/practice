function Stack(){
    this.items = [];
}

Stack.prototype = {
    constructor: Stack,
    push: function(item){
        this.items.push(item);
    },
    pop: function(){
        return this.items.pop();
    },
    peek: function(){
        return this.items[this.size() - 1];
    },
    isEmpty: function(){
        return this.items.length == 0;
    },
    size: function(){
        return this.items.length;
    },
    clear: function(){
        this.items.length = 0;
    },
    print: function(){
        console.log(this.items.toString());
    }
}

function BinarySearchTree(){
    this.root = null;
}
BinarySearchTree.prototype = {
    constructor: BinarySearchTree,
    insert:function(key){
        var newNode = new Node(key);
        if(!this.root){
            this.root = newNode;
        }else{
            this.insertNode(this.root,newNode);
        }
    },
    insertNode: function(node,newNode){
        if(newNode.key < node.key){
            if(!node.left){
                node.left = newNode;
            }else{
                this.insertNode(node.left,newNode);
            }
        }else{
            if(!node.right){
                node.right = newNode;
            }else{
                this.insertNode(node.right,newNode);
            }
        }
    },
    search: function(key){
        function searchNode(node){
            if(node === null){
                return false;
            }else{
                if(node.key < key){
                    return searchNode(node.right);
                }else if(node.key > key){
                    return searchNode(node.left);
                }else{
                    return true;
                }
            }
        }
        return searchNode(this.root);
    },
    inOrderTraverse: function(cb){
        function inOrderTraverseNode(node,cb){
            if(node != null){
                inOrderTraverseNode(node.left,cb);
                cb(node);
                inOrderTraverseNode(node.right,cb);
            }
        }
        inOrderTraverseNode(this.root,cb);
    },
    inOrderTraverseNR: function(root,cb){
        var stack = new Stack();
        var arr = [];
        var cur = root;
        while(cur != null || !stack.isEmpty()){
            while(cur != null){
                stack.push(cur);
                cur = cur.left;
            }
            var node = stack.pop();
            arr.push(node);
            cur = node.right;
        }

        arr.forEach(ele => cb(ele));
    },
    preOrderTraverse: function(cb){
        function preOrderTraverseNode(node,cb){
            if(node != null){
                cb(node);
                preOrderTraverseNode(node.left,cb);
                preOrderTraverseNode(node.right,cb);
            }
        }
        preOrderTraverseNode(this.root,cb);
    },
     //非递归前续遍历
    preOrderTraverseNR: function(node,cb){
        var stack = new Stack();
        stack.push(node);
        while(!stack.isEmpty()){
            var cur = stack.pop();
            cb(cur);
            if(cur.right){
                stack.push(cur.right);
            }
            if(cur.left){
                stack.push(cur.left);
            }
        }
        
    },
    postOrderTraverse: function(cb){
        function postOrderTraverseNode(node,cb){
            if(node != null){
                postOrderTraverseNode(node.left,cb);
                postOrderTraverseNode(node.right,cb);
                cb(node);
            }
        }
        postOrderTraverseNode(this.root,cb);
    },
    postOrderTraverseNR: function(node,cb){
        var stack = new Stack();
        var arr = [];
        stack.push(node);
        while(!stack.isEmpty()){
            var cur = stack.pop();
            arr.push(cur);
            if(cur.left){
                stack.push(cur.left);
            }
            if(cur.right){
                stack.push(cur.right);
            }
        }

        arr.reverse().forEach(ele => cb(ele));
    },
    levelOrderTraverse: function(){
        if(this.root == null){
            return null;
        }

        var result = [],queue = new Queue(),node;

        queue.enqueue(this.root);

        while(queue.size()){
            node = queue.dequeue();
            result.push(node.key);
            if(node.left){
                queue.enqueue(node.left);
            }
            if(node.right){
                queue.enqueue(node.right);
            }
        }

        return result;

    },
    min: function(){
        function minNode(node){
            if(node){
                while(node && node.left){
                    node = node.left;
                }
                return node.key;
            }
            return null;
        }
        return minNode(this.root);
    },
    max: function(){
        function maxNode(node){
            if(node){
                while(node && node.right){
                    node = node.right;
                }
                return node.key;
            }
            return null;
        }
        return maxNode(this.root);
    },
    maxHeight: function(node = this.root){
       if(!node) return 0;
       var leftHeight = this.maxHeight(node.left);
       var rightHeight = this.maxHeight(node.right);

       return Math.max(leftHeight, rightHeight) + 1;
    },
    minHeight: function(node = this.root){
       if(!node) return 0;
       var leftHeight = this.minHeight(node.left);
       var rightHeight = this.minHeight(node.right);

       return Math.min(leftHeight, rightHeight) + 1;
    },
    remove: function(key){
        function removeNode(node,key){
            if(node == null){
                return null;
            }else{
                if(node.key < key){
                    node.right = removeNode(node.right,key);
                    return node;
                }else if(node.key > key){
                    node.left = removeNode(node.left,key);
                    return node;
                }else{
                    //第一种情况 没有子节点
                    if(node.left == null && node.right == null){
                        node = null;
                        return node;
                    }

                    //第二种情况 只有一个子节点
                    if(node.left == null){
                        node = node.right;
                        return node;
                    }else if(node.right == null){
                        node = node.left;
                        return node;
                    }


                    //第三种情况 有2个子节点

                    var aux = findMinNode(node.right);
                    node.key = aux.key;
                    node.right = removeNode(node.right,aux.key);
                    return node;

                }
            }
        }

        function findMinNode(node){
            while(node && node.right){
                node = node.right;
            }
            return node;
        }


        this.root = removeNode(this.root,key);
    }
}

function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

var tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(35);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
tree.preOrderTraverse(function(node){
    console.log(node.key);
});
tree.preOrderTraverseNR(tree.root,function(node){
    console.log(node.key);
});
//console.log(tree.minHeight());
// console.log(tree.maxHeight());
// console.log(tree.max());
// console.log(tree.search(1));
// console.log(tree.search(10));
//tree.remove(20);
