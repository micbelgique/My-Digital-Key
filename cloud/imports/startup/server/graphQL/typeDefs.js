const typeDefs = [
  `
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  _id: String
  username: String
}

type DigitalLock {
  id: String
  address: String
  owner: String
  logs: [LockLog]
  img: String
}

type LockLog {
  id: String
  date: String
  lock: DigitalLock
  person: User
}

type Query {
  user: User
  users: [User]
  digitalLocks: [DigitalLock]
  digitalLock(id: String!): DigitalLock
  LockLogs: [LockLog]
  LockLog(id: String!): LockLog
}

type Mutation {
  addDigitalLock: DigitalLock
}

`,
];

export default typeDefs;
