var resetPwd = {
    init: function(){
        this.initEvent();
    },
    redirect: function(searchStr,token){
        var url,searchObj = Okay.util.searchUrl(searchStr);
        if(searchObj.returnURL == 'cart.html' && searchObj.num){
            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=add',{gcount: searchObj.num,goodsId: searchObj.goodsId,mall_token: token}).done(function(data){
                window.location.href = 'cart.html';
            });
        }else{
            if(searchObj.returnURL){
                url = Okay.util.searchUrl(searchStr).returnURL + Okay.util.splitUrl(searchStr);
            }else{
                url = 'index.html';
            }
            window.location.href = url;
        }
    },
    initEvent: function(){
        var util = Okay.util;
        var self = this;
        var count = 3,timer = null;
        var searchStr = location.search;

        $('#submit').on('tap',function(){
            var pwd = $('#pwd').val();
            var pwd2 = $('#re-pwd').val();

            if(!util.isPwd(pwd)){
                 Okay.popUp('请输入6-16位密码，只能为数字或者字母');
                 return;
            }

            if(!util.isPwd(pwd2) ||  pwd != pwd2){
                 Okay.popUp('密码不一致');
                 return;
            }

            $.ajax({
                type : "post",
                url : Okay.util.URL + "/index.php?c=MobileUsers&a=OkayMallFindPassThird",
                data: {password:pwd,comfirmPassword:pwd2},
                dataType : "jsonp",
                jsonpCallback:"jsonpReturn"
            }).done(function(data){
                if(/200$/.test(data.status)){
                    $('#page1').hide().next().show();
                    timer = setInterval(function(){
                        if(--count == 0){
                            clearInterval(timer);
                            Okay.util.setCookie('mall_token',data['mall_token'],2);
                            self.redirect(searchStr,data['mall_token']);
                            return;
                        }
                        $('#countDown').html(count);
                    },1000);
                }else{
                    Okay.popUp(data.msg);
                }
            }).fail(function(xhr,error){
                Okay.popUp(error);
            });

        });

        $('.back').on('tap',function(){
            window.history.back();
        });

    }
}
