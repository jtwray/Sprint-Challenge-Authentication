
const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');
let token;

// beforeAll will run this code before any of the tests in this file run
// beforeAll(async (done) => {
//   await db('users').truncate();
//   return request(server)
//     .post('/api/auth/register')
//     .send({ username: 'twray', password: 'tpassword', email: "t@twray.com" })
//     .end((error, response) => {
//       token = response.body.token;
//       console.error("token-------------------->", token, response);
//       done();
//     });
// });

describe('jokes-router', () => {

  describe('GET "/" from jokes API', () => {
    it('should respond with STATUS: ---"200 OK"---', async () => {
      await db('users').truncate();
      const registered = await request(server)
        .post('/api/auth/register')
        .send({ username: 'twray', password: 'tpassword', email: "t@twray.com" });

      const jokes = await request(server)
        .get('/api/jokes')
        .set(authorization, registered.body.token )
        .then(res => {
          console.error(`registered.body.token, ${registered.body.token}`);
          expect(res.status).toBe(200);
          expect(res.type).toBe('application/json');
        });
    });
    // it('should respond with STATUS: ---"200 OK"---', async () => {
    //   await db('users').truncate();
    //   const registered = await request(server)
    //     .post('/api/auth/register')
    //     .send({ username: 'twray', password: 'tpassword', email: "t@twray.com" });

    //   const jokes = await request(server)
    //     .get('/api/jokes')
    //     .send({ req.headers.authorization: registered.body.token })
    //     .then(res => {
    //       console.error(`registered.body.token, ${registered.body.token}`);
    //       expect(res.status).toBe(200);
    //       expect(res.type).toBe('application/json');
    //     });
    // });
    // it('should respond with TYPE: ---"JSON object"---', () => {
    //   return request(server)
    //     .get('/api/jokes')
    //     .set('Authorization', `${token}`)
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //       expect(res.type).toBe('application/json');
    //     });
    // });
    // it('should respond with DATA:---"jokes"---', () => {
    //   return request(server)
    //     .get('/api/jokes')
    //     .set('Authorization', `${token}`)
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //       expect(res).toContain(data.results);
    //     });
    // });
  })
})
