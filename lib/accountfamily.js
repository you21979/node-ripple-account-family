'use strict';
var elliptic = require('elliptic');
var secp256k1 = elliptic.ec('secp256k1');
var Sha512 = require('./sha512');

function deriveScalar(bytes, discrim) {
  var order = secp256k1.curve.n;
  for (var i = 0; i <= 0xFFFFFFFF; i++) {
    var hasher = new Sha512().add(bytes);
    if (discrim !== undefined) {
      hasher.addU32(discrim);
    }
    hasher.addU32(i);
    var key = hasher.first256BN();
    if (key.cmpn(0) > 0 && key.cmp(order) < 0) {
      return key;
    }
  }
  throw new Error('impossible unicorn ;)');
}

var createPrivateGenerator = function(seed) {
    return deriveScalar(seed)
}

var createPublicGenerator = function(privateGenerator){
    return secp256k1.g.mul(privateGenerator).encodeCompressed()
}

var derivePrivateKey = function(privateGenerator, accountIndex){
    return '00' + deriveScalar(createPublicGenerator(privateGenerator), accountIndex)
        .add(privateGenerator)
        .mod(secp256k1.curve.n)
        .toString('hex');
}

var derivePublicKey = function(publicGenerator, accountIndex){
    var rootPubPoint = secp256k1.curve.decodePoint(publicGenerator);
    var scalar = deriveScalar(publicGenerator, accountIndex);
    var point = secp256k1.g.mul(scalar);
    var offset = rootPubPoint.add(point);
    return toHex(offset.encodeCompressed());
}

var privateKeyToPublicKey = function(privateKey){
    return toHex(secp256k1.keyFromPrivate(privateKey).getPublic().encodeCompressed())
}

var toHex = function(ary){
    return new Buffer(ary).toString("hex")
}

module.exports = {
    createPrivateGenerator : createPrivateGenerator,
    createPublicGenerator : createPublicGenerator,
    derivePrivateKey : derivePrivateKey,
    derivePublicKey : derivePublicKey,
    privateKeyToPublicKey : privateKeyToPublicKey,
}
