'use strict'

const Models = require('../models')
const role = Models.m_role;
const jenisKepemilikan = Models.m_jenis_kepemilikan;
const jenisTransaksi = Models.m_jenis_transaksi;
const controller = {};

controller.role = async (req, res, next) => {
    try {
        
        const data = await role.findAll();

        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil menemukan data',
            data
        })

    } catch (e) {
        next(e)
    }
};

controller.jenisKepemilikan = async (req, res, next) => {
    try {
        
        const data = await jenisKepemilikan.findAll();
    
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil menemukan data',
            data
        })
    
    } catch (e) {
        next(e)
    }
};

controller.jenisTransaksi = async (req, res, next) => {
    try {
        
        const data = await jenisTransaksi.findAll({
            attributes: {
                exclude: [
                    'jenis_transaksi_id'
                ]
            }
        });
    
        return res.status(200).json({
            status: 'Success',
            message: 'Berhasil menemukan data',
            data
        })
    
    } catch (e) {
        next(e)
    }
};

controller.uploadTest = (req, res, next) => {
    console.log(req.file.filename);
    try {
        
        res.status(201).json({
            namafile: req.file.filename,
            message: 'File upload successfully'
        })
        

    } catch (e) {
        next(e)
    }
}

module.exports = controller;