var detail = {
    MAX_QUANTITY: 99999,
    is_member: false,
    isLogin: false,
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var obj,str = '',imgStr='';
        var self = this;
        self.goodsId = Okay.util.searchUrl(location.search).goodsId;
        if(self.token = Okay.util.getCookie('mall_token')){
            self.isLogin = true;
        }
        // $.ajax({
        //     type : "post",
        //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileGoods&a=getOkayGoodDetail",
        //     data: {goodsId:self.goodsId,mall_token: self.token},
        //     dataType : "jsonp",
        //     jsonpCallback:"jsonpReturn"
        // }).done(function(data){
        //     if(/200$/.test(data.status)){
        //         obj = data.data.goodsInfo;
        //         self.is_member = data.data.isMember;
        //         $('.h1').html(obj.goodsName);
        //         if(self.token){
        //             $('.count').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
        //         }
        //         for (var i = 0,len = obj.imgList.length; i < len; i++) {
        //             imgStr += '<div><img src="' + obj.imgList[i] + '"></div>';
        //         }
        //         $('.swipe-wrap').html(imgStr);
        //         self.initSwipe();
        //         str += '<div class="price-wrapper"><div class="member-price">会员价￥' + obj.memberPrice + '</div><div class="price ' + (self.is_member ? 'is-member' : '') +'">原价￥' + obj.shopPrice + '</div></div>';
        //         str += '<div class="num-wrapper"><i class="icon icon-minus disabled"></i><input type="text" class="num" value="1" maxlength="5" /><i class="icon icon-plus"></i></div>';
        //         str += '<div class="produce-info clearfix"><span>上架时间：' + obj.saleTime.split(' ')[0] + '</span><span>商品货号：' + obj.goodsSn + '</span><span>商品品牌：OKAY</span></div>';
        //         $('.main').html(str);
        //         if(self.is_member){
        //             $('#addCart').addClass('btn-full').prev().remove();
        //         }
        //         $('.btn-wrapper').show();
        //     }else{
        //         Okay.popUp(data.msg);
        //     }
        // }).fail(function(xhr,error){
        //     Okay.popUp(error);
        // });

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileGoods&a=getOkayGoodDetail',{goodsId:self.goodsId,mall_token: self.token}).done(function(data){
            obj = data.data.goodsInfo;
            self.is_member = data.data.isMember;
            $('.h1').html(obj.goodsName);
            if(self.token){
                if(data.goodsSum == 0){
                    $('.count').hide().parent().show();
                }else{
                    $('.count').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
                }
            }
            for (var i = 0,len = obj.imgList.length; i < len; i++) {
                imgStr += '<div><img src="' + obj.imgList[i] + '"></div>';
            }
            $('.swipe-wrap').html(imgStr);
            self.initSwipe();
            str += '<div class="price-wrapper"><div class="member-price">会员价￥' + obj.memberPrice + '</div><div class="price ' + (self.is_member ? 'is-member' : '') +'">原价￥' + obj.shopPrice + '</div></div>';
            str += '<div class="num-wrapper"><i class="icon icon-minus disabled"></i><input type="text" class="num" value="1" maxlength="5" /><i class="icon icon-plus"></i></div>';
            str += '<div class="produce-info clearfix"><span>上架时间：' + obj.saleTime.split(' ')[0] + '</span><span>商品货号：' + obj.goodsSn + '</span><span>商品品牌：OKAY</span></div>';
            $('.main').html(str);
            if(self.is_member){
                $('#addCart').addClass('btn-full').prev().remove();
            }
            $('.btn-wrapper').show();
        });

    },
    initSwipe: function(){
        var len,util = Okay.util,str = '<div class="swipe-banner">';
        var swipe = new Swipe(document.getElementById('slider'), {
              speed: 500,
              auto: 4000,
              callback: function(index, elem) {
                  $('.swipe-circle').eq(swipe.getPos()).addClass('active').siblings().removeClass('active');
              },
              transitionEnd: function(index, elem) {}
        });
        len = $('#slider .swipe-wrap').children().length;
        for (var i = 0; i < len; i++) {
            str += '<span class="swipe-circle ' + (i == 0 ? 'active' : '') + '"></span>';
        }
        str += '</div>';

        $('#slider').append(str);

    },
    initEvent: function(){
        var self = this;
        var wrapper = $('.main');

        $('.back').on('tap',function(){
            window.history.back();
        });

        wrapper.on('input','.num',function(){
            var val = $(this).val();
            val = val.replace(/[^\d]/g,'');
            $(this).val(val);
        }).on('blur','.num',function(){
            var val = $(this).val();
            if(val == 0 || val == 1){
                $(this).val('1');
                $(this).prev().addClass('disabled');
            }else if(val == self.MAX_QUANTITY){
                $(this).next().addClass('disabled');
            }else{
                $(this).prev().removeClass('disabled').end().next().removeClass('disabled');
            }
        }).on('tap','.icon-plus',function(){
            if($(this).hasClass('disabled')){
                return;
            }
            var ele = $(this).prev();
            var val = ele.val();
            if(val < self.MAX_QUANTITY){
                ele.val(++val);
                if(val == self.MAX_QUANTITY){
                    $(this).addClass('disabled');
                }
                ele.prev().removeClass('disabled');
            }
        }).on('tap','.icon-minus',function(){
            if($(this).hasClass('disabled')){
                return;
            }
            var ele = $(this).next();
            var val = ele.val();
            if(val > 1){
                ele.val(--val);
                if(val == 1){
                    $(this).addClass('disabled');
                }
                ele.next().removeClass('disabled');
            }
        });

        $('#member').on('tap',function(){
            if(!self.isLogin){
                joinUrl('login.html',true);
            }else{
                joinUrl('member.html');
            }
        })

        $('#addCart').on('tap',function(){
            if(!self.isLogin){
                joinUrl('login.html',true,true);
            }else{
                // $.ajax({
                //     type : "post",
                //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=add",
                //     data: {gcount:$('.num').val(),goodsId:self.goodsId,'mall_token': self.token},
                //     dataType : "jsonp",
                //     jsonpCallback:"jsonpReturn"
                // }).done(function(data){
                //     if(/200$/.test(data.status)){
                //         window.location.href = 'cart.html';
                //     }else{
                //         Okay.popUp(data.msg);
                //     }
                // }).fail(function(xhr,error){
                //     Okay.popUp(error);
                // });

                Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=add',{gcount:$('.num').val(),goodsId:self.goodsId,'mall_token': self.token}).done(function(data){
                    window.location.href = 'cart.html';
                });

            }
        });

        $('#user').on('tap',function(){
            if(self.isLogin){
                window.location.href = 'user.html' + location.search + '&returnURL=' + 'detail.html';
            }else{
                window.location.href = 'login.html' + location.search + '&returnURL=' + 'detail.html';
            }
        });

        function joinUrl(html,isNum,goNext) {
            var str = isNum ? ('&num=' + $('.num').val()) : '';
            window.location.href = html + location.search + (location.search ? '&' : '?') + 'returnURL=' + (goNext ? 'cart.html' : location.pathname.substring(1)) + str;
        }

    }

}
