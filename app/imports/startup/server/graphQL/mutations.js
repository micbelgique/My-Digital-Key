import { isAuthenticatedResolver } from './baseResolvers';
import { createInvoice, createClient, createInvoiceItem, updateNotes } from './setters';

export const createInvoiceResolver = isAuthenticatedResolver.createResolver(createInvoice);

export const createClientResolver = isAuthenticatedResolver.createResolver(createClient);

export const createInvoiceItemResolver = isAuthenticatedResolver.createResolver(createInvoiceItem);

export const updateNotesResolver = isAuthenticatedResolver.createResolver(updateNotes);
