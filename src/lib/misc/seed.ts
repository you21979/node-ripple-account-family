import { generateEntropy } from '../crypto/random'
import { encodeSecret } from './address'

export const generateSeed = (): string => {
  const ent = generateEntropy(16)
  const secret = encodeSecret(ent)
  return secret
}
