const db = require('../../database/dbConfig/js');
const Users = require('./users-model.js');

describe('users model', () => {
    describe('add', () => {
        it('should add provided user into the db on registration', async () => {
            await Users.add({ username: "bigJohn", password: "password" });
            
            const users = await db('users');
            expect(users).toHaveLength(1);
        });

        it(`should return the new registered user's meta data`);
user& id.length!=0 && token.length!=0;




    });
});