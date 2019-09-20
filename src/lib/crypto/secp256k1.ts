import elliptic from 'elliptic';

const secp256k1 = new elliptic.ec('secp256k1');
export { secp256k1 };