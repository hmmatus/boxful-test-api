import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export function encodePassword(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
