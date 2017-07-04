const RootWallet = require("..").RootWallet

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const rw = new RootWallet(seed)
console.log(rw.derive(0))
console.log(rw.derive(1))
console.log(rw.derive(2))
