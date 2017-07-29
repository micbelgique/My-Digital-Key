import Sequelize from 'sequelize';

export const sequelize = new Sequelize('digitalkey', 'root', 'graphql', {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
});

export const DigitalKey = sequelize.define('digitalKey', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  address: { type: Sequelize.STRING },
});

export const KeyLog = sequelize.define('keyLog', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

DigitalKey.hasMany(KeyLog);
KeyLog.belongsTo(DigitalKey);

sequelize.sync();
