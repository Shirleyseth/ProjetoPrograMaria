const express = require("express") //iniciando o express
const router = express.Router() //configurando 1º parte da rota
/*const { v4: uuidv4 } = require('uuid')*/
const cors = require("cors") //estou trazendo o pacote cors que permite consumir essa api mo front end
const conectaBancoDeDados = require("./bancoDeDados") //ligando ao arquivobanco de dados
conectaBancoDeDados() //chamando a função de conecta o banco de dados

const Mulher = require("./mulherModel")

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando a porta

//lista inical de mulheres
/*const mulheres = [ {

    id: "1",
    nome: "Shirley Mello",
    imagem: "https://github.com/Shirleyseth",
    minibio: "Aspirante a programação desde 2021"
},
{   
    id: "2",
    nome: "Iana Chan",
    imagem: "https://bit.ly/3JCXBqP",
    minibio: "Fundadora PrograMaria"
},
{
    id: "3",
    nome: "Nina da Hora",
    imagem: "https://bit.ly/3FKpFaz",
    minibio: "Hacker antiracista"
}]*/


//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)

    }catch(erro) {
        console.log(erro)
     } 
}
 //POST 
 async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        /*id: uuidv4(),*/
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio, 
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

    }catch(erro) {
        console.log(erro)
     } 

 }


//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if(request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if(request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if(request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizaBancoDeDados= await mulherEncontrada.save()
        response.json(mulherAtualizaBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    /*function todasMenosEla(mulher) {
        if(mulher.id !== request.params.id) {
          return mulher         
    }
}
    const mulheresQueFicam = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicam)*/
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: "Mulher deletada com sucesso!"})

 }  catch (erro) {
         console.log(erro)
 }

}


app.use(router.get("/mulheres", mostraMulheres)) //configurar rota GET / mulheres
app.use(router.post("/mulheres", criaMulher)) //configurar rota POST / mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher )) //configurar rota PATCH / mulheres/:id
app.use(router.delete("/mulheres/:id", deletaMulher )) //configurar rota DELETE / mulheres

 //PORTA
 function mostraPorta() {
    console.log ("Servidor criado e rodando na porta", porta)
} 

app.listen(porta, mostraPorta) //servidor ouvindo a porta

