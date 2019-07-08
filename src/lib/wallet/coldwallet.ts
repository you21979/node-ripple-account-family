const addressCodec = require("ripple-address-codec")
import { derivePublicKey } from "../accountfamily"
import { hash160 } from '../crypto/hash'

const publicKeyToAddress = function(publicKey: Buffer): string{
    return addressCodec.encodeAccountID(hash160(publicKey))
}

export class ColdWallet{
  private publicGenerator: Buffer
  constructor(publicGeneratorHex: string){
    this.publicGenerator = Buffer.from(publicGeneratorHex, 'hex')
  }
  getAddress(accountIndex: number): string{
    return publicKeyToAddress(derivePublicKey(this.publicGenerator, accountIndex))
  }
}

