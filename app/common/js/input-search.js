(function(){
    var lists = $('input[data-type="search"]');

    for (var i = 0,len = lists.length; i < len; i++) {
        (function(input){
            var oPar = input.parent();
            var timer;
            if(oPar.css('position') == 'static'){
                oPar.css({position:'relative'});
            }
            var oClear =  $('<a href="javascript:;" class="icon icon-clear"></a>');
            oClear.css({'width':'2rem','height':'2rem','position':'absolute','top':'0','right':oPar.width() - input.outerWidth(),'background':'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAARVBMVEUAAADY2NjZ2dnZ2dnZ2dnZ2dnZ2dnc3NzY2NjZ2dnZ2dnZ2dnZ2dnb29vc3Nza2trg4ODm5ubb29vY2Nj////8/Pzf39/sSGIhAAAAE3RSTlMA+u7Hw6BxFd+zpnlJRkA+GQoH1KF+5AAAATVJREFUSMeU01mOwyAQRdEqBuN5yIu9/6V2J0KyDPYL3M8SR0iokPu2afC2NaqmtX6YNikuNE5xSV0TiujSRZn4bvlJZ4fH3Ezp2oPWr892NADPjE+2QUHNLX15FOVfuQ0WhdmQ3ZtYqtO7PSry5K0qX21EZeNpV1OLzbktParrJTbj2oEYG84RO1za9+PG7jsuufgHE/t+5/r4nyZ6+eIutVEnNtXdxwbNjkXNhxrO/cgOchs3xYFoYuFENgXRxEI3mQCiiQUmGUA0tRjEg2lm4cWCaWZhpQXTzKIVA6KphREF0dRC/0qvAxoAYBiGYfxZG4QBXLr+rU3qcF27Hqy+qoakxrMWo1ZywqBiqAJwordCf+qmim4qtsp9sGKAZlCqIG7wccA1kHlgfTRhBeXV6KWsdBB0QNHZ1xzZPgAAAABJRU5ErkJggg==") center center no-repeat','background-size':'0.6rem 0.6rem','display':'none'});
            oPar.append(oClear);

            oPar.on('input','input[data-type="search"]',function(){
                var val = $(this).val();
                if(val != ''){
                    $(this).nextAll('.icon-clear').show();
                }else{
                    $(this).nextAll('.icon-clear').hide();
                }
            });

            oPar.on('blur','input[data-type="search"]',function(){
                var self= $(this);
                timer = setTimeout(function() {
                    self.nextAll('.icon-clear').hide();
                },50);
            });

            oPar.on('focus','input[data-type="search"]',function(){
                var val = $(this).val();
                if(val != ''){
                    $(this).nextAll('.icon-clear').show();
                }
            });

            oPar.on('click','.icon-clear',function(){
                clearTimeout(timer);
                $(this).prevAll('input[data-type="search"]').val('').focus();
                $(this).hide();
            });

        })(lists.eq(i));
    }

})();
