var mySingleton = (function(){
    var instance;

    function init() {
        // Private methods and variables
        function privateMethod(){
            console.log( "I am private" );
        }

        var privateVariable = "Im also private";

        var privateRandomNumber = Math.random();

        return {

            // Public methods and variables
            publicMethod: function () {
                console.log( "The public can see me!" );
            },

            publicProperty: "I am also public",

            getRandomNumber: function() {
                return privateRandomNumber;
            }

        };

      };


      return {
          getInstance: function(){
              if(!instance){
                  instance = init();
              }
              return instance;
          }
      }

})();


var myBadSingleton = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function() {
                return privateRandomNumber;
            }
        };

    };

    return {
        // Always create a new Singleton instance
        getInstance: function () {
            instance = init();
            return instance;
        }
    };

})();
