/* eslint-disable no-inline-comments */

// 1) Kulcsgenerálás (RSA-OAEP)

// RSA-OAEP kulcspár (public/private)
export async function generateRsaKeyPair() {
  return crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true, // extractable (demohoz oké; élesben gyakran false)
    ["encrypt", "decrypt"]
  );
}

// 2) Titkosítás (AES-GCM + RSA-OAEP)

export type EncryptedPackage = {
  encKey: ArrayBuffer; // RSA-val titkosított AES-kulcs
  iv: ArrayBuffer;     // AES-GCM IV (nonce)
  ciphertext: ArrayBuffer;
};

export async function encrypt(publicKey: CryptoKey, plaintext: Uint8Array): Promise<EncryptedPackage> {
  // 1) Véletlen AES kulcs
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // 2) Üzenet titkosítása AES-GCM-mel
  // eslint-disable-next-line no-magic-numbers
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 byte ajánlott GCM-hez
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    plaintext
  );

  // 3) AES kulcs export + RSA-OAEP-pel titkosítás
  const rawAes = await crypto.subtle.exportKey("raw", aesKey);
  const encKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAes
  );

  return { encKey, iv: iv.buffer, ciphertext };
}

// 3) Visszafejtés

export async function decrypt(privateKey: CryptoKey, pkg: EncryptedPackage): Promise<Uint8Array> {
  // 1) AES kulcs visszafejtése RSA privát kulccsal
  const rawAes = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    pkg.encKey
  );

  const aesKey = await crypto.subtle.importKey(
    "raw",
    rawAes,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // 2) Üzenet visszafejtése AES-GCM-mel
  const plaintextBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(pkg.iv) },
    aesKey,
    pkg.ciphertext
  );

  return new Uint8Array(plaintextBuf);
}


// 4) Gyors teszt
const enc = new TextEncoder();
const dec = new TextDecoder();

const { publicKey, privateKey } = await generateRsaKeyPair();

const msg = enc.encode("titkos uzenet");
const pkg = await encrypt(publicKey, msg);
const out = await decrypt(privateKey, pkg);

console.log(dec.decode(out));