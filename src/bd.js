import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/library_comic', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Base de datos Establecida")
}).catch((err)=>{
    console.log("Error al conectar a la base de datos")
})

