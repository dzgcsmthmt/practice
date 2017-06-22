var pay = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){

        var obj,self = this;
        var searchObj = Okay.util.searchUrl(location.search);
        self.orderId = searchObj.orderId;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=orderInfo',{'mall_token': self.token,orderId: searchObj.orderId}).done(function(data){
            obj = data.data;
            self.orderNo = obj.orderNo;
            $('#order-id').html(obj.orderNo);
            $('#address').html(createAddress(obj));
        });


        function createAddress(obj){
            var str = '';
            str += '<div class="total-price">合计：' + obj.totalMoney + '</div>';
            str += '<div class="user">' + obj.userName + ' ' + obj.userPhone + '</div>';
            str += '<div class="address">' + obj.city + '</div><div class="address">' + obj.street + '</div>';
            if(obj.mail){
                str += '<div class="mail">' + obj.mail + '</div>';
            }
            str += '<div class="deliver">送货上门</div>';
            if(obj.remarks){
                str += '<div class="deliver">' + obj.remarks + '</div>'
            }
            return str;

        }

    },
    initEvent: function(){
        var self = this;
        $('.back').on('tap',function(){
            window.history.back();
        });
        var  orderId = GetQueryString("orderId");

        $('.aliPay').on('tap',function(){
            $.ajax({
                type : "POST",
                url : Okay.util.URL + "/index.php?m=OkayMall&c=MobilePayment&a=toPay",
                data: {'mall_token': self.token, 'key': orderId + '@' + '1'},
            }).done(function(data){
                if(/200$/.test(data.status)){
                    $('#test').append(data.data);
                }else{
                    Okay.popUp(data.msg);

                }
            }).fail(function(xhr,error){
                 Okay.popUp(error);
            });
        });

        $('.weChat').on('tap',function(){
            window.location.href = Okay.util.URL + "/index.php?m=OkayMall&c=Wechat&a=toPay&mall_token=" + self.token + "&key=" + orderId + '@' + '1' + "&returnUrl="+ encodeURIComponent(location.href);
        });


        $('.bank').on('tap',function(ev){
            window.location.href='pay-status.html?payFrom=3&orderNo=' + self.orderNo + '&orderId=' + self.orderId;
        });

        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }

    }

}
