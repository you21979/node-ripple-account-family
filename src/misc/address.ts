import { hash160 } from '../lib/crypto/hash';
import { encode, decode } from '../lib/bs58check';

export type VersionIdentifyAddress = 'p2pkh';
export type VersionIdentifySecret = 'secp256k1' | 'ed25519';
export type VersionIdentify = VersionIdentifyAddress | VersionIdentifySecret;

export const NetworkParameter = {
  p2pkh: 0x00,
  secp256k1: 0x21,
  ed25519: 0x01e14b,
};

export interface IDecode {
  type: VersionIdentify;
  version: number;
  bytes: Buffer;
}

export const encodeAddress = (publicKey: Buffer): string => {
  const version = NetworkParameter.p2pkh;
  const versionByteSize = 1;
  const payload = hash160(publicKey);
  const address = encode({ version, versionByteSize, payload });
  return address;
};

export const decodeAddress = (address: string): IDecode => {
  const { version, payload } = decode(address, 1);
  if (version !== NetworkParameter.p2pkh) {
    throw new Error('unknown version: ' + version.toString());
  }
  return {
    type: 'p2pkh',
    version,
    bytes: payload,
  };
};

export const decodeSecret = (secret: string): IDecode => {
  const { version, payload } = decode(secret, 1);
  if (version !== NetworkParameter.secp256k1) {
    throw new Error('unknown version: ' + version.toString());
  }
  return {
    type: 'secp256k1',
    version,
    bytes: payload,
  };
};

export const encodeSecret = (entropy: Buffer): string => {
  const version = NetworkParameter.secp256k1;
  const versionByteSize = 1;
  return encode({ version, versionByteSize, payload: entropy });
};
