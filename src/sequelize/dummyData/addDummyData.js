const { ingredientsArray } = require("./ingredientsArray");
const { recipeStep } = require("../models/recipeStep");

function splitToChunks(arr, chunkSize) {
    const outerArr = [];
    const items = Array.from(arr);
    while (items.length > 0) {
        const innerArr = [];
        for (let i = 0; i < chunkSize && items.length > 0; i++) {
            innerArr.push(items.pop());
        }
        if (innerArr.length > 0) {
            outerArr.push(innerArr)
        }
    }

    return outerArr;
}

async function makeSillyRecipes(sequelize) {
    const { measurementUnit, ingredient, user } = sequelize.models;
    const lotOfIngredients = Array.from(new Array(2)).flatMap((_, i) => ingredientsArray.map(v => `${v}${i}`))
    const array = splitToChunks(lotOfIngredients, 3);
    const floogel = await measurementUnit.create({ unitName: 'floogel' });
    const cratchbob = await measurementUnit.create({ unitName: 'cratchbob' });
    const rob = await user.create({ firstName: 'rob', lastName: 'bot', userName: "robot" });
    for (const [item, idx] of array.map((v, i) => [v, i])) {
        const title = `recipe-${idx}`;
        const reci = await rob.createRecipe({ title });
        await Promise.all(item.map(async (ing) => {
            const ii = await ingredient.create({ ingredientName: ing })
            await reci.createRecipeIngredient({
                measurementUnitId: Math.random() < 0.5 ? floogel.id : cratchbob.id,
                ingredientId: ii.id,
                quantity: Math.floor(Math.random() * 10 + 1),
            });
        }))
        await reci.createRecipeStep({
            description: "do this",
            order: 1
        });
        await reci.createRecipeStep({
            description: "do that",
            order: 2
        });

    }
}
async function addDummyData(sequelize) {
    const { user } = sequelize.models;
    const aimee = await user.create({ firstName: 'aimee', lastName: 'sullivan', userName: "aimeesullivan" });
    const bob = await user.create({ firstName: 'bob', lastName: 'smith', userName: "bobsmith" });
    await addWhiteBreadRecipeToUser(sequelize, aimee);
    await addMilkShakeRecipeToUser(sequelize, bob);
    await makeSillyRecipes(sequelize)
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
        description: "add flour",
        order: 3
    });
    await whiteBread.createRecipeStep({
        description: "add salt",
        order: 2
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

