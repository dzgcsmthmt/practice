var user = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        if (!('okay' in window ||  window.webkit)) {
            $('.exit').removeClass('dn');
        }
        if(self.token = Okay.util.getCookie('mall_token')){
            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=index',{mall_token: self.token},false).done(function(data){
                if(data.goodsSum == 0){
                    $('.num').hide().parent().show();
                }else{
                    $('.num').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
                }
            });
        }else{
            window.location.href = 'login.html';
        }
    },
    initEvent: function(){

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

        $('#exit').on('tap',function(){
            var searchStr = location.search;
            Okay.Dialog.confirm({
               content: '<p style="font-size: 0.6rem;text-align: center;">您确定要退出吗？</p>',
               text: ['取消','确定'],
               onaccept: function(){
                   Okay.util.delCookie('mall_token');
                   if(Okay.util.searchUrl(searchStr).returnURL){
                       url = Okay.util.searchUrl(searchStr).returnURL + Okay.util.splitUrl(searchStr);
                   }else{
                       url = 'index.html';
                   }
                   window.location.href = url;
               }
            });

        });

    }

}
