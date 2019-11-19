const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

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
        raw: true, order: [
            ['id', 'DESC'] // DESC = decrescente && ASC = crescente
        ]
    }).then((perguntas) => {
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
        res.redirect("/")
    })
})

app.get("/perguntas/:id", (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {//pergunta achada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then((respostas) => {
                res.render("perguntas", {
                    pergunta: pergunta,
                    respostas: respostas
                })

            })


        } else { //pergunta nao encontrada
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/perguntas/" + perguntaId)
    })
})

app.listen(8080, () => {
    console.log("App rodando")
})