function checkRandom(N,n,m){
    var arr = new Array(n);
    var count = new Array(n).fill(0);
    reset(arr,n,m);
    for(var i = 0; i < N;i++){
        shuffle(arr,n);
        for(var j = 0;j < n;j++){
            count[j] += arr[j];
        }
        reset(arr,n,m);
    }
    for(var j = 0;j < n;j++){
        console.log(count[j] / N);
    }
}

function randomSort(N,n){
    var arr = new Array(n);
    var count = new Array(n).fill(0);
    reset2(arr,n)
    for(var i = 0; i < N;i++){
        shuffle(arr,n);
        for(var j = 0;j < n;j++){
            if(arr[j] == j){
                count[j] += 1;
            }
        }
        reset2(arr,n);
    }  
    for(var j = 0;j < n;j++){
        console.log(count[j] / N);
    }
}

function reset(data,n,m){
    for(var i = 0;i < m;i++){
        data[i] = 1;
    }

    for(var i = m;i < n;i++){
        data[i] = 0;
    }
}

function reset2(arr,n){
    for(var i = 0;i < n;i++){
        arr[i] = i;
    }
}

function shuffle2(arr){
    arr.sort(function(a,b){return Math.random() > 0.5 ? 1 : -1});
}

function shuffle(arr,n){
    /*for(var i = 0;i < n;i++){
        var a = (Math.random() * n) >> 0;
        var b = (Math.random() * n) >> 0;
        swap(arr,a,b);
    }*/
    
    for(var i = n - 1;i >= 0;i-- ){
        var b = (Math.random() * (i + 1)) >> 0;
        swap(arr,i,b);
    }
    

}

function swap(arr,i,j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//checkRandom(1000000,10,5);
randomSort(1000000,10);