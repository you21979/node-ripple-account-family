var addressCodec = require("ripple-address-codec")
var af = require("./accountfamily")
var hash = require("./hash")

var publicKeyToAddress = function(publicKey){
    return addressCodec.encodeAccountID(hash.hash160(publicKey))
}

var convertHexKey = function(buffer){
    return buffer.toString('hex').toUpperCase()
}

var Wallet = function(privateKey, accountIndex){
    var publicKey = af.privateKeyToPublicKey(privateKey)
    var prvHex = '00' + convertHexKey(privateKey)
    var pubHex = convertHexKey(publicKey)
    var address = publicKeyToAddress(publicKey)
    this.keyPairs = {
        privateKey : prvHex,
        publicKey : pubHex,
    }
    this.address = address
    this.idx = accountIndex
}

Wallet.prototype.getAccountIndex = function(){
    return this.idx
}

Wallet.prototype.getAddress = function(){
    return this.address
}

Wallet.prototype.getKeyPairs = function(){
    return this.keyPairs
}

Wallet.prototype.getInfo = function(){
    return {
        index : this.idx,
        address : this.address,
        publickey : this.keyPairs.publicKey,
        privatekey : this.keyPairs.privateKey,
    }
}

module.exports = Wallet
