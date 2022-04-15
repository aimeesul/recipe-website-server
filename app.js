require('dotenv').config()
const express = require("express");
const { initializeSequelize } = require("./src/sequelize")
const { configureMiddleware } = require("./src/middleware/configureMiddleware");
const config = require('./src/config');
const jwtStrat = require('./src/authentication/jwt');
const googleStrat = require('./src/authentication/google');
const { getUserRepo } = require("./src/sequelize/repos/getUserRepo");
const { getRecipeRepo } = require("./src/sequelize/repos/getRecipeRepo");
const { getMeasurementUnitRepo } = require('./src/sequelize/repos/getMeasurementUnitRepo');
const { configureEndpoints } = require("./configureEndpoints");

const app = express();

initializeSequelize().then((sequelize) => {
  configureMiddleware(app);
  const userRepo = getUserRepo(sequelize)
  const recipeRepo = getRecipeRepo(sequelize)
  const measurementUnitRepo = getMeasurementUnitRepo(sequelize)
  googleStrat.initialize(userRepo)
  jwtStrat.initialize(userRepo)

  configureEndpoints(app, measurementUnitRepo, recipeRepo);

  const port = config.get('http.port');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
})









