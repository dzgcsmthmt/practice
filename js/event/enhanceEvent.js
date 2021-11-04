import { returnTrue, returnFalse } from './util.js';
const keys = "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which type".split(" ");

export default class EnhancedEvent{
    constructor(originEvent){
        this.originEvent = originEvent;
        keys.forEach(key => {
            this[key] = originEvent[key];
        });
        this.isImmediatePropagationStopped = returnFalse;
        this.isPropagationStopped = returnFalse;
        this.isDefaultPrevented = returnFalse;
    }

    stopPropagation(){
        this.isPropagationStopped = returnTrue;
        if(this.originEvent.stopPropagation){
            this.originEvent.stopPropagation();
        }
    }

    stopImmediatePropagation(){
        this.isImmediatePropagationStopped = returnTrue;
        if(this.originEvent.stopImmediatePropagation){
            this.originEvent.stopImmediatePropagation();
        }
    }

    preventDefault(){
        this.isDefaultPrevented = returnTrue;
        if(this.originEvent.preventDefault){
            this.originEvent.preventDefault();
        }
    }
}