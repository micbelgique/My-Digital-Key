import {
  InvoiceItemResolver,
  InvoiceItemsResolver,
  InvoiceElementsResolver,
  ClientsResolver,
  ClientResolver,
  InvoicesResolver,
  AgenciesResolver,
} from './queries';
import {
  createClientResolver,
  createInvoiceResolver,
  createInvoiceItemResolver,
  updateNotesResolver,
} from './mutations';

const resolvers = {
  Query: {
    user(root, args, context) {
      return context.user;
    },
    invoiceItem: InvoiceItemResolver,
    invoiceItems: InvoiceItemsResolver,
    invoiceElements: InvoiceElementsResolver,
    clients: ClientsResolver,
    client: ClientResolver,
    invoices: InvoicesResolver,
    agencies: AgenciesResolver,
  },
  Mutation: {
    createClient: createClientResolver,
    createInvoice: createInvoiceResolver,
    createInvoiceItem: createInvoiceItemResolver,
    updateNotes: updateNotesResolver,
  },
};

export default resolvers;
