import { hashFunctionTable } from './hash_function_table';

export const ripemd160 = (buffer: Buffer): Buffer => {
  return hashFunctionTable.ripemd160()
    .update(buffer)
    .digest();
};

export const sha256 = (buffer: Buffer): Buffer => {
  return hashFunctionTable.sha256()
    .update(buffer)
    .digest();
};

export const hash160 = (buffer: Buffer): Buffer => {
  return ripemd160(sha256(buffer));
};
