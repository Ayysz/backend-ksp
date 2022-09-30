'use strict'

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize;
const permohonan = Models.t_permohonan;
const pinjam = Models.t_pinjam;
const pegawai = Models.m_pegawai;
const controller = {};
const { checker } = require('../helper/helper');


// getAll data permohonan
controller.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offside = limit * page;

        const config1 = {
            where: {
                [Op.or]: [
                    {pinjam_id: {[Op.like]: `%${search}%`}},
                ]
            }
        }
        const config2 = {
            ...config1,
            offset: offside,
            limit,
            order: [ ['id', 'ASC'] ],
        }

        const totalRows = await permohonan.count(config1);
        const totalPages = Math.ceil(totalRows / limit);

        const result = await permohonan.findAll(config2);
        
        if(!result){
            throw {statusCode: 400, message: 'Data permohonan tidak ditemukan'}
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Data permohonan ditemukan',
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

// post data Permohonan 
controller.post = async (req, res, next) => {
    try {
        
        /**
         * cari data akun staff
         * masukan id staff dan set pimpinan_id null
         * 
         */

        const email = req.user.data.email;
        const data = await pegawai.findOne({ where: {email} });

        if(!data) throw {statusCode: 400, message: 'anggota tidak ditemukan, silahkan daftar terlebih dahulu'}
        
        const {nama, id} = data.dataValues;
        const cond = checker(parseInt(req.body.cond));

        const reqData = {
            pinjam_id: req.body.pinjam_id,
            pimpinan_id: null,
            staff_id: id,
            tanggal_persetujuan: req.body.tanggal_persetujuan || d.toLocaleDateString('en-ca'),
            alasan: req.body.alasan,
            ...cond,
            created_by: nama,
            updated_by: nama
        };

        const result = await permohonan.create(reqData);

        if(!result) throw {statusCode: 400, message: 'Gagal membuat permohonan baru'}

        return res.status(201).json({
            status: 'Success',
            message: 'Berhasil mengajukan permohonan',
            data: result.dataValues
        });

    } catch (e) {
        next(e)
    }
};

// edit data permohonan
controller.edit = async (req, res, next) => {
    try {
        
        const email = req.user.data.email;

        const data = await pegawai.findOne({ where: {email} });

        if(!data) throw {statusCode: 400, message: 'anggota tidak ditemukan, silahkan daftar terlebih dahulu'}
        
        const {nama, id} = data.dataValues;

        const cond = checker(req.body.cond);
        console.log(checker);

        const reqData = {
            pinjam_id: req.body.pinjam_id,
            pimpinan_id: null,
            staff_id: id,
            tanggal_persetujuan: req.body.tanggal_persetujuan,
            alasan: req.body.alasan,
            ...cond,
            updated_by: nama
        };

        const idEdit = req.params.id;
        const [updatedRows] = await permohonan.update(reqData, { where: {id:idEdit} });

        // mengupdate pinjaman menjadi disetujui
        if(req.body?.cond){
            const [updatedRows] = await pinjam.update({is_done: 1}, { where: { id: pinjam_id} })
            if(!updatedRows) throw {statusCode:400, message: 'Gagal mengupdate status pinjaman'};
        }

        if(!updatedRows) throw {statusCode: 400, message: 'Gagal mengupdate data'}

        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil mengupdaate permohonan'
        })

    } catch (e) {
        next(e)
    }
};

// delete data permohonan
controller.destroy = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const status = !! await permohonan.destroy({where:{id}});

        if(!status) throw {statusCode: 400, message: 'Gagal menghapus data'}

        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil delete permohonan',
            id_permohonan: id
        })

    } catch (e) {
        next(e)
    }
}


module.exports = controller;