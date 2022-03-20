const express = require("express");
const { initializeSequelize } = require("./src/sequelize")
const app = express();
const port = 3000;
const { configureMiddleware } = require("./src/middleware/configureMiddleware");
const { recipeStep } = require("./src/sequelize/models/recipeStep");
const { urlGoogle, getGoogleAccountFromCode } = require("./google-util");

initializeSequelize().then((sequelize) => {
  configureMiddleware(app);

  const { measurementUnit, ingredient, recipe, recipeIngredient, user, recipeStep } = sequelize.models;

  app.get("/measurementUnits", async (req, res) => {
    const measurementUnits = await measurementUnit.findAll();
    res.json(measurementUnits.map(item => ({ id: item.id, unitName: item.unitName })));
  })

  app.get("/recipe/:recipeId", async (req, res) => {
    const r = await recipe.findOne({
      where: { id: req.params.recipeId }, include: [{
        model: recipeIngredient, include: [ingredient, measurementUnit]
      },
      {
        model: recipeStep
      }],
    })
    res.json(r)
  })

  app.get("/recipes", async (req, res) => {
    const { sort, limit, offset } = req.query;
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const actualLimit = isNaN(limitNum) ? 50 : Math.min(100, limitNum);
    const actualOffset = isNaN(offsetNum) ? 0 : offsetNum;
    const actualSortOrder = sort === "DESC" ? 'DESC' : 'ASC';

    const recipes = await recipe.findAll(
      {
        order: [['createdAt', actualSortOrder], [recipeStep, "order", "ASC"]],
        include: [{
          model: recipeIngredient, include: [ingredient, measurementUnit]
        },
        {
          model: recipeStep
        }, {
          model: user
        }],
        limit: actualLimit, offset: actualOffset
      }
    );
    const totalCount = await recipe.count();
    res.json({ items: recipes, totalCount, offset: actualOffset, limit: actualLimit });
  })

  app.put("/recipes", async (req, res) => {
    const recipe = req.body;
    const u = await user.findOne({ where: { userName: "aimeesullivan" } })
    const r = await u.createRecipe({ title: recipe.title })
    for (const ing of recipe.ingredients) {
      const i = await ingredient.create({ ingredientName: ing.name })
      await r.createRecipeIngredient({
        measurementUnitId: ing.measurement.id,
        ingredientId: i.id,
        quantity: ing.quantity,
      });
    }
    let ord = 1
    for (const st of recipe.steps) {
      await r.createRecipeStep({ description: st, order: ord });
      ord++;
    }



    res.sendStatus(200);
  })

  app.post("/creds", async (req, res) => {
    const credentials = req.body;
    const result = await getGoogleAccountFromCode(credentials.code);
    res.json(result);
  });

  app.get("/loginUrl", async (req, res) => {
    res.json({ url: urlGoogle() })
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})





