import { createError } from 'apollo-errors';

export const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do this',
});

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this',
});

export const ItemDoesNotExistError = createError('ItemDoesNotExistError', {
  message: 'This item does not exist',
});

export const ItemNameIncorrectError = createError('ItemNameIncorrectError', {
  message: 'You must specify a name of at least one caracter',
});

export const ItemPriceIncorrectError = createError('ItemPriceIncorrectError', {
  message: 'You must specify a price as a number',
});

export const ItemQuantityIncorrectError = createError('ItemQuantityIncorrectError', {
  message: 'You must specify a quantity as a number',
});

export const ItemDiscountIncorrectError = createError('ItemDiscountIncorrectError', {
  message: 'You must specify a discount as a number between 0 and 1',
});
