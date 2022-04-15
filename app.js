require('dotenv').config()
const express = require("express");
const { initializeSequelize } = require("./src/sequelize")
const { configureMiddleware } = require("./src/middleware/configureMiddleware");
const config = require('./src/config');
const passport = require('passport');
const token = require('./src/token');
const jwtStrat = require('./src/authentication/jwt');
const googleStrat = require('./src/authentication/google');
const { getUserRepo } = require("./src/sequelize/repos/getUserRepo");
const { getRecipeRepo } = require("./src/sequelize/repos/getRecipeRepo");
const { getPagingParams } = require("./src/express/getPagingParams");
const { getMeasurementUnitRepo } = require('./src/sequelize/repos/getMeasurementUnitRepo');

const app = express();


initializeSequelize().then((sequelize) => {
  configureMiddleware(app);
  const userRepo = getUserRepo(sequelize)
  const recipeRepo = getRecipeRepo(sequelize)
  const measurementUnitRepo = getMeasurementUnitRepo(sequelize)
  googleStrat.initialize(userRepo)
  jwtStrat.initialize(userRepo)

  app.get('/api/authentication/google/start',
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));

  app.get('/api/authentication/google/redirect',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const accessToken = token.generateAccessToken(req.user.id);
      const redirectUrl = new URL(process.env.CLIENT_BASE_URL);
      redirectUrl.pathname = "/loggedin"
      redirectUrl.hash = JSON.stringify({ accessToken });
      res.redirect(redirectUrl.href);
    });


  app.get('/api/user',
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
      res.json(req.user);
    });


  app.get("/measurementUnits", async (req, res) => {
    const measurementUnits = await measurementUnitRepo.getAll()
    res.json(measurementUnits.map(item => ({ id: item.id, unitName: item.unitName })));
  })

  app.get("/recipe/:recipeId", async (req, res) => {
    const recipe = await recipeRepo.getRecipeById(req.params.recipeId);
    res.json(recipe)
  })

  app.get("/recipes",
    async (req, res) => {
      const { actualOffset, actualLimit, actualSortOrder } = getPagingParams(req);
      const { recipes, count } = await recipeRepo.getRecipes(actualOffset, actualLimit, actualSortOrder)
      res.json({ items: recipes, count, offset: actualOffset, limit: actualLimit });
    })
  app.get("/recipes/mine",
    passport.authenticate(['jwt'], { session: false }),
    async (req, res) => {
      const { actualOffset, actualLimit, actualSortOrder } = getPagingParams(req);
      const { recipes, count } = await recipeRepo.getRecipes(actualOffset, actualLimit, actualSortOrder, { where: { userId: req.user.id } })
      res.json({ items: recipes, count, offset: actualOffset, limit: actualLimit });
    })

  app.put("/recipes",
    passport.authenticate(['jwt'], { session: false }),
    async (req, res) => {
      const recipe = req.body;
      await recipeRepo.createRecipe(req.user, recipe);
      res.sendStatus(200);
    })

  const port = config.get('http.port');
  app.listen(port, () => {
    console.log('JWT for demo: ' + token.generateAccessToken(0));
    console.log(`Example app listening on port ${port}!`)
  });
})








