const express = require('express'); //IMPORTANDO O MÓDULO DO EXPRESS
const app = express(); //USANDO O EXPRESS ATRAVÉS DA VARIÁVEL APP
const bodyParser = require('body-parser') //INSERINDO O BODYPARSER DENTRO DE UMA VARIÁVEL
app.set('view engine', 'ejs');//DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.use(express.static('public'))//CRIANDO PASTA PARA ARQUIVOS ESTATICOS(CSS,IMAGENS,ETC.)
const connection = require("./database/database") //CARREGANDO A CONEXÃO NO ARQUIVO JAVASCRIPT PRINCIPAL
const Pergunta = require("./database/Pergunta") //IMPORTANDO O MODEL DE BANCO DE DADOS PARA O ARQUIVO PRINCIPAL
const Resposta = require("./database/Resposta")//IMPORTANDO O MODEL DE BANCO DE DADOS PARA O ARQUIVO PRINCIPAL
//Database
connection //ESTRUTURA PROMISE(AUTENTICAÇÃO COM BANCO DE DADOS)
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });
app.use(bodyParser.urlencoded({ extended: false }))//USANDO O BODY-PARSER PARA ''TRADUZIR'' O FORMULÁRIO PARA UMA ESTRUTURA JAVASCRIPT
app.use(bodyParser.json()); // ESTRUTURA USADA PARA API'S
//BODY-PARSER DISPONIBILIZA O OBJETO BODY PARA SALVARMOS INFORMAÇÕES ENVIADAS ATRAVÉS DE FORMULÁRIOS

//ROTAS

//ROTA INICIAL DA APLICAÇÃO(ROTA "/")
app.get("/", (req, res) => {
    Pergunta.findAll({//BUSCANDO AS PERGUNTAS
        raw: true, order: [
            ['id', 'DESC'] //LISTANDO AS PERGUNTAS ATRAVÉS DO ID DE FORMA DECRESCENTE(+NOVA PARA +ANTIGA)

        ]
    }).then(perguntas => { //LISTANDO AS PERGUNTAS FEITAS(PERGUNTAS = NOME DA VARIÁVEL QUE RECEBE AS PERGUNTAS)
        res.render("index", {//CARREGANDO AS PERGUNTAS NO FRONT-END ATRAVÉS DA VARIÁVEL PERGUNTAS
            perguntas: perguntas //CRIANDO A VARIÁVEL PERGUNTAS QUE RECEBE AS PERGUNTAS DO BANCO DE DADOS
        });
    });
});

//ROTA PARA CRIAÇÃO DE PERGUNTAS DO SITE
app.get("/perguntar", (req, res) => {

    res.render('perguntar');//CARREGA A VIEW PERGUNTAR

});

app.post("/salvarpergunta", (req, res) => { //ROTA 'POST' QUE SALVA OS DADOS DO FORMULÁRIO ENVIADOS PELO USUÁRIO
    var titulo = req.body.titulo; //PEGANDO O TÍTULO DO FORMULÁRIO HTML
    var descricao = req.body.descricao; //PEGANDO A DESCRIÇÃO DO FORMULÁRIO
    Pergunta.create({ //INSERT NA TABELA PERGUNTAS
        titulo: titulo,//SALVANDO A INFORMAÇÃO TÍTULO DA PERGUNTA NO BANCO DE DADOS DENTRO DA TABELA TITULO
        descricao: descricao//SALVANDO A INFORMAÇÃO DESCRIÇÃO DA PERGUNTA NO BANCO DE DADOS DENTRO DA TABELA DESCRICAO
    }).then(() => {
        res.redirect("/")//REDIRECIONANDO O USUÁRIO PARA PÁGINA PRINCIPAL APÓS SALVAR AS INFORMAÇÕES 
    });
});

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id //INSERINDO NA VARIÁVEL id o 'id' fornecido pelo usuário através do parâmetro
    Pergunta.findOne({ //BUSCANDO PERGUNTA PELO ID

        where: { id: id } //FAZENDO UMA BUSCA PARA VER SE O ID DA PERGUNTA DIGITADO É VÁLIDO


    }).then(pergunta => {//INSERINDO A PERGUNTA ACHADA DENTRO DA VARIÁVEL PERGUNTA
        if (pergunta != undefined) { //PERGUNTA ENCONTRADA
            Resposta.findAll({
                where: { perguntaId: pergunta.id },//ID DA RESPOSTA(perguntaId) = ID DA PERGUNTA(pergunta.id)
                order:[
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {//ACHOU PERGUNTA = REDIRECIONA PARA PAGINA DE PERGUNTAS
                    pergunta:pergunta, //INSERINDO AS PERGUNTAS ENCONTRADAS DENTRO DA VARIAVEL PERGUNTA PARA APARECER NA PAGINA
                    respostas:respostas
                });
            });
        } else {//PERGUNTA NÃO ENCONTRADA
            res.redirect("/"); //NÃO ACHOU PERGUNTAS = REDIRECIONA PARA PAGINA PRINCIPAL
        }
    });

});

//ROTA DE RESPOSTAS
app.post("/responder", (req, res) => {

    var corpo = req.body.corpo; //PEGANDO O CORPO DA RESPOSTA DO FORMULÁRIO
    var perguntaId = req.body.pergunta; //PEGANDO O ID DA PERGUNTA ATRELADA A RESPOSTA

    Resposta.create({

        corpo: corpo, //CORPO DA RESPOSTA DO BANCO DE DADOS RECEBENDO A DESCRIÇÃO DA RESPOSTA ATRAVES DA VARIAVEL CORPO
        perguntaId: perguntaId//ATRELANDO O ID DA PERGUNTA AO CAMPO DE ID DA PERGUNTA NO BANCO DE RESPOSTAS
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);//REDIRECIONANDO O USUARIO PARA PERGUNTA RESPONDIDA

    });

});

//INICIALIZANDO O SERVIDOR NA PORTA 7700(Local:Host)
app.listen(7700, () => {
    console.log('Aplicação rodando!')
});




