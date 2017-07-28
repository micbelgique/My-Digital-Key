import ApolloClient from 'apollo-client';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';

const networkInterface = createMeteorNetworkInterface({
  // use a batched network interface instead of a classic network interface
  batchingInterface: true,
  uri: 'http://localhost:3002/graphql',
});

const client = new ApolloClient(meteorClientConfig({ networkInterface }));

export default client;
