import { createHash } from "crypto";

// Takes in plain text and hash using SHA256
export function hashPassword(password) {
  const hash = createHash("sha256"); // built in method
  hash.update(password);
  return hash.digest("hex"); // outputs hex hash format
}