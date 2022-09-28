'use strict'

const d = new Date();
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const Models = require('../models');
const sequelize = Models.sequelize
const anggota = Models.m_anggota;
const attachment = Models.t_attachment;
const controller = {};


module.exports = controller;