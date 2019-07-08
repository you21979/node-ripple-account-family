import * as elliptic from 'elliptic';
import { Sha512 } from './crypto/sha512';
import BN from 'bn.js';

const secp256k1 = new elliptic.ec('secp256k1');

export const deriveScalar = (bytes: number[] | Buffer, discrim: number | undefined = undefined): BN => {
  const order: BN = secp256k1.curve.n;
  for (let i = 0; i <= 0xFFFFFFFF; i++) {
    const hasher = new Sha512().add(bytes);
    if (discrim !== void 0) {
        hasher.addU32(discrim);
    }
    hasher.addU32(i);
    const key = hasher.first256BN();
    if (key.cmpn(0) > 0 && key.cmp(order) < 0) {
        return key;
    }
  }
  throw new Error('impossible unicorn ;)');
}

export const createPrivateGenerator = (seed: Buffer): Buffer => {
  return deriveScalar(seed).toBuffer('be', 32)
}

export const createPublicGenerator = (privateGenerator: Buffer): Buffer => {
  return Buffer.from(secp256k1.g.mul(privateGenerator).encodeCompressed())
}

export const derivePrivateKey = (privateGenerator: Buffer, accountIndex: number) => {
  return deriveScalar(createPublicGenerator(privateGenerator), accountIndex)
    .add(new BN(privateGenerator))
    .mod(secp256k1.curve.n)
    .toBuffer('be', 32)
}

export const derivePublicKey = (publicGenerator: Buffer, accountIndex: number): Buffer => {
  const rootPubPoint = secp256k1.curve.decodePoint(publicGenerator);
  const scalar = deriveScalar(publicGenerator, accountIndex);
  const point = secp256k1.g.mul(scalar);
  const offset = rootPubPoint.add(point);
  return Buffer.from(offset.encodeCompressed());
}

export const privateKeyToPublicKey = (privateKey: Buffer): Buffer => {
  const keypair = secp256k1.keyFromPrivate(privateKey)
  const pubkey: any = keypair.getPublic().encodeCompressed('array')
  return Buffer.from(pubkey)
}

