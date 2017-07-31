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
        var addressId = Okay.util.searchUrl(location.search).addressId;
        var data;
        if(addressId){
            data = {'mall_token':self.token,addressId: addressId};
        }else{
            data = {'mall_token':self.token};
        }

        // $.ajax({
        //     type : "post",
        //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=orderPrepare",
        //     data: data,
        //     dataType : "jsonp",
        //     jsonpCallback:"jsonpReturn"
        // }).done(function(data){
        //     if(/200$/.test(data.status)){
        //         self.isMember = data.isMember;
        //         if(!self.isMember){
        //             $('#member').removeClass('dn');
        //         }
        //         $('#address').html(createAddress(data.address));
        //         $('.order-list').html(createLi(data.goodsList));
        //         $('#total-price').html('合计：' +　data.goodsAmount);
        //     }else{
        //         Okay.popUp(data.msg);
        //     }
        // }).fail(function(xhr,error){
        //     Okay.popUp(error);
        // });

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=orderPrepare',data).done(function(data){
            self.isMember = data.isMember == 1;
            if(!self.isMember){
                $('#member').removeClass('dn');
            }
            if(!data.goodsList){
                window.location.href = 'index.html';
            }
            $('#address').html(createAddress(data.address));
            $('.order-list').html(createLi(data.goodsList));
            $('#total-price').html('合计：' +　data.goodsAmount);
        });

        function createAddress(obj){
            var str = '';
            if(!obj){
                str += '添加收货人信息';
                $('#address').addClass('empty');
            }else{
                self.addressId = obj.addressId;
                str += '<div><em>' + obj.userName + '</em><em class="phone">' + obj.userPhone + '</em>' + (obj.isDefault == 1 ? '<span class="btn btn-sm">默认地址</span>' : '') + '</div>';
                str += '<div class="group clearfix"><div class="fl address">',
                str += '<div>' + (obj.areaName1 + ' ' + obj.areaName2 + ' ' + obj.areaName3) + '</div><div class="text-ellipsis">' + obj.address + '</div>';
                str += '</div><div class="fr forward"><a href="address-list.html?addressId=' + self.addressId + '"><i class="icon icon-forward"></i></a></div></div>';
                if(obj.email){
                    str += '<div class="mail">' + obj.email + '</div>';
                }
            }
            return str;
        }

        function createLi(data){
            var str = '';
            for (var i = 0,len = data.length; i < len; i++) {
                var item = data[i];
                str += '<li><div class="order-product clearfix">';
                str += '<div class="img fl"><img src="' + item.goodsThums + '" /></div>';
                str += '<div class="desc fl">' + item.goodsName + '</div>';
                str += '<div class="price fl"><div class="em">￥' + (self.isMember ? item.memberPrice : item.shopPrice) + '</div>';
                if(!self.isMember){
                    str += '<div class="member-price">会员价￥' + item.memberPrice  + '</div>';
                }
                str += '<div class="quantity"><span class="small">X</span><span>' + item.goodsNum + '</span></div>';
                str += '</div></div></li>';
            }
            return str;
        }

    },
    initEvent: function(){
        var self = this;
        var searchStr = location.search;

        // $('.radio').on('change','input',function(){
        //     if($(this).val() == 1){
        //         $('.invoice').removeClass('dn');
        //     }else{
        //         $('.invoice').addClass('dn').find('input').val("");
        //     }
        // });

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#member').on('tap',function(){
            if(searchStr){
                window.location.href = 'member.html?returnURL=' + 'order-info.html' + '&' + searchStr.substring(1);
            }else{
                window.location.href = 'member.html?returnURL=' + 'order-info.html';
            }
        });


        $('.select').on('tap',function(){
            var tempObj = {};
            tempObj.value = self.isCompany || 0;
            tempObj.text = self.type || '个人';
            new Okay.Select({
                title:' ',
                content:[
                    {
                        id: 'education-select',
                        select: [{value:0,text:'个人'},{value:1,text:"公司"}],
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.value = opt.value;
                            tempObj.text = opt.text;
                        },
                        selectIndex: self.isCompany
                    }
                ],
                onaccept: function(){
                    self.isCompany = tempObj.value;
                    self.type = tempObj.text;
                    if(self.isCompany == 1){
                        $('.select').next().show();
                    }else{
                        $('.select').next().hide();
                    }
                    $('.type').html(tempObj.text);
                }
            });
        });


        $('#address').on('tap',function(){
            if(!self.addressId){
                window.location.href = 'address.html';
            }else{
                window.location.href = 'address-list.html?addressId=' + self.addressId;
            }
        });

        $('#submit').on('tap',function(){
            var data;
            if(!self.addressId){
                Okay.popUp('请添加收货人信息');
                return;
            }

            data = {
                remarks:$('#invoice-title').val().trim(),
                addressId: self.addressId,
                mall_token: self.token
            },

            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileOrders&a=orderSubmit',data).done(function(data){
                window.location.href = 'pay.html?orderId=' + data.orderIds;
            });

        });

    }

}
