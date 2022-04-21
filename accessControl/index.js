import AccessControl from './control.js';
import AccessHandler from './handler.js';


let control = new AccessControl();

let clickHandler = new AccessHandler('click',['#a',document.querySelector('#b')],false,() =>  {console.log('mousedown access denied')});
let focusHandler = new AccessHandler('focus','#e',false,() =>  {console.log('focus access denied')});

control.addInterceptor(clickHandler)
        .addInterceptor(focusHandler)
        //.delInterceptor('mousedown',document.querySelector('#a'))
        //.delInterceptor('mousedown',document.querySelector('#b'));

