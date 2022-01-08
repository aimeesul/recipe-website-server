const { DataTypes } = require("sequelize")
const recipe = (sequelize) => sequelize.define(
  'recipe',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Recipes',
  }
);
module.exports.recipe = recipe;
