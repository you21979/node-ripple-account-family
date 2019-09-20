import { hashFunctionTable, IHashSubset } from './hash_function_table';

const numberToU32 = (i: number): number[] => {
  const u32 = [
    (i >>> 24) & 0xff,
    (i >>> 16) & 0xff,
    (i >>> 8) & 0xff,
    i & 0xff,
  ];
  return u32;
};

export class Sha512 {
  private readonly hash: IHashSubset;
  constructor() {
    this.hash = hashFunctionTable.sha512();
  }
  add(bytes: Buffer): Sha512 {
    this.hash.update(bytes);
    return this;
  }
  addU32(i: number): Sha512 {
    this.add(Buffer.from(numberToU32(i)));
    return this;
  }
  finish(): Buffer {
    return this.hash.digest();
  }
  first256(): Buffer {
    return this.finish().slice(0, 32);
  }
}
