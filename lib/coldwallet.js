var addressCodec = require("ripple-address-codec")
var af = require("./accountfamily")
var hash = require("./hash")

var publicKeyToAddress = function(publicKey){
    return addressCodec.encodeAccountID(hash.hash160(publicKey))
}

var ColdWallet = function(publicGeneratorHex){
    this.publicGenerator = new Buffer(publicGeneratorHex, 'hex')
}

ColdWallet.prototype.getAddress = function(accountIndex){
    return publicKeyToAddress(af.derivePublicKey(this.publicGenerator, accountIndex))
}

module.exports = ColdWallet
