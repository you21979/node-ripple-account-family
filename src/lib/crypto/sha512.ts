import { createHash, Hash } from 'crypto';

export class Sha512 {
  private readonly hash: Hash;
  constructor() {
    this.hash = createHash('sha512');
  }
  add(bytes: Buffer): Sha512 {
    this.hash.update(bytes);
    return this;
  }
  addU32(i: number): Sha512 {
    const u32 = [
      (i >>> 24) & 0xff,
      (i >>> 16) & 0xff,
      (i >>> 8) & 0xff,
      i & 0xff,
    ];
    this.add(Buffer.from(u32));
    return this;
  }
  finish(): Buffer {
    return this.hash.digest();
  }
  first256(): Buffer {
    return this.finish().slice(0, 32);
  }
}
