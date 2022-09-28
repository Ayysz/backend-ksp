'use strict';

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize;
const pinjam = Models.t_pinjam;
const permohonan = Models.t_permohonan;
const attachment = Models.t_attachment;
const { dltFile } = require('../helper/fileDelete');
const controller = {};

// getAll data pinjaman
controller.getAll = async (req, res, next) => {
    try {
        
    } catch (e) {
        
    }
};

module.exports = controller;