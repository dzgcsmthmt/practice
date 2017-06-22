(function(okay){

    function Ajax(type,url,data,isLoading){
        if(typeof isLoading == 'undefined' || isLoading){
            $('.loading-overlay').show();
        }
        return $.ajax({
            type : type,
            url : Okay.util.URL + url,
            data: data,
        }).then(function(data){
            $('.loading-overlay').hide();
            if(/200$/.test(data.status)){
                return data;
            }else if(/35201$/.test(data.status)){
                window.location.href = 'login.html';
                return $.Deferred().reject(data);
            }else{
                Okay.popUp(data.msg);
                return $.Deferred().reject(data);
            }
        },function(xhr,error){
            $('.loading-overlay').hide();
            Okay.popUp(error);
        });

    }

    window.Okay = okay || {};
    window.Okay.Ajax = Ajax;
})(window.Okay);
