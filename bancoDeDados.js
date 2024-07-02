const mongoose = require("mongoose")
require("dotenv").config


//async atender o primeiro paramento
async function conectaBancoDeDados() {
   try {
        console.log("Conexão banco de dados iniciou")
    
    //await não pare de atender
        await mongoose.connect(process.env.MONGO_URL)

        console.log("Conexão com o banco de dados feita com sucesso")
    } catch(erro) {
        console.log(erro)

    }
}

module.exports = conectaBancoDeDados