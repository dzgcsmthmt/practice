var count = 1;
function compose(fns){
   return fns.reduce((a,b) => {
        return (args) => {
            console.log('a',a);
            console.log('b',b);
            return a(b(args))
        }
    })

    return function(args){
        return fns.reduceRight((a,b) => {
           // console.log(args,b);
            return b(a);
        },args)
    }

}

function toUpper(s){
    return s.toUpperCase();
}

function add(s){
    return "!" + s;
}

function trim(s){
    return s.substr(1);
}

function prefix(s){
    return 'prefix' + s;
}

var func = compose([toUpper,add,trim,prefix]);

console.log(func('aaa'))
