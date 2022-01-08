const { DataTypes } = require("sequelize")
const user = (sequelize) => sequelize.define(
  'user',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Users',
  }
);
module.exports.user = user;
