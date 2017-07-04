'use strict';
var crypto = require('crypto')
var BigNum = require('bn.js');

var Sha512 = function(){
    this.hash = crypto.createHash('sha512');
}
Sha512.prototype.add = function(bytes){
    if(bytes instanceof Array){
        bytes = new Buffer(bytes)
    }
    this.hash.update(bytes);
    return this;
}
Sha512.prototype.addU32 = function(i){
    this.add([i >>> 24 & 0xFF, i >>> 16 & 0xFF, i >>> 8 & 0xFF, i & 0xFF]);
    return this;
}
Sha512.prototype.finish = function(){
    return this.hash.digest();
}
Sha512.prototype.first256 = function(){
    return this.finish().slice(0, 32);
}
Sha512.prototype.first256BN = function(){
    return new BigNum(this.first256());
}

module.exports = Sha512
