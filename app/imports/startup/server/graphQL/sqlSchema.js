import Sequelize from 'sequelize';

export const sequelize = new Sequelize('digitalkey', 'root', 'graphql', {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
});

sequelize.sync();
