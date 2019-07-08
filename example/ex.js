const raf = require('..')

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const entropy = raf.address.decodeSecret(seed)
const privateGenerator = raf.af.createPrivateGenerator(entropy.bytes)
const publicGenerator = raf.af.createPublicGenerator(privateGenerator)
console.log(privateGenerator.toString('hex'))
console.log(publicGenerator.toString('hex'))

const privatekey = raf.af.derivePrivateKey(privateGenerator, 0)
const publickey1 = raf.af.privateKeyToPublicKey(privatekey)
const publickey2 = raf.af.derivePublicKey(publicGenerator, 0)

console.log('00' + privatekey.toString('hex').toUpperCase())
console.log(publickey1.toString('hex').toUpperCase())
console.log(publickey2.toString('hex').toUpperCase())

const address = raf.address.encodeAddress(publickey1)
console.log(address)
