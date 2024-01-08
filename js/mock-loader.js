/**
 * 本地mock数据，对fetch.ts做处理
 **/
module.exports = function (content) {
    const baseurl = 'http://moco.okzhihui.cn/mockjsdata/';
    let mockBase = require('../../mock/config');
    let mock_src = JSON.stringify(mockBase);
    content = `const mock: Imock = ${mock_src};
    interface Imock {
        [key: string]: number;
    }
    ${content}`;
    let script = `if(url !== undefined){
        if ( mock[url] ) {
            url = '${baseurl}'+mock[url]+url
        }
    }
    return url;`;
    content = content.replace('return url;', script);
    content = content.replace('_header=', '_header=mock[url]?{}:');
    return content;
};
