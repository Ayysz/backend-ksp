'use strict'

const server = require('../app');
const req = require('supertest').agent(server);
const {faker} = require('@faker-js/faker');
var data;

describe('Pekerjaan routes API test', () => {
    
    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };

    const dummy = {
        pekerjaan: 'project manager',
        desc: 'Who handle all project in company'
    }

    const id = 4;

    const setData = () => {
        return data = {
            pekerjaan: faker.name.jobTitle(),
            desc: faker.lorem.sentence(5)
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

    it('Getall data pekerjaan', async () => {
        const res = await req.get('/api/v1/pekerjaan')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body).toMatchObject({status: 'Success'})
    });

    it('Create data pekerjaan', async () => {
        const res = await req.post('/api/v1/pekerjaan').send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    });

    it('Create data pekerjaan error cause duplicate', async () => {
        const res = await req.post('/api/v1/pekerjaan').send(dummy);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({status: 'Error'});
    });

    it(`Edit data pekerjaan ${id}`, async () => {
        const res = await req.put(`/api/v1/pekerjaan/3`).send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({status: 'Success'});
    });
    
    it(`Delete data pekerjaan id ${id}`, async () => {
        const res = await req.delete(`/api/v1/pekerjaan/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({status: 'Success'});
    });

    server.close();
});