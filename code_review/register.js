var timer,count = 60;
var checkValidation = function(condition,ele,invalidEle){
    ele[condition ? 'removeClass' : 'addClass']('error')[condition ? 'addClass' : 'removeClass']('success');
    invalidEle[condition ? 'hide' : 'show']();
    return condition;
};
// var arr = [
//         {key: "phone",func: function(){return checkValidation(/^1\d{10}$/.test(this.value),this.ele,this.invalidEle);}},
//         {key: "validateCode",func: function(){return checkValidation(/^\d{4}$/.test(this.value),this.ele,this.invalidEle);}},
//         {key: "areaCode",func: function(){return checkValidation(/^[0-9a-zA-Z]{4}$/.test(this.value),this.ele,this.invalidEle);}},
//         {key: "password",func: function(){return checkValidation(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,16}$/.test(this.value),this.ele,this.invalidEle);}},
//         {key: "repassword",func: function(){return checkValidation(this.value === validate.password.value && this.value.length,this.ele,this.invalidEle);}},
//     ];
var validate = {
	phone: {
        ele: $('#phone'),
        invalidEle: $('#phone').next('p'),
        value: $('#phone').val(),
        checkValidation: function(){
            //var re = new RegExp('Foo B', 'gi');
            //console.log(re.test('Foo Bar'));
            //console.log(re.test('Foo Bar'));
            /*if(/(^1\d{10}$/.test(this.value)){
                this.ele.addClass('success').removeClass('error');
                this.invalidEle.hide();
                return true;
            }else{
                this.ele.removeClass('success').addClass('error');
                this.invalidEle.show();
                return false;
            }*/
            /*
            var flag = /^1\d{10}$/.test(this.value);
            this.ele[flag ? 'removeClass' : 'addClass']('error')[flag ? 'addClass' : 'removeClass']('success');
            this.invalidEle[flag ? 'hide' : 'show']();
            return flag;
            */
            return checkValidation(/^1\d{10}$/.test(this.value),this.ele,this.invalidEle);
        },
    },
	validateCode: {
        ele: $('#validateCode'),
        invalidEle: $('#validateCode').next('p'),
        value: $('#validateCode').val(),
        checkValidation: function(){
            return checkValidation(/^\d{4}$/.test(this.value),this.ele,this.invalidEle);
        },
    },
    areaCode: {
        ele: $('#areaCode'),
        invalidEle: $('#areaCode').next('p'),
        value: $('#areaCode').val(),
        checkValidation: function(){
            return checkValidation(/^[0-9a-zA-Z]{4}$/.test(this.value),this.ele,this.invalidEle);
        },
    },
    password: {
        ele: $('#password'),
        invalidEle: $('#password').next('p'),
        value: $('#password').val(),
        checkValidation: function(){
            return checkValidation(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,16}$/.test(this.value),this.ele,this.invalidEle);
        },
    },
    repassword: {
        ele: $('#repassword'),
        invalidEle: $('#repassword').next('p'),
        value: $('#repassword').val(),
        checkValidation: function(){
            return checkValidation(this.value === validate.password.value && this.value.length,this.ele,this.invalidEle);
        },
    }
}

/*
var validate = {};
arr.forEach(function(ele,index){
    var key = ele.key;
    validate[ele.key] = {
        ele: $('#' + key),
        invalidEle: $('#' + key).next('p'),
        value: $('#' + key).val(),
        checkValidation: ele.func
    }
})*/
var signup = {
    countDown: function(ele){
        var self = this;
        timer = setInterval(function(){
            count--;
            if(!count){
                self.resetGetCode();
            }else{
                ele.val('(' + count  +')s后，重新获取');
            }
        },1000);
    },
    resetGetCode:function(){
        clearTimeout(timer);
        count = 60;
        $('#sendCode').removeClass('disabled').text('获取短信验证码');
    },
    initEvent: function() {
        var self = this;
        // $("#phone").on('blur',function(ev){
        //     regObj.checkItem('phone',validate.isPhoneNumber($(this).val()),'请输入正确的手机号');
        // });
        // $("#validateCode").on('blur',function(ev){
        //     regObj.checkItem('validateCode',validate.isMessageCode($(this).val()),'请输入正确的验证码');
        // });
        // $("#areaCode").on('blur',function(ev){
        //     regObj.checkItem('areaCode',/^[0-9a-zA-Z]{4}$/.test($(this).val()),'请输入有效的区域码');
        // });
        // $("#password").on('blur',function(ev){
        //     regObj.checkItem('password',validate.isPasswd($(this).val()),'请输入6-16密码,且必须包含数字、字母');
        // });
        // $("#repassword").on('blur',function(ev){
        //     regObj.checkItem('repassword',$(this).val() != "" && $(this).val() == $('#password').val(),'两次输入密码不一致，请重新输入');
        // });

        $('#register').on('blur','input[type="text"],input[type="password"]',function(ev){
            var obj = validate[this.id];
            obj.value = this.value;
            obj.checkValidation();
        });

        /*发送验证码*/
        $('#sendCode').on('click',function(ev){
            if(!validate.phone.checkValidation()){
                return;
            };
            if(!$(this).hasClass('disabled')){
                $(this).addClass("disabled").val('(' + count  +')s后，重新获取');
                self.countDown($(this));
                $.post('/reg/send_sms',{phone_num: validate.phone.value},function(data){
                    console.log(data);
                },function(err){
                    // self.checkItem('phone',false,err);
                    // self.resetGetCode();
                });
            }
        });

        //提交注册
        $('#form').on('submit',function(ev){
            ev.preventDefault();
            var params,temp,flag = true;
            for (var key in validate) {
                temp = validate[key];
                if(!temp.checkValidation()){
                    flag = false;
                };
            }
            if(flag && $('#checkbox').prop('checked')){
                params = {
                    phone: validate.phone.value,
                    verification_code: validate.validateCode.value,
                    area_code: validate.areaCode.value,
                    password: validate.password.value
                }
                $.post("reg/submit_reg",params,function(data){
                    console.log(data);
                    window.location.href = '/wizard?system_id=' + data.system_id;
                })
            }

        });


    }


}

signup.initEvent();
