interface IBS58Check {
  encode: (buffer: Buffer) => string;
  decode: (address: string) => Buffer;
}

const bs58check = require('ripple-bs58check') as IBS58Check;

export interface IBase58CheckData {
  versionByteSize: number;
  version: number;
  payload: Buffer;
}

export const encode = (data: IBase58CheckData): string => {
  const buffer = Buffer.allocUnsafe(data.versionByteSize + data.payload.length);
  writeInt(buffer, data.versionByteSize, data.version);
  data.payload.copy(buffer, 1);
  return bs58check.encode(buffer);
};

export const decode = (
  address: string,
  versionByteSize: 1 | 2 = 1,
): IBase58CheckData => {
  const dec = bs58check.decode(address);
  const versionBuffer = dec.slice(0, versionByteSize);
  const payload = dec.slice(versionByteSize);
  const version = readInt(versionBuffer, versionByteSize);
  return {
    versionByteSize,
    version,
    payload,
  };
};

const readInt = (buffer: Buffer, size: number): number => {
  if (size === 1) {
    return buffer.readUInt8(0);
  } else if (size === 2) {
    return buffer.readUInt16BE(0);
  } else {
    throw new Error('dont support byte size');
  }
};

const writeInt = (buffer: Buffer, size: number, value: number): number => {
  if (size === 1) {
    return buffer.writeUInt8(value, 0);
  } else if (size === 2) {
    return buffer.writeUInt16BE(value, 0);
  } else {
    throw new Error('dont support byte size');
  }
};
