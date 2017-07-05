var assert = require('assert')
var keypair = require('ripple-keypairs')
var raf = require('..')

describe('test', function () {
    it('offical compatible test 1', function () {
        var seed = keypair.generateSeed()
        var key = keypair.deriveKeypair(seed)
        var address = keypair.deriveAddress(key.publicKey)
        var rw = new raf.RootWallet(seed)
        var info = rw.derive(0).getInfo()
        assert.equal(address, info.address)
        assert.equal(key.publicKey, info.publickey)
        assert.equal(key.privateKey, info.privatekey)
    })
    it('offical compatible test 2', function () {
        this.timeout(15000)
        var seed = keypair.generateSeed()
        var rw = new raf.RootWallet(seed)
        for(var i = 0; i<100; ++i){
            var key = keypair.deriveKeypair(seed, { accountIndex : i })
            var address = keypair.deriveAddress(key.publicKey)
            var info = rw.derive(i).getInfo()
            assert.equal(address, info.address, [i,seed].join())
            assert.equal(key.publicKey, info.publickey, [i,seed].join())
            assert.equal(key.privateKey, info.privatekey, [i,seed].join())
        }
    })
    it('publicGenerator test', function () {
        this.timeout(15000)
        var rw = new raf.RootWallet(keypair.generateSeed())
        var cw = new raf.ColdWallet(rw.getPublicGenerator())
        for(var i = 0; i<100; ++i){
            assert.equal(rw.derive(i).getAddress(), cw.getAddress(i))
        }
    })
})
