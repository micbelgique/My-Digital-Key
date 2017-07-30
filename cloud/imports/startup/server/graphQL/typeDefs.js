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
  locks: [String]
}

type DigitalLock {
  id: String
  address: String
  owner: String
  logs: [LockLog]
  img: String
  name: String
}

type LockLog {
  id: String
  date: String
  lock: DigitalLock
  person: User
}

type Query {
  user(id: String): User
  users: [User]
  digitalLocks: [DigitalLock]
  digitalLock(id: String!): DigitalLock
  LockLogs: [LockLog]
  LockLog(id: String!): LockLog
}

type Mutation {
  addDigitalLock(id: String!, name: String!, img: String!, address: String!, owner: String!): DigitalLock
  giveDigitalLockAccess(lockId: String!, userId: String!): String
  removeDigitalLockAccess(lockId: String!, userId: String!): String
}

`,
];

export default typeDefs;
