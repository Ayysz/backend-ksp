'use strict'

const d = new Date();
const Models = require('../models');
// const pinjam = Models.t_pinjam
// const anggota = Models.m_anggota
// const t_permohonan = Models.t_transaksi
// const simpan = Models.t_simpan
// const pegawai = Models.m_pegawai

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
    // const counts = await Models.model.countAll();
    const day = d.getDay();
    const month = d.getMonth();
    const year = d.getFullYear();
};