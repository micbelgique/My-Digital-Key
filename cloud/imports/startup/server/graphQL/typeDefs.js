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

type DigitalLock {
  id: String
  address: String
  owner: String
  logs: [LockLog]
}

type LockLog {
  id: String
  date: String
  lock: DigitalLock
  person: User
}

type Query {
  user: User
  digitalLocks: [DigitalLock]
  digitalLock(id: String!): DigitalLock
  LockLogs: [LockLog]
  LockLog(id: String!): LockLog
}
`,
];

export default typeDefs;

// type Mutation {
//   createClient(input: CreateClientInput!): Client
//   createInvoice(input: CreateInvoiceInput!): Invoice
//   createInvoiceItem(input: CreateInvoiceItemInput!): InvoiceItem
//   updateNotes(input: UpdateNotesInput!): Agency
// }
