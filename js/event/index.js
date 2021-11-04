import okEvent from './event.js';

const oUl = document.querySelector('ul');
function fn1(){
    console.log(1);
}

function fn2(){
    console.log(2);
}

function fn3(){
    console.log(3);
}

okEvent.on(oUl,'click','li',function(ev){
    console.log('li',this)
    // return false;
    // ev.stopPropagation();
}).on(oUl,'click',function(ev){
    console.log(1,this);
    // ev.stopImmediatePropagation();
}).on(oUl,'click',fn2)//.on(oUl,'mouseover',fn3)

// okEvent.off(oUl);
// okEvent.off(oUl,'click');
// okEvent.off(oUl,'click','li');
okEvent.off(oUl,'click',fn2);