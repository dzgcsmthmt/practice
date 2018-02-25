function LinkedList(){
    this.length = 0;
    this.head = null;
}

LinkedList.prototype = {
    constructor: LinkedList,
    append: function(node){
        var currentNode = this.head;
        if(!this.length){
            this.head = node;
        }else{
            while(currentNode.next){
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        this.length++;
    },
    insert: function(position,node){
        var current = this.head;
        var index = 0,previous;
        if(position > -1 && position < this.length){
            if(position == 0){
                this.head = node;
                node.next = current;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            this.length++;
            return true;
        }else{
            return false;
        }
    },
    removeAt: function(position){
        var current = this.head;
        var index = 0,previous;
        if(position > -1 && position < this.length){
            if(position == 0){
                this.head = current.next;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current;
        }else{
            return null;
        }
    },
    remove: function(node){
        var index = this.indexOf(node);
        return this.removeAt(index);
    },
    indexOf: function(node){
        var current = this.head;
        var index = 0,previous;
        while(current){
            if(current == node){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    },
    isEmpty: function(){
        return this.length == 0;
    },
    size: function(){
        return this.length;
    },
    toString: function(){
        var current = this.head;
        var str = '';

        while(current){
            str += current.element;
            current = current.next;
        }

        return str;
    },
    print: function(){
        console.log(this.toString());
    }
}

function Node(element){
    this.element = element;
    this.next = null;
}
