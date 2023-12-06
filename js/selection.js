class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);

        return () => {
            this.events[eventName] = this.events[
                eventName
            ].filter((eventFn) => fn !== eventFn);
        };
    }

    off(eventName, fn) {
        if (!eventName) {
            this.events = {};
            return;
        }
        let cbs = this.events[eventName];
        if (cbs) {
            if (fn) {
                this.events[eventName] = cbs.filter(
                    (eventFn) => fn !== eventFn
                );
            } else {
                delete this.events[eventName];
            }
        }
    }

    once(eventName, fn) {
        let tmp;
        return this.on(
            eventName,
            (tmp = (data) => {
                fn.call(null, data);
                this.events[eventName] = this.events[
                    eventName
                ].filter((eventFn) => tmp !== eventFn);
            })
        );
    }

    emit(eventName, ...data) {
        let cbs = this.events[eventName];
        if (cbs) {
            cbs.forEach((fn) => fn.apply(null, data));
        }
    }
}
class Selection extends EventEmitter {
    constructor(rootDom) {
        super();
        if (!rootDom) {
            throw new Error("root dom can't be null");
        }
        this.rootDom = rootDom;
        this.lastRange = null;
        this.mouseDown = false;
        this.mousedownHandler = this.bindMousedown.bind(this);
        this.mouseupHandler = this.bindMouseup.bind(this);
        this.selectionchangeHandler =
            this.bindSelectionchange.bind(this);
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener(
            "mousedown",
            this.mousedownHandler
        );
        document.addEventListener(
            "mouseup",
            this.mouseupHandler
        );
        document.addEventListener(
            "selectionchange",
            this.selectionchangeHandler
        );
    }

    bindMousedown() {
        this.mouseDown = true;
    }

    bindMouseup() {
        this.mouseDown = false;
        this.update();
    }

    bindSelectionchange() {
        if (!this.mouseDown) {
            setTimeout(() => {
                this.update();
            }, 1);
        }
    }

    update() {
        let range = this.getRange();
        if (range !== this.lastRange) {
            // console.log(range, this.lastRange);
            this.emit("selectionchange", range, this.lastRange);
            this.lastRange = range;
        }
    }

    getRange() {
        let selection = document.getSelection();
        if (selection == null || selection.rangeCount <= 0)
            return null;
        let range = selection.getRangeAt(0);
        if (
            !this.rootDom.contains(range.startContainer) ||
            (!range.collapsed &&
                !this.rootDom.contains(range.endContainer))
        ) {
            return null;
        }
        return range;
    }

    destroy() {
        document.removeEventListener(
            "mousedown",
            this.mousedownHandler
        );
        document.removeEventListener(
            "mouseup",
            this.mouseupHandler
        );
        document.removeEventListener(
            "selectionchange",
            this.selectionchangeHandler
        );
    }
}

let selection = new Selection(
    document.querySelector(".full-text")
);

selection.on("selectionchange", function (range, lastRange) {
    // console.log(range, lastRange);
    if (range)
        console.log(
            range.toString(),
            range.getBoundingClientRect()
        );
});
