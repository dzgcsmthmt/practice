var order = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var self = this;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }

        // $.ajax({
        //     type : "post",
        //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileOrders&a=myOrders",
        //     data: {mall_token: self.token},
        //     dataType : "jsonp",
        //     jsonpCallback:"jsonpReturn"
        // }).done(function(data){
        //     if(/200$/.test(data.status)){
        //         self.orderList = data.orderList;
        //         $('.num').html(data.goodsSum);
        //         if(self.orderList.length){
        //             $('.order-list').html(createLi(self.orderList));
        //         }else{
        //             $('#page-list').hide().next().show();
        //         }
        //     }else{
        //         Okay.popUp(data.msg);
        //     }
        // }).fail(function(xhr,error){
        //     Okay.popUp(error);
        // });

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=myOrders',{mall_token: self.token}).done(function(data){
            self.orderList = data.orderList;
            if(data.goodsSum == 0){
                $('.num').hide().parent().show();
            }else{
                $('.num').html(data.goodsSum > 99 ? '99+' : data.goodsSum).parent().show();
            }
            if(self.orderList.length){
                $('.order-list').html(createLi(self.orderList));
            }else{
                $('#page-list').hide().next().show();
            }
        });

        function createLi(orders){
            var order,j,len1,good;
            var str = '',status;
            for (var i = 0,len = orders.length; i < len; i++) {
                order = orders[i];
                str += '<li><div class="order-text clearfix"><span class="fl">下单时间：' + order.date + '</span><span class="fr">订单号：' + order.orderNo + '</span></div>';
                for(j = 0,len1 = order.goods.length; j < len1;j++){
                    good = order.goods[j];
                    str += '<div class="order-product clearfix"><div class="img fl"><img src="' + good.goodsThums + '"></div><div class="desc fl">' + good.goodsName + '</div>';
                    str += '<div class="price fl"><div>￥' + good.goodsPrice + '</div><div class="quantity"><span class="small">X</span><span>' + good.goodsNums + '</span></div></div></div>';
                }
                str += '<div class="total-price">总价：￥' + order.totalMoney + '</div>';
                if(order.orderStatus == -2){
                    status = order.isPay == 0 && order.payFrom == 3 ? 'offline' : 'online';
                    str += '<div class="order-status clearfix" data-id="' + order.orderId + '"><span class="fl status">' + (status == 'offline' ? '等待汇款' : '等待支付') + '</span>';
                    str += '<span class="fr btns-wrapper"><button class="btn btn-sm order-cancel" data-id="' + order.orderId + '">取消订单</button>';
                    if(status == 'offline'){
                        str += '<button class="btn btn-sm order-pay" data-id="' + order.orderId + '">汇款信息</button>';
                    }
                    str += '<button class="btn btn-sm order-detail" data-id="' + order.orderId + '">订单详情</button><a class="btn btn-sm pay" href="pay.html?orderId=' + order.orderId + '">支付</a></span></div>';
                }else if(order.isPay == 1){
                    str += '<div class="order-status clearfix" data-id="' + order.orderId + '"><span class="fl status done">已支付</span><span class="fr btns-wrapper">';
                    str += '<button class="btn btn-sm order-detail" data-id="' + order.orderId + '">订单详情</button><a class="btn btn-sm complaint" href="https://kefu.easemob.com/webim/im.html?tenantId=2782&emgroup=OKAY%E5%95%86%E5%9F%8E">申请售后</a></span></div>';
                }else if(order.orderStatus == -11){
                    str += '<div class="order-status clearfix" data-id="' + order.orderId + '"><span class="fl status done">已取消</span><span class="fr btns-wrapper"><button class="btn btn-sm order-detail" data-id="' + order.orderId + '">订单详情</button></span></div>';
                }
                str += '</li>';
            }
            return str;
        }

    },
    initEvent: function(){

        var self = this,wrapper = $('.order-list');

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
            window.location.href = 'user.html';
        });

        wrapper.on('tap','.order-cancel',function(){
            var $self = $(this);
            var orderId = $(this).data('id');
            Okay.Dialog.confirm({
               content: '<p>您确定要取消订单吗?</p>',
               text: ['不取消','取消订单'],
               onaccept: function(){
                //    $.ajax({
                //        type : "post",
                //        url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileOrders&a=cancelOrder",
                //        data: {mall_token: self.token,orderId: orderId},
                //        dataType : "jsonp",
                //        jsonpCallback:"jsonpReturn"
                //    }).done(function(data){
                //        if(/200$/.test(data.status)){
                //            $self.parents('.order-status').html('<span class="fl status">已取消</span><span class="fr btns-wrapper"><button class="btn btn-sm order-detail" data-id="' + orderId + '">订单详情</button></span>');
                //        }else{
                //            Okay.popUp(data.msg);
                //        }
                //    }).fail(function(xhr,error){
                //        Okay.popUp(error);
                //    });
                   Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=cancelOrder',{mall_token: self.token,orderId: orderId}).done(function(data){
                       $self.parents('.order-status').html('<span class="fl status">已取消</span><span class="fr btns-wrapper"><button class="btn btn-sm order-detail" data-id="' + orderId + '">订单详情</button></span>');
                   });
               }
            });
        }).on('tap','.order-detail',function(){
            var id = $(this).data('id');
            var obj = Okay.util.filter(self.orderList,{'orderId': id});
            Okay.Dialog.alert({
                title: '订单详情',
                content: tmpl(obj),
                text: '我知道了'
            });

            function tmpl(obj){
                var str = '<div class="text-left"><p class="em">' + obj.userName + ' ' + obj.userPhone +'</p>';
                str += '<p class="area">' + obj.city + '</p><p>' + obj.street + '</p>';
                if(obj.email){
                    str += '<p class="mail">' + obj.email + '</p>';
                }
                str += '<p class="deliver">送货上门</p>';
                if(obj.remarks){
                    str += '<p class="deliver">' + obj.remarks + '</p></div>';
                }
                return str;
            }

        }).on('tap','.order-pay',function(){
            Okay.Dialog.alert({
                title: '汇款信息',
                content: '<div class="text-left"><p class="em group">开户银行：交通银行</p><p class="em group">帐号：622260014001510AAAA</p><p class="em group">公司名称：OKAY</p><p>请在汇款时写清您的订单号、手机号、姓名</p><div>',
                text: '我知道了'
            });
        })

    }

}
