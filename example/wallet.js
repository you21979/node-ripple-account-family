const RootWallet = require("..").RootWallet
const ColdWallet = require("..").ColdWallet

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const rw = new RootWallet(seed)
const publicGen = rw.getPublicGenerator()
const cw = new ColdWallet(publicGen)

const f = (n) => [rw.derive(n).getAddress(), cw.getAddress(n)]
const list = Array(5).fill(0).map((v,i)=> f(i))
console.log(JSON.stringify(list, null, 2))

console.log(rw.derive(0).getInfo())
console.log(rw.derive(1).getInfo())

