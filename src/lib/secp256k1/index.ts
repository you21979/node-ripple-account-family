import BN from 'bn.js';

const elliptic = require('elliptic');

type BinaryLike = Buffer | string | BN | IPoint;

interface IPoint {
  add: (bytes: BinaryLike) => IPoint;
  mul: (bytes: BinaryLike) => IPoint;
  encodeCompressed(): number[];
  encodeCompressed(enc: 'hex'): string;
}

interface IPublicKey {
  encodeCompressed(): number[];
  encodeCompressed(enc: 'hex'): string;
}

interface IKeyPair {
  getPublic: (compact?: any, enc?: number) => IPublicKey;
}

export interface ISecp256k1 {
  g: IPoint;
  curve: {
    n: BN;
    decodePoint: (bytes: BinaryLike, enc?: string) => IPoint;
  };
  keyFromPrivate: (priv: IKeyPair | Buffer, enc?: number) => IKeyPair;
}

const secp256k1 = new elliptic.ec('secp256k1') as ISecp256k1;
export { secp256k1 };
