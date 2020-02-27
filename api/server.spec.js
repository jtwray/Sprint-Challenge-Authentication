const server = require('./server.js');
const request = require('supertest');
const db = require('../')
describe('server.js', () => {
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    // test for GET/
    describe('GET /', () => { 

        it('should return 200 ', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
        it('should be json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('should return the right object', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'uppp' });
        })
    });
});