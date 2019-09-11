import { privateKeyToPublicKey } from '../accountfamily';
import { encodeAddress } from '../misc/address';

const convertHexKey = (buffer: Buffer): string => {
  return buffer.toString('hex').toUpperCase();
};

export interface IKeypair {
  privateKey: string;
  publicKey: string;
}

export interface IGetInfo {
  index: number;
  address: string;
  publickey: string;
  privatekey: string;
}

export class Wallet {
  private readonly keyPair: IKeypair;
  private readonly address: string;
  private readonly idx: number;
  constructor(privateKey: Buffer, accountIndex: number) {
    const publicKey = privateKeyToPublicKey(privateKey);
    const prvHex = '00' + convertHexKey(privateKey);
    const pubHex = convertHexKey(publicKey);
    const address = encodeAddress(publicKey);
    this.keyPair = {
      privateKey: prvHex,
      publicKey: pubHex,
    };
    this.address = address;
    this.idx = accountIndex;
  }
  getAccountIndex(): number {
    return this.idx;
  }
  getAddress(): string {
    return this.address;
  }
  getKeyPair(): IKeypair {
    return this.keyPair;
  }
  getKeyPairs(): IKeypair {
    return this.getKeyPair();
  }
  getInfo(): IGetInfo {
    return {
      index: this.idx,
      address: this.address,
      publickey: this.keyPair.publicKey,
      privatekey: this.keyPair.privateKey,
    };
  }
}
