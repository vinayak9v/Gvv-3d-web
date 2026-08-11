// Generates the value for ADMIN_PASSWORD_HASH.
// Usage: node scripts/hash-admin-password.mjs "your-chosen-password"

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs <password>");
  process.exit(1);
}

const PBKDF2_ITERATIONS = 100_000;

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const saltBytes = crypto.getRandomValues(new Uint8Array(16));
const saltHex = toHex(saltBytes);

const enc = new TextEncoder();
const keyMaterial = await crypto.subtle.importKey(
  "raw",
  enc.encode(password),
  "PBKDF2",
  false,
  ["deriveBits"]
);
const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
  keyMaterial,
  256
);

console.log(`${saltHex}:${toHex(bits)}`);
