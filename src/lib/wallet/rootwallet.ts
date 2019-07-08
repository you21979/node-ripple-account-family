const addressCodec = require("ripple-address-codec")
import { derivePrivateKey, createPrivateGenerator, createPublicGenerator } from "../accountfamily"
import { Wallet } from './wallet'

export class RootWallet {
  private privateGenerator: Buffer
  constructor(seed: string){
    const entropy: { bytes: Buffer } = addressCodec.decodeSeed(seed)
    this.privateGenerator = createPrivateGenerator(entropy.bytes)
  }
  derive(accountIndex: number): Wallet{
    return new Wallet(derivePrivateKey(this.privateGenerator, accountIndex), accountIndex)
  }
  getPublicGenerator(): string{
    return createPublicGenerator(this.privateGenerator).toString('hex')
  }
}

