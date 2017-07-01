<p><code>
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
</code></p>
