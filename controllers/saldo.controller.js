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

// melihat saldo berjangka
const saldoBerjangka = async (params) => {

    const saldoSimpanan = await query('saldo_simpanan', params)

    if(saldoSimpanan.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

    const saldoPenarikan = await query('penarikanBerjangka', params)

    if(saldoPenarikan.length === 0) throw {statusCode: 400, message: 'Data saldo tidak ditemukan'}

    return parseFloat(saldoSimpanan[0].jumlah - saldoPenarikan[0].jumlah)

}

// melihat saldo Sukarela
const saldoSukarela = async (params) => {
    let param = {
        is_active: 1,
        jenis_simpanan_id : 3,
        anggota_id: parseInt(params)
    }

    const {saldo} = await simpan.findOne({
        attributes: [
            [sequelize.fn('sum', sequelize.col('jumlah')), 'saldo']
        ],
        where: {
            ...param
        },
        raw: true,
    })
    
    if(!saldo) throw {statusCode: 400, message: 'Data saldo sukarela tidak ditemukan'}

    const conf = `WHERE anggota_id = ${params}`
    const [penarikan] = await query('penarikanSukarela', conf)
    console.log(penarikan);
    console.log(penarikan.jumlah);
    console.log(saldo);
    return data = saldo - penarikan.jumlah;
}

const saldoWajib = async (params) => {
    let param = {
        is_active: 1,
        jenis_simpanan_id : 2,
        anggota_id: parseInt(params)
    }

    const {saldo} = await simpan.findOne({
        attributes: [
            [sequelize.fn('sum', sequelize.col('jumlah')), 'saldo']
        ],
        where: {
            ...param
        },
        raw: true,
    })
    
    if(!saldo) throw {statusCode: 400, message: 'Data saldo wajib tidak ditemukan'}

    console.log(saldo);
    return saldo;
}

// melihat saldo 
controller.saldo = async (req, res, next) => {
    try {
        let param = '';
        let data = '';


        if (!req.query?.id) throw {statusCode: 400, message: 'Masukan Id'}
        param = `WHERE anggota_id = ${req.query.id}`

        if (!req.query?.type) throw {statusCode: 400, message: 'Masukan jenis saldo'}

        // untuk melihat jenis saldo berjangka
        if((req.query?.type).toUpperCase() === 'B') data = await saldoBerjangka(param)


        // untuk melihat jenis saldo sukarela
        if((req.query?.type).toUpperCase() === 'S') data = await saldoSukarela(req.query.id)


        // untuk melihat jenis saldo wajib
        if((req.query?.type).toUpperCase() === 'W') data = await saldoWajib(req.query.id)

        return res.status(200).json({
            status: 'Success',
            message: 'Data saldo',
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

/** 
 * get daata penarikan by
 * id 
 * tyoe penarikan (B, S)
 * */ 
controller.penarikan = async (req, res, next) => {
    try {
        
        let param = '';
        let data = '';
        if(req.query?.id){
            param = `WHERE anggota_id = ${req.query.id}`
        }

        if(!req.query?.type) throw {statusCode: 400, message: 'Masukan jenis penarikan'}
        
        if ((req.query?.type).toUpperCase() === "S")  await query('penarikanSukarela', param)
        if ((req.query?.type).toUpperCase() === "B") data = await query('penarikanBerjangka', param)


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

/**
 * get data total saldo
 * saldoSimpanan - ()
 * */ 
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