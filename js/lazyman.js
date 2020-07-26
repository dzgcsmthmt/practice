function LazyMan(name) {
    if (!(this instanceof LazyMan)) {
        return new LazyMan(name);
    }

    this.name = name;
    this.tasks = [];
    var self = this;

    var task = function () {
        console.log('Hi! This is ' + name + '!');
        self.next();
    }

    this.tasks.push(task);

    setTimeout(function () {
        self.next();
    }, 0);

}

LazyMan.prototype.next = function () {
    var task = this.tasks.shift();
    task && task();
}

LazyMan.prototype.sleepFirst = function (s) {
    this._sleep(s,true);
    return this;
}

LazyMan.prototype.sleep = function (s) {
    this._sleep(s,false);
    return this;
}

LazyMan.prototype._sleep = function (s, first) {
    const task = () => {
        setTimeout(() => {
            console.log(`Wake up after ${s}`);
            this.next();
        }, s * 1000)
    }
    if (first) {
        this.tasks.unshift(task);     // 放到任务队列顶部
    } else {
        this.tasks.push(task);        // 放到任务队列尾部
    }

}

LazyMan.prototype.eat = function (c) {
    var self = this;
    var task = function () {
        console.log('Eat ' + c);
        self.next();
    }

    this.tasks.push(task);
    return this;
}


// LazyMan("Hank");

// LazyMan("Hank").sleep(10).eat("dinner");

LazyMan("Hank").eat("dinner").sleepFirst(1).eat("supper")

// LazyMan("Hank").sleepFirst(5).eat("supper")
