const Sequelize = require('sequelize'); //IMPORTANDO O MÓDULO DE SEQUELIZE(BANCO DE DADOS EM JAVASCRIPT)
const connection = new Sequelize('guiaperguntas', 'root', 'Gremiogaia@1234', {
    host: 'localhost',
    dialect: 'mysql'
}); //CRIANDO A CONEXÃO COM BANCO DE DADOS MYSQL

module.exports = connection; //EXPORTANDO A CONEXÃO