const request = require('supertest');
const server = require('../app');
const req = request.agent(server);
const {faker} = require('@faker-js/faker');

describe('NamaBank routes API test', () => {
    
    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };

    const id = 4;

    const namaBank = [
        "BISA",
        "Berdiri",
        "Jago"
    ];

    const setData = () => {
        return data = {
            nama_bank: faker.helpers.arrayElement(namaBank)
        }
    };

    beforeAll(async() => {
        await req
        .post('/api/v1/login')
        .send(login)
        .expect(200);
    });

    beforeEach(() => {
        setData()
    });

    it('GetAll data namaBank', async () => {
        const res = await req.get('/api/v1/namaBank')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it('Post data namaBank', async () => {
        const res = await req.post('/api/v1/namaBank').send(data)
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),
    
    it(`Edit data namaBank id ${id}`, async () => {
        const res = await req.put(`/api/v1/namaBank/${id}`).send(data)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it(`Delete data namaBank id ${id}`, async () => {
        const res = await req.delete(`/api/v1/namaBank/${id}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({status: 'Success'});
    });

    server.close();
});