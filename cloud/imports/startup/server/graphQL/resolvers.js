import {
  DigitalLocksResolver,
  DigitalLockResolver,
  LockLogsResolver,
  LockLogResolver,
  UsersResolver,
} from './queries';
import {
  AddDigitalLockResolver,
  GiveLockAccessResolver,
  RemoveLockAccessResolver,
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
    giveDigitalLockAccess: GiveLockAccessResolver,
    removeDigitalLockAccess: RemoveLockAccessResolver,
  },
};

export default resolvers;
