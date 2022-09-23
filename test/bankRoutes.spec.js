const request = require('supertest');
const server = require('../app');
const req = request.agent(server);
const {faker} = require('@faker-js/faker');

describe('Bank routes API test', () => {
    
    const login = {
        email: "adamGrahamBell@gmail.com",
        password: "13102004",
    };
    
    const id = 3;

    const setData = () => {
        return data = {
            nama_bank_id: faker.helpers.arrayElement([1,2,3]),
            nama_pemilik_bank: faker.name.firstName(),
            no_rek: faker.random.numeric(16)
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

    it('Getall data bank ', async () => {
        const res = await req.get('/api/v1/bank');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it('Post data bank', async () => {
        const res = await req.post('/api/v1/bank').send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it(`Edit data bank id ${id}`, async () => {
        const res = await req.put(`/api/v1/bank/${id}`).send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toMatchObject({status: 'Success'});
    }),

    it(`Delete data bank id ${id}`, async () => {
        const res = await req.delete(`/api/v1/bank/${id}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({status: 'Success'});
    });

    server.close();
});