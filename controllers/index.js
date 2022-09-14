const authController = require('./auth');
const controller = {};

controller.auth = authController.controller;

module.exports = controller;