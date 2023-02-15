import { createHash } from 'crypto';

export function hashPassword(password) {
  const hash = createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}