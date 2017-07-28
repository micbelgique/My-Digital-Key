import Sequelize from 'sequelize';

export const sequelize = new Sequelize('shovel', 'root', 'graphql', {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
});

export const Client = sequelize.define('client', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name: { type: Sequelize.STRING },
  legalForm: { type: Sequelize.STRING },
  manager: { type: Sequelize.STRING },
  tva: { type: Sequelize.STRING },
  street: { type: Sequelize.STRING },
  streetNumber: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  zipcode: { type: Sequelize.INTEGER },
  phone: { type: Sequelize.STRING },
  mobilePhone: { type: Sequelize.STRING },
  fax: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
});

export const Invoice = sequelize.define('invoice', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  tva: { type: Sequelize.FLOAT },
});

export const InvoiceItem = sequelize.define('invoiceItem', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  price: { type: Sequelize.FLOAT },
});

export const InvoiceElement = sequelize.define('invoiceElement', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  quantity: { type: Sequelize.INTEGER },
  discount: { type: Sequelize.FLOAT },
});

Client.hasMany(Invoice);
Invoice.belongsTo(Client);
Invoice.hasMany(InvoiceElement);
InvoiceElement.belongsTo(Invoice);
InvoiceElement.belongsTo(InvoiceItem);

sequelize.sync();
