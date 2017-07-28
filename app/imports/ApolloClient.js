import ApolloClient from 'apollo-client';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';

const networkInterface = createMeteorNetworkInterface({
  // use a batched network interface instead of a classic network interface
  batchingInterface: true,
  uri: 'http://192.168.0.102:3000/graphql',
});

const client = new ApolloClient(meteorClientConfig({ networkInterface }));

export default client;
