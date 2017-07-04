const keypair = require('ripple-keypairs')

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const w = keypair.deriveKeypair(seed)

console.log(w)
console.log(keypair.deriveAddress(w.publicKey))

