import mongoose from "mongoose";
const NewImagenes_C = new mongoose.Schema({
    idImg:{type: mongoose.Schema.Types.ObjectId},
    imageURL:String,
    public_id:String
})

export default mongoose.model('imagenesC', NewImagenes_C)