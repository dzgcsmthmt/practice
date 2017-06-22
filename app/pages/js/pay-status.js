var payStatus = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var str = '',self = this;
        var searchObj = Okay.util.searchUrl(location.search);
        self.orderNo = searchObj.orderNo;
        self.payFrom = searchObj.payFrom;
        self.orderId = searchObj.orderId;
        self.isPay = searchObj.isPay;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }

        if(self.payFrom == 3){
            str += '<div class="img-wrapper"><div class="circle visa shadow"><img src="pages/img/bank.png"></div></div>';
            str += '<div class="status p">银行汇款</div>';
            str += '<div class="order p">您的订单号：' + self.orderNo + '</div>';
            str += '<div class="bank"><p>开户银行：交通银行</p><p>银行帐号：622260014001510AAAA</p><p>公司名称：OKAY</p></div>';
            str += '<div class="btn-wrapper"><button class="btn btn-primary btn-full">查看我的订单</button></div>';
            str += '<div class="tip"><p>请在汇款时写清您的订单号，手机号，姓名</p><p>您还可以在我的订单、汇款信息中再次查看这些信息</p></div>';
            $('#status').html(str);
        }else{
            self.callback = 1;
            if(self.isPay == 0){
                str += '<div class="img-wrapper"><div class="circle loading shadow"><img src="common/img/loading.gif"></div></div>';
                str += '<div class="status p">等待付款</div>';
                str += '<div class="order p">您的订单号：' + self.orderNo + '</div>';
                str += '<div class="btn-wrapper"><a class="btn btn-primary btn-full" href="order.html">查看我的订单</a></div>';
                str += '<div class="tip"><p>您还没有支付成功</p><p>您还可以在我的订单中继续支付</p></div>';
                $('#status').html(str);
            }else if(self.isPay == 1){
                str += '<div class="img-wrapper"><div class="circle"><img src="pages/img/done.png"></div></div>';
                str += '<div class="status p">支付成功</div>';
                str += '<div class="order p">您的订单号：' + self.orderNo + '</div>';
                str += '<div class="btn-wrapper"><a class="btn btn-primary btn-full" href="order.html">查看我的订单</a></div>';
                str += '<div class="tip"><p>如有任何问题</p><p>请咨询小云或者电话</p><p><a href="tel:400-996-0175">400-996-0175</a></p></div>';
                $('#status').html(str);
            }
        }

    },
    initEvent: function(){
        var self = this;

        $('#done').on('tap',function(){
            if(self.callback){
                window.location.href='/order.html';
            }else{
                Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=setPay',{orderId:self.orderId,payFrom:3,mall_token:self.token}).done(function(data){
                    window.location.href='/order.html';
                });
            }
        });

        $('#status').on('tap','button.btn',function(){
            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=setPay',{orderId:self.orderId,payFrom:3,mall_token:self.token}).done(function(data){
                window.location.href='/order.html';
            })
        });


    }

}
