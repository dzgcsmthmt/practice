var startTime = Date.now(), prevTime = startTime;
var ms = 0, msMin = Infinity, msMax = 0;
var fps = 0, fpsMin = Infinity, fpsMax = 0;
var frames = 0, mode = 0;

var fps = {
    begin: function () {

        startTime = Date.now();

    },

    end: function () {

        var time = Date.now();

        ms = time - startTime;
        msMin = Math.min( msMin, ms );
        msMax = Math.max( msMax, ms );

        msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
        updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

        frames ++;

        //原理 统一1秒钟运行了多少帧
        if ( time > prevTime + 1000 ) {
            console.log(frames,time,prevTime);
            fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
            fpsMin = Math.min( fpsMin, fps );
            fpsMax = Math.max( fpsMax, fps );

            fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
            updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

            prevTime = time;
            frames = 0;

        }

        return time;

    }
}

var update = function() {
    stats.begin();
    stats.end();
    requestAnimationFrame(update);
};

requestAnimationFrame(update);