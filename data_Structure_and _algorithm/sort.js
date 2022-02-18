//选择排序
//找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推
function selectionSort(arr){
    var len = arr.length,minIndex;

    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if(arr[i] > arr[j]){
                minIndex = j;
            }
        }
        if(minIndex != i){
            swap(arr,i,minIndex);
        }
    }

}

function swap(arr,i,j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//插入排序
/*插入排序每次排一个数组项， 以此方式构建最后的排序数组。 假定第一项已经排序了， 接着，
它和第二项进行比较，第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排
序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢？） ，以此类推*/
function insertionSort(arr){
    var len = arr.length,j,temp;

    for (var i = 1; i < len; i++) {
        j = i;
        temp = arr[i];
        while(j > 0 && arr[j - 1] > temp){
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }

}

//归并排序
function mergeSort(arr){
    arr = mergeSortRec(arr);
    console.log(arr);
}

function mergeSortRec(arr){
    var len = arr.length;
    if(len == 1){
        return arr;
    }

    var mid = Math.floor(len / 2);
    var left = arr.slice(0,mid);
    var right = arr.slice(mid,len);
    return merge(mergeSortRec(left),mergeSortRec(right));
}

function merge(left,right){
    var result = [],il = 0,ir = 0;
    while(il < left.length && ir < right.length){
        if(left[il] < right[ir]){
            result.push(left[il++]);
        }else{
            result.push(right[ir++]);
        }
    }

    while(il < left.length){
        result.push(left[il++]);
    }

    while(ir < right.length){
        result.push(right[ir++]);
    }

    return result;
}

//快速排序
//stable quick sort need extra space(O(N))

function quickSort(arr) {
    return partition(arr);
}

function partition(arr){
    if(arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = [],right = [];
    for(let i = 1; i < arr.length;i++){
       if(arr[i] < pivot){
           left.push(arr[i]);
       } else{
           right.push(arr[i]);
       }
    }

    return [...partition(left),pivot,...partition(right)];
}

function quickSort(arr){
    quick(arr,0,arr.length - 1);
}

function quick(arr,left,right){
    var index;
    if(arr.length > 1){
        index = partition(arr,left,right);
        if(left < index - 1){
            quick(arr,left,index - 1);
        }
        if(index < right){
            quick(arr,index,right);
        }
    }

}

function partition(arr,left,right){
    var pivot = arr[Math.floor((left + right) / 2)];
    var i = left,j = right;

    while(i <= j){
        while (arr[i] < pivot) {
            i++;
        }

        while (arr[j] > pivot) {
            j--;
        }

        if(i <= j){
            swap(arr,i,j);
            i++;
            j--;
        }
    }
    console.log(i);
    return i;

}
