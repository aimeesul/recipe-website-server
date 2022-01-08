const { DataTypes } = require("sequelize")
const recipeIngredient = (sequelize) => sequelize.define(
  'recipeIngredient',
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'RecipeIngredients',
  }
);
module.exports.recipeIngredient = recipeIngredient;
