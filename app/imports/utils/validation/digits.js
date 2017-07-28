export const checkDigits = value => !value || !/^\d+$/.test(value) ? false : true;

export const checkDigitsAndSpaces = value => !value || !/^[\d ]*$/.test(value) ? false : true;
