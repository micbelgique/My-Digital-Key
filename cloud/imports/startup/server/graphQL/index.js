import cors from 'cors';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { loadSchema, getSchema } from 'graphql-loader';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';
import typeDefs from '../schema';
import resolvers from '../resolvers';

initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
});

loadSchema({ typeDefs, resolvers });
const schema = makeExecutableSchema(getSchema());

createApolloServer({
  schema,
}, {
  configServer(graphQLServer) {
    graphQLServer.use(cors());
  },
  graphiql: true,
});
