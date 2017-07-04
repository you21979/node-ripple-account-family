const addressCodec = require("ripple-address-codec")
const af = require("..")

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const entropy = addressCodec.decodeSeed(seed)
const privateGenerator = af.createPrivateGenerator(entropy)
const publicGenerator = af.createPublicGenerator(privateGenerator)
console.log(new Buffer(publicGenerator).toString("hex"))

const privatekey = af.derivePrivateKey(privateGenerator, 0)
const publickey1 = af.privateKeyToPublicKey(privatekey)
const publickey2 = af.derivePublicKey(publicGenerator, 0)

console.log(privatekey)
console.log(publickey1)
console.log(publickey2)

