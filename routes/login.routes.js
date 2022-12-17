'use strict'

const controller = require('../controllers');
const router = require('express').Router();
const passport = require('passport');

const { adminOnly, haloAdmin, staffOnly, leaderOnly, haloStaff, memberOnly, cookieSet }  = controller.auth; 
const Authorization = {
    adminOnly,
    leaderOnly,
    staffOnly,
    memberOnly,
}
const authenticate = passport.authenticate('jwt', {session: false});

router.post('/signup', controller.auth.signUp);
router.post('/login', controller.auth.checkUser, controller.auth.login);

// Authorization
router.get('/userInfo', authenticate, Authorization.memberOnly, controller.auth.info);
router.get('/userInfo/pegawai', authenticate, Authorization.memberOnly, controller.pegawai.getAcc);
router.get('/userData', authenticate, Authorization.adminOnly, controller.auth.getAll);
router.get('/protected', authenticate, controller.auth.protected);
router.get('/haloadmin', authenticate, Authorization.adminOnly, haloAdmin);
router.get('/halostaff', authenticate, Authorization.staffOnly, haloStaff);
router.get('/users_data', authenticate, Authorization.adminOnly, controller.auth.getAll);
router.delete('/users', authenticate, Authorization.adminOnly, controller.auth.destroyAcc);

// route untuk logout
router.get('/logout', authenticate, controller.auth.logOut);

module.exports = {
    router,
    authenticate,
    Authorization
};