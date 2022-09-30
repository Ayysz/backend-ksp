'use strict'

const m = require('../models');
const sequelize = m.sequelize;
const QueryTypes = m.sequelize.QueryTypes;
const controller = {};

/**
 * get all saldo khusus admin
 * sum saldo simpanan dengan (penarikan - pengembalian)
 * get all penarikan
 * get all pengembalian
 */

const query = async (models, param) => {
    return await sequelize.query(`SELECT * FROM ${models} ${param}`, { type: QueryTypes.SELECT });
}

controller.saldoSimpanan = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const data = await query('saldo_simpanan', param)

        if(data.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        console.log(data);
        return res.status(200).json({
            status: 'Success',
            message: 'Data penarikan',
            data
        })

    } catch (e) {
        next(e)
    }
};

controller.pengembalian = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const data = await query('pengembalian', param)

        if(data.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        console.log(data);
        return res.status(200).json({
            status: 'Success',
            message: 'Data penarikan',
            data
        })

    } catch (e) {
        next(e)
    }
};

controller.penarikan = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const data = await query('penarikan', param)

        if(data.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        console.log(data);
        return res.status(200).json({
            status: 'Success',
            message: 'Data penarikan',
            data
        })

    } catch (e) {
        next(e)
    }
};

controller.totalSaldo = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${id.query.id}`
        }

        const [saldoSimpanan] = await query('saldo_simpanan', param);
        const [saldoPenarikan] = await query('penarikan', param);
        const [saldoPengembalian] = await query('pengembalian', param);
        console.log(saldoSimpanan.jumlah)
        console.log(saldoPenarikan);
        console.log(saldoPengembalian);

        // if(!daa) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        return res.status(200).json({
            status: 'Success',
            message: `Data saldo kamu ${req.query.id?? ''}`,
        })

    } catch (e) {
        next(e)
    }
}

module.exports = controller;