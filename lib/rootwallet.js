var addressCodec = require("ripple-address-codec")
var af = require("./accountfamily")
var Wallet = require("./wallet")

var RootWallet = function(seed){
    var entropy = addressCodec.decodeSeed(seed)
    this.privateGenerator = af.createPrivateGenerator(entropy.bytes)
}

RootWallet.prototype.derive = function(accountIndex){
    return new Wallet(af.derivePrivateKey(this.privateGenerator, accountIndex), accountIndex)
}

RootWallet.prototype.getPublicGenerator = function(){
    return af.createPublicGenerator(this.privateGenerator).toString('hex')
}

module.exports = RootWallet
