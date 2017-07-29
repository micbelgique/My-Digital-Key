import { isAuthenticatedResolver } from './baseResolvers';
import { getDigitalLocks, getDigitalLock, getLockLogs, getLockLog } from './getters';

export const DigitalLocksResolver = isAuthenticatedResolver.createResolver(getDigitalLocks);

export const DigitalLockResolver = isAuthenticatedResolver.createResolver(getDigitalLock);

export const LockLogsResolver = isAuthenticatedResolver.createResolver(getLockLogs);

export const LockLogResolver = isAuthenticatedResolver.createResolver(getLockLog);
