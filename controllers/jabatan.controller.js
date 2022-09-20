const { Op } = require('sequelize');
const Models = require('../models/index');
const jabatan = Models.m_jabatan;

const controller = {};

// get all data jabatan
controller.getAll = async (req, res, next) => {
    try {
        
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const config1 = {
            where: {
                [Op.or]: [
                    {id: {[Op.like]: `%${search}`}},
                    {jabatan: {[Op.like]: `%${search}`}},
                ]
            }
        }
        const config2 = {
            ...config1,
            offset,
            limit,
            order: [ ['id', 'ASC'] ],
            raw: true,
        }

        const totalRows = await jabatan.count(config1);
        const totalPage = Math.ceil(totalRows / limit);

        const result = await jabatan.findAll(config2);

        if(!result){
            throw {statusCode: 400, message: 'Data jabatan tidak ditemukan'}
        }
        return res.status(200)
            .json({
                status: 'Success',
                message:'Data jabatan ditemukan',
                page,
                limit,
                totalRows,
                totalPage,
                data: result
            })


    } catch (e) {
        next(e)
    }
};

// post data jabatan
controller.post = async (req, res, next) => {

    try {
        const reqData = {
            jabatan: req.body.jabatan,
            desc: req.body.desc,
            is_active: 1
        };
    
        const result = await jabatan.create(reqData);
        // console.log(result);
        if(result._options.isNewRecord){
            return res.status(201)
                .json({
                    status: 'Success',
                    message: 'Berhasil menambah data baru',
                    data: result.dataValues
                })
        }

        throw {statusCode: 400, message: 'Gagal menambah data baru'};
    } catch (e) {
        next(e)
    }
};

// edit data jabatan
controller.edit = async (req, res, next) => {
    try {
        const {id} = req.params;

        const reqData = {
            jabatan: req.body.jabatan,
            desc: req.body.desc,
        };

        const [updatedRows] = await jabatan.update(reqData, {where: {id}});

        if(updatedRows){
            return res.status(200).json({
                    status: 'Success',
                    message: 'Data jabatan berhasil di update'
                });
        }
        throw {statusCode: 400, message: 'Data gagal diupdate'};

    } catch (e) {
        next(e)
    }
};

// destroy data jabatan
controller.destroy = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const result = !!await jabatan.destroy({where: {id}});

        if(!result){
            throw {statusCode: 400, message: 'Gagal delete data jabatan'}
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil delete data jabatan'
        });

    } catch (e) {
        next(e)
    }
}

module.exports = controller;