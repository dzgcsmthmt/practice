//Number.tofixed的修订版版本
//2.005.toFixed(2) => 2.00
//round(2.005) => 2.01

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

round(2.005, 2);

//Function.prototype.bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}


function bigNumber2String(number){
    var str,pre,post,int,frac,xs;
    if(number > 1e21){
        str = number.toString();
        pre = str.split('e')[0];
        post = '0'.padEnd(str.split('e')[1],0);

        int = pre.split('\.')[0];
        frac = pre.split('\.')[1];
        if(frac){
            if(frac.length > post.length){
                xs = frac.substring(post.length);
                frac = frac.substring(0,post.length);
            }else{
                frac = frac + post.substring(frac.length);
            }
            return (int > 0 ? int : '') + frac + (xs ? '\.' + xs : '');

        }

    }else{
        return number.toString();
    }

}

console.log(bigNumber2String(1.1234567890123456789012345e22));
//1.1234567890123456789012345 --> 1.1234567890123457 无法保证精度
