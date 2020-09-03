class SegmentTree{
    constructor(arr,merger){
        this.data = arr.slice();
        this.merger = merger;
        this.tree = new Array(arr.length * 4);
        this.buildSegmentTree(0,0,this.data.length - 1);
    }

    buildSegmentTree(treeIndex,l,r){
        if(l == r){
            this.tree[treeIndex] = this.data[l];
            return;
        }

        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = (l + r) >> 1;

        this.buildSegmentTree(leftTreeIndex,l,mid);
        this.buildSegmentTree(rightTreeIndex,mid + 1,r);

        this.tree[treeIndex] = this.merger(this.tree[leftTreeIndex],this.tree[rightTreeIndex]);
    }

    query(left,right){
        if(left < 0 || left >= this.data.length || right < 0 || right >= this.data.length || right < left){
            throw new Error('index is illegal.');
        }
        return this.queryHelper(0,0,this.size() - 1,left,right);
    }

    queryHelper(treeIndex,l,r,left,right){
        if(l == left && r == right){
            return this.tree[treeIndex];
        }
        
        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = (l + r) >> 1;

        if(left > mid){
            return this.queryHelper(rightTreeIndex,mid + 1,r,left,right);
        }else if(right <= mid){
            return this.queryHelper(leftTreeIndex,l,mid,left,right);
        }else{
            let leftResult = this.queryHelper(leftTreeIndex,l,mid,left,mid);
            var rightResult = this.queryHelper(rightTreeIndex,mid + 1,r,mid + 1,right);
            return this.merger(leftResult,rightResult);
        }

    }

    update(index,val){
        if(index < 0 || index >= this.data.length){
            throw new Error('index is illegal.');
        }
        this.data[index] = val;

        this.updateHelper(0,0,this.size() - 1,index,val);

    }

    updateHelper(treeIndex,l,r,index,val){
        if(l == r){
            this.tree[treeIndex] = val;
            return;
        }

        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = (l + r) >> 1;

        if(index > mid){
            this.updateHelper(rightTreeIndex,mid + 1,r,index,val);
        }else{
            this.updateHelper(leftTreeIndex,l,mid,index,val);
        }
        this.tree[treeIndex] = this.merger(this.tree[leftTreeIndex],this.tree[rightTreeIndex]);
    }

    get(index){
        if(index < 0 || index >= this.data.length){
            throw new Error('index is illegal.');
        }
        return this.data[index];
    }

    size(){
        return this.data.length;
    }

    leftChild(index){
        return 2 * index  + 1
    }

    rightChild(index){
        return 2 * index + 2
    }
}

let nums = [-2,0,3,-5,2 ,-1];

let segment = new SegmentTree(nums,(a,b) => a + b);

// console.log(segment.tree);
console.log(segment.query(0,2))
console.log(segment.query(2,5))
console.log(segment.query(0,5))

segment.update(5,3);
console.log(segment.query(0,2))
console.log(segment.query(2,5))
console.log(segment.query(0,5))