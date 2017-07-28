import { createApolloServer } from 'meteor/apollo';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from './schema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
}, {
  configServer: graphQLServer => graphQLServer.use(cors()),
});
