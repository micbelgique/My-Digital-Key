import {
  DigitalLocksResolver,
  DigitalLockResolver,
  LockLogsResolver,
  LockLogResolver,
  UsersResolver,
} from './queries';
import {
  AddDigitalLockResolver,
} from './mutations';

const resolvers = {
  Query: {
    user(root, args, context) {
      return context.user;
    },
    users: UsersResolver,
    digitalLocks: DigitalLocksResolver,
    digitalLock: DigitalLockResolver,
    LockLogs: LockLogsResolver,
    LockLog: LockLogResolver,
  },
  Mutation: {
    addDigitalLock: AddDigitalLockResolver,
  },
};

export default resolvers;
