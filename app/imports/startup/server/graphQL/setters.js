import { sequelize, Client, Invoice, InvoiceItem, InvoiceElement } from './sqlSchema';
import agenciesColl from '/imports/api/agencies';
import { ItemDoesNotExistError, ItemNameIncorrectError, ItemPriceIncorrectError, ItemQuantityIncorrectError, ItemDiscountIncorrectError } from './errors';
import { getInvoiceItemById } from './getters';

export const createInvoice = async (_, { input: args }) => sequelize.transaction(async (t) => {
  // Getting the client of the invoice we want to create
  const client = await Client.findOne({ where: { id: args.clientId } });
  // Creating a new invoice for the client.
  const invoice = await client.createInvoice({ tva: args.tva }, { transaction: t });
  // Creating elements of the new invoice.
  await Promise.all(args.items.map(async (element) => {
    // If item.itemId is not null, search item in database and add it to invoice
    if (element.itemId) {
      const invoiceItem = await getInvoiceItemById(element.itemId);
      // If item.itemId is not null and it doesn't exist in database, throw an error
      if (!invoiceItem) {
        throw new ItemDoesNotExistError();
      }
      const invoiceItemValues = await invoiceItem.get();
      const invoiceElement = await invoice.createInvoiceElement({
        price: invoiceItemValues.price,
        quantity: element.quantity,
        discount: element.discount,
        total: ((element.quantity * invoiceItemValues.price) * element.discount),
      }, { transaction: t });
      return invoiceElement.setInvoiceItem(invoiceItemValues.id, { transaction: t });
    }
    // Else if item.itemId IS null, check if name, price, quantity and discount are set.
    // Check if name, price, quantity and discount are correctly set, else, throw errors.
    if (typeof (element.name) !== 'string' || element.name.length < 1) throw new ItemNameIncorrectError();
    if (typeof (element.price) !== 'number') throw new ItemPriceIncorrectError();
    if (typeof (element.quantity) !== 'number') throw new ItemQuantityIncorrectError();
    const hasDiscount = !!element.discount;
    if (hasDiscount && (typeof (element.discount) !== 'number' || element.discount <= 0 || element.discount > 1)) throw new ItemDiscountIncorrectError();
    // If everything is fine, create the new item
    const newInvoiceItem = await InvoiceItem.create({
      name: element.name,
      price: element.price,
    }, { transaction: t });
    // Then the new element
    const invoiceElement = await invoice.createInvoiceElement({
      price: element.price,
      quantity: element.quantity,
      discount: element.discount,
      total: ((element.quantity * element.price) * element.discount),
    }, { transaction: t });
    // Link the new item with the element
    return invoiceElement.setInvoiceItem(newInvoiceItem.get().id, { transaction: t });
  }));
  // Now that we inserted the elements inside the invoice, get the raw data of the invoice.
  const invoiceValues = invoice.get();
  // Insert it's elements into it.
  invoiceValues.elements = await invoice.getInvoiceElements();
  // Should trigger a PDF job here.
  return invoiceValues;
});

export const createClient = async (_, { input: args }) => Client.create({
  name: args.name,
  legalForm: args.legalForm,
  manager: args.manager,
  tva: args.tva,
  street: args.street,
  streetNumber: args.streetNumber,
  city: args.city,
  zipcode: args.zipcode,
  phone: args.phone,
  mobilePhone: args.mobilePhone,
  fax: args.fax,
  email: args.email,
}).then(client => client.get());

export const createInvoiceItem = (_, { input: args }) => InvoiceItem.create({
  name: args.name,
  description: args.description,
  price: args.price,
}).then(invoiceItem => invoiceItem.get());

export const updateNotes = (_, { input: args }) => {
  const id = new Mongo.ObjectID(args.id);
  agenciesColl.update(id, { $set: { notes: args.notes } });
  return args;
};
