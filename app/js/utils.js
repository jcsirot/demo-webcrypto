function str2bin(str) {
    return new TextEncoder("utf-8").encode(str);
}

function bin2str(array) {
    return new TextDecoder("utf-8").decode(array);
}

function b64encode(array) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(array)));
}

function b64decode(str) {
    return new Uint8Array(atob(str).split("").map(function(c) {
        return c.charCodeAt(0);
    }));
}
