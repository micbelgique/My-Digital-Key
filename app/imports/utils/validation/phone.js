import { parse } from 'libphonenumber-js'

export const checkPhone = value => {
  if(!value) return false;
  const stripped = String(value).trim();
  const parsed = parse(stripped, 'BE');
  return !parsed.country || !parsed.phone ? false : true;
}
