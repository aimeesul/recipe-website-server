const express = require("express");
//const { configureBasicAuth } = require("./configureBasicAuth");
const { configureCORS } = require("./configureCORS");
const passport = require("passport")


function configureMiddleware(app) {
  var allowlist = ["http://localhost:5000", "http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:5000"];
  configureCORS(app, allowlist);
  app.use(express.json());
  app.use(passport.initialize())
  //configureBasicAuth(app);
}
exports.configureMiddleware = configureMiddleware;
