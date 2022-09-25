'use strict'

const server = require('../app');
const req = require('supertest').agent(server);
const {faker} = require('@faker-js/faker');
var data;

describe('Transaksi routes API test', () => {
    
    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };

    const dummy = [
        'Admin',
        'Staff',
        'Member',
        'Leader'
    ];

    const id = 4;

    const setData = () => {
        return data = {
            no_transaksi: faker.datatype.uuid(),
            anggota_id: faker.helpers.arrayElement([1,2,3]),
            jenis_transaksi_id: faker.helpers.arrayElement([1,2]),
            bank_id: faker.helpers.arrayElement([1,2,3]),
            tanggal_transaksi: faker.date.soon(20),
            jumlah: faker.datatype.float({max: 100}),
            created_by: faker.helpers.arrayElement(dummy),
            updated_by: faker.helpers.arrayElement(dummy),
        }
    };

    // sebelum memulai setiap test
    beforeAll(async() => {
        await req
        .post('/api/v1/login')
        .send(login)
        .expect(200)
    });

    beforeEach(() => {
        setData()
    });

    it('Getall data transaski', async () => {
        const res = await req.get('/api/v1/transaksi');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    });

    server.close();
});