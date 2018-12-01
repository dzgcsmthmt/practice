function ObserverList(){
    this.observerList= [];
}

ObserverList.prototype = {
    add: function(item){
        this.observerList.push(item);
    },
    count: function(){
        return this.observerList.length;
    },
    get: function(index){
        if(index > -1 && index < this.count()){
            return this.observerList[index];
        }
    },
    indexOf: function(item,startIndex){
        var i = startIndex;
        while(i < this.count()){
            if(item === this.observerList[i]){
                return i;
            }
            i++;
        }
    },
    removeAt: function(index){
        if(index > -1 && index < this.count()){
            this.observerList.splice(index,1);
        }
    }
}

Object.defineProperty(ObserverList.prototype,'constructor',{
    value: ObserverList,
    writable: true,
    configurable: true,
    enumerable: false
});

function Subject(){
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer){
    this.observers.add(observer);
}

Subject.prototype.removeObserver = function(observer){
    var index = this.observers.indexOf(observer,0);
    if(index > -1){
        this.observers.removeAt(index);
    }
}

Subject.prototype.notify = function(cxt){
    var len = this.observers.count();
    for (var i = 0; i < len; i++) {
        this.observers.get(i).update(cxt);
    }
}

function Observer(){

}

Observer.prototype.update = function(cxt){
    console.log(cxt);
}

var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );

Object.assign(controlCheckbox,new Subject());
Object.assign(controlCheckbox,Subject.prototype);

controlCheckbox.addEventListener('click',function(ev){
    this.notify(this.checked);
},false);

addBtn.addEventListener('click',addNewObserver,false);

function addNewObserver(){
    var input = document.createElement('input');
    input.type = "checkbox";

    Object.assign(input,new Observer());
    Object.assign(input,Observer.prototype);
    input.update = function(value){
        this.checked = value;
    }

    controlCheckbox.addObserver(input);

    container.appendChild(input);

}
