const express = require('express')
const cors = require ('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors('http://local:3000'))
const port = 5001


const Contato = mongoose.model('Contato', {
    nome: String,
    tel: String,
    nascimento: String,
    cep: String,
    endereco: String
});

app.get("/usuarios", async (req, res) => {
    const contatos = await Contato.find()
    return res.send(contatos)
})

app.delete("/usuarios/:_id", async (req, res) => {
    const contatos = await Contato.findByIdAndDelete(req.params._id)
    return res.send(contatos)
})

app.put("/usuarios/:_id", async (req, res) => {
    const contatos = await Contato.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        tel: req.body.tel,
        nascimento: req.body.nascimento,
        cep: req.body.cep,
        endereco: req.body.endereco
    })
    return res.send(contatos)
})

app.post("/usuarios", async (req, res) => {
    const contatos = new Contato({
        nome: req.body.nome,
        tel: req.body.tel,
        nascimento: req.body.nascimento,
        cep: req.body.cep,
        endereco: req.body.endereco
    })
    await contatos.save()
    return res.send(contatos)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://TavaresFabiano:OgeaAR0vnXMDmcuk@cluster0.3sk3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Jesus!")
})

