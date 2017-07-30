import cors from 'cors';
import findIndex from 'lodash/findIndex';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { loadSchema, getSchema } from 'graphql-loader';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';
import { typeDefs, resolvers } from './schema';

initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
});

loadSchema({ typeDefs, resolvers });

const schema = makeExecutableSchema(getSchema());

const checkAuthorization = (lock, userToken) => {
  // const decodedToken = decodeURIComponent(userToken);
  const parsedToken = userToken.toUpperCase();
  console.log(parsedToken);
  const user = Meteor.users.findOne({ cardId: parsedToken });
  const isGranted = (
    user &&
    user.locks &&
    user.locks !== null &&
    findIndex(user.locks, lockId => lockId === lock) !== -1
  );
  console.log(isGranted);
  return isGranted;
};

createApolloServer({
  schema,
}, {
  configServer(graphQLServer) {
    graphQLServer.use(cors());
    graphQLServer.get('/access', (req, res) => {
      const hasAccess = checkAuthorization(req.query.lock, req.query.userToken);
      if (hasAccess) return res.end('GRANTED');
      return res.end('REFUSED');
    });
  },
  graphiql: true,
});
