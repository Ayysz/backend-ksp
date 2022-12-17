'use strict'

const m = require('../models');
const sequelize = m.sequelize;
const QueryTypes = m.sequelize.QueryTypes;
const simpan = m.t_simpan;
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

controller.saldoBerjangka = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const saldoSimpan = await query('saldo_simpanan', param)

        if(saldoSimpan.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}
        
        const saldoPenarikan = await query('penarikanBerjangka', param)

        if(saldoPenarikan.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        const data = parseFloat(saldoSimpan[0].jumlah - saldoPenarikan[0].jumlah)

        return res.status(200).json({
            status: 'Success',
            message: 'Data penarikan',
            data
        })

    } catch (e) {
        next(e)
    }
};

// melihat saldo simpanan sukarela
controller.saldoSukarela = async (req, res, next) => {
    try {
        
        let param = '';
        if(!req?.params.id) throw {statusCode: 400, message: 'Silahkan masukan id'}
        param = {
            anggota_id: parseInt(req.params.id)
        }

        const {saldo} = await simpan.findOne({
            attributes: [
                [sequelize.fn('sum', sequelize.col('jumlah')), 'saldo']
            ],
            where: {
                jenis_simpanan_id: 3,
                is_active: 1,
                ...param
            },
            raw: true,
        })
        
        if(!saldo) throw {statusCode: 400, message: 'Data saldo sukarela tidak ditemukan'}

        const conf = `WHERE anggota_id = ${req.params.id}`
        const [penarikan] = await query('penarikansukarela', conf)
        console.log(penarikan);
        console.log(penarikan.jumlah);
        const data = saldo - penarikan.jumlah;
        console.log(saldo);

        return res.status(200).json({
            status: 'Success',
            message: 'Data saldo sukarela ditemukan',
            ...param,
            data
        })

    } catch (e) {
        next(e)
    }
}


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

controller.penarikanBerjangka = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const data = await query('penarikanBerjangka', param)

        if(data.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

        return res.status(200).json({
            status: 'Success',
            message: 'Data penarikan',
            data
        })

    } catch (e) {
        next(e)
    }
};

controller.penarikanSukarela = async (req, res, next) => {
    try {
        
        let param = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const data = await query('penarikanSukarela', param)

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
            param = `WHERE anggota_id = ${req.query.id}`
        }

        const [saldoSimpanan] = await query('saldo_simpanan', param);
        const [saldoPenarikan1] = await query('penarikanBerjangka', param);
        const [saldoPenarikan2] = await query('penarikanSukarela', param);
        const [saldoPengembalian] = await query('pengembalian', param);

        const data = {
            anggota_id: req.query.id ?? '',
            saldo: parseFloat(saldoSimpanan?.jumlah ?? 0) - parseFloat((saldoPenarikan1?.jumlah ?? 0) + (saldoPenarikan2?.jumlah ?? 0)) 
        }
        
        if( !saldoSimpanan ??
            !saldoPenarikan1 ??
            !saldoPenarikan2 ??
            !saldoPengembalian
            ){
                throw {statusCode: 400, message: 'Data saldo kosong'}
            }

        return res.status(200).json({
            status: 'Success',
            message: `Data saldo kamu ${req.query.id ?? ''}`,
            data
        })

    } catch (e) {
        next(e)
    }
}


module.exports = controller;