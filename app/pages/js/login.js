var login = {
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
        var searchStr = location.search;
        var self = this;

        $('#submit').on('tap',function(){
            var phone = $('#phone').val();
            var pwd = $('#pwd').val();

            if(!util.isPhone(phone)){
                 Okay.popUp('请输入正确的手机号');
                 return;
            }
            if(pwd == ""){
                 Okay.popUp('密码未填写');
                 return;
            }
            if(!util.isPwd(pwd)){
                 Okay.popUp('手机号和密码不匹配');
                 return;
            }

            // $.ajax({
            //     type : "post",
            //     url : Okay.util.URL + "/index.php?m=OkayMall&c=MobileUsers&a=login",
            //     data: {phone:phone,password:pwd},
            //     dataType : "jsonp",
            //     jsonpCallback:"jsonpReturn"
            // }).done(function(data){
            //     if(/200$/.test(data.status)){
            //         Okay.util.setCookie('mall_token',data['mall_token'],2);
            //         self.redirect(searchStr,data['mall_token']);
            //     }else{
            //         Okay.popUp(data.msg);
            //     }
            // }).fail(function(xhr,error){
            //     Okay.popUp(error);
            // });

            Okay.Ajax('post','/index.php?m=OkayMall&c=MobileUsers&a=login',{phone:phone,password:pwd}).done(function(data){
                Okay.util.setCookie('mall_token',data['mall_token'],2);
                self.redirect(searchStr,data['mall_token']);
            });

        });

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#signup').on('tap',function(){
            window.location.href = 'signup.html' + searchStr;
        });

        $('#forget-pwd').on('tap',function(){
            window.location.href = 'find-pwd.html' + searchStr;
        });

    }
}
