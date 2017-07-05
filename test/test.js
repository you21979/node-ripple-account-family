var assert = require('assert')
var keypair = require('ripple-keypairs')
var raf = require('..')

describe('test', function () {
    it('offical compatible test', function () {
        var seed = keypair.generateSeed()
        var key = keypair.deriveKeypair(seed)
        var address = keypair.deriveAddress(key.publicKey)
        var rw = new raf.RootWallet(seed)
        var info = rw.derive(0).getInfo()
        assert.equal(address, info.address)
        assert.equal(key.publicKey, info.publickey)
        assert.equal(key.privateKey, info.privatekey)
    })
    it('publicGenerator test', function () {
        var rw = new raf.RootWallet(keypair.generateSeed())
        var cw = new raf.ColdWallet(rw.getPublicGenerator())
        for(var i = 0; i<5; ++i){
            assert.equal(rw.derive(i).getAddress(), cw.getAddress(i))
        }
    })
})
