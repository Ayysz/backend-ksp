'use strict'

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const simpan = Models.t_simpan;
const anggota = Models.m_anggota;
const attachment = Models.t_attachment;
const { dltFile } = require('../helper/fileDelete');
const { sequelize } = require('../models');
const controller = {};

// getAll data simpanan
controller.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offside = limit * page;

        const config1 = {
            where: {
                [Op.or]: [
                    {anggota_id: {[Op.like]: `%${search}%`}},
                ]
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
            
        }

        const totalRows = await simpan.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        const result = await simpan.findAll(config2);
        
        if(result.length === 0){
            throw {statusCode: 400, message: 'Data simpanan tidak ditemukan'}
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Data simpanan ditemukan',
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

// post data simpanan
controller.post = async (req, res, next) => {
    let transaction
    try {
        
        transaction = await sequelize.transaction();

        const email = req.user.data.email;
        const data = await anggota.findOne({where: email});

        if(!data){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'anggota tidak ditemukan, silahkan daftar terlebih dahulu'}
        }

        console.log(data)
        const User = data.dataValues.nama;

        const reqData = {
            no_simpan: faker.datatype.uuid(),
            tanggal_simpan: req.body.tanggal_simpan || d.toLocaleDateString('en-CA'),
            anggota_id: parseInt(data.dataValues.id),
            jumlah: parseFloat(req.body.jumlah),
            jenis_simpan_id: req.body.jenis_simpan_id,
            created_by: User,
            updated_by: User
        };

        const result = await simpan.create(reqData, {transaction});

        const photo = {
            file_name: req.file.filename,
            refrence_table: 'simpan',
            refrence_id: result.dataValues.id,
            anggota_id: reqData.anggota_id
        }

        const savePhoto = await attachment.create(photo, {transaction});

        if(!result){
            if(req.file?.file_name) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Gagal membuat transaksi baru'}
        }

    } catch (e) {
        next(e)
    }
};

module.exports = controller;