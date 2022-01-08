function configureModelRelationships(sequelize) {
    const { user, recipe, measurementUnit, recipeIngredient, ingredient } = sequelize.models;

    user.hasMany(recipe);
    recipe.belongsTo(user);

    measurementUnit.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(measurementUnit);

    ingredient.belongsToMany(recipe, { through: recipeIngredient });
    recipe.belongsToMany(ingredient, { through: recipeIngredient });

    ingredient.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(ingredient);
    recipe.hasMany(recipeIngredient);
    recipeIngredient.belongsTo(recipe);
}
exports.configureModelRelationships = configureModelRelationships;
