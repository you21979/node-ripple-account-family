import { privateKeyToPublicKey } from "../accountfamily"
import { encodeAddress } from '../misc/address'

const convertHexKey = (buffer: Buffer): string => {
  return buffer.toString('hex').toUpperCase()
}

export interface IKeypair{
  privateKey : string
  publicKey : string
}

export class Wallet{
  private keyPair: IKeypair
  private address: string
  private idx: number
  constructor(privateKey: Buffer, accountIndex: number){
    const publicKey = privateKeyToPublicKey(privateKey)
    const prvHex = '00' + convertHexKey(privateKey)
    const pubHex = convertHexKey(publicKey)
    const address = encodeAddress(publicKey)
    this.keyPair = {
        privateKey : prvHex,
        publicKey : pubHex,
    }
    this.address = address
    this.idx = accountIndex
  }
  getAccountIndex(){
    return this.idx
  }
  getAddress(){
    return this.address
  }
  getKeyPair(){
    return this.keyPair
  }
  getKeyPairs(){
    return this.getKeyPair()
  }
  getInfo(){
    return {
        index : this.idx,
        address : this.address,
        publickey : this.keyPair.publicKey,
        privatekey : this.keyPair.privateKey,
    }
  }
}


