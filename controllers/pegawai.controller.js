'use strict'

const { Op } = require('sequelize');
const { errRes } = require('../helper/helper');
const Models = require('../models');
const jabatan = Models.m_jabatan;
const akun = Models.m_akun;
const pegawai = Models.m_pegawai;
const controller = {};

// getAll data pegawai
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
                    {nama: {[Op.like]: `%${search}%`}},
                    {gender: {[Op.like]: `%${search}%`}},
                ]
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
            include:{
                model: jabatan,
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

        const totalRows = await pegawai.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        // mencari data
        const result = await pegawai.findAll(config2);

        if(result){
            return res.status(200)
            .json({
                status: 'Success',
                message: 'Data pegawai ditemukan',
                page: page,
                limit: limit,
                totalRows: totalRows,
                totalPages: totalPages,
                data: result

            });
        };
        throw {statusCode: 400, message: 'Data pegawai tidak ditemukan'};

    } catch (e) {
        next(e)
    }
};

// post data pegawai
controller.post = async (req, res, next) => {
    try {
        
        // mengambil data dari cookie
        const User = req.user.data;
        const emailUser = User.email;
        
        // mengambil data dari req.body
        const {
            no_pegawai,
            nama,
            no_hp,
            no_ktp,
            gender,
            tanggal_lahir,
            tempat_lahir,
            alamat,
            email,
            jabatan_id
        } = req.body;

        const reqData = {
            no_pegawai,
            nama,
            no_hp,
            no_ktp,
            gender,
            tanggal_lahir,
            tempat_lahir,
            alamat,
            email: email || emailUser,
            jabatan_id: jabatan_id || 1,
        };

        const result = await pegawai.create(reqData);
        if(result._options.isNewRecord){
            return res.status(201)
                    .json({
                        status: 'Success',
                        message: 'Berhasil menambah data baru',
                        data: result.dataValues
                    })
        }
        throw {statusCode: 400, message: 'Gagal menambah data pegawai baru'}

    } catch (e) {
        next(e)
    }
};

// edit data pegawai
controller.edit = async (req, res, next) => {
    try {
        
        // mengambil id dari parameter
        const id = req.params.id;

        // mengambil data dari req.body
        const reqData = {
            no_pegawai: req.body.no_pegawai,
            nama: req.body.nama,
            no_hp: req.body.no_hp,
            no_ktp: req.body.no_ktp,
            gender: req.body.gender,
            email: req.body.email || req.user.data.email,
            tanggal_lahir: req.body.tanggal_lahir,
            tempat_lahir: req.body.tempat_lahir,
            alamat: req.body.alamat,
            jabatan_id: req.body.jabatan_id || 1,
        };   
        const [updatedRows] = await pegawai.update(reqData,{
            where:{id},
        })

        if(updatedRows){
            return res.status(200).json({
                    status: 'Success',
                    message: 'Data pegawai berhasil di Update'
            })
        } 
        throw {statusCode: 400, message: 'Data gagal diupdate'};

    } catch (e) {
        next(e)        
    }
};

// hapus data pegawai
controller.destroy = async (req, res, next) => {
    try {
        const {id} = req.params;

        /**
         * bang bang operator !! 
         * will give result to boolean 
         * */ 

        const result = !!await pegawai.destroy({where: {id}});
        
        if(result) 
            return res.status(200).json({
                status: 'Success',
                message: 'Berhasil delete data pegawai'
            });
        
        // throw new error
        throw {
                statusCode: 400, 
                message: 'Gagal delete data pegawai'
            };

    } catch (e) {
        next(e)
    }
};

// get account pegawai
controller.getAcc = async (req, res, next) => {
    try {

        const result = await pegawai.findAll({
            include: [
                {
                    model: akun,
                    where: {
                        role_id: {
                            [Op.between]: [1,3]
                        }    
                    }
                },
                {
                    model: jabatan, 
                    attributes: {
                        exclude: [
                            'id',
                            'createdAt', 
                            'updatedAt',
                            'is_active'
                        ]
                    }
                }
            ]
        });

        if(result.length !== 0){
            return res.status(200).json({
                status: 'Success',
                message: `Data akun pegawai`,
                data: result
            })
        }

        // throw new error
        throw {
                statusCode: 400, 
                message: `Data akun pegawai tidak ditemukan`
            };


    } catch (e) {
        next(e)
    }
};

// get info account pegawai
controller.info = async (req, res, next) => {
    try {

        const email = req.user.data.email;

        const data = await pegawai.findOne({where: {email}});

        if(!data) throw {statusCode: 400, message: 'Data pegawai tidak ditemukan silahkan daftar'}

        return res.status(200).json({
            status: 'Success',
            message: 'Data pegawai ditemukan',
            data
        })

    } catch (e) {
        next(e)
    }
}

module.exports = controller;
