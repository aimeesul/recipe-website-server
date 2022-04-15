const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const config = require('../config');

function initialize(userRepo) {
    
    const callbackURL = new URL(process.env.SERVER_BASE_URL)
    callbackURL.pathname = "/api/authentication/google/redirect"
    console.log(callbackURL.href)

    const passportConfig = {
        clientID: config.get('authentication.google.clientId'),
        clientSecret: config.get('authentication.google.clientSecret'),
        callbackURL: callbackURL.href
    };

    if (passportConfig.clientID) {
        passport.use(new passportGoogle.OAuth2Strategy(passportConfig, async function (request, accessToken, refreshToken, profile, done) {
            let user = await userRepo.getUserByExternalId("google", profile.id)
            if (!user) {
                user = await userRepo.createUser("google", profile.id, profile.displayName, profile.name.givenName, profile.name.familyName);
                console.log("created user", user.userName)
            }
            return done(null, user);
        }));
    }
}
module.exports.initialize = initialize