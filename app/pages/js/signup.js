var signup = {
    timer: null,
    msg_disabled: false,
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
    countDown: function(){
        var count = 60,self = this;
        self.timer = setInterval(function(){
            $('#msg-code').html(--count + 'S');
            if(count == 0){
                clearInterval(self.timer);
                $('#msg-code').html('获取验证码').removeClass('disabled');
                self.msg_disabled = false;
            }
        },1000);
    },
    initEvent: function(){
        var util = Okay.util;
        var self = this;
        var searchStr = location.search;

        $('#submit').on('tap',function(){
            var phone,code,pwd,pwd2,data;

            if(!util.isPhone(phone = $('#phone').val())){
                 Okay.popUp('请输入正确的手机号');
                 return;
            }

            if(!util.isMsgCode(code = $('#code').val())){
                 Okay.popUp('请输入正确的验证码');
                 return;
            }

            if(!util.isPwd(pwd = $('#pwd').val())){
                 Okay.popUp('请输入6-16位密码，只能为数字或者字母');
                 return;
            }

            if(!util.isPwd(pwd2 = $('#re-pwd').val())){
                 Okay.popUp('密码不一致');
                 return;
            }

            if(pwd != pwd2){
                Okay.popUp('密码不一致');
                return;
            }

            data = {
                protocol:1,
                verifyTel:phone,
                password:pwd,
                comfirmPassword:pwd2,
                regcode:code,
                ring_mall_token: self.ring
            };

            Okay.Ajax('post','/index.php?c=MobileUsers&a=toOkayMallRegist',data).done(function(data){
                Okay.util.setCookie('mall_token',data['mall_token'],2);
                self.redirect(searchStr,data['mall_token']);
            });

        });

        $('#msg-code').on('tap',function(){
            var phone = $('#phone').val();
            if(!util.isPhone(phone)){
                 Okay.popUp('请输入正确的手机号');
                 return;
            }

            if(!self.msg_disabled){
                self.msg_disabled = true;
                $(this).html('60S').addClass('disabled');
                self.countDown();
                $.ajax({
                    type : "post",
                    url : Okay.util.URL + "/index.php?c=MobileUsers&a=getPhoneVerifyCode",
                    data: {userPhone:phone},
                }).done(function(data){
                    if(!/200$/.test(data.status)){
                        Okay.popUp(data.msg);
                        clearInterval(self.timer);
                        $('#msg-code').html('获取验证码').removeClass('disabled');
                        self.msg_disabled = false;
                    }else{
                        self.ring = data.ring_mall_token;
                        Okay.popUp('验证码已发送');
                    }
                }).fail(function(xhr,error){
                    Okay.popUp(error);
                });

            }

        });

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#login').on('tap',function(){
            window.location.href = 'login.html' + searchStr;
        });

    }
}
