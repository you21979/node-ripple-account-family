import { secp256k1 } from './lib/secp256k1';
import BN from 'bn.js';
import { CKD } from './ckd';

const secp256k1CKD = (bytes: Buffer, discrim?: number): BN => {
  return CKD(secp256k1.curve.n, bytes, discrim);
};

const BNtoBuffer = (bn: BN): Buffer => {
  return bn.toBuffer('be', 32);
};

export const createPrivateGenerator = (seed: Buffer): Buffer => {
  return BNtoBuffer(secp256k1CKD(seed));
};

export const createPublicGenerator = (privateGenerator: Buffer): Buffer => {
  const pubGen = secp256k1.g
    .mul(privateGenerator)
    .encodeCompressed('hex') as string;
  return Buffer.from(pubGen, 'hex');
};

export const derivePrivateKey = (
  privateGenerator: Buffer,
  accountIndex: number,
): Buffer => {
  const privKey = secp256k1CKD(
    createPublicGenerator(privateGenerator),
    accountIndex,
  )
    .add(new BN(privateGenerator))
    .mod(secp256k1.curve.n);
  return BNtoBuffer(privKey);
};

export const derivePublicKey = (
  publicGenerator: Buffer,
  accountIndex: number,
): Buffer => {
  const rootPubPoint = secp256k1.curve.decodePoint(publicGenerator);
  const scalar = secp256k1CKD(publicGenerator, accountIndex);
  const point = secp256k1.g.mul(scalar);
  const offset = rootPubPoint.add(point);
  const pubkey = offset.encodeCompressed('hex') as string;
  return Buffer.from(pubkey, 'hex');
};

export const privateKeyToPublicKey = (privateKey: Buffer): Buffer => {
  const keypair = secp256k1.keyFromPrivate(privateKey);
  const pubkey = keypair.getPublic().encodeCompressed('hex') as string;
  return Buffer.from(pubkey, 'hex');
};
