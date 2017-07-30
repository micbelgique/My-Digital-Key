import { LockLog, DigitalLock } from './sqlSchema';

export const addDigitalLock = (_, { id, img, address, owner, name }) => DigitalLock.create({
  id,
  img,
  address,
  owner,
  name,
}).then(lock => lock.get());

export const giveLockAccess = (_, { lockId, userId }) => Meteor.users.update({ _id: userId }, {
  $addToSet: { locks: lockId },
});

export const removeLockAccess = (_, { lockId, userId }) => Meteor.users.update({ _id: userId }, {
  $pullAll: { locks: [lockId] },
});
