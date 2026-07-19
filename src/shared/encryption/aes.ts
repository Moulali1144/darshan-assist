import CryptoJS from 'crypto-js';

const ENCRYPTION_VERSION = 'v1';
const KEY_SALT = 'DarshanAssist2024_Salt!';

/**
 * Derives an AES encryption key from the user's PIN.
 * Falls back to a device-based key if no PIN is set.
 */
export function deriveKey(pin?: string): string {
  const base = pin ? `${pin}:${KEY_SALT}` : KEY_SALT;
  return CryptoJS.PBKDF2(base, KEY_SALT, {
    keySize: 256 / 32,
    iterations: 10000,
  }).toString();
}

/**
 * Encrypts a string with AES-256.
 * Returns a versioned, base64-encoded cipher string.
 */
export function encrypt(plaintext: string, key: string): string {
  const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
  return `${ENCRYPTION_VERSION}:${ciphertext}`;
}

/**
 * Decrypts an AES-256 encrypted string.
 */
export function decrypt(encryptedText: string, key: string): string {
  // Strip version prefix
  const ciphertext = encryptedText.replace(/^v\d+:/, '');
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Checks if a value looks encrypted (has our version prefix).
 */
export function isEncrypted(value: string): boolean {
  return /^v\d+:/.test(value);
}

/**
 * Encrypts all sensitive fields in a pilgrim profile object.
 */
export function encryptPilgrimFields(
  pilgrim: Record<string, string>,
  sensitiveFields: string[],
  key: string,
): Record<string, string> {
  const result = { ...pilgrim };
  for (const field of sensitiveFields) {
    if (result[field] && !isEncrypted(result[field])) {
      result[field] = encrypt(result[field], key);
    }
  }
  return result;
}

/**
 * Decrypts all sensitive fields in a pilgrim profile object.
 */
export function decryptPilgrimFields(
  pilgrim: Record<string, string>,
  sensitiveFields: string[],
  key: string,
): Record<string, string> {
  const result = { ...pilgrim };
  for (const field of sensitiveFields) {
    if (result[field] && isEncrypted(result[field])) {
      try {
        result[field] = decrypt(result[field], key);
      } catch {
        result[field] = '';
      }
    }
  }
  return result;
}

export const SENSITIVE_PILGRIM_FIELDS = ['idNumber', 'mobile', 'email'];
