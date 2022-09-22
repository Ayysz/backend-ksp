'use strict'

const { Op } = require('sequelize');
const Models = require('../models');
const akun = Models.m_akun;
const anggota = Models.m_anggota;
const pekerjaan = Models.m_pekerjaan;
const bank = Models.m_bank;
const namaBank = Models.m_nama_bank;
const controller = {};

// function checkStaff approve
const checkStaff = (check) => {
    const approve = {
      0: {
        is_waiting: 1,
        is_approve: 0
      },
      1: {
        is_waiting: 0,
        is_approve: 1
      }
    }
    // console.log(`staff bukan? ${check}`)
    // console.log(`hasilnya`)
    // console.table(approve[check])
    return approve[check];
};

// get All data anggota
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
                    {no_anggota: {[Op.like]: `%${search}%`}},
                    {nama: {[Op.like]: `%${search}%`}},
                ]
            }
        }

        const config2 = {
            ...config1,
            offset,
            limit,
            order: [ ['id', 'ASC'] ],
            include: [
                // inlcude in other include
                {
                    model: pekerjaan,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    required: true,
                },
                {
                    model: bank,
                    include: {
                        model: namaBank,
                    },
                    required: true,
                },
            ]
        }

        const totalRows = await anggota.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        // mencari data
        const result = await anggota.findAll(config2);

        if(!result){
            throw {statusCode: 400, message: 'Data anggota tidak ditemukan'}
        }
        return res.status(200)
            .json({
                status: 'Success',
                message: 'Data anggota ditemukan',
                page,
                limit,
                totalRows,
                totalPages,
                data: result
            })

    } catch (e) {
        next(e)
    }
};

// post data anggota
controller.post = async (req, res, next) => {
    try {
        
        // generate automate no_anggota
        const count = await anggota.count();
        
        const reqData = {
            no_anggota: req.body.no_anggota,
            nama: req.body.nama,
            no_ktp: req.body.no_ktp,
            no_hp: req.body.no_hp,
            gender: req.body.gender,
            tanggal_lahir: req.body.tanggal_lahir,
            tempat_lahir: req.body.tempat_lahir,
            alamat: req.body.alamat,
            email: req.user.data.email,
            pekerjaan_id: req.body.pekerjaan_id || 1,
            bank_id: req.body.bank_id || 1,
        };

        const result = await anggota.create(reqData);

        if(!result._options.isNewRecord){
            throw {statusCode: 400, message: 'Gagal menambah data'}
        };
        return res.status(201)
        .json({
            status: 'Success',
            message: 'Berhasil menambah data baru',
            data: result.dataValues
        });

    } catch (e) {
        next(e)
    }
};

// edit data anggota
controller.edit = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        // cek apakah staff atau bukan
        const is_staff = req.body.is_staff || 0;
        const approve = checkStaff(is_staff)

        const reqData = {
            no_anggota: req.body.no_anggota,
            nama: req.body.nama,
            no_ktp: req.body.no_ktp,
            no_hp: req.body.no_hp,
            gender: req.body.gender,
            tanggal_lahir: req.body.tanggal_lahir,
            tempat_lahir: req.body.tempat_lahir,
            alamat: req.body.alamat,
            email: req.user.data.email,
            pekerjaan_id: req.body.pekerjaan_id || 1,
            bank_id: req.body.bank_id || 1,
            ...approve
        };
        
        const old = await anggota.findOne({where: {id}});
        const [updatedRows] = await anggota.update(reqData, {where:{id}});

        // console.log(old);
        // console.log(updatedRows);
        if(!updatedRows){
            throw {statusCode: 400, message:'Data gagal di update'}
        }
        return res.status(200)
            .json({
                status: 'Success',
                message: 'Data anggota berhasil di update',
                oldData: old,
                data: reqData
            })

    } catch (e) {
        next(e)
    }
};

// delete data anggota
controller.destroy = async (req, res, next) => {
    try {
        const {id} = req.params;

        const result = !!await anggota.destroy({where:{id}});

        if(!result) throw {statusCode: 400, message: 'Gagal delete data anggota'};
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil delete data pegawai',
            id_pegawai: id
        });

    } catch (e) {
        next(e)
    }
};

module.exports = controller;