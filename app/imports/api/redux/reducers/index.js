import {
  createCollectionReducers,
  createValueReducer,
} from 'meteor/ssrwpo:ssr';

import { reducer as formReducer } from 'redux-form';

import menu from './menu';
import scrollPrevented from './scroll';
import lightbox from './lightbox';

const collectionReducers = createCollectionReducers([]);

const areGlobalStoresInitialised = createValueReducer('areGlobalStoresInitialised', false);
const logged = createValueReducer('logged', false);
const logging = createValueReducer('logging', false);
const isBillingModalOpen = createValueReducer('isBillingModalOpen', false);
const loginFormError = createValueReducer('loginFormError', false);
const isClientsModalOpen = createValueReducer('isClientsModalOpen', false);

export const serverReducers = {
  ...collectionReducers,
  areGlobalStoresInitialised,
  form: formReducer,
  logged,
  logging,
  isBillingModalOpen,
  loginFormError,
  isClientsModalOpen,
  lightbox,
};

export const clientReducers = {
  menu,
  scrollPrevented,
};

export default {
  ...serverReducers,
  ...clientReducers,
};
