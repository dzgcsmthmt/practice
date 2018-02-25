function loseloseHashTable(key){
    var sum = 0;
    for (var i = 0; i < key.length; i++) {
        sum += key.charCodeAt(i);
    }
    return sum % 37;
}

function djb2HashTable(key){
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
        hash += hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
}
