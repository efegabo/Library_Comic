 
import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";
 
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Base de datos Establecida")
}).catch((err)=>{
    console.log("Error al conectar a la base de datos", process.env.MONGODB_URI)
    console.error(err)
})



