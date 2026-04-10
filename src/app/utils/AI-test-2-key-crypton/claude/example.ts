/* eslint-disable no-console */
/* eslint-disable max-statements */
// ============================================================
// Egyszerű 2 kulcsos (aszimmetrikus) titkosítás TypeScript-ben
// ============================================================

// --- 1. RSA-szerű Mini Implementáció ---

// eslint-disable-next-line no-magic-numbers
const [N0, N1, N2, N53, N61, N65k] = [BigInt(0), BigInt(1), BigInt(2), 53n, 61n, BigInt(65537)];

function modPow(_base: bigint, _exp: bigint, _mod: bigint): bigint {
  let result = N1;
  let [base, exp] = [_base, _exp];
  const mod = _mod
  base %= mod;
  while (exp > N0) {
    if (exp % N2 === N1) {result = (result * base) % mod;}
    exp /= N2;
    base = (base * base) % mod;
  }
  return result;
}

function modInverse(e: bigint, phi: bigint): bigint {
  let [old_r, r] = [e, phi];
  let [old_s, s] = [N1, N0];
  while (r !== N0) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  return ((old_s % phi) + phi) % phi;
}

function generateKeys(p: bigint, q: bigint) {
  const n = p * q;
  const phi = (p - N1) * (q - N1);
  const e = N65k;
  const d = modInverse(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

function encrypt(message: string, publicKey: { e: bigint; n: bigint }): bigint[] {
  return [...message].map((char) => modPow(BigInt(char.charCodeAt(0)), publicKey.e, publicKey.n));
}

function decrypt(ciphertext: bigint[], privateKey: { d: bigint; n: bigint }): string {
  return ciphertext
    .map((c) => String.fromCharCode(Number(modPow(c, privateKey.d, privateKey.n))))
    .join("");
}

// --- 2. Web Crypto API (valós használathoz ajánlott) ---

async function generateRSAKeys(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptWithWebCrypto(message: string, publicKey: CryptoKey): Promise<ArrayBuffer> {
  const encoded = new TextEncoder().encode(message);
  return crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
}

async function decryptWithWebCrypto(ciphertext: ArrayBuffer, privateKey: CryptoKey): Promise<string> {
  const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}


// --- Demo futtatás ---

async function main() {
  console.log("=== Mini RSA (oktatási célra) ===");
  const { publicKey, privateKey } = generateKeys(N61, N53);
  console.log("Nyilvános kulcs:", publicKey);
  console.log("Privát kulcs:   ", privateKey);

  const msg = "Hello";
  const encrypted = encrypt(msg, publicKey);
  const decrypted = decrypt(encrypted, privateKey);

  console.log("Eredeti:     ", msg);
  console.log("Titkosított: ", encrypted.join(", "));
  console.log("Visszafejtve:", decrypted);

  console.log("\n=== Web Crypto API (éles használatra) ===");
  const keyPair = await generateRSAKeys();
  const secret = "Titkos üzenet!";
  const encryptedBuffer = await encryptWithWebCrypto(secret, keyPair.publicKey);
  const decryptedMsg = await decryptWithWebCrypto(encryptedBuffer, keyPair.privateKey);

  console.log("Eredeti: ", secret);
  // eslint-disable-next-line no-magic-numbers
  console.log("Titkosított (bytes):", new Uint8Array(encryptedBuffer).slice(0, 8), "...");
  console.log("Visszafejtve:", decryptedMsg);
}

main();