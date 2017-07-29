import cors from 'cors';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';
import { typeDefs, resolvers } from './schema';

initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
}, {
  configServer(graphQLServer) {
    graphQLServer.use(cors());
  },
  graphiql: true,
});
