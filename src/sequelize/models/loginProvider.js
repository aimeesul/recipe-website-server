const { DataTypes } = require("sequelize")
const loginProvider = (sequelize) => sequelize.define(
  'loginProvider',
  {
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: 'LoginProviders',
  }
);

module.exports.loginProvider = loginProvider;
