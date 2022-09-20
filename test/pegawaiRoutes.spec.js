'use strict'

const request = require('supertest');
const server = require('../app');
// const req = request(server);
const {faker} = require('@faker-js/faker');
const req = request.agent(server);

describe('Pegawai routes API test', () => {

    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };

    // sebelum memulai setiap test
    beforeAll(async() => {
        await req
        .post('/api/v1/login')
        .send(login)
        .expect(200)
    });


    it('Getall data pegawai', async() => {
        const res = await req.get('/api/v1/pegawai');
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')        
        expect(res.body).toMatchObject({status: 'Success'})
    }),


    it('Create data pegawai baru', async() => {
        const data = {
            no_pegawai: faker.random.numeric(13),
            nama: faker.name.firstName(),
            no_hp: faker.phone.number('501-###-###'),
            no_ktp: faker.random.numeric(13,{allowLeadingZeros:true}),
            gender: faker.helpers.arrayElement(['pria', 'wanita']),
            tanggal_lahir: faker.date.birthdate({min:18, max:32, mode:'year'}),
            tempat_lahir: faker.address.cityName(),
            alamat: faker.address.secondaryAddress(),
            email: login.email,
            jabatan_id: 3,
        };
        const res = await req.post('/api/v1/pegawai').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toMatchObject({status: 'Success'})
        expect(res.body).toHaveProperty('data')
    }),

    it('Mengahapus data pegawai', async() => {
        const id = 15;
        const res = await req.delete(`/api/v1/pegawai/${id}`);
        expect(res.statusCode).toEqual(400); 
        // expect(res.statusCode).toEqual(200);
    }),

    it('mengedit data pegawai', async() => {
        const id = 13;
        const data = {
            no_pegawai: faker.random.numeric(13),
            nama: faker.name.firstName(),
            no_hp: faker.phone.number('501-###-###'),
            no_ktp: faker.random.numeric(13,{allowLeadingZeros:true}),
            gender: faker.helpers.arrayElement(['pria', 'wanita']),
            tanggal_lahir: faker.date.birthdate({min:18, max:32, mode:'year'}),
            tempat_lahir: faker.address.cityName(),
            alamat: faker.address.secondaryAddress(),
            email: login.email,
            jabatan_id: 3,
        };

        const res = await req.put(`/api/v1/pegawai/${id}`).send(data)
        expect(res.statusCode).toEqual(200)
    })
    

    // close server when test complete
    server.close();
});