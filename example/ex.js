const addressCodec = require("ripple-address-codec")
const af = require("..").af

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const entropy = addressCodec.decodeSeed(seed)
const privateGenerator = af.createPrivateGenerator(entropy.bytes)
const publicGenerator = af.createPublicGenerator(privateGenerator)
console.log(privateGenerator.toString('hex'))
console.log(publicGenerator.toString('hex'))

const privatekey = af.derivePrivateKey(privateGenerator, 0)
const publickey1 = af.privateKeyToPublicKey(privatekey)
const publickey2 = af.derivePublicKey(publicGenerator, 0)

console.log('00' + privatekey.toString('hex').toUpperCase())
console.log(publickey1.toString('hex').toUpperCase())
console.log(publickey2.toString('hex').toUpperCase())

var createHash = require('create-hash')
function sha256 (buffer) {
  return createHash('sha256').update(buffer).digest()
}
function ripemd160 (buffer) {
  return createHash('rmd160').update(buffer).digest()
}

function hash160 (buffer) {
  return ripemd160(sha256(buffer))
}

const address = addressCodec.encodeAccountID(hash160(publickey1))
console.log(address)
