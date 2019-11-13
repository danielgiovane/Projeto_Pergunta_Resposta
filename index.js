const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")

connection.authenticate().then(() => {
    console.log("Conexao feita com o banco de dados")
})
    .catch((msgErro) => {
        console.log(msgErro)
    })

// Estou dizendo para express para usar ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order:[
            ['id', 'DESC'] // DESC = decrescente && ASC = crescente
        ]}).then((perguntas) => {
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        })
    })

})

app.get("/pergunta", (req, res) => {
    res.render("pergunta")
})

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        if(titulo == "" || descricao == ""){
           alert = 'mensagem'
        }else{
        res.redirect("/")
    }
    })
})

app.listen(8080, () => {
    console.log("App rodando")
})