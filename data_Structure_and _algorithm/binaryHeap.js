class BinaryHeap{
    constructor(capacity,comparator,arr){
        this.capacity = capacity;
        this.data = new Array(capacity);
        this.count = 0;
        this.comparator = comparator || function (a,b) {
            return a - b >= 0;
        }
        if(Array.isArray(arr)){
            let len = arr.length;
            if(len > this.capacity){
                arr = arr.slice(0,this.capacity);
            }
            arr.forEach((item,index) => this.data[index] = item);
            this.count = arr.length;
            this.heapify();
        }
    }

    insert(item){
        if(this.count >= this.capacity){
            throw new Error('out of bound');
        }
        this.data[this.count] = item;
        this.siftUp(this.count);
        this.count++;
        return item;
    }

    extract(){
        if(this.count == 0){
            throw new Error('no item to extract');
        }
        var ret = this.data[0];
        this.data[0] = this.data[this.count - 1];
        this.data[this.count - 1] = null;
        this.count--;
        this.siftDown(0);
        return ret;

    }

    heapify(){
        let mid = (this.count >> 1) - 1;
        for(var i = mid; i >= 0; i--){
            this.siftDown(i);
        }
    }

    poll(){
        return this.data[0];
    }

    siftUp(index){
        while(index > 0 && this.comparator(this.data[index],this.data[(index - 1) >> 1])){
            let tmp = this.data[index];
            this.data[index] = this.data[(index - 1) >> 1];
            this.data[(index - 1) >> 1] = tmp;
            index = (index - 1) >> 1;
        }
    }

    siftDown(index){
        while(2 * (index + 1) <= this.count){
            let j = 2 * index + 1;
            if(j + 1 <= this.count - 1 && this.comparator(this.data[j + 1],this.data[j])){
                j = j + 1;
            } 

            if(this.comparator(this.data[index],this.data[j])) break;

            let tmp = this.data[index];
            this.data[index] = this.data[j];
            this.data[j] = tmp;

            index = j;

        }
    }

    isEmpty(){
        return this.count == 0;
    }
}


// var heap = new BinaryHeap(5,(a,b) => { return a - b < 0},[10,5,7,6,8]);
var heap = new BinaryHeap(5);
heap.insert(8);
heap.insert(5);
heap.insert(7);
heap.insert(6);
heap.insert(10);