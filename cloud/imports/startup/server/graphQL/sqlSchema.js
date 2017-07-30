import Sequelize from 'sequelize';

export const sequelize = new Sequelize('digitalkey', 'root', 'graphql', {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  dialect: 'mysql',
});

export const DigitalLock = sequelize.define('digitalLock', {
  id: { type: Sequelize.STRING, primaryKey: true },
  address: { type: Sequelize.STRING },
  img: { type: Sequelize.STRING },
  owner: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
});

export const LockLog = sequelize.define('LockLog', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

DigitalLock.hasMany(LockLog);
LockLog.belongsTo(DigitalLock);

sequelize.sync({});
