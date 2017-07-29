import { KeyLog, DigitalKey } from './sqlSchema';

export const getDigitalKeys = () => DigitalKey.findAll();

export const getDigitalKey = (_, { id }) => DigitalKey.findOne({ where: { id } });

export const getKeyLogsForDigitalKey = async (digiKey) => {
  // Getting the invoiceElements of the current invoice.
  const logs = await digiKey.getKeyLogs();
  return logs.map(log => ({
    ...log.get(),
  }));
};

export const getKeyLogs = async () => KeyLog.findAll();

export const getKeyLog = id => KeyLog.findOne({ where: { id } });
