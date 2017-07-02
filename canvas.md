## 贝塞尔曲线 ##
<pre>
canvas.onmousedown = function(e){
    var startX = e.pageX - canvas.offsetLeft;
    var startY = e.pageY - canvas.offsetTop;
    // ctx.moveTo(startX,startY);
    canvas.onmouseup = function(e){
        var endX = e.pageX - canvas.offsetLeft;
        var endY = e.pageY - canvas.offsetTop;
        // ctx.lineTo(endX,endY);
        // ctx.stroke();
        canvas.onmousemove = function(e){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var bX = e.pageX- canvas.offsetLeft;
            var bY = e.pageY- canvas.offsetTop;
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            console.log(startX+'---------' + startY);
            console.log(endX+'---------' + endY);
            ctx.quadraticCurveTo(bX,bY,endX,endY);
            ctx.stroke();
        }

    }
}
</pre>
***
# 贝塞尔三次曲线求坐标 #
<pre>
<canvas id="canvas" width="500" height="300"></canvas>

<script type="text/javascript">
    var canvas  = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    ctx.moveTo(100,100);
    ctx.bezierCurveTo(200,250,300,0,400,100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(500,150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(175,0);
    ctx.lineTo(175,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400,0);
    ctx.lineTo(400,300);
    ctx.stroke();

    function BezierCubicXY(p0, p1, p2, p3, t) {
        var ret = {};
        var coords = ['x', 'y'];
        var i, k;

        for (i in coords) {
            k = coords[i];
            ret[k] = Math.pow(1 - t, 3) * p0[k] + 3 * Math.pow(1 - t, 2) * t * p1[k] + 3 * (1 - t) * Math.pow(t, 2) * p2[k] + Math.pow(t, 3) * p3[k];
        }

        return ret;
    }

    var obj = BezierCubicXY({x:100,y:100},{x:200,y:250},{x:300,y:0},{x:400,y:100},0.6);
    console.log(obj);

    ctx.beginPath();
    // ctx.moveTo(obj.x,obj.y);
    ctx.arc(obj.x,obj.y,5,0,2*Math.PI);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(obj.x,0);
    ctx.lineTo(obj.x,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,obj.y);
    ctx.lineTo(500,obj.y);
    ctx.stroke();

</script>
</pre>
***
# 添加事件#
<pre>
 function addEvent(ctx,type,data,cb){
    this.ctx = ctx;
    this.type = type;
    this.data = data;
    this.cb = cb;
    this.redraw();
}

addEvent.prototype.redraw = function(){
    var params = this.data.split(',');
    this.ctx.beginPath();
    if(this.type == 'arc'){
        this.ctx.arc(params[0],params[1],params[2],params[3],params[4]);
    }else if(this.type == 'rect'){
        this.ctx.rect(params[0],params[1],params[2],params[3]);
    }
    this.ctx.stroke();
}

addEvent.prototype.isIn = function(x,y){
    if(this.ctx.isPointInPath(x,y)){
        this.cb();
    }
}   
</pre>
