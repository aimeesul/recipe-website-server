const { DataTypes } = require("sequelize")
const externalLogin = (sequelize) => sequelize.define(
  'externalLogin',
  {
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: 'ExternalLogins',
  }
);

module.exports.externalLogin = externalLogin;
