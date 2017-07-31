var address = {
    submitObj: {},
    showObj: {},
    areaCache:{},
    timer: null,
    provinces:[["110000","北京市"],["310000","上海市"],["120000","天津市"],["500000","重庆市"],["340000","安徽省"],["350000","福建省"],["820332","广东省"],["450000","广西壮族自治区"],["520000","贵州省"],["620000","甘肃省"],["130000","河北省"],["410000","河南省"],["420000","湖北省"],["430000","湖南省"],["460000","海南省"],["230000","黑龙江省"],["330000","浙江省"],["320000","江苏省"],["360000","江西省"],["220000","吉林省"],["210000","辽宁省"],["150000","内蒙古自治区"],["640000","宁夏回族自治区"],["630000","青海省"],["370000","山东省"],["140000","山西省"],["510000","四川省"],["610000","陕西省"],["540000","西藏自治区"],["650000","新疆维吾尔自治区"],["530000","云南省"]],
    init: function(){
        this.initData();
        this.initEvent();
    },
    initData: function(){
        var addressId,obj;
        var self = this;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }
        if(addressId = Okay.util.searchUrl(location.search).addressId){
            $('.h1').html('修改收货人信息').removeClass('dn');
            Okay.Ajax('post','/index.php?c=MobileAddress&a=getAddress',{addressId: addressId,'mall_token': self.token}).done(function(data){
                obj = data.data[0];
                self.addressId = obj.addressId;
                $('#area').html(obj.areaName1 + ' ' + obj.areaName2 + ' ' + obj.areaName3).parent().addClass('selected');
                $('#street').val(obj.address);
                $('#name').val(obj.userName);
                $('#phone').val(obj.userPhone);
                if(obj.email){
                    $('#mail').val(obj.email);
                }
                if(obj.isDefault == 1){
                    $('input[type="checkbox"]').prop('checked',true);
                }
                self.submitObj.proviceId = obj.areaId1;
                self.showObj.proviceName = obj.areaName1;
                self.submitObj.cityId = obj.areaId2;
                self.showObj.cityName = obj.areaName2;
                self.submitObj.countyId = obj.areaId3;
                self.showObj.countyName = obj.areaName3;
                Okay.Ajax('post','/index.php?m=OkayMall&c=mobileAreas&a=getAllAreas',{parentId: self.submitObj.proviceId,mall_token: self.token}).done(function(data){
                    self.cities = data.data.cities;
                    self.areaCache[self.submitObj.proviceId] = data.data.cities;
                    Okay.util.extendDefaults(self.areaCache,data.data.counties);
                    self.counties = data.data.counties[self.submitObj.cityId];
                });
            });

        }else{
            $('.h1').removeClass('dn');
        }
    },
    initEvent: function(){
        var self = this;
        var email;

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#save').on('tap',function(){
            var obj = {
                email: '',
                address: '',
                areaId1: '',
                areaId2: '',
                areaId3: '',
                userName: '',
                userPhone: '',
                isDefault: 0
            }
            var url = '';
            if(!self.submitObj.proviceId){
                Okay.popUp('请选择区域');
                return;
            }
            if((obj.address = $('#street').val().trim()) == ''){
                Okay.popUp('请填写详细地址');
                return;
            };
            if((obj.userName = $('#name').val()) == ""){
                Okay.popUp('请输入收货人姓名');
                return;
            }
            if(!Okay.util.isName(obj.userName = $('#name').val())){
                Okay.popUp('收货人姓名请输入1-10个汉字');
                return;
            }
            if(!Okay.util.isPhone(obj.userPhone = $('#phone').val())){
                Okay.popUp('请填写正确的手机号');
                return;
            }
            if(!Okay.util.isPhone(obj.userPhone = $('#phone').val())){
                Okay.popUp('请填写正确的手机号');
                return;
            }
            obj.email = email = $('#mail').val().trim();
            if(email && !Okay.util.isEmail(email)){
                Okay.popUp('请填写正确的邮箱格式');
                return;
            }
            if($('input[type="checkbox"]:checked').length){
                obj.isDefault = 1;
            }
            obj.areaId1 = self.submitObj.proviceId;
            obj.areaId2 = self.submitObj.cityId;
            obj.areaId3 = self.submitObj.countyId;
            // obj['mall_token'] = Okay.util.getCookie('mall_token');
            obj['mall_token'] = self.token;
            if(self.addressId){
                obj.id = self.addressId;
                url = '/index.php?m=OkayMall&c=MobileAddress&a=edit';
            }else{
                url = '/index.php?m=OkayMall&c=MobileAddress&a=add';
            }



            // $.ajax({
            //     type : "post",
            //     url : Okay.util.URL + url,
            //     data: obj,
            //     dataType : "jsonp",
            //     jsonpCallback:"jsonpReturn"
            // }).done(function(data){
            //     if(/200$/.test(data.status)){
            //         window.location.href = 'address-list.html';
            //     }else{
            //         Okay.popUp(data.msg);
            //     }
            // }).fail(function(xhr,error){
            //     Okay.popUp(error);
            // });

            Okay.Ajax('post',url,obj).done(function(data){
                if(data.addressNum == 1){
                    window.location.href = 'order-info.html';
                }else{
                    window.location.href = 'address-list.html';
                }
            })

        });

        $('.area').on('tap',function(){
            var tempObj = {
                provice: {
                    id: self.submitObj.proviceId || self.provinces[0][0],
                    name: self.showObj.proviceName  || self.provinces[0][1]
                },
                city: {
                    id: self.submitObj.cityId,
                    name: self.showObj.cityName
                },
                county: {
                    id: self.submitObj.countyId,
                    name: self.showObj.countyName
                },
                cities: self.cities,
                counties: self.counties
            };

            var initChange = true;

            if(!self.submitObj.proviceId){
                getCities(self.provinces[0][0],function(){
                    getCounties(tempObj.cities[0][0],function(){
                        initSelect();
                    });
                });
            }else{
                if(self.submitObj.proviceId != self.provinces[0][0]){
                    initChange = false;
                }
                initSelect();
            }

            function initSelect(){
                new Okay.Select({
                    title:'区域',
                    content:[
                        {
                            id: 'provice-select',
                            select: self.provinces,
                            onChange:function(e){
                                var opt = e.options[e.selectedIndex];
                                tempObj.provice.id = opt.value;
                                tempObj.provice.name = opt.text;
                                if(!initChange){
                                    initChange = true;
                                    return;
                                }
                                clearTimeout(self.timer);
                                self.timer = setTimeout(function(){
                                    getCities(opt.value,function(){
                                        createAreaSelect(tempObj.cities,'city-select',function(e){
                                            tempObj.city.id = e.value;
                                            tempObj.city.name = e.text;
                                            getCounties(e.value,function(e){
                                                createAreaSelect(tempObj.counties,'county-select',function(e){
                                                    setCounty(e);
                                                });
                                            })
                                        });
                                        getCounties(tempObj.cities[0][0],function(e){
                                            createAreaSelect(tempObj.counties,'county-select',function(e){
                                                setCounty(e);
                                            });
                                        });
                                    })
                                },150);

                            },
                            selectIndex: Okay.util.findWhere(self.provinces,{'0': tempObj.provice.id})
                        },
                        {
                            id: 'city-select',
                            select: tempObj.cities,
                            onChange: function(e){
                                var opt = e.options[e.selectedIndex];
                                tempObj.city.id = opt.value;
                                tempObj.city.name = opt.text;
                                getCounties(opt.value,function(e){
                                    createAreaSelect(tempObj.counties,'county-select',function(e){
                                        setCounty(e);
                                    });
                                })
                            },
                            selectIndex: Okay.util.findWhere(tempObj.cities,{'0': tempObj.city.id})
                        },
                        {
                            id: 'county-select',
                            select: tempObj.counties,
                            onChange:function(e){
                                setCounty(e);
                            },
                            selectIndex: Okay.util.findWhere(tempObj.counties,{'0': tempObj.county.id})
                        }
                    ],
                    onaccept: function(){
                        self.submitObj.proviceId = tempObj.provice.id;
                        self.showObj.proviceName = tempObj.provice.name;
                        self.submitObj.cityId = tempObj.city.id;
                        self.showObj.cityName = tempObj.city.name;
                        self.submitObj.countyId = tempObj.county.id;
                        self.showObj.countyName = tempObj.county.name;
                        self.cities = tempObj.cities;
                        self.counties = tempObj.counties;
                        $('.area').addClass('selected').find('span').html(tempObj.provice.name + ' ' + tempObj.city.name + ' ' + tempObj.county.name);
                    }
                });
            }

            function getCities(proviceId,cb){
                if(self.areaCache[proviceId]){
                    tempObj.cities = self.areaCache[proviceId];
                    tempObj.city.id = tempObj.cities[0][0];
                    tempObj.city.name = tempObj.cities[0][1];
                    cb && cb();
                }else{
                    // $.ajax({
                    //     type : "post",
                    //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileAreas&a=getAllAreas",
                    //     data: {parentId: proviceId},
                    //     dataType : "jsonp",
                    //     jsonpCallback:"jsonpReturn"
                    // }).done(function(data){
                    //     if(/200$/.test(data.status)){
                    //         tempObj.cities = data.data.cities;
                    //         self.areaCache[proviceId] = data.data.cities;
                    //         Okay.util.extendDefaults(self.areaCache,data.data.counties);
                    //         tempObj.city.id = tempObj.cities[0][0];
                    //         tempObj.city.name = tempObj.cities[0][1];
                    //         cb && cb();
                    //     }else{
                    //         Okay.popUp(data.msg);
                    //     }
                    // }).fail(function(xhr,error){
                    //     Okay.popUp(error);
                    // });

                    Okay.Ajax('post','/index.php?m=OkayMall&c=mobileAreas&a=getAllAreas',{parentId: proviceId}).done(function(data){
                        tempObj.cities = data.data.cities;
                        self.areaCache[proviceId] = data.data.cities;
                        Okay.util.extendDefaults(self.areaCache,data.data.counties);
                        tempObj.city.id = tempObj.cities[0][0];
                        tempObj.city.name = tempObj.cities[0][1];
                        cb && cb();
                    });

                }
            }


            function getCounties(cityId,cb){
                tempObj.counties = self.areaCache[cityId];
                tempObj.county.id = tempObj.counties[0][0];
                tempObj.county.name = tempObj.counties[0][1];
                cb && cb();
            }

            function setCounty(e){
                var opt;
                if(e.text){
                    tempObj.county.id = e.value;
                    tempObj.county.name = e.text;
                }else{
                    opt = e.options[e.selectedIndex];
                    tempObj.county.id = opt.value;
                    tempObj.county.name = opt.text;
                }
            }
        });


        function createAreaSelect(opts,id,cb){
            var str = '';
            for (var i = 0,len = opts.length; i < len; i++) {
                str += '<option value=' + opts[i][0] + '>' + opts[i][1] + '</option>';
            }
            $('#drum_' + id).remove();
            $('#' + id).removeData().html(str).drum({
                onChange : function (e) {
                    var opt = e.options[e.selectedIndex];
                    cb({text:opt.text,value: opt.value});
                 }
            });
        }


    }

}
