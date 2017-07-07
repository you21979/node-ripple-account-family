# node-ripple-account-family

[![Build Status](https://secure.travis-ci.org/you21979/node-ripple-account-family.png?branch=master)](https://travis-ci.org/you21979/node-ripple-account-family)
[![Coverage Status](https://coveralls.io/repos/github/you21979/node-ripple-account-family/badge.svg?branch=master)](https://coveralls.io/github/you21979/node-ripple-account-family?branch=master)

* https://wiki.ripple.com/Account_Family


## install

```
npm i ripple-account-family
```

## usage

```
const RootWallet = require("ripple-account-family").RootWallet
const ColdWallet = require("ripple-account-family").ColdWallet

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const rw = new RootWallet(seed)
const publicGen = rw.getPublicGenerator()
const cw = new ColdWallet(publicGen)

const f = (n) => [rw.derive(n).getAddress(), cw.getAddress(n)]
const list = Array(5).fill(0).map((v,i)=> f(i))
console.log(JSON.stringify(list, null, 2))

console.log(rw.derive(0).getInfo())
console.log(rw.derive(1).getInfo())
```

## transaction sign ?

see https://github.com/you21979/node-ripple-sign-keypairs/

## original library

this library base on ripple-keypairs

* https://github.com/ripple/ripple-keypairs

