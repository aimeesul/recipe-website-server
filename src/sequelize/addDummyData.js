const { recipeStep } = require("./models/recipeStep");

async function addDummyData(sequelize) {
    const { user } = sequelize.models;
    const aimee = await user.create({ firstName: 'aimee', lastName: 'sullivan', userName:"aimeesullivan" });
    const bob = await user.create({ firstName: 'bob', lastName: 'smith', userName:"bobsmith" });
    await addWhiteBreadRecipeToUser(sequelize, aimee);
    await addMilkShakeRecipeToUser(sequelize, bob);
}

module.exports.addDummyData = addDummyData;

async function addWhiteBreadRecipeToUser(sequelize, userEntity) {
    const { measurementUnit, ingredient } = sequelize.models;

    const whiteBread = await userEntity.createRecipe({ title: 'awful white bread' });
    const flour = await ingredient.create({ ingredientName: 'flour' });
    const salt = await ingredient.create({ ingredientName: 'salt' });
    const grams = await measurementUnit.create({ unitName: 'gram' });
    const pinch = await measurementUnit.create({ unitName: 'pinch' });

    await whiteBread.createRecipeIngredient({
        measurementUnitId: grams.id,
        ingredientId: flour.id,
        quantity: 400,
    });
    await whiteBread.createRecipeIngredient({
        measurementUnitId: pinch.id,
        ingredientId: salt.id,
        quantity: 1,
    });
    
    await whiteBread.createRecipeStep({
        description:"add flour",
        order: 3
    });
    await whiteBread.createRecipeStep({
        description:"add salt",
        order:2
    });

}

async function addMilkShakeRecipeToUser(sequelize, userEntity) {
    const { measurementUnit, ingredient } = sequelize.models;

    const milkshake = await userEntity.createRecipe({ title: 'milkshake' });
    const milk = await ingredient.create({ ingredientName: 'milk' });
    const banana = await ingredient.create({ ingredientName: 'banana' });
    const millilitre = await measurementUnit.create({ unitName: 'millilitre' });
    

    await milkshake.createRecipeIngredient({
        ingredientId: banana.id,
        quantity: 1,
    });
    await milkshake.createRecipeIngredient({
        measurementUnitId: millilitre.id,
        ingredientId: milk.id,
        quantity: 300,
    });

    await milkshake.createRecipeStep({
        description: "bring all the boys to the yard",
        order: 1
    });
    await milkshake.createRecipeStep({
        description: "its better than yours",
        order: 2
    });
}

