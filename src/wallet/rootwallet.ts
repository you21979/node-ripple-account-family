import { decodeSecret } from '../misc/address';
import {
  derivePrivateKey,
  createPrivateGenerator,
  createPublicGenerator,
} from '../accountfamily';
import { Wallet } from './wallet';

export class RootWallet {
  private readonly privateGenerator: Buffer;
  constructor(seed: string) {
    const entropy = decodeSecret(seed);
    this.privateGenerator = createPrivateGenerator(entropy.bytes);
  }
  derive(accountIndex: number = 0): Wallet {
    return new Wallet(
      derivePrivateKey(this.privateGenerator, accountIndex),
      accountIndex,
    );
  }
  getPublicGenerator(): string {
    return createPublicGenerator(this.privateGenerator).toString('hex');
  }
}
