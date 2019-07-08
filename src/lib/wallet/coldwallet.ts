import { derivePublicKey } from "../accountfamily"
import { encodeAddress } from '../misc/address'

export class ColdWallet{
  private publicGenerator: Buffer
  constructor(publicGeneratorHex: string){
    this.publicGenerator = Buffer.from(publicGeneratorHex, 'hex')
  }
  getAddress(accountIndex: number = 0): string{
    return encodeAddress(derivePublicKey(this.publicGenerator, accountIndex))
  }
}

