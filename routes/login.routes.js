const controller = require('../controllers');
const router = require('express').Router();
const passport = require('passport');

const { adminOnly, haloAdmin, staffOnly, haloStaff }  = controller.auth; 
const Authorization = {
    adminOnly,
    // leaderOnly,
    staffOnly,
    // memberOnly,
}
const authenticate = passport.authenticate('jwt', {session: false});

router.post('/signup', controller.auth.signUp);
router.post('/login', controller.auth.checkUser ,controller.auth.login);

// Authorization
router.get('/protected', authenticate, controller.auth.protected );
router.get('/haloadmin', authenticate, Authorization.adminOnly, haloAdmin);
router.get('/halostaff', authenticate, Authorization.staffOnly, haloStaff)

// route untuk logout
router.get('/logout', authenticate, controller.auth.logOut);

module.exports = router;