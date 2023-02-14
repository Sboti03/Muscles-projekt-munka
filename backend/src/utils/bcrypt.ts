import * as bcrypt from 'bcrypt';
export function encryptData(data: string) {
  return bcrypt.hashSync(data, bcrypt.genSaltSync());
}
export function compareData(data: string, hash: string) {
  return bcrypt.compareSync(data, hash);
}