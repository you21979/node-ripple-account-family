import { createHash, Hash } from 'crypto'
import BN from 'bn.js'

export class Sha512{
  private hash: Hash
  constructor(){
    this.hash = createHash('sha512');
  }
  add(bytes: number[] | Buffer): Sha512{
    if(bytes instanceof Array){
        bytes = Buffer.from(bytes)
    }
    this.hash.update(bytes);
    return this;
  }
  addU32(i: number): Sha512{
    const u32 = [i >>> 24 & 0xFF, i >>> 16 & 0xFF, i >>> 8 & 0xFF, i & 0xFF]
    this.add(u32);
    return this;
  }
  finish(): Buffer{
    return this.hash.digest();
  }
  first256(): Buffer{
    return this.finish().slice(0, 32);
  }
  first256BN(): BN{
    return new BN(this.first256())
  }
}




