const cors = require('cors');

function configureCORS(app, allowlist) {
  app.use(cors({
    origin: (origin, callback) => {
      var corsOptions;
      if (origin && allowlist.includes(origin)) {
        corsOptions = { origin: true };
      } else {
        corsOptions = { origin: false };
      }
      callback(null, corsOptions);
    }
  }));
}
exports.configureCORS = configureCORS;
