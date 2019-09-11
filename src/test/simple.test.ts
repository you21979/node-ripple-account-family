import { RootWallet, ColdWallet } from '..';
import {
  decodeAddress,
  encodeAddress,
  decodeSecret,
  encodeSecret,
} from '../misc/address';
import { generateSeed } from '../misc/seed';

describe('test', function() {
  it('secret encode test', () => {
    const entropy = Buffer.from('b03a909b81eb1e10db1a2198442109d8', 'hex');
    const secret = encodeSecret(entropy);
    expect(secret).toBe('sn96cD1GTJQUX1rSDc2yTxZoxDMv1');
  });
  it('full wallet test', () => {
    const secret = 'sn96cD1GTJQUX1rSDc2yTxZoxDMv1';
    const rw = new RootWallet(secret);
    const pubGen = rw.getPublicGenerator();
    expect(pubGen).toBe(
      '03bde1944ad917c6275ec5c7fe93808875d01509ba6b3c3890240aeeae66b7ed16',
    );

    const wallet0 = rw.derive(0);
    expect(wallet0.getAccountIndex()).toBe(0);
    expect(wallet0.getKeyPair().publicKey).toBe(
      '03F81D99D0798D0902CC5C9E5A9B99AC7EA78312D3656E2487792FB5B6605EE7A5',
    );
    expect(wallet0.getKeyPair().privateKey).toBe(
      '008C9A4338ACE04D91E3DCCBD0EBDAE11E820B936CE3B417D6B72C8FBCC032557A',
    );
    expect(wallet0.getAddress()).toBe('rHcBWLHFtep5gMqJHTR7oewFUTCzZn3azh');

    const wallet1 = rw.derive(1);
    expect(wallet1.getAccountIndex()).toBe(1);
    expect(wallet1.getKeyPair().publicKey).toBe(
      '028506894B8136338C07A93D588EFD61A71C95EE7B7B5710C3298A4DD6C3D0E5B0',
    );
    expect(wallet1.getKeyPair().privateKey).toBe(
      '004F080A4AC479B21A06AC69D21741DD6906C911645B39792AE5C92AA39296B859',
    );
    expect(wallet1.getAddress()).toBe('rMSPKCxf2AmDuQsYQtPuCX3v9n7mn25jbZ');
  });
  it('public generator', () => {
    const wallet = new ColdWallet(
      '03bde1944ad917c6275ec5c7fe93808875d01509ba6b3c3890240aeeae66b7ed16',
    );
    expect(wallet.getAddress()).toBe('rHcBWLHFtep5gMqJHTR7oewFUTCzZn3azh');
    expect(wallet.getAddress(0)).toBe('rHcBWLHFtep5gMqJHTR7oewFUTCzZn3azh');
    expect(wallet.getAddress(1)).toBe('rMSPKCxf2AmDuQsYQtPuCX3v9n7mn25jbZ');
  });
  it('decode address', () => {
    const dec = decodeAddress('rHcBWLHFtep5gMqJHTR7oewFUTCzZn3azh');
    expect(dec.version).toBe(0x00);
    expect(dec.type).toBe('p2pkh');
  });
  it('decode secret', () => {
    const ent = decodeSecret('sn96cD1GTJQUX1rSDc2yTxZoxDMv1');
    expect(ent.version).toBe(0x21);
    expect(ent.type).toBe('secp256k1');
  });
  it('encode address', () => {
    const address = encodeAddress(
      Buffer.from(
        '03F81D99D0798D0902CC5C9E5A9B99AC7EA78312D3656E2487792FB5B6605EE7A5',
        'hex',
      ),
    );
    expect(address).toBe('rHcBWLHFtep5gMqJHTR7oewFUTCzZn3azh');
  });
  it('publicGenerator test', () => {
    const count = 5;
    const rw = new RootWallet(generateSeed());
    const cw = new ColdWallet(rw.getPublicGenerator());
    [...Array(count)].forEach((_, i) => {
      expect(rw.derive(i).getAddress()).toBe(cw.getAddress(i));
    });
  });
});
