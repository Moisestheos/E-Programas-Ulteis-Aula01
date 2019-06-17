let utf8Encode = (string) => {
    if (typeof string != 'string') throw new TypeError('Parametro informado não é uma string');
    const utf8String = string.replace(/[\u0080-\u07ff]/g, c => {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
    }).replace(/[\u0800-\uffff]/g, c => {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
    });
    return utf8String;
}

let uTF8Decode = (string) => {
    if (typeof string != 'string') throw new TypeError('Parametro informado não é uma string');
    const decodeString = string.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, (c) => {
        var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
        return String.fromCharCode(cc);
    }
    ).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, (c) => {
        var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
        return String.fromCharCode(cc);
    });
    return decodeString;
}
console.log(utf8Encode('Confirmação'));

console.error(utf8Encode(uTF8Decode('Confirmação')));