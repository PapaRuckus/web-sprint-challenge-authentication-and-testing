const db = require('../../data/dbConfig')

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id)
}

function findById(id) {
    return db("users").where({id}).first()
}

function getAll() {
    return db('users')
}
function findByUsername(username) {
  return db("users").where({ username }).first();
}

module.exports = {
  add,
  findById,
  getAll,
  findByUsername,
};