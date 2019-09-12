import { Sha512 } from './lib/crypto/sha512';
import BN from 'bn.js';

// CKD = child key derivation.
export const CKD = (order: BN, bytes: Buffer, discrim?: number): BN => {
  for (let i = 0; i <= 0xffffffff; i++) {
    const hasher = new Sha512().add(bytes);
    if (discrim !== void 0) {
      hasher.addU32(discrim);
    }
    hasher.addU32(i);
    const key = new BN(hasher.first256());
    if (key.cmpn(0) > 0 && key.cmp(order) < 0) {
      return key;
    }
  }
  throw new Error('bad luck.');
};
