const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('../config');

function initialize(userRepo) {
    const jwtOptions = {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.get('authentication.token.secret'),
        issuer: config.get('authentication.token.issuer'),
        audience: config.get('authentication.token.audience')
    };

    passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
        const user = await userRepo.getUserById(parseInt(payload.sub));
        if (user) {
            return done(null, user, payload);
        }
        return done();
    }));
}

module.exports.initialize = initialize