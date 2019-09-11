const randomBytes = require('randombytes') as (bytesize: number) => Buffer;

export const generateEntropy = (bytesize: number = 16): Buffer => {
  const entropy = randomBytes(bytesize);
  return entropy;
};
