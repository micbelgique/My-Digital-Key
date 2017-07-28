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
}

`,
];

export default typeDefs;
