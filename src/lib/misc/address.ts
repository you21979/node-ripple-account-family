import { hash160 } from '../crypto/hash'
const bs58check = require('ripple-bs58check')

export const NetworkParameter = {
  P2PKH: 0x00,
  SECP256K1: 0x21,
}

export interface IDecode {
  type: 'secp256k1' | 'p2pkh'
  version: number
  bytes: Buffer
}

type DecodeBase58Tuple = [number, Buffer]

const publicKeyToAddress = (version: number, publieKey: Buffer): string => {
  const payload = Buffer.allocUnsafe(20 + 1)
  payload.writeUInt8(version, 0)
  const hash = hash160(publieKey)
  hash.copy(payload, 1)
  return bs58check.encode(payload)
}

const entropyToSecret = (version: number, data: Buffer): string => {
  const payload = Buffer.allocUnsafe(16 + 1)
  payload.writeUInt8(version, 0)
  data.copy(payload, 1)
  return bs58check.encode(payload)
}

const decode = (base58text: string): DecodeBase58Tuple => {
  const buff: Buffer = bs58check.decode(base58text)
  const version = buff.readInt8(0)
  const payload = buff.slice(1)
  return [ version, payload ]
}

export const encodeAddress = (publicKey: Buffer): string => {
  return publicKeyToAddress( NetworkParameter.P2PKH, publicKey)
}

export const decodeAddress = (address: string): IDecode => {
  const [ version, bytes ] = decode(address)
  return {
    type: 'p2pkh',
    version,
    bytes,
  }
}

export const decodeSecret = (secret: string): IDecode => {
  const [ version, bytes ] = decode(secret)
  if( version !== NetworkParameter.SECP256K1 ) throw new Error('unknown version: ' + version.toString())
  return {
    type: 'secp256k1',
    version,
    bytes,
  }
}

export const encodeSecret = (entropy: Buffer): string => {
  return entropyToSecret( NetworkParameter.SECP256K1, entropy)
}
