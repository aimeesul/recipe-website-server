const express = require("express");
const { initializeSequelize } = require("./src/sequelize")
const app = express();
const port = 3000;
const { configureMiddleware } = require("./src/middleware/configureMiddleware");
const { recipeStep } = require("./src/sequelize/models/recipeStep");

initializeSequelize().then((sequelize) => {
  configureMiddleware(app);

  const { measurementUnit, ingredient, recipe, recipeIngredient, user, recipeStep } = sequelize.models;

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
        }],
        limit: actualLimit, offset: actualOffset
      }
    );
    const totalCount = await recipe.count();
    res.json({ recipes, totalCount, offset: actualOffset, limit: actualLimit });
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})





