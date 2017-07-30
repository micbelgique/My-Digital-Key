import { LockLog, DigitalLock } from './sqlSchema';

export const getDigitalLocks = () => DigitalLock.findAll();

export const getDigitalLock = (_, { id }) => DigitalLock.findOne({ where: { id } });

export const getLockLogsForDigitalLock = async (digiLock) => {
  // Getting the invoiceElements of the current invoice.
  const logs = await digiLock.getLockLogs();
  return logs.map(log => ({
    ...log.get(),
  }));
};

export const getLockLogs = async () => LockLog.findAll();

export const getLockLog = id => LockLog.findOne({ where: { id } });

export const getUsers = () => Meteor.users.find({}).fetch();
