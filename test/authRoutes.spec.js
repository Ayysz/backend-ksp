const request = require('supertest');
const server = require('../app');
const req = request(server);
const {faker} = require('@faker-js/faker');

// membuat dummy data dengan faker.js
const data = {
    email: faker.internet.email(),
    password: faker.random.numeric(13)
};
const dummy = {
    email: 'lalala@gmail.com',
    password: '1331321412',
};


describe('Auth routes API test', () => {
    
    it('sign up membuat user baru', async () => {
        const res = await req.post('/api/v1/signup').send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data');
    }),

    it('Login dengan error karna user tidak terdaftar', async() =>{
        const res = await req.post('/api/v1/login').send(dummy);
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchObject({status: 'Error'})
    }),

    it('login dengan user yang baru dibuat', async() => {
        const res = await req.post('/api/v1/login').send(data);
        expect(res.statusCode).toEqual(200)
        expect(res.header).toHaveProperty('set-cookie');
        expect(res.body).toMatchObject({status: 'success'})
    })

    // close server when test complete
    server.close()
});
