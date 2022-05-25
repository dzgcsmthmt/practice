import {easeLinear,easeInQuad,easeOutQuad,easeInOutQuad,easeInBounce} from './easing.js';
import animate from './animate.js';
let easing = {
    easeLinear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInBounce
}

document.querySelectorAll('.run').forEach(btn => {
    btn.addEventListener('click',function(ev){
        let type = this.dataset.type;
        let cssBox = this.parentNode.nextElementSibling;
        let jsBox = cssBox.nextElementSibling;
        if(cssBox.classList.contains('anim')){
            cssBox.classList.remove('anim');
            cssBox.offsetWidth;
        }
        cssBox.classList.add('anim');
        animate({
            startValue: 0,
            endValue: 300,
            duration: 1000,
            easing: easing[type],
            onChange: function(current, valuePerc, timePerc){
                //console.log(current)
                jsBox.style.transform = `translateX(${current}px)`;
            }
        })
    })
})