import { generateKeyPairSync, privateDecrypt, publicEncrypt } from 'crypto';

// 1. Kulcspár generálása
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 2. Titkosítás (publikus kulccsal)
const message = "Hello, world!";
const encryptedData = publicEncrypt(
  publicKey,
  Buffer.from(message)
);
console.debug("Titkosított üzenet:", encryptedData.toString('base64'));

// 3. Visszafejtés (privát kulccsal)
const decryptedData = privateDecrypt(
  privateKey,
  encryptedData
);
console.debug("Visszafejtett üzenet:", decryptedData.toString());