const randomBytes = require('randombytes');

export const generateEntropy = (bytesize: number = 16): Buffer => {
  const entropy: Buffer = randomBytes(bytesize)
  return entropy
}
