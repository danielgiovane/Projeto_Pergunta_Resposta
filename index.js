const express = require("express")
const app = express()
const bodyParser = require("body-parser")

// Estou dizendo para express para usar ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// rotas
app.get("/", (req,res) => {
    
    res.render("index")
})   

app.get("/pergunta", (req,res) => {
    res.render("pergunta")
})

app.post("/salvarPergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("titulo"+ titulo)
})

app.listen(8080,() => {
    console.log("App rodando")
})