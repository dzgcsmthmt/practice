function processArrayBuffer(arrayBuffer) {
    try {
        console.log(new Uint16Array( arrayBuffer ));
        var dv = new DataView(arrayBuffer);
        var ptr = 2;
        while (true) {
            var lastPtr = ptr;
            ptr++;
            var marker = dv.getUint8(ptr);
            ptr++;
            var len = dv.getUint16(ptr, false);
            ptr += len;
            if (marker === 0xC0) { // SOF0
                console.log(decodeSOF0(dv, lastPtr));
                break;
            }
        }
    } catch (e) {
        console.error(e.message);
    }
}

function decodeSOF0(dv, start) {
    // Example (16x16):
    // FF C0 00 11 08 00 10 00 10 03 01 22 00 02 11 01 03 11 01
    var data = {};
    start += 4; // skip marker 0xFFC0 and segment length 0x0011
    var data = {
        bitsPerColorComponent: dv.getUint8(start), // usually 0x08
        imageHeight: dv.getUint16(start+1, false),
        imageWidth: dv.getUint16(start+3, false),
        numberOfColorComponents: dv.getUint8(start+5),
    };
    return JSON.stringify(data, null, 4);
}

fetch('./1.jpeg')
    .then(res => res.arrayBuffer())
    .then(data => processArrayBuffer(data))


function processArrayBufferPng(arrayBuffer){
    const CHUNKLENGTHBYTES = 4; // chunk 数据长度为4字节
    const TYPEBYTES = 4; // 4字节表示 chunk 类型
    const CRCBYTES = 4; // 4字节 CRC校验
    
    const chunkDataLegth = new DataView(arrayBuffer).getUint32(8); // 8 为8位signature偏移
    
    const IDHRChunkBuffer = arrayBuffer.slice(8, 8 + CHUNKLENGTHBYTES + TYPEBYTES + chunkDataLegth + CRCBYTES); // 8 为8位signature偏移

    const dv = new DataView(IDHRChunkBuffer);
    const width = dv.getUint32(4 + 4); // 4位length + 4位chunk type
    const height = dv.getUint32(4 + 4 + 4); // 4位length + 4位chunk type + 4位width
    var data = {
        imageHeight: height,
        imageWidth: width,
    };
    console.log(JSON.stringify(data, null, 4));
    return data;
}

fetch('./1.png')
    .then(res => res.arrayBuffer())
    .then(data => processArrayBufferPng(data))