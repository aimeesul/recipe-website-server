const { DataTypes } = require("sequelize")
const recipeStep = (sequelize) => sequelize.define(
  'recipeStep',
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
  },
  {
    tableName: 'RecipeStep',
    indexes: [
        {
            unique: true,
            fields: ['order', 'recipeId']
        }   
    ]
    
  }
);
module.exports.recipeStep = recipeStep;
