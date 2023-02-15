import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const FIXED_SALT = 'my_fixed_salt_value';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS, FIXED_SALT);
  return await bcrypt.hash(password, salt);
}