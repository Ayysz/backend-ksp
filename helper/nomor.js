const { number } = require('./helper');
const {faker} = require('@faker-js/faker');
const d = new Date();

const Models = require('../models')
const m_anggota = Models.m_anggota

const chars = "T";
const count = "200";
const pad = count.padStart(3, '0')
const first = pad.padStart(4, chars);
const addr = "T001"

const main = async () => {
    const data = await number(m_anggota,'A')
    console.log(data)
}

main();
