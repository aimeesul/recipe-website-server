const express = require("express");
const { configureCORS } = require("./configureCORS");
const passport = require("passport")


function configureMiddleware(app) {
  var allowlist = process.env.CORS_ORIGINS.split('|');
  configureCORS(app, allowlist);
  app.use(express.json());
  app.use(passport.initialize())
}
exports.configureMiddleware = configureMiddleware;
