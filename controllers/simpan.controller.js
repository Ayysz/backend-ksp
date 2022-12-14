'use strict'

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize;
const simpan = Models.t_simpan;
const anggota = Models.m_anggota;
const attachment = Models.t_attachment;
const { dltFile } = require('../helper/fileDelete');
const { number } = require('../helper/helper');
const controller = {};

// getAll data simpanan
controller.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offside = limit * page;
        let filter = {};

        if(parseInt(req.query?.filter) <= 4){
            filter = {
                jenis_simpanan_id: req.query.filter
            }
        }

        const cond = {
            isd : {
                0: {
                    is_done: 0
                },
                1: {
                    is_done: 1
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
                    {anggota_id: {[Op.like]: `%${search}%`}},
                ],
                ...filter,
                ...cond.isd[parseInt(req.query?.isD)],
                ...cond.active[parseInt(req.query?.active ?? 1)],
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
        }
        console.log(config1);

        const totalRows = await simpan.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        const result = await simpan.findAll(config2);
        
        if(!result){
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
        const data = await anggota.findOne({ where: {email} });

        // error if anggota belum terdaftar
        if(!data) {
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Anggota tidak ditemukan silahkan daftar terlebih dahulu'}
        }

        const jenis_simpanan_id = parseInt(req.body.jenis_simpanan_id) || 4;
        const anggota_id = parseInt(data.dataValues.id);

        // jika jenis simpanan adalah berjangka
        if(jenis_simpanan_id === 4){
            if(!req.body?.total) throw { statusCode: 400, message: ' [total.value is undefiend] Masukan total simpanan berjangka' };
            const conf = {
                where: {
                    [Op.and]: [
                        {anggota_id},
                        {is_done: 0},
                        {jenis_simpanan_id: 4}
                    ]
                }
            }
            const check = await simpan.findAll(conf);
                if(check.length >= 1){
                    if(req.file?.filename) await dltFile(req.file.filename);
                    throw {statusCode: 400, message: 'selesaikan dulu pinjaman sebelumnya'}
                }
        }

        // jika jenis simpanan sama dengan pokok
        if(jenis_simpanan_id === 1){
            const data = await simpan.findOne({
                where: {
                    jenis_simpanan_id,
                    anggota_id,
                    is_done: 1,
                    is_active: 1,
                }
            })

            if(data) throw {statusCode: 400, message: 'Simpanan pokok kamu telah terpenuhi'}
        }

        // jika jenis simpanan sama dengan wajib
        if(jenis_simpanan_id === 2){
            const now = new Date();

            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString('en-CA');
            const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0).toLocaleDateString('en-CA');
    
            console.log(firstDay);
            console.log(lastDay);
    
            const data = await simpan.findOne({
                where: {
                    tanggal_simpan: {[Op.between]: [
                        firstDay,
                        lastDay
                    ]},
                    jenis_simpanan_id,
                    anggota_id,
                    is_done:1,
                    is_active: 1,
                },
                raw: true
            })

            if(data) throw {statusCode: 400, message: 'Kamu telah memenuhi simpanan pokok bulan ini'}
        }

        const User = data.dataValues.nama;
        const no_simpan = await number(simpan, 'S');

        const reqData = {
            no_simpan,
            tanggal_simpan: req.body.tanggal_simpan || d.toLocaleDateString('en-CA'),
            jangka_simpan: req.body.jangka_simpan,
            anggota_id,
            jumlah: parseFloat(req.body.jumlah),
            total: parseFloat(req.body.total) || null,
            jenis_simpanan_id,
            is_done: req.body.is_done || 0,
            created_by: User,
            updated_by: User
        };

        if(jenis_simpanan_id === 3) reqData.total = null;

        const result = await simpan.create(reqData, {transaction});

        const photo = {
            file_name: req.file.filename,
            refrence_table: 'simpan',
            refrence_id: result.dataValues.id,
            anggota_id: reqData.anggota_id
        }

        const savePhoto = await attachment.create(photo, {transaction});

        if(!result){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Gagal membuat transaksi baru'}
        }

        await transaction.commit();

        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil menambah simpanan baru',
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

// edit simpanan
controller.edit = async (req, res, next) => {
    let transaction;
    try {
        
        const {id} = req.params;

        transaction = await sequelize.transaction();

        const email = req.user.data.email;
        const data = await anggota.findOne({
            where: {email}
        });

        if(!data){
            if(req.file?.filename) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'anggota tidak ditemukan silahkan daftar terlebih dahulu'}
        }

        // const old = await simpan.findOne({where: {id}});
        // const jumlah = parseFloat(data.dataValues.jumlah) + parseFloat(req.body.jumlah);
        const User = data.dataValues.nama;

        const reqData = {
            tanggal_simpan: req.body.tanggal_simpan || d.toLocaleDateString('en-CA'),
            jumlah: parseFloat(req.body.jumlah),
            updated_by: User
        };
        const conf = {
            where: {id},
            transaction, 
            individualHooks: true
        };

        const [updatedRows] = await simpan.update(reqData, conf)

        const photo = {
            file_name: req.file.filename,
            refrence_table: 'simpan',
            refrence_id: id,
            anggota_id: data.dataValues.id
        }

        const savePhoto = await attachment.create(photo, {transaction});

        if(!updatedRows){
            if(req.file?.file_name) await dltFile(req.file.filename);
            throw {statusCode: 400, message: 'Gagal mengupdate simpanan baru'}
        }

        await transaction.commit();

        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil mengupdate simpanan',
        })
        
    } catch (e) {
        if(transaction){
            if(req.file?.filename) await dltFile(req.file.filename);
            await transaction.rollback()
            next(e)
        }
    }
};


controller.destroy = async (req, res, next) => {
    let transaction;
    try{

        transaction = await sequelize.transaction();

        const {id} = req.params;

        const old = await simpan.findOne({where: {id}});

        if(!old) throw {statusCode: 400, message: 'Data tidak ditemukan masukan id yang benar'}

        const refrence_id = old.dataValues.id;

        // mencari data t_attachment
        const srcData = await attachment.findOne({
            where: {
                [Op.and]: [
                    {refrence_id},
                    {refrence_table: 'simpan'}
                ]
            }
        });

        // destroy data
        const status1 = !!await attachment.destroy({where: {id: srcData.dataValues.id}}, {transaction});
        const status2 = !!await simpan.destroy({where: {id}});
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
                id_simpanan: id
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