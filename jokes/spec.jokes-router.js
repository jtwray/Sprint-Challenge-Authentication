
const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');
let token;

// beforeAll will run this code before any of the tests in this file run
beforeAll(() => {
    db('users').truncate()
    return request(server)
        .post('/api/auth/register')
        .send({ username: 'twray', password: 'tpassword' })
        .end((error, response) => {
            !error ?
                token = response.body.token
                : console.error(error)
        });
});

describe('jokes-router', () => {

    describe('GET "/" from jokes API', () => {
        it('should respond with STATUS: ---"200 OK"---', () => {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                });
        });
        it('should respond with TYPE: ---"JSON object"---', () => {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                });
        });
        it('should respond with DATA:---"jokes"---', () => {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res).toContain(data.results);
                });
        });
    })
})
