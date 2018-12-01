var testModule = (function () {

  var counter = 0;

  return {

    incrementCounter: function () {
      return counter++;
    },

    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };

})();

// Usage:

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();


var busketModule = (function(){
    var basket = [];

    function validate(index){
        return typeof index == 'number' && index >= 0 && index < basket.length;
    }

    return {
        addItem: function(item){
            basket.push(item);
        },
        addItemByIndex: function(item,index){
            basket.splice(index,0,item);
        },
        getItemCount: function(){
            return basket.length;
        },
        delItem: function(item){
            var index;
            if(~(index = basket.indexOf(item))){
                basket.splice(index,1);
            }
        },
        delItemByIndex: function(index){
            if(validate(index)){
                basket.splice(index,1);
            }else{
                throw new Error('wrong parameter');
            }
        },
        getItemByIndex: function(index){
            if(validate(index)){
                return basket[index];
            }else{
                throw new Error('wrong parameter');
            }
        }
    }

})()
