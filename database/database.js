const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas','root','d86g31f2030',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection