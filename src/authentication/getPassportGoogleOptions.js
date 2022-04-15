const config = require('../config');

function getPassportGoogleOptions() {
    const callbackURL = new URL(process.env.SERVER_BASE_URL);
    callbackURL.pathname = "/api/authentication/google/redirect";
    const passportConfig = {
        clientID: config.get('authentication.google.clientId'),
        clientSecret: config.get('authentication.google.clientSecret'),
        callbackURL: callbackURL.href
    };
    return passportConfig;
}
exports.getPassportGoogleOptions = getPassportGoogleOptions;
