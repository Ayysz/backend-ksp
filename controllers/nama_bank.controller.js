'use strict'

const { Op } = require('sequelize');
const Models = require('../models');
const namaBank = Models.m_nama_bank;
const controller = {};

// getAll data namaBank
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
                    {nama_bank: {[Op.like]: `%${search}%`}},
                ]
            }
        };

        const config2 = {
            ...config1,
            offset,
            limit,
            order: [ ['id', 'ASC'] ],
        }

        const totalRows = await namaBank.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        const result = await namaBank.findAll(config2);

        if(!result) throw {statusCode: 400, message: 'Data tidak ditemukan'};
        
        return res.status(200)
            .json({
                status: 'Success',
                message: 'Data ditemukan',
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

// post data namaBank
controller.post = async (req, res, next) => {
    try {
        
        const result = await namaBank.create({
            nama_bank: req.body.nama_bank
        });

        if(result._options.isNewRecord){
            return res.status(201)
            .json({
                status: 'Success',
                message: 'Berhasil menambah data baru',
                data: result.dataValues
            })
        }else{
            throw {statusCode: 400, message: 'Gagal menambah data baru'}
        }

    } catch (e) {
        next(e)
    }
};

// edit namaBank
controller.edit = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const old = await namaBank.findOne({where: {id}});
        const [updatedRows] = await namaBank.update({
            nama_bank: req.body.nama_bank
        }, {where: {id}});

        if(!updatedRows) throw {statusCode: 400, message: 'Data gagal diupdate'}
        return res.status(200).json({
            status: 'Success',
            message: 'Data berhasil di update',
            oldData: old,
            data: req.body.nama_bank
        });

    } catch (e) {
        next(e)
    }
}

// delete namaBank
controller.destroy = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const result = !!await namaBank.destroy({where: {id}});

        if(!result) throw {statusCode: 400, message: 'Gagal delete data'};
        return res.status(200).json({
            status: 'Success',
            messge: 'Berhasil delete data',
            id_namaBank: id
        });

    } catch (e) {
        next(e)
    }
};

module.exports = controller;