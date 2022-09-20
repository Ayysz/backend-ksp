'use strict'

const request = require('supertest');
const server = require('../app');
const { faker } = require('@faker-js/faker');
const req = request.agent(server);

describe('Jabatan routes API test', () => {

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

    it('Getall data jabatan', async () => {
        const res = await req.get('/api/v1/jabatan');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it('Create data jabaatan', async () => {
        const data = {
            jabatan: faker.name.jobTitle(),
            desc: faker.lorem.sentence(7)
        }
        const res = await req.post('/api/v1/jabatan').send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data')
        expect(res.body).toMatchObject({status: 'Success'})
    }),

    it('Edit data jabatan ', async () => {
        const id = 12;
        const data = {
            jabatan: faker.name.jobTitle(),
            desc: faker.lorem.sentence(7),
        }
        const res = await req.put(`/api/v1/jabatan/${id}`).send(data);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({status: 'Success'})
    }),

    it('delete data jabatan', async () => {
        const id = 12;
        const res = await req.delete(`/api/v1/jabatan/${id}`);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({status: 'Success'});
    });
    

    server.close();
});