var addressCodec = require("ripple-address-codec")
var createHash = require('create-hash')
var af = require("./accountfamily")

function ripemd160 (buffer) {
  return createHash('rmd160').update(buffer).digest()
}
function sha256 (buffer) {
  return createHash('sha256').update(buffer).digest()
}
function hash160 (buffer) {
  return ripemd160(sha256(buffer))
}

var Wallet = function(privateKey, accountIndex){
    var prv = '00' + privateKey.toString('hex').toUpperCase()
    var publicKey = af.privateKeyToPublicKey(privateKey)
    var pub = publicKey.toString('hex').toUpperCase()
    var address = addressCodec.encodeAccountID(hash160(publicKey))
    this.keyPairs = {
        privateKey : prv,
        publicKey : pub,
    }
    this.address = address
    this.idx = accountIndex
}

var RootWallet = function(seed){
    var entropy = addressCodec.decodeSeed(seed)
    this.privateGenerator = af.createPrivateGenerator(entropy.bytes)
}

RootWallet.prototype.derive = function(accountIndex){
    return new Wallet(af.derivePrivateKey(this.privateGenerator, accountIndex), accountIndex)
}

module.exports = RootWallet
