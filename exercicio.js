/*const express = require('express'); //IMPORTANDO O MÓDULO DO EXPRESS PARA CRIAÇÃO DE ROTAS
const app = express();//INICIALIZANDO O EXPRESS ATRAVÉS DA VARIÁVEL APP

//DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.set('view engine','ejs');
app.use(express.static('public'))//CRIANDO PASTA PARA ARQUIVOS ESTATICOS(CSS,IMAGENS,ETC.)

//CRIANDO ROTA INICIAL/PRINCIPAL DO SITE
app.get("/:nome/:lang",(req,res)=>{
    var nome = req.params.nome; //CRIANDO VARIÁVEIS PARA SEREM EXIBIDAS NO FRONT-END //PEGANDO PARAMETRO
    var lang = req.params.lang;//CRIANDO VARIÁVEIS PARA SEREM EXIBIDAS NO FRONT-END //PEGANDO PARAMETRO
    var exibirMsg = false;
    var produtos = [// CRIANDO UM ARRAY DE PRODUTOS EM JAVASCRIPT
        {nome:'Doritos',preco:3.50},
        {nome:'Coca-Cola',preco:3.20},
        {nome:'Leite',preco:2.80},
        {nome:'Carne',preco:15},
        {nome:'Redbull',preco:6},
        {nome:'Nescau',preco:4}
    ] 

       
    res.render('index',{ //CRIANDO VARIÁVEIS DENTRO DO ARQUIVO EJS QUE SERÁ CARREGADO
        nome:nome, // O QUE IMPORTA É O PRIMEIRO NOME PARA EXIBIR NO HTML
        lang:lang,
        empresa:'Zaffari',
        inscritos:8000,
        msg:exibirMsg,
        produtos:produtos

    });

})

//CRIANDO O SERVIDOR NA PORTA 5600
app.listen(5600,()=>{console.log("App rodando!")});*/
