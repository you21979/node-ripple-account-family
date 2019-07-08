# node-ripple-account-family

[![Build Status](https://secure.travis-ci.org/you21979/node-ripple-account-family.png?branch=master)](https://travis-ci.org/you21979/node-ripple-account-family)
[![Coverage Status](https://coveralls.io/repos/github/you21979/node-ripple-account-family/badge.svg?branch=master)](https://coveralls.io/github/you21979/node-ripple-account-family?branch=master)

This software is not guaranteed forever. When using it, please at your own risk.

# warning

Except for index number 0, it is incompatible with ripple ecosystem.
You can not use the ripple ecosystem handling existing ripple secret keys.


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

## transaction sign

* Use the signature function provided with RIPPLE-LIB


```
const RootWallet = require("ripple-account-family").RootWallet
const RippleApi = require('ripple-lib').RippleAPI
const api = new RippleApi();
const options = { signAs: '' };
const txJSON = 'preparePayment output...'

const seed = "ss7vwFuNi2Zud1ekn68LivP2P7UF1"
const rw = new RootWallet(seed)
const keypair = rw.derive(0).getKeyPair()
const signedTx = api.sign(txJSON, void 0, options, keypair)
console.log(signedTx)
```

## generate seed

* This library provides seed creation functions, but use the official generation logic.

```
const generateSeed = require("ripple-account-family").generateSeed
const seed = generateSeed()
console.log(seed)
```

