// TypeScript implementáció (egyszerű, oktató jellegű)
// XOR alapfüggvény

function xorEncrypt(text: string, key: string): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textCharCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(textCharCode ^ keyCharCode);
  }

  return result;
}


// Kétkulcsos titkosítás

function encrypt(text: string, key1: string, key2: string): string {
  const step1 = xorEncrypt(text, key1);
  const step2 = xorEncrypt(step1, key2);
  return step2;
}

// Kétkulcsos visszafejtés

function decrypt(cipher: string, key1: string, key2: string): string {
  const step1 = xorEncrypt(cipher, key2);
  const step2 = xorEncrypt(step1, key1);
  return step2;
}

// Használati példa

const message = "Szia Péter!";
const key1 = "alma";
const key2 = "körte";

const encrypted = encrypt(message, key1, key2);
const decrypted = decrypt(encrypted, key1, key2);

console.debug("Titkosítva:", encrypted);
console.debug("Visszafejtve:", decrypted);