import * as assert from 'assert'
import { RootWallet, ColdWallet } from '..'
import { decodeSecret, encodeSecret } from '../lib/misc/address'
const keypair = require('ripple-keypairs')
const codec = require('ripple-address-codec')

describe('test', function () {

  it('misc decode secret', () => {
    const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex')
    const seed: string = keypair.generateSeed(entropy)
    const ans = codec.decodeSeed(seed)
    const res = decodeSecret(seed)
    const check = Buffer.from(ans.bytes)
    assert.equal(ans.type, res.type)
    assert.equal(ans.version, res.version)
    assert.equal(check.toString('hex'), res.bytes.toString('hex'))
  })

  it('misc encode secret', () => {
    const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex')
    const ans: string = keypair.generateSeed({ entropy })
    const res = encodeSecret(entropy)
    assert.equal(ans, res)
  })

  it('offical compatible test 1', function () {
    const seed = keypair.generateSeed()
    const key = keypair.deriveKeypair(seed)
    const address = keypair.deriveAddress(key.publicKey)
    const rw = new RootWallet(seed)
    const info = rw.derive(0).getInfo()
    assert.equal(address, info.address)
    assert.equal(key.publicKey, info.publickey)
    assert.equal(key.privateKey, info.privatekey)
  })
  it('offical compatible test 2', function () {
    this.timeout(15000)
    const seed = keypair.generateSeed()
    const rw = new RootWallet(seed)
    for(let i = 0; i<100; ++i){
      const key = keypair.deriveKeypair(seed, { accountIndex : i })
      const address = keypair.deriveAddress(key.publicKey)
      const info = rw.derive(i).getInfo()
      assert.equal(address, info.address, [i,seed].join())
      assert.equal(key.publicKey, info.publickey, [i,seed].join())
      assert.equal(key.privateKey, info.privatekey, [i,seed].join())
    }
  })
  it('publicGenerator test', function () {
    this.timeout(15000)
    const rw = new RootWallet(keypair.generateSeed())
    const cw = new ColdWallet(rw.getPublicGenerator())
    for(let i = 0; i<100; ++i){
      assert.equal(rw.derive(i).getAddress(), cw.getAddress(i))
    }
  })
})
