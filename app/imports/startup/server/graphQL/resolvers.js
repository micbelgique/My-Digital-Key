const resolvers = {
  Query: {
    user(root, args, context) {
      return context.user;
    },
  },
  // Mutation: {
  // },
};

export default resolvers;
