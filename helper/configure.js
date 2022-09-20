'use strict'

const logger = require('morgan');
const helmet = require('helmet');

module.exports = app => {
    const nodeENV = process.env.NODE_ENV;
    const cases = {
        "development": process.env.PORT_DEV,
        "production": process.env.PORT_PRODUCTION,
        "test": process.env.PORT_TEST
    };
    process.env.PORT = cases[nodeENV];
    
    console.log(`=== on ${nodeENV} mode ===`);
    console.log(`=== PORT ${process.env.PORT} ===`);
    nodeENV==='production'?
        app.use(helmet):
        '';
    app.use(logger('dev'));
};