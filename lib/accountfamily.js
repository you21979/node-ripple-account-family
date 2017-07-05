'use strict';
var elliptic = require('elliptic');
var secp256k1 = elliptic.ec('secp256k1');
var Sha512 = require('./sha512');
var BigNum = require('bn.js');

function deriveScalar(bytes, discrim) {
  var order = secp256k1.curve.n;
  for (var i = 0; i <= 0xFFFFFFFF; i++) {
    var hasher = new Sha512().add(bytes);
    if (discrim !== void 0) {
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
    return deriveScalar(seed).toBuffer('be', 32)
}

var createPublicGenerator = function(privateGenerator){
    return new Buffer(secp256k1.g.mul(privateGenerator).encodeCompressed())
}

var derivePrivateKey = function(privateGenerator, accountIndex){
    return deriveScalar(createPublicGenerator(privateGenerator), accountIndex)
        .add(new BigNum(privateGenerator))
        .mod(secp256k1.curve.n)
        .toBuffer('be', 32)
}

var derivePublicKey = function(publicGenerator, accountIndex){
    var rootPubPoint = secp256k1.curve.decodePoint(publicGenerator);
    var scalar = deriveScalar(publicGenerator, accountIndex);
    var point = secp256k1.g.mul(scalar);
    var offset = rootPubPoint.add(point);
    return new Buffer(offset.encodeCompressed());
}

var privateKeyToPublicKey = function(privateKey){
    return new Buffer(secp256k1.keyFromPrivate(privateKey).getPublic().encodeCompressed())
}


module.exports = {
    createPrivateGenerator : createPrivateGenerator,
    createPublicGenerator : createPublicGenerator,
    derivePrivateKey : derivePrivateKey,
    derivePublicKey : derivePublicKey,
    privateKeyToPublicKey : privateKeyToPublicKey,
}
