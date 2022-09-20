'use stirct'

require('dotenv').config();
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

// get secret code for sign at jwt from .env
const secret = process.env.JWT_SECRET;

// cek kadaluarsa jwt dan mengembalikan data payload
const jwtVerify = (jwtPayload, done) => {
    try {
        const { expiration } = jwtPayload;

        // cek kadaluarsa jwt dari payload
        if (Date.now() > expiration){
            throw {statusCode: 401, message: 'Token expired please login again!'};
        }
        return done(null, jwtPayload);
    } catch (error) {
        done(error)
    }
    
};

// extract cookie jika ada
const cookieExtractor = req => {
    let jwt = null;
    
    // cek apakah ada request cookies
    if(req && req.cookies){
        jwt = req.cookies['jwt'];
    }

    return jwt;
};

// mengatur passport strategyJWT 
const Strategy = new JWTStrategy({
    secretOrKey: secret,
    jwtFromRequest: cookieExtractor,
}, jwtVerify);


passport.use('jwt', Strategy);

module.exports = passport;