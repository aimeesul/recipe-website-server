const { authMiddleware } = require("./authMiddleware");

function configureBasicAuth(app) {
  
  app.use(authMiddleware);
}
exports.configureBasicAuth = configureBasicAuth;
