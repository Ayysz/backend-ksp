'use strict'

const d = new Date();
const Models = require('../models');
const { faker } = require('@faker-js/faker');

const condition = {
    1: {
        is_waiting: true,
        is_approve: false,
    },
    2: {
        is_waiting: false,
        is_approve: true,
    },
    3: {
        is_waiting: true,
        is_approve: true,
    },
    4: {
        is_waiting: false,
        is_approve: false,
    }
};

// global error respone with status code 400
exports.errRes = (res, code, msg) => {
    return res.status(code)
        .json({
            status: 'Error',
            message: msg
    });
};

// condition checker for permohonan
exports.checker = (cond) => {
    console.log(condition[cond]);
    return condition[cond];
};

// generate auto number
exports.number = async (model, code = 'KSP') => {
    const count = await model.count();   
    console.log(count);
    const pad = count.toString().padStart(3, '0');
    const first = pad.padStart(4, code);
    const full = d.toLocaleDateString('en-CA').split('-').join('').slice(2,10)
    const unique = faker.datatype.uuid().split('-')[0].slice(0,3);
    const result = full.concat(unique).concat(first);
    console.log(result)
    return result;
};