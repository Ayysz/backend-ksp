'use strict'

const { Op } = require('sequelize');
const Models = require('../models');
const bank = Models.m_bank;
const namaBank = Models.m_nama_bank;
const kepemillikan = Models.m_jenis_kepemilikan;
const controller = {};

// get all data 
controller.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = page * limit;

        const config1 = {
            where: {
                [Op.or]: [
                    {id: {[Op.like]: `%${search}%`}},
                    {nama_pemilik_bank: {[Op.like]: `%${search}%`}}
                ]
            }
        }

        const config2 = {
            ...config1,
            offset,
            limit,
            order: [ ['id', 'ASC'] ],
            attributes: {
                exclude: [
                    'nama_bank_id',
                    'jenis_kepemilikan_id',
                    'createdAt',
                    'updatedAt',
                ]
            },
            include: [
                {
                    model: namaBank,
                    as: 'namaBank',
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }, 
                    required: true
                },
                {
                    model: kepemillikan,
                    as: 'jenisKepemilikan',
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }, 
                    required: true
                },
            ]
        }

        const totalRows = await bank.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        // mencari data
        const result = await bank.findAll(config2);

        if(!result) throw {statusCode: 400, message: 'Data bank tidak ditemukan'};

        return res.status(200)
            .json({
                status: 'Success',
                message: 'Data bank ditemukan',
                page,
                limit,
                totalRows,
                totalPages,
                data: result
            });

    } catch (e) {
        next(e)
    }
};

// post data bank
controller.post = async (req, res, next) => {
    try {
        const reqData = {
            nama_bank_id: req.body.nama_bank_id,
            nama_pemilik_bank: req.body.nama_pemilik_bank,
            jenis_kepemilikan_id: req.body.jenis_kepemilikan_id || 1,
            no_rek: req.body.no_rek,
        };

        const result = await bank.create(reqData);

        if(result._options.isNewRecord){
            return res.status(201).json({
                status: 'Success',
                message: 'Berhasil menambah data bank baru',
                data: result.dataValues
            })
        }else{
            throw {statusCode: 400, mesage: 'Gagal menambah data bank baru'}
        }

    } catch (e) {
        next(e)
    }
};

// edit data bank
controller.edit = async (req, res, next) => {
    try{

        const {id} = req.params;

        const reqData = {
            nama_bank_id: req.body.nama_bank_id,
            nama_pemilik_bank: req.body.nama_pemilik_bank,
            jenis_kepemilikan_id: req.body.jenis_kepemilikan_id,
            no_rek: req.body.no_rek,
        };

        const old = await bank.findOne({where: {id}});
        const [updatedRows] = await bank.update(reqData, {where: {id}});

        if(!updatedRows) throw {statusCode: 400, message: 'Data gagal diupdate'}
        return res.status(200).json({
            status: 'Success',
            message: 'Data bank berhasil di update',
            oldData: old,
            data: reqData
        });

    }catch(e){
        next(e)
    }
};

// delete data bank
controller.destroy = async (req, res, next) => {
    try{

        const {id} = req.params;

        const result = !!await bank.destroy({where: {id}});

        if(!result) throw {statusCode: 400, message: 'Gagal delete data bank, masukan id yang sesuai'};
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil delete data bank',
            id_bank: id
        });      

    }catch(e){
        next(e)
    }
};

module.exports = controller;