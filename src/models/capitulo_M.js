import mongoose from "mongoose";
const NewCapitulo = new mongoose.Schema({
    nombre_capitulo: String,
    numero_paginas:Number,
    visitas: { type: Number, default: 0 },
    ref_manga:{type:mongoose.Schema.Types.ObjectId, ref:'mangas'},
    ref_paginas:[{type:mongoose.Schema.Types.ObjectId, ref:'imagenesC'}]
}, { timestamps: true })
export default mongoose.model('capitulos', NewCapitulo)

