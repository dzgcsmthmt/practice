var cart = {
    data: [],
    MAX_QUANTITY: 99999,
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var self = this,obj;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }
        // $.ajax({
        //     type : "post",
        //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=index",
        //     data: {'mall_token':self.token},
        //     dataType : "jsonp",
        //     jsonpCallback:"jsonpReturn"
        // }).done(function(data){
        //     if(/200$/.test(data.status)){
        //         self.data = obj = data.data;
        //         self.is_member = data.isMember == 1 ? true : false;
        //         if(!self.is_member){
        //             $('#member').addClass('is-member').removeClass('dn');
        //         }
        //         if(!data.data || !(obj && obj.length)){
        //             $('#page-list').addClass('dn').next().removeClass('dn');
        //         }else{
        //             $('.cart-list').html(createLi(obj));
        //             self.checkSelect();
        //         }
        //     }else{
        //         Okay.popUp(data.msg);
        //     }
        // }).fail(function(xhr,error){
        //     Okay.popUp(error);
        // });

        Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=index',{mall_token: self.token}).done(function(data){
            self.data = obj = data.data;
            self.goodsIds = Okay.util.pluck(self.data,'goodsId');
            self.is_member = data.isMember == 1 ? true : false;
            if(!self.is_member){
                $('#member').addClass('is-member').removeClass('dn');
            }
            if(!data.data || !(obj && obj.length)){
                $('#page-list').addClass('dn').next().removeClass('dn');
            }else{
                $('.cart-list').html(createLi(obj));
                self.checkSelect();
            }
        });


        function createLi(data){
            var str = '';
            for (var i = 0,len = data.length; i < len; i++) {
                var item = data[i];
                str += '<li data-id=' + item.goodsId + '><span class="checkbox"><label ><input type="checkbox" ' + (item.isCheck == 1 ? 'checked' : '') + ' data-id="' + item.goodsId + '" /><i class="icon icon-checkbox"></i></label></span>';
                str += '<span class="img"><img src="' + item.goodsThums + '"></span>';
                str += '<span class="desc"><span class="text">' + item.goodsName + '</span>';
                str += '<span class="num-wrapper"><i class="icon icon-minus ' + (item.goodsNum == 1 ? 'disabled' : '') + '"></i>'
                str += '<input type="text" class="num" value="' + item.goodsNum + '" maxlength="5" /><i class="icon icon-plus ' + (item.goodsNum == 99999 ? 'disabled' : '') + '"></i></span></span>'
                str += '<span class="price"><em>￥' + (self.is_member ? item.memberPrice : item.shopPrice) + '</em>';
                if(!self.is_member){
                    str += '<span class="member-price">会员价￥' + item.memberPrice  + '</span>';
                }
                str += '<i class="icon icon-del" data-index="' + item.goodsId + '"></i></span></li>';
            }
            return str;
        }

    },
    deselectAll: function(){
        $('.cart-list input:checkbox').prop('checked',false);
        $('#total-price').html("0.00");
        $('#pay').removeClass('active');
    },
    deselectFooter: function(){
        $('#footer input:checkbox').prop('checked',false);
        $('#total-price').html("0.00");
        $('#pay').removeClass('active');
    },
    checkSelect: function(){
        var len = $('.cart-list input[type="checkbox"]').length,checkedLen = $('.cart-list input:checked').length;
        if(checkedLen){
            if(len == checkedLen){
                $('#footer input:checkbox').prop('checked',true);
            }else{
                $('#footer input:checkbox').prop('checked',false);
            }
            $('#pay').addClass('active');
            this.calc();
        }else{
            this.deselectFooter();
        }
    },
    calc: function(){
        var self = this;
        var total = 0,price;
        var list = $('.cart-list li');
        for (var i = 0,len = list.length; i < len; i++) {
            if(list.eq(i).find(':checked').length){
                price = self.is_member ? self.data[i].memberPrice : self.data[i].shopPrice;
                total += price * list.eq(i).find('.num').val();
            }
        }
        $('#total-price').html(total.toFixed(2));
    },
    initEvent: function(){

        var self = this,wrapper = $('.cart-list');

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

        wrapper.on('input','.num',function(){
            var val = $(this).val();
            val = val.replace(/[^\d]/g,'');
            $(this).val(val);
        }).on('blur','.num',function(){
            var val = $(this).val();
            if(val == 0 || val == 1){
                val = 1;
                $(this).val(val);
                $(this).prev().addClass('disabled').next().next().removeClass('disabled');
            }else if(val == self.MAX_QUANTITY){
                $(this).next().addClass('disabled').prev().prev().removeClass('disabled');
            }else{
                $(this).prev().removeClass('disabled').end().next().removeClass('disabled');
            }
            changeNum($(this).parents('li').data('id'),val,function(){
                self.checkSelect();
            });
        }).on('tap','.icon-plus',function(){
            if($(this).hasClass('disabled')){
                return;
            }
            var ele = $(this).prev();
            var val = ele.val();
            if(val < self.MAX_QUANTITY){
                ele.val(++val);
                if(val == self.MAX_QUANTITY){
                    $(this).addClass('disabled');
                }
                ele.prev().removeClass('disabled');
                changeNum($(this).parents('li').data('id'),val,function(){
                    self.checkSelect();
                });
            }
        }).on('tap','.icon-minus',function(){
            if($(this).hasClass('disabled')){
                return;
            }
            var ele = $(this).next();
            var val = ele.val();
            if(val > 1){
                ele.val(--val);
                if(val == 1){
                    $(this).addClass('disabled');
                }
                ele.next().removeClass('disabled');
                changeNum($(this).parents('li').data('id'),val,function(){
                    self.checkSelect();
                });
            }
        }).on('tap','.icon-del',function(){
            var del = $(this),index;
            Okay.Dialog.confirm({
               content: '<p>您确定要把该商品</p><p>移出购物车吗?</p>',
               text: ['取消','确定'],
               hlCancel: true,
               onaccept: function(){
                //    $.ajax({
                //        type : "post",
                //        url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=del",
                //        data: {'mall_token':self.token,goodsId: del.data('index')},
                //        dataType : "jsonp",
                //        jsonpCallback:"jsonpReturn"
                //    }).done(function(data){
                //        if(/200$/.test(data.status)){
                //            index = del.data('index');
                //            del.parent().parent().remove();
                //            self.data.splice(Okay.util.findWhere(self.data,{id:index}),1);
                //            if(!self.data.length){
                //                $('#page-list').addClass('dn').next().removeClass('dn');
                //            }else{
                //                self.checkSelect();
                //            }
                //        }else{
                //            Okay.popUp(data.msg);
                //        }
                //    }).fail(function(xhr,error){
                //        Okay.popUp(error);
                //    });
                    Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=del',{mall_token: self.token,goodsId: del.data('index')},false).done(function(data){
                        index = del.data('index');
                        del.parent().parent().remove();
                        self.data.splice(Okay.util.findWhere(self.data,{id:index}),1);
                        if(!self.data.length){
                            $('#page-list').addClass('dn').next().removeClass('dn');
                        }else{
                            self.checkSelect();
                       }
                    });

               }
            });
       }).on('change','input:checkbox',function(){
           var len = $('.cart-list input[type="checkbox"]').length,checkedLen = $('.cart-list input:checked').length;
           var op = $(this).is(":checked") ? 1 : -1;
           Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=checkGoods',{mall_token: self.token,goodsId: [$(this).data('id')],op: op}).done(function(data){
               if(checkedLen){
                   if(len == checkedLen){
                       $('#footer input:checkbox').prop('checked',true);
                   }else{
                       $('#footer input:checkbox').prop('checked',false);
                   }
                   $('#pay').addClass('active');
                   self.calc();
               }else{
                   self.deselectFooter();
               }
           });
       });


       $('#member').on('tap',function(){
           window.location.href = 'member.html?returnURL=' + 'cart.html';
       })


       $('#footer input:checkbox').on('change',function(){
           if($(this).is(':checked')){
               Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=checkGoods',{mall_token: self.token,goodsId: self.goodsIds,op: 1}).done(function(data){
                   $('.cart-list input:checkbox').prop('checked',true);
                   $('#pay').addClass('active');
                   self.calc();
               });
           }else{
               Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=checkGoods',{mall_token: self.token,goodsId: self.goodsIds,op: -1}).done(function(data){
                   self.deselectAll();
               });
           }
       });

       $('#pay').on('tap',function(){
           var arr=[],len = $('.cart-list input:checked').length;
           if(len){
               for(var i = 0;i < len;i++){
                  arr.push($('.cart-list input:checked').eq(i).parents('li').data('id'));
               }
            //    $.ajax({
            //        type : "post",
            //        url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=checkCart",
            //        data: {'mall_token':self.token,arr:arr},
            //        dataType : "jsonp",
            //        jsonpCallback:"jsonpReturn"
            //    }).done(function(data){
            //        if(/200$/.test(data.status)){
            //             window.location.href = 'order-info.html';
            //        }else{
            //            Okay.popUp(data.msg);
            //        }
            //    }).fail(function(xhr,error){
            //        Okay.popUp(error);
            //    });

               Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=checkCart',{mall_token:self.token,arr: arr}).done(function(data){
                    window.location.href = 'order-info.html';
               })

           }
       })

       function changeNum(id,num,cb){
        //    $.ajax({
        //        type : "post",
        //        url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileCart&a=changeGoodsNum",
        //        data: {'mall_token':self.token,goodsId: id,num: num},
        //        dataType : "jsonp",
        //        jsonpCallback:"jsonpReturn"
        //    }).done(function(data){
        //        if(/200$/.test(data.status)){
        //            cb();
        //        }else{
        //            Okay.popUp(data.msg);
        //        }
        //    }).fail(function(xhr,error){
        //        Okay.popUp(error);
        //    });
            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileCart&a=changeGoodsNum',{'mall_token':self.token,goodsId: id,num: num}).done(function(data){
                 cb();
            });

       }


       $('#user').on('tap',function(){
           if(self.token){
               window.location.href = 'user.html' + location.search + '?returnURL=' + 'cart.html';
           }else{
               window.location.href = 'login.html' + location.search + '?returnURL=' + 'cart.html';
           }
       });

    }

}
