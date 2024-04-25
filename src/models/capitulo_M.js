import mongoose from "mongoose";
const NewCapitulo = new mongoose.Schema({
    nombre_capitulo: String,
    numero_paginas:Number,
    ref_manga:{type:mongoose.Schema.Types.ObjectId, ref:'mangas'},
    ref_paginas:[{type:mongoose.Schema.Types.ObjectId, ref:'imagenesC'}]
})
export default mongoose.model('capitulos', NewCapitulo)

