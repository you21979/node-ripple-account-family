import { generateEntropy } from '../lib/crypto/random';
import { encodeSecret } from './address';

const SEED_ENTROPY_SIZE = 16;

export const generateSeed = (): string => {
  const ent = generateEntropy(SEED_ENTROPY_SIZE);
  const secret = encodeSecret(ent);
  return secret;
};
