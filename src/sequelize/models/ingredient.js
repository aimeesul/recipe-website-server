const { DataTypes } = require("sequelize")
const ingredient = (sequelize) => sequelize.define(
  'ingredient',
  {
    ingredientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Ingredients',
  }
);

module.exports.ingredient = ingredient;
