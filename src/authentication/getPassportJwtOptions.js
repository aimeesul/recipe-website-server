const passportJwt = require('passport-jwt');
const config = require('../config');

function getPassportJwtOptions() {
    return {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.get('authentication.token.secret'),
        issuer: config.get('authentication.token.issuer'),
        audience: config.get('authentication.token.audience')
    };
}
exports.getPassportJwtOptions = getPassportJwtOptions;
