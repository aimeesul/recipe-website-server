function configureModelRelationships(sequelize) {
    const { user, recipe, measurementUnit, recipeIngredient, ingredient, recipeStep } = sequelize.models;

    user.hasMany(recipe, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    recipe.belongsTo(user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    measurementUnit.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(measurementUnit);

    ingredient.belongsToMany(recipe, { through: recipeIngredient });
    recipe.belongsToMany(ingredient, { through: recipeIngredient });

    ingredient.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(ingredient);
    recipe.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(recipe);

    recipe.hasMany(recipeStep, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    recipeStep.belongsTo(recipe, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
}
exports.configureModelRelationships = configureModelRelationships;
