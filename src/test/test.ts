import * as assert from 'assert'
import { RootWallet, ColdWallet } from '..'
import { decodeAddress, encodeAddress, decodeSecret, encodeSecret } from '../lib/misc/address'
import { generateSeed } from '../lib/misc/seed'
const keypair = require('ripple-keypairs')
const codec = require('ripple-address-codec')

describe('test', function () {

  it('misc encode address', ()=>{
    const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex')
    const seed: string = keypair.generateSeed({ entropy })
    const key = keypair.deriveKeypair(seed)
    const ans = keypair.deriveAddress(key.publicKey)
    const res = encodeAddress(Buffer.from(key.publicKey, 'hex'))
    assert.equal(ans, res)
  })

  it('misc decode address', ()=>{
    const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex')
    const seed: string = keypair.generateSeed({ entropy })
    const key = keypair.deriveKeypair(seed)
    const address = keypair.deriveAddress(key.publicKey)
    const res = decodeAddress(address)
    assert.equal(res.type, 'p2pkh')
    assert.equal(res.version, 0x00)
  })

  it('misc decode secret', () => {
    const seed: string = keypair.generateSeed()
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

  it('offical compatible test 1', () => {
    const seed = keypair.generateSeed()
    const key = keypair.deriveKeypair(seed)
    const address = keypair.deriveAddress(key.publicKey)
    const rw = new RootWallet(seed)
    const info = rw.derive(0).getInfo()
    assert.equal(address, info.address)
    assert.equal(key.publicKey, info.publickey)
    assert.equal(key.privateKey, info.privatekey)
  })
  it('offical compatible test 2', () => {
    this.timeout(15000)
    const seed = keypair.generateSeed()
    const rw = new RootWallet(seed)
    for(let i = 0; i<100; ++i){
      const key = keypair.deriveKeypair(seed, { accountIndex : i })
      const address = keypair.deriveAddress(key.publicKey)
      const wallet = rw.derive(i)
      const info = wallet.getInfo()
      assert.equal(address, info.address, [i,seed].join())
      assert.equal(key.publicKey, info.publickey, [i,seed].join())
      assert.equal(key.privateKey, info.privatekey, [i,seed].join())

      const pair = wallet.getKeyPair()
      assert.equal(wallet.getAddress(), address)
      assert.equal(wallet.getAccountIndex(), i)
      assert.equal(pair.publicKey, key.publicKey)
      assert.equal(pair.privateKey, key.privateKey)
    }
  })
  it('publicGenerator test', () => {
    this.timeout(15000)
    const rw = new RootWallet(keypair.generateSeed())
    const cw = new ColdWallet(rw.getPublicGenerator())
    for(let i = 0; i<100; ++i){
      assert.equal(rw.derive(i).getAddress(), cw.getAddress(i))
    }
  })
  it('seed compatible test', ()=> {
    const ans = codec.decodeSeed(generateSeed())
    assert.equal(ans.version, 33)
    assert.equal(ans.type, 'secp256k1')
  })
})
