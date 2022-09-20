'use strict'

// global error respone with status code 400
exports.errRes = (res, code, msg) => {
    return res.status(code)
        .json({
            status: 'Error',
            message: msg
    });
};