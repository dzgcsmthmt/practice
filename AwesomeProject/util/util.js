export default {
    getUrlParam: function(name, url) {
        if (!name) {
            return null;
        }
        url = url || location.search;
        name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
        var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
        var match = url.match(reg);
        return !match ? null : match[1];
    },
    getUrlParams: function(url){
        url = url.replace(/#.*$/, '');
        var arr = url.split(/[?&]/).slice(1);
        var match,i,urlObj = {};
        for (i = 0; i < arr.length; i++) {
            if (match = arr[i].match(/([^=]+)=([^=]+)/)) {
                urlObj[match[1]] = decodeURIComponent(match[2]);
            }
        }
        return urlObj;
    }

}
