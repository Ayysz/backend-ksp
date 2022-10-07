'use strict';

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize;
const pinjam = Models.t_pinjam;
const anggota = Models.m_anggota;
const permohonan = Models.t_permohonan;
const attachment = Models.t_attachment;
const { dltFile } = require('../helper/fileDelete');
const { number } = require('../helper/helper');
const controller = {};

// getAll data pinjaman
controller.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const offside = limit * page;
        const cond = {
            isd : {
                0: {
                    is_done: 0
                },
                1: {
                    is_done: 1
                }
            },
            isa : {
                0: {
                    is_approve: 0
                },
                1: {
                    is_approve: 1
                }
            },
            active: {
                0: {
                    is_active: 0
                },
                1: {
                    is_active: 1
                }
            }
        }


        const config1 = {
            where: {
                [Op.or]: [
                    {anggota_id: {[Op.like]: `%${req.query?.search ?? ''}%`}},
                ],
                ...cond.isd[parseInt(req.query?.isD)],
                ...cond.isa[parseInt(req.query?.isA)],
                ...cond.active[parseInt(req.query?.active ?? 1)],
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
        }

        const totalRows = await pinjam.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        const result = await pinjam.findAll(config2);
        
        if(result.length === 0){
            throw {statusCode: 400, message: 'Data pinjaman tidak ditemukan'}
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Data pinjaman ditemukan',
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

// get info pinjaman
controller.getById = async (req, res, next) => {
    try {
        
        const {id} = req.params

        const find = await pinjam.findOne({where: {id, is_active: 1, is_approve: 0}});

        return res.status(200).json({
            status: 'Success',
            message: 'Data berhasil ditemukan',
            data: find,
        })

    } catch (e) {
        next(e)
    }
}

// post data pinjaman
controller.post = async (req, res, next) => {
    let transaction;
    try {
        
        transaction = await sequelize.transaction();

        const email = req.user.data.email;
        const data = await anggota.findOne({ where: {email} });

        // error if anggota belum terdaftar
        if(!data) {
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Pegawai tidak ditemukan silahkan daftar terlebih dahulu'}
        }

        const anggota_id = parseInt(data.dataValues.id);
        const conf = {
            where: {
                [Op.and]: [
                    {anggota_id},
                    {is_done: 0}
                ]
            }
        }
        const check = await pinjam.findAll(conf);
        if(check.length >= 1){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'selesaikan dulu pinjaman sebelumnya'}
        }

        // console.log(req.file?.filename);
        if(!data){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'anggota tidak ditemukan, silahkan daftar terlebih dahulu'}
        }

        const User = data.dataValues.nama;
        const no_pinjam = await number(pinjam, 'P');

        const reqData = {
            no_pinjam,
            anggota_id: parseInt(data.dataValues.id),
            jumlah: req.body.jumlah,
            tujuan: req.body.tujuan,
            tanggal_pinjam: req.body.tanggal_pinjam || d.toLocaleDateString('en-CA'),
            tanggal_pengembalian: req.body.tanggal_pengembalian,
            created_by: User,
            updated_by: User
        };

        const result = await pinjam.create(reqData, {transaction});

        const photo = {
            file_name: req.file.filename,
            refrence_table: 'pinjam',
            refrence_id: result.dataValues.id,
            anggota_id: reqData.anggota_id
        }

        const savePhoto = await attachment.create(photo, {transaction});

        if(!result){
            if(req.file?.file_name) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Gagal membuat pinjaman baru'}
        }

        await transaction.commit();

        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil menambah pinjaman baru',
            data: result.dataValues
        })

    } catch (e) {
        if(transaction){
            if(req.file?.filename) await dltFile(req.file.filename);
            await transaction.rollback();
            next(e)
        }
    }
};

// edit pinjaman
controller.edit = async (req, res, next) => {
    let transaction;
    try {
        
        transaction = await sequelize.transaction();

        const {id} = req.params;

        const email = req.user.data.email;
        const data = await anggota.findOne({
            where: {email}
        });

        if(!data){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'anggota tidak ditemukan silahkan daftar terlebih dahulu'}
        }

        const User = data.dataValues.nama;

        const reqData = {
            jumlah: req.body.jumlah,
            tujuan: req.body.tujuan,
            tanggal_pinjam: req.body.tanggal_pinjam || d.toLocaleDateString('en-CA'),
            tanggal_pengembalian: req.body.tanggal_pengembalian,
            updated_by: User
        };

        const result = await pinjam.update(reqData, {where: {id}, transaction})

        const photo = {
            file_name: req.file.filename,
            refrence_table: 'pinjam',
            refrence_id: result.dataValues.id,
            anggota_id: reqData.anggota_id
        }

        const savePhoto = await attachment.create(photo, {transaction});

        if(result.length === 0){
            if(req.file?.file_name) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Gagal membuat pinjaman baru'}
        }

        await transaction.commit();

        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil menamabah pinjaman baru',
            data: result.dataValues
        })

    } catch (e) {
        if(transaction){
            if(req.file?.filename) await dltFile(req.file.filename);
            await transaction.rollback();
            next(e)
        }
    }
};

controller.destroy = async (req, res, next) => {
    let transaction;
    try{

        transaction = await sequelize.transaction();

        const {id} = req.params;

        const old = await pinjam.findOne({where: {id}});

        if(!old) throw {statusCode: 400, message: 'Data tidak ditemukan masukan id yang benar'}

        const refrence_id = old.dataValues.id;

        // mencari data t_attachment
        const srcData = await attachment.findOne({
            where: {
                [Op.and]: [
                    {refrence_id},
                    {refrence_table: 'pinjam'}
                ]
            }
        });

        // destroy data
        const status1 = !!await attachment.destroy({where: {id: srcData.dataValues.id}, transaction});
        const status2 = !!await pinjam.destroy({where: {id}});
        const statusAll = {
            status1: status1,
            status2: status2
        };
        console.table(statusAll)

        if(!status1 && !status2) throw {statusCode: 400, message: 'Gagal mendelete file pada database'};
        
        // menghapus data pada file src
        const check = await dltFile(srcData.dataValues.file_name);

        if(check){

            await transaction.commit();

            return res.status(200).json({
                status: 'Success',
                message: 'Berhasil delete data pada database dan folder',
                id_pinjaman: id
            })
        }


    } catch(e) {
        if(transaction){
            await transaction.rollback();
            next(e)
        }
    }
};

module.exports = controller;