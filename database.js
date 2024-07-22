const { Sequelize } = require('sequelize');
const psqlLogin = require('./psql_login.json');

const sequelize = new Sequelize(`postgres://${psqlLogin.username}:${psqlLogin.password}@127.0.0.1:5432/buckshot`, {
    logging:false
});

module.exports = sequelize;