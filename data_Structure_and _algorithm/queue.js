function Queue(){
    this.items = [];
}

Queue.prototype = {
    constructor: Queue,
    enqueue: function(item){
        this.items.push(item);
    },
    dequeue: function(){
        return this.items.shift();
    },
    front: function(){
        return this.items[0];
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
        console.log(this.items);
    }
}

function PriorityQueue(){
    this.items = [];
}
PriorityQueue.prototype = {
    constructor: PriorityQueue,
    enqueue: function(element){
        var added = false;
        if(!this.items.length){
            this.items.push(element);
        }else{
            for (var i = 0; i < this.items.length; i++) {
                if(element.priority < this.items[i].priority){
                    this.items.splice(i,0,element);
                    added = true;
                    break;
                }
            }
            if(!added){
                this.items.push(element);
            }
        }
    }
}

function QueueElement(element,priority){
    this.element = element;
    this.priority = priority;
}

function hotPotato(nameList,num){
    var queue = new Queue(),eliminated;

    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }

    while(queue.size() > 1){
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(eliminated + '在击鼓传花中被淘汰');
    }

    return queue.dequeue();
}

// console.log(hotPotato(['张三','李四','王五','赵六','田七','王八'],8));
