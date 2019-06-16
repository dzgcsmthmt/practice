var timer,count = 60;
var validate = {
	/*
	 *	whether message code is valid
	 *	@param	{string/number}		code
	 *	@return	{boolean}			true/false
	 */
	isMessageCode: function(code) {
		return /^\d{4}$/.test(code);
	},

	/*
	 *	whether graph code is valid
	 *	@param	{string/number}		code
	 *	@return	{boolean}			true/false
	 */
	isGraphCode: function(code) {
		return /^[a-zA-Z]{5,}$/.test(code);
	},

	/*
	 *	whether the given phone number is valid
	 *	@param	{string/number}		phone
	 *	@return	{boolean}			true/false
	 */
	isPhoneNumber: function(phone) {
		return /(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/.test(phone);
	},

	/*
	 *	whether password is valid
	 *	@param	{string}	passwd
	 *	@return	{boolean}	true/false
	 */
	isPasswd: function(passwd) {
		return /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,16}$/.test(passwd);
	}
}

var regObj = {
    //check input
    checkItem: function(id,condition,errMsg){
        if(!condition){
            $('#' + id).addClass('error').nextAll('p').text(errMsg).show();
            return false;
        }else{
            $('#' + id).removeClass('error').addClass('success').nextAll('p').hide();
            return true;
        }
    },
    countDown: function(obj){
        timer = setInterval(function(){
            count--;
            if(!count){
                regObj.resetGetCode();
            }else{
                obj.text('(' + count  +')s后，重新获取');
            }
        },1000);
    },
    resetGetCode:function(){
        clearTimeout(timer);
        count = 60;
        $('#sendCode').removeClass('disabled').text('获取短信验证码');
    },
    initEvent: function() {
        $("#phone").on('blur',function(ev){
            regObj.checkItem('phone',validate.isPhoneNumber($(this).val()),'请输入正确的手机号');
        });
        $("#validateCode").on('blur',function(ev){
            regObj.checkItem('validateCode',validate.isMessageCode($(this).val()),'请输入正确的验证码');
        });
        $("#areaCode").on('blur',function(ev){
            regObj.checkItem('areaCode',/^[0-9a-zA-Z]{4}$/.test($(this).val()),'请输入有效的区域码');
        });
        $("#password").on('blur',function(ev){
            regObj.checkItem('password',validate.isPasswd($(this).val()),'请输入6-16密码,且必须包含数字、字母');
        });
        $("#repassword").on('blur',function(ev){
            regObj.checkItem('repassword',$(this).val() != "" && $(this).val() == $('#password').val(),'两次输入密码不一致，请重新输入');
        });

        /*发送验证码*/
        $('#sendCode').on('click',function(ev){
            if(!regObj.checkItem('phone',validate.isPhoneNumber($('#phone').val()),'请输入正确的手机号')){
                return;
            };
            if(!$(this).hasClass('disabled')){
                $(this).addClass("disabled").text('(' + count  +')s后，重新获取');
                regObj.countDown($(this));
                $.post('/reg/send_sms',{phone_num: $('#phone').val()},function(data){
                    console.log(data);
                },function(err){
                    regObj.checkItem('phone',false,err);
                    regObj.resetGetCode();
                });
            }
        });

        //提交注册
        $('#submitRegister').on('click',function(ev){
            ev.preventDefault();
            var params,ids = ["phone",'validateCode','areaCode','password','repassword'];
            for (var i = 0,len = ids.length; i < len; i++) {
                $('#' + ids[i]).trigger('blur');
            }
            if(!$('#register').find('.error-desc:visible').length){
                params = {
                    phone: $('#phone').val(),
                    verification_code: $('#validateCode').val(),
                    area_code: $('#areaCode').val(),
                    password: $('#password').val()
                }
                $.post("reg/submit_reg",params,function(data){
                    console.log(data);
                    window.location.href = '/wizard?system_id=' + data.system_id;
                })
            }
        });


    }


}

regObj.initEvent();
