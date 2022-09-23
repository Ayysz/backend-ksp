'use strict'

const { Op, where } = require('sequelize');
const Models = require('../models');
const pekerjaan = Models.m_pekerjaan;
const controller = {};

// getAll data pekerjaan 
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
                    {pekerjaan: {[Op.like]: `%${search}%`}}
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

        }

        const totalRows = await pekerjaan.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        // mencari data
        const result = await pekerjaan.findAll(config2);

        if(!result) throw {statusCode: 400, message: 'Data pekerjaan tidak ditemukan'};

        return res.status(200)
            .json({
                status: 'Success',
                message: 'Data pekerjaan ditemukan',
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

// post data pekerjaan
controller.post = async (req, res, next) => {
    try {

        const reqData = {
            pekerjaan: req.body.pekerjaan,
            desc: req.body.desc
        };

        // cek apakah nama pekerjaan sudah ada
        const check = await pekerjaan.findOne({where: {pekerjaan: reqData.pekerjaan}});

        if(check) throw {statusCode: 400, message: 'Nama pekerjaan sudah terdaftar'};

        const result = await pekerjaan.create(reqData);
        
        if(result._options.isNewRecord){
            return res.status(201).json({
                status: 'Success',
                message: 'Berhasil menambah data pekerjaan baru',
                data: result.dataValues
            })
        }else{
            throw {statusCode: 400, message: 'Gagal menambah data pekerjaan baru'}
        }
    
    } catch (e) {
        next(e)
    }
};

// edit data pekerjaan
controller.edit = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const reqData= {
            pekerjaan: req.body.pekerjaan,
            desc: req.body.desc
        };

        // cek apakah nama pekerjaan sudah ada
        const check = await pekerjaan.findOne({where: {pekerjaan: reqData.pekerjaan}});

        if(check) throw {statusCode: 400, message: 'Nama pekerjaan sudah terdaftar'};

        const [updatedRows] = await pekerjaan.update(reqData, {where: {id}});

        if(!updatedRows) throw {statusCode: 400, message: 'Data pekerjaan gagal diupdate'}
        return res.status(200).json({
            status: 'Success',
            message: 'Data pekerjaan berhasil diupdate'
        });

    } catch (e) {
        next(e)
    }
};

// delete data pekerjaan
controller.destroy = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const result = !!await pekerjaan.destroy({where: {id}});

        if(!result) throw {statusCode: 400, message: 'Gagal delete data pekerjaan'};
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil delete data pekerjaan',
            id_pekerjaan: id
        })

    } catch (e) {
        next(e)
    }
};

module.exports = controller;