import createHash from 'create-hash';

export interface IHashSubset {
  update: (buffer: Buffer) => IHashSubset;
  digest: () => Buffer;
}

export type HashFunction = () => IHashSubset;
export type HashAlgorithm = 'sha256' | 'sha512' | 'ripemd160';

export const hashFunctionTable: { [key in HashAlgorithm]: HashFunction } = {
  sha256: () => createHash('sha256'),
  sha512: () => createHash('sha512'),
  ripemd160: () => createHash('ripemd160'),
};
