var part = {
    upperLimit: 100,
    scrollElem: $('#to-top'),
    init: function(){
        this.loadData();
        this.initEvent();
    },
    loadData: function(){
        var self = this;
        self.token = Okay.util.getCookie('mall_token');

        if (!('okay' in window ||  window.webkit)) {
            $('.app-download').removeClass('dn');
        }

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileGoods&a=getOkayGoods',{mall_token: self.token}).done(function(data){
            $('.part-list').html(createLi(data.data));
            if(self.token){
                if(data.goodsSum == 0){
                    $('.num').hide().parent().show();
                }else{
                    $('.num').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
                }
            }
        });

        function createLi(data){
            var str = '';
            data = data.root;
            for (var i = 0,len = data.length; i < len; i++) {
                var oLi = data[i];
                str += '<li><a href="' + 'detail.html?goodsId=' + oLi.goodsId + '">';
                str += '<div class="img"><img src="' + oLi.goodsThums + '" /></div>';
                str += '<div class="info"><div class="price">￥' + oLi.shopPrice + '</div><div class="desc">' + oLi.goodsName + '</div></div>';
            }
            str += '</a></li><li class="vl"></li>';
            return str;
        }
    },
    initEvent: function(){

        var self = this;
        var scrollHandler = Okay.util.debounce(function() {
            var scrollTop = $(document).scrollTop();
            if ( scrollTop > self.upperLimit ) {
                self.scrollElem.removeClass('dn');
            }else{
                self.scrollElem.addClass('dn');
            }
        }, 150);

        $(window).on('scroll',scrollHandler);

        this.scrollElem.on('tapend',function(ev){
            ev.preventDefault();
            $('html,body').scrollTop(0);
            self.scrollElem.addClass('dn');
        });

        $('#theme').on('tap',function(ev){
            ev.preventDefault();
            $('#menu').show();
            $('body').addClass('with-menu');
        });

        $('#menu').on('tap','a',function(ev){
            ev.preventDefault();
            $('#menu').hide();
            $('body').removeClass('with-menu');
            window.location.href = $(this).data('href');
        });

        $('#close').on('tap',function(ev){
            ev.preventDefault();
            $('#menu').hide();
            $('body').removeClass('with-menu');
        });

        $('#user').on('tap',function(){
            if(self.token){
                window.location.href = 'user.html?returnURL=' + encodeURIComponent('parts.html');
            }else{
                window.location.href = 'login.html?returnURL=' + encodeURIComponent('parts.html');
            }
        });

    }

}
