'use strict'

const request = require('supertest');
const server = require('../app');
const req = request.agent(server);
const {faker} = require('@faker-js/faker');

describe('Anggota routes API test', () => {
    
    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };
    
    const id = 3;

    const data = {
        no_anggota: faker.random.numeric(13),
        nama: faker.name.firstName(),
        no_hp: faker.phone.number('501-###-###'),
        no_ktp: faker.random.numeric(13,{allowLeadingZeros:true}),
        gender: faker.helpers.arrayElement(['pria', 'wanita']),
        tanggal_lahir: faker.date.birthdate({min:18, max:32, mode:'year'}),
        tempat_lahir: faker.address.cityName(),
        alamat: faker.address.secondaryAddress(),
        email: login.email,
        pekerjaan_id: faker.helpers.arrayElement([1,2]),
        bank_id: faker.helpers.arrayElement([1,2]),
    };

    // sebelum memulai setiap test
    beforeAll(async() => {
        await req
        .post('/api/v1/login')
        .send(login)
        .expect(200)
    });

    it('Getall data anggota', async () => {
        const res = await req.get('/api/v1/anggota')
        expect(res.statusCode).toEqual(200);
    }),

    it('Post data anggota', async () => {
        const res = await req.post('/api/v1/anggota').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data')
        expect(res.body).toMatchObject({status: "Success"});
    }),

    it(`Edit data anggota dengan id ${id}`, async () => {
        const data = {
            no_anggota: faker.random.numeric(13),
            nama: faker.name.firstName(),
            no_hp: faker.phone.number('501-###-###'),
            no_ktp: faker.random.numeric(13,{allowLeadingZeros:true}),
            gender: faker.helpers.arrayElement(['pria', 'wanita']),
            tanggal_lahir: faker.date.birthdate({min:18, max:32, mode:'year'}),
            tempat_lahir: faker.address.cityName(),
            alamat: faker.address.secondaryAddress(),
            email: login.email,
            pekerjaan_id: faker.helpers.arrayElement([1,2]),
            bank_id: faker.helpers.arrayElement([1,2]),
            is_staff: 1,
        };
        const res = await req.put(`/api/v1/anggota/${id}`).send(data);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'})
    }),

    it(`Delete data anggota dengan id ${id}`, async () => {
        const res = await req.delete(`/api/v1/anggota/${id}`);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({status: 'Success'})
    });

    server.close();

});