import { isAuthenticatedResolver } from './baseResolvers';
import { addDigitalLock, giveLockAccess, removeLockAccess } from './setters';

export const AddDigitalLockResolver = addDigitalLock;

export const GiveLockAccessResolver = giveLockAccess;

export const RemoveLockAccessResolver = removeLockAccess;
