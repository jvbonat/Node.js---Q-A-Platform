//CRIANDO UM MODEL/TABELA DE BANCO DE DADOS EM JAVASCRIPT
const Sequelize = require('sequelize');
const connection = require('./database');


const Pergunta = connection.define('perguntas',{ //CRIANDO TABELA COM SEQUELIZE
     titulo:{ //CRIANDO CAMPO TITULO
         type:Sequelize.STRING,
         allowNull:false

     },
     descricao:{ //CRIANDO CAMPO DESCRIÇÃO
         type:Sequelize.TEXT,
         allowNull:false
     }
});

//Pergunta.sync({force:false}).then(()=>{}) //SINCRONIZANDO/CRIANDO OS CAMPOS NO BANCO DE DADOS

module.exports = Pergunta; //EXPORTANDO A VARIÁVEL PERGUNTA QUE CRIA OS CAMPOS E TABELA DO DB