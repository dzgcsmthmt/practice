
class CircularQueue{
    constructor(capacity = 10){
        //多开辟一个空间，this.front和this.tail相等的情况下为空
        this.data = new Array(capacity + 1);
        this.front = 0;
        this.tail = 0;
        this.size = 0;
    }

    getCapacity(){
        return this.data.length - 1;
    }

    size(){
        return this.size;
    }

    isEmpty(){
        return this.front == this.tail;
    }

    enqueue(e){
        if((this.tail + 1) % this.data.length == this.front){
            this.resize(this.getCapacity() * 2);
        }
        this.data[this.tail] = e;
        this.tail = (this.tail + 1) % this.data.length;
        this.size++;
    }

    dequeue(){
        if(this.isEmpty()){
            throw new Error('can\'t dequeue from an empty queue!');
        }
        var ret = this.data[this.front];
        this.data[this.front] = null;
        this.front = (this.front + 1) % this.data.length;
        this.size--;
        if(this.size == this.getCapacity() >> 2 && this.getCapacity() >> 1 != 0){
            this.resize(this.getCapacity() >> 1);
        }
        return ret;

    }

    getFront(){
        return this.data[this.front];
    }


    resize(capacity){
        var newData = new Array(capacity + 1);

        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[(i + this.front) % this.data.length];
        }

        this.data = newData;
        this.front = 0;
        this.tail = this.size;

    }


}