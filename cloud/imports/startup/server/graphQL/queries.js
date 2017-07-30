import { isAuthenticatedResolver } from './baseResolvers';
import { getDigitalLocks, getDigitalLock, getLockLogs, getLockLog, getUsers } from './getters';

export const DigitalLocksResolver = getDigitalLocks;

export const DigitalLockResolver = getDigitalLock;

export const LockLogsResolver = getLockLogs;

export const LockLogResolver = getLockLog;

export const UsersResolver = getUsers;
