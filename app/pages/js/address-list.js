var addressList = {
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var self = this;
        var addressId = Okay.util.searchUrl(location.search).addressId;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }

        Okay.Ajax('post','/index.php?c=MobileAddress&a=getAddress',{mall_token: self.token}).done(function(data){
            self.data = data.data;
            $('.address-list').html(createLi(data.data));
            if(!self.data.length){
                $('.address-list').addClass('dn').next().removeClass('dn');
            }
        });


        function createLi(arr){
            var item,str = '';
            for (var i = 0,len = arr.length; i < len; i++){
                item = arr[i];
                str += '<li>';
                if(addressId == item.addressId){
                    str += '<div class="checkbox"><i class="icon icon-checkbox"></i></div>';
                }
                str += '<div class="desc" data-id=' + item.addressId  + '><div class="' + (addressId == item.addressId ? 'active' : '') + ' em">' + item.userName + '<span class="phone">' + item.userPhone + '</span>' + (item.isDefault == 1 ? '<span class="btn btn-sm">默认地址</span>' : '') + '</div>';
                str += '<div class="address"><div>' + item.areaName1 + item.areaName2 + item.areaName3 + '</div><div class="text-ellipsis">' + item.address + '</div></div>';
                if(item.email){
                    str += '<div class="mail">' + item.email + '</div>';
                }
                str += '</div><div class="operate"><a href="address.html?addressId=' + item.addressId  +'"><i class="icon icon-edit"></i></a><a href="javascript:;"><i class="icon icon-del" data-id="' + item.addressId + '"></i></a>'
                str += '</div></li>';
            }
            return str;
        }

    },
    initEvent: function(){
        var self = this;

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#footer').on('tap',function(){
            if(self.data && self.data.length >= 10){
                Okay.popUp('收货人信息最多保存10条');
                return;
            }else{
                window.location.href = 'address.html';
            }
        });

        $('.address-list').on('tap','.desc',function(){
            window.location.href = 'order-info.html' + '?addressId=' + $(this).data('id');
        }).on('tap','.icon-del',function(){
            var del = $(this);
            Okay.Dialog.confirm({
               content: '<p>您确定要要删除此地址吗？</p>',
               text: ['取消','确定'],
               hlCancel: true,
               onaccept: function(){
                   Okay.Ajax('post','/index.php?m=OkayMall&c=MobileAddress&a=del',{mall_token: self.token,id: del.data('id')}).done(function(data){
                       var index = del.data('id');
                       del.parents('li').remove();
                       self.data.splice(Okay.util.findWhere(self.data,{id:index}),1);
                       if(!self.data.length){
                           $('.address-list').addClass('dn').next().removeClass('dn');
                       }
                   });

               }
            });
        });


    }

}
