//CRIANDO O MODEL DE RESPOSTAS
const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define("respostas", {
    corpo: { //DESCRIÇÃO DA RESPOSTA
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{ //ID DA PERGUNTA QUE EU RESPONDI ATRELADA À RESPOSTA(RELACIONAMENTO ENTRE TABELAS)
        type:Sequelize.INTEGER,
        allowNull:false
        
    }


});

Resposta.sync({force:false});
module.exports = Resposta; //EXPORTANDO O MODEL DE RESPOSTAS