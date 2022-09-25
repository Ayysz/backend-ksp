'use strict'

const d = new Date();
const { faker } = require('@faker-js/faker');
const {Op} = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize;
const transaksi = Models.t_transaksi;
const attachment = Models.t_attachment;
const anggota = Models.m_anggota;
const controller = {};

// getAll data transaksi
controller.getAll = async (req, res, next) => {
    try {
        
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offside = limit * page;

        const config1 = {
            where: {
                [Op.or]: [
                    {id: {[Op.like]: `%${search}%`}},
                ]
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
            include:{
                model: anggota,
                as: 'anggota',
                attributes: {
                    exclude: [
                        'id',
                        'createdAt', 
                        'updatedAt',
                        'is_active'
                    ]
                }
            }
        }

        const totalRows = await transaksi.count();
        const totalPages = Math.ceil(totalRows / limit);

        const result = await transaksi.findAll(config2);

        if(!result){
            throw {statusCode: 400, message: 'Data transaksi tidak ditemukan'}
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Data transaksi ditemukan',
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPages: totalPages,
            data: result
        });

    } catch (e) {
        next(e)
    }
};

// post data transaksi
controller.post = async (req, res, next) => {
    let transaction;
    try {
        
        transaction = await sequelize.transaction();

        // get data for post
        const email = req.user.data.email;
        const data = await anggota.findOne({where:{email}});
        console.log(data.dataValues)
        const User = data.dataValues.nama; 
        const reqData = {
            no_transaksi: faker.datatype.uuid(),
            anggota_id: parseInt(data.dataValues.anggota_id),
            jenis_transaksi_id: parseInt(req.body.jenis_transaksi_id),
            bank_id: parseInt(req.body.bank_id),
            tanggal_transaksi: d.toLocaleDateString('en-CA'),
            jumlah: parseFloat(req.body.jumlah),
            created_by: User,
            updated_by: User,
        };
        const photo = {
            file_name: req.file.filename,
            refrence_table: 'Transaksi',
            refrence_id: reqData.no_transaksi,
            anggota_id: reqData.anggota_id
        }

        const result = await transaksi.create(reqData, {transaction});
        const savePhoto = await attachment.create(photo, {transaction})
        
        await transaction.commit();

        if(!result) throw {statusCode: 400, message: 'Gagal menambah transaksi baru'}
        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil menambah transaksi baru',
            data: reqData
        })


    } catch (e) {
        if(transaction){
            await transaction.rollback();
            next(e)
        } 
    }
};

// edit data transaksi
controller.edit = async (req, res, next) => {
    try {

        const email = req.user.data.email;
        const {dataValues} = await anggota.findOne({where: {email}});


    } catch (e) {
        next(e)
    }
};

module.exports = controller;