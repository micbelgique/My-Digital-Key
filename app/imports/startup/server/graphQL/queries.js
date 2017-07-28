import { isAuthenticatedResolver } from './baseResolvers';
import { getInvoiceItemById, getClients, getClient, getInvoiceItems, getInvoiceElements, getInvoices, getAgencies } from './getters';

export const ClientsResolver = isAuthenticatedResolver.createResolver(getClients);

export const ClientResolver = isAuthenticatedResolver.createResolver(getClient);

export const InvoiceItemsResolver = isAuthenticatedResolver.createResolver(getInvoiceItems);

export const InvoiceElementsResolver = isAuthenticatedResolver.createResolver(getInvoiceElements);

export const InvoicesResolver = isAuthenticatedResolver.createResolver(getInvoices);

export const InvoiceItemResolver = isAuthenticatedResolver.createResolver(
  (_, { id }) => getInvoiceItemById(id).then(i => i.get()),
);

export const AgenciesResolver = isAuthenticatedResolver.createResolver(getAgencies);
