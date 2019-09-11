import { RootWallet, ColdWallet } from '..';
import {
  decodeAddress,
  encodeAddress,
  decodeSecret,
  encodeSecret,
} from '../misc/address';
import { generateSeed } from '../misc/seed';
import * as codec from 'ripple-address-codec';
interface IRippleKeypair {
  generateSeed: (opts?: any) => string;
  deriveKeypair: (
    seed: string,
    opts?: any,
  ) => { publicKey: string; privateKey: string };
  deriveAddress: (publicKey: string) => string;
}
const keypair = require('ripple-keypairs') as IRippleKeypair;

describe('test', function() {
  const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex');

  it('misc encode address', () => {
    const seed = keypair.generateSeed({ entropy });
    const key = keypair.deriveKeypair(seed);
    const ans = keypair.deriveAddress(key.publicKey);
    const res = encodeAddress(Buffer.from(key.publicKey, 'hex'));
    expect(res).toBe(ans);
  });
  it('misc decode address', () => {
    const seed = keypair.generateSeed({ entropy });
    const key = keypair.deriveKeypair(seed);
    const address = keypair.deriveAddress(key.publicKey);
    const res = decodeAddress(address);
    expect(res.type).toBe('p2pkh');
    expect(res.version).toBe(0x00);
  });

  it('misc decode secret', () => {
    const seed = keypair.generateSeed();
    const ans = codec.decodeSeed(seed);
    const res = decodeSecret(seed);
    const check = Buffer.from(ans.bytes);
    expect(res.type).toBe(ans.type);
    expect(res.version).toBe(ans.version[0]);
    expect(check.toString('hex')).toBe(res.bytes.toString('hex'));
  });
  it('misc encode secret', () => {
    const ans = keypair.generateSeed({ entropy });
    const res = encodeSecret(entropy);
    expect(ans).toBe(res);
  });
  it('offical compatible test 1', () => {
    const seed = keypair.generateSeed();
    const key = keypair.deriveKeypair(seed);
    const address = keypair.deriveAddress(key.publicKey);
    const rw = new RootWallet(seed);
    const info = rw.derive(0).getInfo();
    expect(address).toBe(info.address);
    expect(key.publicKey).toBe(info.publickey);
    expect(key.privateKey).toBe(info.privatekey);
  });
  it('offical compatible test 2', () => {
    const seed = keypair.generateSeed();
    const rw = new RootWallet(seed);
    for (let i = 0; i < 5; ++i) {
      const key = keypair.deriveKeypair(seed, { accountIndex: i });
      const address = keypair.deriveAddress(key.publicKey);
      const wallet = rw.derive(i);
      const info = wallet.getInfo();
      expect(address).toBe(info.address);
      expect(key.publicKey).toBe(info.publickey);
      expect(key.privateKey).toBe(info.privatekey);

      const pair = wallet.getKeyPair();
      expect(wallet.getAddress()).toBe(address);
      expect(wallet.getAccountIndex()).toBe(i);
      expect(pair.publicKey).toBe(key.publicKey);
      expect(pair.privateKey).toBe(key.privateKey);
    }
  });
  it('seed compatible test', () => {
    const ans = codec.decodeSeed(generateSeed());
    expect(ans.version[0]).toBe(33);
    expect(ans.type).toBe('secp256k1');
  });
});
