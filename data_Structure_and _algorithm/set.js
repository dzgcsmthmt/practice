function MySet(){
    this.items = {};
}

MySet.prototype = {
    constructor: MySet,
    add: function(value){
        if(!this.has(value)){
            this.items[value] = value;
            return true;
        }
        return false;
    },
    remove: function(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        }
        return false;
    },
    has: function(value){
        return this.items.hasOwnProperty(value);
    },
    clear: function(){
        this.items = {};
    },
    size: function(){
        return Object.keys(this.items).length;
    },
    values: function(){
        return Object.keys(this.items);
    }
}
