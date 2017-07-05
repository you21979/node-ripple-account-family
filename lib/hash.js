var createHash = require('create-hash')

var ripemd160 = exports.ripemd160 = function(buffer) {
    return createHash('rmd160').update(buffer).digest()
}

var sha256 = exports.sha256 = function(buffer) {
    return createHash('sha256').update(buffer).digest()
}

var hash160 = exports.hash160 = function(buffer) {
    return ripemd160(sha256(buffer))
}

