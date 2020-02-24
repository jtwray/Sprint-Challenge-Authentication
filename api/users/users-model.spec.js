const db = require('../../database/dbConfig.js');
const Users = require('./users-model.js');

describe('users model', () => {
    describe(' add', () => {
        it('should add provided user into the db on registration', async () => {
            return db('users').truncate()
            await Users.add({ username: "bigJohn", password: "password" });
            
            const users = await db('users');
            expect(users).toHaveLength(1);
        });

        it(`should return the new registered user's meta data`, async()=>{
          return db('users').truncate()
            let newUserData= await Users.add({username:"bigJohn", password:"password"});
            expect(newUserData).toContain('user'&&'id'&&'token');
          
            
        });
        it(`should return the new registered user's meta data`, async()=>{
            return db('users').truncate()
            let newUserData= await Users.add({username:"bigJohn", password:"password"});
            expect(newUserData).toContain('user'&&'id'&&'token');
          
            
        });
        
    });
    describe(' / login', () => {
        it('should add provided user into the db on registration', async () => {
            return db('users').truncate()
            await Users.add({ username: "bigJohn", password: "password" });
            
            const users = await db('users');
            expect(users).toHaveLength(1);
        });

        it(`should return the new registered user's meta data`, async()=>{
            return db('users').truncate()
            let newUserData= await Users.add({username:"bigJohn", password:"password"});
            expect(newUserData).toContain('user'&&'id'&&'token');
            
        });

    });
    
});


// login

