export const checkZipcode = value => !value || value.length < 4 || !/^\d+$/.test(value) ? false : true;
