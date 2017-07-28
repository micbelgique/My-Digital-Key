export const formatRestrictDigits = value => !value && value !== 0 ? '' : value.replace(/\D/g,'');

export const formatNumber = value => !value && value !== 0 ? '' : parseInt(value).toString().split('').reverse().join('').match(/[\s\S]{1,3}/g).map(group => group.split('').reverse().join('')).reverse().join(' ');

export const formatNumberRestrictDigits = value => !value && value !== 0 ? '' : formatNumber(formatRestrictDigits(value));
