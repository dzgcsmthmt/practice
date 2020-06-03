class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}


class Bst{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    add(node){
        this.head = this.addRe(this.head,node);
        this.size++;
    }

    addRe(root,node){
        if(root == null) return node;
        if(node.val < root.val){
            root.left = this.addRe(root.left,node);
        }else{
            root.right = this.addRe(root.right,node);
        }

        root.height = Math.max(this.getHeight(root.left),this.getHeight(root.right)) + 1;

        var balanceFactor = this.getBalanceFactor(root);

        if(Math.abs(balanceFactor) > 1){
            console.log('imbalance tree',balanceFactor);
        }

        //LL
        if(balanceFactor > 1 && root.left.val > node.val){
            return this.rightRotate(root);
        }

        //RR
        if(balanceFactor < -1 && root.right.val < node.val){
            return this.leftRotate(root);
        }

        //LR
        if(balanceFactor > 1 && root.left.val < node.val){
            root.left = this.leftRotate(root.left);
            return this.rightRotate(root);
        }

        //RL
        if(balanceFactor < -1 && root.right.val < node.val){
            root.right = this.rightRotate(root.right);
            return this.leftRotate(root);
        }

        return root;
    }

    getBalanceFactor(node){
        if(node == null) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rightRotate(node){
        var x = node.left;
        var T3 = x.right;

        x.right = node;
        node.left = T3;

        node.height = Math.max(this.getHeight(node.left),this.getHeight(node.right)) + 1;
        x.height = Math.max(this.getHeight(x.left),this.getHeight(x.right)) + 1;

        return x;
    }

    leftRotate(node){
        var x = node.right;
        var T3 = x.left;

        x.left = node;
        node.right = T3;

        node.height = Math.max(this.getHeight(node.left),this.getHeight(node.right)) + 1;
        x.height = Math.max(this.getHeight(x.left),this.getHeight(x.right)) + 1;

        return x;

    }

    remove(val){
        this.head = this.removeRe(this.head,val);
    }

    removeRe(root,val){
        if(root == null) return null;

        if(root.val == val){

            if(root.left == null && root.right == null){
                return null;
            }

            if(root.left == null){
                return root.right;
            }

            if(root.right == null){
                return root.left;
            }

            let min = this.min(root.right);

            root.val = min;

            root.right = this.removeRe(root.right,min);

            this.size--;

        }else if(root.val > val){
            root.left = this.removeRe(root.left,val)
        }else{
            root.right = this.removeRe(root.right,val);
        }

        return root;
    }

    min(root){
        if(root == null) return null;
        while(root.left){
            root = root.left;
        }
        return root.val;
    }

    max(root){
        if(root == null) return null;
        while(root.right){
            root = root.right;
        }
        return root.val;
    }

    height(root){
        if(root == null) return 0;
        return Math.max(this.height(root.left), this.height(root.right)) + 1;
    }

    getHeight(node){
        return node == null ? 0 : node.height;
    }

    print() {
        var root = this.head;
        var height = this.height(root);
        var strLenPerLine = 0;
        for (var i = 0; i < height; i++) {
            strLenPerLine += 2 ** i;
        }
        // console.log(height,strLenPerLine);

        var res = [];
        for (var i = 0; i < height; i++) {
            res[i] = [];
            for (var j = 0; j < strLenPerLine; j++) {
                res[i][j] = '     ';
            }
        }

        setKey(root, 0, Math.floor(strLenPerLine / 2));
        res.forEach((item, index) => {
            console.log(item.join(''));
            let len = 2 ** (height - index - 2) < 1 ? 0 : 2 ** (height - index - 2);
            for (var k = 0; k < len; k++) {
                console.log("");
            }
        })
        // console.log(res);

        function setKey(node, level, pos) {
            // console.log(height,'level',level,'pos',pos);
            if (node == null) {
                return;
            }
            let str = node.val;
            for (var j = 0; j < 5 - node.val.toString().length; j++) {
                if (j % 2) {
                    str += ' ';
                } else {
                    str = ' ' + str;
                }
            }
            res[level][pos] = str;
            if (node.left) {
                setKey(node.left, level + 1, pos - 2 ** (height - level - 2));
            }
            if (node.right) {
                setKey(node.right, level + 1, pos + 2 ** (height - level - 2));
            }
        }
       
    }

}


var avl = new Bst();

avl.add(new Node(3));
avl.add(new Node(2));
avl.add(new Node(8));
avl.add(new Node(7));
avl.add(new Node(9));
avl.add(new Node(17));
avl.add(new Node(19));
avl.add(new Node(18));
avl.add(new Node(23));
avl.add(new Node(25));
avl.print();

