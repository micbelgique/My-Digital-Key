import { checkEmpty } from './';
import { checkDigits, checkDigitsAndSpaces } from './';

export const checkEmptyOrDigits = value => checkEmpty(value) ? true : checkDigits(value);
export const checkEmptyOrDigitsAndSpaces = value => checkEmpty(value) ? true : checkDigitsAndSpaces(value);
