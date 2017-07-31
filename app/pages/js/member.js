var member = {
    submitObj: {},
    showObj: {},
    schoolIds:[1,2,3],
    areaCache:{},
    timer: null,
    provinces:[["110000","北京市"],["310000","上海市"],["120000","天津市"],["500000","重庆市"],["340000","安徽省"],["350000","福建省"],["820332","广东省"],["450000","广西壮族自治区"],["520000","贵州省"],["620000","甘肃省"],["130000","河北省"],["410000","河南省"],["420000","湖北省"],["430000","湖南省"],["460000","海南省"],["230000","黑龙江省"],["330000","浙江省"],["320000","江苏省"],["360000","江西省"],["220000","吉林省"],["210000","辽宁省"],["150000","内蒙古自治区"],["640000","宁夏回族自治区"],["630000","青海省"],["370000","山东省"],["140000","山西省"],["510000","四川省"],["610000","陕西省"],["540000","西藏自治区"],["650000","新疆维吾尔自治区"],["530000","云南省"]],
    cities:[],
    counties: [],
    schools: {
        1: [
            {value: 3,text: '一年级'},
            {value: 4,text: '二年级'},
            {value: 5,text: '三年级'},
            {value: 6,text: '四年级'},
            {value: 7,text: '五年级'},
            {value: 8,text: '六年级'}
        ],
        2: [
            {value: 9,text: '七年级'},
            {value: 10,text: '八年级'},
            {value: 11,text: '九年级'}
        ],
        3: [
            {value: 12,text: '高一'},
            {value: 13,text: '高二'},
            {value: 14,text: '高三'}
        ]
    },
    relation: [
        {value: 1,text:'父母'},
        {value: 2,text:'祖孙'},
        {value: 3,text:'外祖'},
        {value: 4,text:'其他'}
    ],
    education:[
        {value: 1,text:'博士'},
        {value: 2,text:'硕士'},
        {value: 3,text:'本科'},
        {value: 4,text:'专科'},
        {value: 5,text:'高中'},
        {value: 6,text:'初中'},
        {value: 7,text:'小学'}
    ],
    career:[
        {value: 1,text: '专业人士'},
        {value: 2,text: '服务业人员'},
        {value: 3,text: '自由职业者'},
        {value: 4,text: '工人'},
        {value: 5,text: '公司职员'},
        {value: 6,text: '商人/雇主'},
        {value: 7,text: '公务员'},
        {value: 8,text: '学生'},
        {value: 9,text: '家庭主妇'},
        {value: 10,text: '其他'}
    ],
    init: function(){
        this.initData();
        this.bindEvent();
    },
    initData: function(){
        var self = this;
        self.token = Okay.util.getCookie('mall_token');
        if(!self.token){
            window.location.href = 'login.html';
            return;
        }
    },
    bindEvent: function(){
        var self = this;
        var url,searchStr= location.search

        $('.back').on('tap',function(){
            window.history.back();
        });

        $('#school').on('tap',function(){
            var tempObj = {
                level: {},
                grade: {}
            };
            tempObj.level.value = self.submitObj.level || 1;
            tempObj.level.text = self.showObj.level || '小学';
            tempObj.grade.value = self.submitObj.grade || 3;
            tempObj.grade.text = self.showObj.grade || '一年级';
            new Okay.Select({
                title:'年级',
                content:[
                    {
                        id: 'school-select',
                        select: [
                            {value: 1,text: '小学'},
                            {value: 2,text: '中学'},
                            {value: 3,text: '高中'}
                        ],
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.level.value = opt.value;
                            tempObj.level.text = opt.text;
                            tempObj.grade.value = self.schools[opt.value][0].value;
                            tempObj.grade.text = self.schools[opt.value][0].text;
                            createSelect(self.schools[e.value],'grade-select',function(obj){
                                tempObj.grade.value = obj.value;
                                tempObj.grade.text = obj.text;
                            },tempObj.grade);
                        },
                        selectIndex: self.schoolIds.indexOf(+self.submitObj.level || 1)
                    },
                    {
                        id: 'grade-select',
                        select: self.schools[self.submitObj.level || 1],
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.grade.value = opt.value;
                            tempObj.grade.text = opt.text;
                        },
                        selectIndex: Okay.util.findWhere(self.schools[self.submitObj.level || 1],{value: self.submitObj.grade})
                    }
                ],
                onaccept: function(){
                    self.submitObj.level = tempObj.level.value;
                    self.showObj.level = tempObj.level.text;
                    self.submitObj.grade = tempObj.grade.value;
                    self.showObj.grade = tempObj.grade.text;
                    $('#school').addClass('selected').find('span').html(tempObj.level.text + ' ' + tempObj.grade.text);
                }
            });
        });

        $('#relation').on('tap',function(){
            var tempObj = {};
            tempObj.value = self.submitObj.relation || self.relation[0].value;
            tempObj.text = self.showObj.relation || self.relation[0].text;
            new Okay.Select({
                title:'与学生关系',
                content:[
                    {
                        id: 'relation-select',
                        select: self.relation,
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.value = opt.value;
                            tempObj.text = opt.text;
                        },
                        selectIndex: Okay.util.findWhere(self.relation,{value: self.submitObj.relation})
                    }
                ],
                onaccept: function(){
                    self.submitObj.relation = tempObj.value;
                    self.showObj.relation = tempObj.text;
                    $('#relation').addClass('selected').find('span').html(tempObj.text);
                }
            });
        });

        $('#education').on('tap',function(){
            var tempObj = {};
            tempObj.value = self.submitObj.education || self.education[0].value;
            tempObj.text = self.showObj.education || self.education[0].text;
            new Okay.Select({
                title:'文化程度',
                content:[
                    {
                        id: 'education-select',
                        select: self.education,
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.value = opt.value;
                            tempObj.text = opt.text;
                        },
                        selectIndex: Okay.util.findWhere(self.education,{value: self.submitObj.education})
                    }
                ],
                onaccept: function(){
                    self.submitObj.education = tempObj.value;
                    self.showObj.education = tempObj.text;
                    $('#education').addClass('selected').find('span').html(tempObj.text);
                }
            });
        });

        $('#career').on('tap',function(){
            var tempObj = {};
            tempObj.value = self.submitObj.work || self.career[0].value;
            tempObj.text = self.showObj.career || self.career[0].text;
            new Okay.Select({
                title:'职业',
                content:[
                    {
                        id: 'career-select',
                        select: self.career,
                        onChange:function(e){
                            var opt = e.options[e.selectedIndex];
                            tempObj.value = opt.value;
                            tempObj.text = opt.text;
                        },
                        selectIndex: Okay.util.findWhere(self.career,{value: self.submitObj.work})
                    }
                ],
                onaccept: function(){
                    self.submitObj.work = tempObj.value;
                    self.showObj.career = tempObj.text;
                    $('#career').addClass('selected').find('span').html(tempObj.text);
                }
            });
        });


        $('#area').on('tap',function(){
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

                                clearTimeout(self.timer);

                                if(!initChange){
                                    initChange = true;
                                    return;
                                }

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
                                    });
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
                        $('#area').addClass('selected').find('span').html(tempObj.provice.name + ' ' + tempObj.city.name + ' ' + tempObj.county.name);
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


        function createSelect(opts,id,cb){
            var str = '';
            for (var i = 0,len = opts.length; i < len; i++) {
                str += '<option value=' + opts[i].value + '>' + opts[i].text + '</option>';
            }
            $('#drum_' + id).remove();
            $('#' + id).html(str).drum({
                onChange : function (e) {
                    var opt = e.options[e.selectedIndex];
                    cb({text:opt.text,value: opt.value});
                 }
            });
        }

        $('#sumbit').on('tap',function(){
            var name;
            var obj = {};

            if(!self.submitObj.level){
                Okay.popUp('请选择年级');
                return;
            }

            if((name = $('#name').val()) == ""){
                Okay.popUp('请输入家长姓名');
                return;
            }

            if(!Okay.util.isName(name = $('#name').val())){
                Okay.popUp('家长姓名请输入1-10个汉字');
                return;
            }

            if(!self.submitObj.relation){
                Okay.popUp('请选择与学生关系');
                return;
            }

            if(!self.submitObj.proviceId){
                Okay.popUp('请选择区域');
                return;
            }

            if(!self.submitObj.education){
                Okay.popUp('请选择文化程度');
                return;
            }

            if(!self.submitObj.work){
                Okay.popUp('请选择职业');
                return;
            }

            obj.parentname = name;
            obj.studentSex = $('input[name="student"]:checked').val();
            obj.parentSex = $('input[name="parent"]:checked').val();
            obj.city = self.submitObj.proviceId + ',' + self.submitObj.cityId  + ',' + self.submitObj.countyId;
            obj.related = self.submitObj.relation;
            obj.grade = self.submitObj.grade;
            obj.education = self.submitObj.education;
            obj.work = self.submitObj.work;
            obj["mall_token"] = self.token;

            // $.ajax({
            //     type : "post",
            //     url : Okay.util.URL + "/index.php?m=OkayMall&c=mobileMember&a=setLabel",
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     crossDomain: true,
            //     data: obj,
            //     dataType : "jsonp",
            //     jsonpCallback:"jsonpReturn"
            // }).done(function(data){
            //     if(/200$/.test(data.status)){
            //         if(Okay.util.searchUrl(searchStr).returnURL){
            //             url = Okay.util.searchUrl(searchStr).returnURL + Okay.util.splitUrl(searchStr);
            //         }else{
            //             url = 'index.html';
            //         }
            //         window.location.href = url;
            //     }else{
            //         Okay.popUp(data.msg);
            //     }
            // }).fail(function(xhr,error){
            //     Okay.popUp(error);
            // });

            Okay.Ajax('post','/index.php?m=OkayMall&c=mobileMember&a=setLabel',obj).done(function(data){
                var url;
                Okay.popUp('提交成功，恭喜您成为OKAY会员');
                setTimeout(function(){
                    if(Okay.util.searchUrl(searchStr).returnURL){
                        url = Okay.util.searchUrl(searchStr).returnURL + Okay.util.splitUrl(searchStr);
                    }else{
                        url = 'index.html';
                    }
                    window.location.href = url;
                },200);
            });

            function checkRequired(condition,errorMsg){
                if(!condition){
                    Okay.popUp(errorMsg);
                    return false;
                }
                return true;
            }


        });

    }
}
