const getRecipeRepo = (sequelize) => {
    const { user, recipe, recipeIngredient, ingredient, measurementUnit, recipeStep } = sequelize.models;

    async function getRecipeById(id) {
        return await recipe.findOne({
            where: { id },
            include: [{
                model: recipeIngredient, include: [ingredient, measurementUnit]
            },
            {
                model: recipeStep
            }],
        })
    }

    async function getRecipes(offset, limit, sortOrder, additionalOptions = {}) {
        const recipes = await recipe.findAll(
            {
                order: [['createdAt', sortOrder], [recipeStep, "order", "ASC"]],
                include: [{
                    model: recipeIngredient, include: [ingredient, measurementUnit]
                },
                {
                    model: recipeStep
                }, {
                    model: user
                }],
                limit: limit, offset: offset,
                ...additionalOptions
            }
        );
        const count = await recipe.count();
        return { recipes, count }
    }

    async function createRecipe(owner, recipe) {
        const r = await owner.createRecipe({ title: recipe.title });
        for (const ing of recipe.ingredients) {
            const i = await ingredient.create({ ingredientName: ing.name });
            await r.createRecipeIngredient({
                measurementUnitId: ing.measurement.id,
                ingredientId: i.id,
                quantity: ing.quantity,
            });
        }
        let ord = 1;
        for (const st of recipe.steps) {
            await r.createRecipeStep({ description: st, order: ord });
            ord++;
        }
    }


    return { getRecipeById, getRecipes, createRecipe };
};
exports.getRecipeRepo = getRecipeRepo;
