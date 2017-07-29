import {
  DigitalLocksResolver,
  DigitalLockResolver,
  LockLogsResolver,
  LockLogResolver,
} from './queries';
import {} from './mutations';

const resolvers = {
  Query: {
    user(root, args, context) {
      return context.user;
    },
    digitalLocks: DigitalLocksResolver,
    digitalLock: DigitalLockResolver,
    LockLogs: LockLogsResolver,
    LockLog: LockLogResolver,
  },
  // Mutation: {},
};

export default resolvers;
