var timer;
var data = {
    1: [
        {title: '整数',children:[{title:'5的认识',id:12},{title:'6sdd',id:13},{title:'643',id:13}]},
        {title: '小数',children:[{title:'98.2',id:16},{title:'12.2',id:19},{title:'阿123',id:20},{title:'132.2',id:13}]},
        {title: '公约数',children:[{title:'522',id:12},{title:'2d',id:22},{title:'6dd',id:23}]}
    ],
    2: [
        {title: '一元一次',children:[{title:'3x',id:12},{title:'x+y',id:13},{title:'xy',id:13}]},
        {title: '两元一次',children:[{title:'fx()',id:16},{title:'x2+y2',id:19},{title:'xy2',id:20},{title:'132.2',id:13}]}
    ],
    3: [
        {title: '二进制',children:[{title:'11',id:12},{title:'100',id:13},{title:'1010',id:13}]},
        {title: '八进制',children:[{title:'777',id:16},{title:'666',id:19},{title:'555',id:20},{title:'444',id:13}]},
        {title: '十六禁止',children:[{title:'#333',id:12}]}
    ],
    4: [
        {title: '高等数学',children:[{title:'求导',id:16},{title:'莱布尼茨',id:19},{title:'最大值',id:20},{title:'高阶函数',id:13}]}
    ]
}
$('.knowledge-title').on('click',function(){
    $(this).parent().toggleClass('expand').siblings().toggleClass('expand');
})

$('.knowledge-tab').on('click',function(){
    var index = $(this).index();
    var oContent = $(this).parents('.knowledges').find('.knowledge-tab-content-wrapper');
    $(this).addClass('active').siblings().removeClass('active');
    oContent.children().hide().eq(index).show();
})

$('.knowledge-list').on('mouseleave',function(){
    // timer = setTimeout(function() {
        $(this).find('.knowledge-sub-list-wrapper').hide();
    // },50);
})
$('.knowledge-item').on('mouseover',function(){
    var index = this.getAttribute('knowledgeId');
    var html = createHtml(data[index]);
    $(this).nextAll('.knowledge-sub-list-wrapper').html(html).show();
});

function createHtml(data){
    var obj, str = '<ul class="knowledge-sub-list clearfix">';
    for (var i = 0; i < data.length; i++) {
        obj = data[i];
        str += '<li class="clearfix">';
        str += '<div class="fl knowledge-sub-title">' + obj.title + '</div>';
        str += '<div class="fl knowledge-sub-items"><ul>';
        for (var j = 0; j < obj.children.length; j++) {
            str += '<li class="fl knowledge-sub-item">' + obj.children[j].title + '</li>';
        }
        str += '</ul></div></li>'
    }
    str += '</ul>';
    return str;
}

// $('.children').on('mouseenter',function(){
    // clearTimeout(timer);
// });
