const passport = require('passport');
const passportJwt = require('passport-jwt');
const { getPassportJwtOptions } = require("./getPassportJwtOptions");

function initialize(userRepo) {
    const jwtOptions = getPassportJwtOptions();

    passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
        const user = await userRepo.getUserById(parseInt(payload.sub));
        if (user) {
            return done(null, user, payload);
        }
        return done();
    }));
}

module.exports.initialize = initialize


