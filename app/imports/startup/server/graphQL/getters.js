import agenciesColl from '/imports/api/agencies';
import myFiles from '/imports/api/files';
import { Client, Invoice, InvoiceItem, InvoiceElement } from './sqlSchema';

export const getClients = () => Client.findAll();

export const getClient = (_, { id }) => Client.findOne({ where: { id } });

export const getInvoiceItemFromElement = async (element) => {
  // Getting invoiceItem of invoiceElement
  const invoiceItem = await element.getInvoiceItem();
  return invoiceItem.get();
};

export const getInvoiceElementsFromInvoice = async (invoice) => {
  // Getting the invoiceElements of the current invoice.
  const elements = await invoice.getInvoiceElements();
  return elements.map(element => ({
    ...element.get(),
    invoiceItem: () => getInvoiceItemFromElement(element),
  }));
};

export const getInvoiceElements = async () => InvoiceElement.findAll().map(element => ({
  ...element.get(),
  invoiceItem: () => getInvoiceItemFromElement(element),
}));

export const getInvoices = async () => {
  // Getting all invoices
  const invoicesResults = await Invoice.findAll();
  // Constructing an array of promises that will get the nested values of each invoices
  // (invoiceElements, and the invoiceItems of invoiceElements).
  return invoicesResults.map(invoice => ({
    ...invoice.get(),
    elements: () => getInvoiceElementsFromInvoice(invoice),
  }));
};

export const getInvoiceItems = () => InvoiceItem.findAll();

export const getInvoiceItemById = id => InvoiceItem.findOne({ where: { id } });

export const getAgencies = (root, { offset = 0, limit = 10 }) => {
  const agencies = agenciesColl.find({
    fetched: true, gone: false, noFrench: false,
  }, {
    transform: e => ({
      id: e._id._str, contactInfo: e.agency, properties: e.propertiesInfos, ...e,
    }),
    skip: offset,
    limit,
  }).fetch();

  const agenciesWithScreenshots = agencies.map(agency => ({
    ...agency,
    screenshots: myFiles.find({ 'metadata.url': agency.contactInfo.website }, {
      transform: e => ({
        id: e._id._str,
      }),
    }).fetch(),
  }));

  return agenciesWithScreenshots;
};
