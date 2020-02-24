const db = require('../../database/dbConfig.js');

module.exports = {
    add, find, findBy, findById,
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users')  
    .where(filter);
}

function findById(id) {
    return db('users').where({ id }).first();
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}





{/**function addUser(user) {
    return db('users').insert(user)
           .then(ids => {
               const [id] = ids;
               return findById(id)
           }) 
} */ }


// removeUser(id){
//     return db('users').where('id', id).del()
//         .then(count => {
//             return db('users');
//         }).then(users => {
//             return users;
//         })
// }