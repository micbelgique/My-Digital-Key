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

const checkAuthorization = (lock, userToken) => {
  const decodedToken = decodeURIComponent(userToken);
  return decodedToken === '+s4MLjr8eDjcoQvO9/5UuiiywbKa8KG7jSfRIFtxsqw=';
};

createApolloServer({
  schema,
}, {
  configServer(graphQLServer) {
    graphQLServer.use(cors());
    graphQLServer.get('/access', (req, res) => {
      const hasAccess = checkAuthorization('lock', req.query.user);
      if (hasAccess) return res.end('GRANTED');
      return res.end('REFUSED');
    });
  },
  graphiql: true,
});
