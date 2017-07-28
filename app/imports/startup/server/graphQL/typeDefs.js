const typeDefs = [
  `
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  _id: String
  name: String
}

type Query {
  user: User
  clients: [Client]
  client(id: String!): Client
  invoiceItem(id: String!): InvoiceItem
  invoiceElements: [InvoiceElement]
  invoiceItems: [InvoiceItem]
  invoices: [Invoice]
  agencies(offset: Int, limit: Int): [Agency]
}

type AgencyContactInfo {
  website: String
  gsm: String
  name: String
  address: String
  fixe: String
}

type PropertyCategory {
  category: String!
  sell: Int!
  rent: Int!
}

type Screenshot {
  id: String
}

type Agency {
  id: String
  lastMod: String
  url: String
  fetched: Boolean
  noFrench: Boolean
  screenshots: [Screenshot]
  contactInfo: AgencyContactInfo
  properties: [PropertyCategory]
  notes: String,
}

type Client {
  id: String!
  name: String
  legalForm: String
  manager: String
  tva: String
  street: String
  streetNumber: String
  city: String
  zipcode: Int
  phone: String
  mobilePhone: String
  fax: String
  email: String
}

input CreateClientInput {
  name: String!
  legalForm: String
  manager: String
  tva: String
  street: String
  streetNumber: String
  city: String
  zipcode: Int
  phone: String
  mobilePhone: String
  fax: String
  email: String
}

type Invoice {
  id: String!
  tva: Float!
  elements: [InvoiceElement]!
}

type InvoiceItem {
  id: String!
  name: String!
  description: String
  price: Float!
}

input CreateInvoiceItemInput {
  name: String!
  description: String
  price: Float!
}

type InvoiceElement {
  id: String
  invoiceItem: InvoiceItem
  quantity: Float
  discount: Float
}

input InvoiceElementInput {
  itemId: String
  name: String
  price: Float
  quantity: Float!
  discount: Float
}

input CreateInvoiceInput {
  clientId: String!
  tva: Float!
  items: [InvoiceElementInput]!
}

input UpdateNotesInput {
  id: String!
  notes: String!
}

type Mutation {
  createClient(input: CreateClientInput!): Client
  createInvoice(input: CreateInvoiceInput!): Invoice
  createInvoiceItem(input: CreateInvoiceItemInput!): InvoiceItem
  updateNotes(input: UpdateNotesInput!): Agency
}
`,
];

export default typeDefs;
