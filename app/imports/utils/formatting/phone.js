import { asYouType } from 'libphonenumber-js'

export const formatPhone = (value) => {
  if (!value) return value;
  const formatter = new asYouType('BE').input(value);
  return formatter;
}
