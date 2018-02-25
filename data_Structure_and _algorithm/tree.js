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
    postOrderTraverse: function(){
        function postOrderTraverseNode(node,cb){
            if(node != null){
                postOrderTraverseNode(node.left,cb);
                postOrderTraverseNode(node.right,cb);
                cb(node);
            }
        }
        postOrderTraverseNode(this.root,cb);
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
tree.inOrderTraverse(function(node){
    // console.log(node.key);
});
// console.log(tree.max());
// console.log(tree.search(1));
// console.log(tree.search(10));
tree.remove(20);
