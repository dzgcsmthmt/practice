<pre>
/*
        function DemoPromise(){
            this.promiseState = 'pending';
            this.fullfillCbs = [];
            this.rejectCbs = [];
        }

        DemoPromise.prototype = {
            constructor: DemoPromise,
            resolve: function(value){
                if(this.promiseState != 'pending'){
                    return;
                }
                this.promiseState = 'fullfilled';
                this.promiseResult = value;
                this._clearAndEnqueueCbs(this.fullfillCbs);
                return this;
            },
            reject: function(value){
                if(this.promiseState != 'pending'){
                    return;
                }
                this.promiseState = 'rejected';
                this.promiseResult = value;
                this._clearAndEnqueueCbs(this.rejectCbs);
                return this;
            },
            then:function(onFulfilled,onRejected){
                var self = this;
                var fullfillTask = function(){
                    onFulfilled(self.promiseResult);
                };
                var rejectTask = function(){
                    onRejected(self.promiseResult);
                };

                switch (this.promiseState){
                    case 'pending':
                        Array.isArray(this.fullfillCbs) && this.fullfillCbs.push(fullfillTask);
                        Array.isArray(this.fullfillCbs) && this.rejectCbs.push(rejectTask);
                        break;
                    case 'fullfilled':
                        this._addToTaskQueue(fullfillTask);
                        break;
                    case 'reject':
                        this._addToTaskQueue(rejectTask);
                        break;
                }

            },
            _addToTaskQueue: function(fn){
                setTimeout(fn,0);
            },
            _clearAndEnqueueCbs:function(cbs){
                cbs.map(this._addToTaskQueue);
                this.fullfillCbs.length = 0;
                this.rejectCbs.length = 0;
            }
        }
        */

        function DemoPromise(){
            this.promiseState = 'pending';
            this.fullfillCbs = [];
            this.rejectCbs = [];
        }

        DemoPromise.prototype = {
            constructor: DemoPromise,
            resolve: function(value){
                if (this.alreadyResolved) return;
                this.alreadyResolved = true;
                this._doResolve(value);
                return this;
            },
            _doResolve:function(value){
                var self = this;
                if(typeof value == 'object' && value != null && 'then' in value){
                    addToTaskQueue(function () { // (A)
                        value.then(
                            function onFulfilled(result) {
                                self._doResolve(result);
                            },
                            function onRejected(error) {
                                self._doReject(error);
                            });
                    });
                }else{
                    this.promiseState = 'fullfilled';
                    this.promiseResult = value;
                    this._clearAndEnqueueCbs(this.fullfillCbs);
                }
            },
            reject: function(value){
                if(this.promiseState != 'pending'){
                    return;
                }
                this.promiseState = 'rejected';
                this.promiseResult = value;
                this._clearAndEnqueueCbs(this.rejectCbs);
                return this;
            },
            then:function(onFulfilled,onRejected){
                var returnValue = new DemoPromise();
                var self = this;
                var fullfillTask,rejectTask;
                var value,rValue;
                if(typeof onFulfilled == 'function'){
                    fullfillTask = function(){
                        try {
                            value = onFulfilled(self.promiseResult);
                            returnValue.resolve(value);
                        } catch (e) {
                            returnValue.reject(value);
                        }
                    }
                }else{
                    fullfillTask = function(){
                        returnValue.resolve(self.promiseResult);
                    }
                }

                if(typeof onRejected == 'function'){
                    rejectTask = function(){
                        rValue = onRejected(self.promiseResult);
                        returnValue.reject(rValue);
                    }
                }else{
                    rejectTask = function(){
                        returnValue.reject(self.promiseResult);
                    }
                }

                switch (this.promiseState){
                    case 'pending':
                        Array.isArray(this.fullfillCbs) && this.fullfillCbs.push(fullfillTask);
                        Array.isArray(this.fullfillCbs) && this.rejectCbs.push(rejectTask);
                        break;
                    case 'fullfilled':
                        this._addToTaskQueue(fullfillTask);
                        break;
                    case 'reject':
                        this._addToTaskQueue(rejectTask);
                        break;
                }

                return returnValue;
            },
            _addToTaskQueue: function(fn){
                setTimeout(fn,0);
            },
            _clearAndEnqueueCbs:function(cbs){
                cbs.map(this._addToTaskQueue);
                this.fullfillCbs.length = 0;
                this.rejectCbs.length = 0;
            }
        }

        const dp = new DemoPromise();
        dp.resolve('abc');
        dp.then(function (value) {
            console.log(value);
            return ('bridge' + value); // abc
        },function(value){
            console.log('reject' + value);
        }).then(function (value) {
            console.log('2' + value); // abc
        },function(value){
            console.log('reject' + '2' + value);
        });
        setTimeout(function(){
            // dp.resolve('abc');
            dp.reject('abc');
        },1000);
</pre>
