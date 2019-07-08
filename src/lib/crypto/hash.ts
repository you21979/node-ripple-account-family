const createHash = require('create-hash')

export const ripemd160 = (buffer: Buffer): Buffer => {
    return createHash('rmd160').update(buffer).digest()
}

export const sha256 = (buffer: Buffer): Buffer => {
    return createHash('sha256').update(buffer).digest()
}

export const hash160 = (buffer: Buffer): Buffer => {
    return ripemd160(sha256(buffer))
}

