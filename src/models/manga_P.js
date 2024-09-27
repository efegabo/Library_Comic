import mongoose from "mongoose";
const NewManga = new mongoose.Schema({
    mangaId:{type: mongoose.Schema.Types.ObjectId},
    title: String, 
    description: String,
    num_caps:Number,
    emision: String, 
    genero:String,
    ref_capitulo:[{type:mongoose.Schema.Types.ObjectId, ref:'capitulos'}],
    imageUrl:String,
    public_id:String
}, { timestamps: true }); // Esta opción agrega createdAt y updatedAt)
export default mongoose.model("mangas", NewManga)