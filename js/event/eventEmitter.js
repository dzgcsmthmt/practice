class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);

        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }

    off(eventName,fn) {
        if(!eventName){
            this.events = {};
            return;
        }
        let cbs = this.events[eventName];
        if(cbs){
            if(fn){
                this.events[eventName] = cbs.filter(eventFn => fn !== eventFn);
            }else{
                delete this.events[eventName];
            }
        }
    }

    once(eventName,fn){
        let tmp;
        return this.on(eventName,(tmp = (data) => {
            fn.call(null, data);
            this.events[eventName] = this.events[eventName].filter(eventFn => tmp !== eventFn);
        }));
    }

    emit(eventName, data) {
        let cbs = this.events[eventName];
        if( cbs ) {
            cbs.forEach(fn => fn.call(null, data));
        }
    }
}


const e = new EventEmitter();

e.on('click',() => console.log(1));
e.on('click',() => console.log(2));

e.emit('click');

e.off()
e.emit('click');

// export default EventEmitter;

