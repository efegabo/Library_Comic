import dotenv from 'dotenv'
dotenv.config();
import cloudinary from 'cloudinary'
import fs from 'fs-extra';
import  portada from '../models/manga_P.js'
import capitulo from '../models/capitulo_M.js'
import imgs from '../models/imagenes_C.js'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const formPortada =(req, res)=>{
    res.render('manga_P')
    console.log("imagen subida")
     
}

export const sendPortada= async(req, res)=>{
    //subir imagen a Cloudinary
    const {title, description, num_cap, genero, emision} = req.body;
    const clouRes= await Promise.all(req.files.map(async(file)=>{
        const result = await cloudinary.v2.uploader.upload(file.path, {folder:'Portadas'});
        return {
            url: result.url,
            public_id: result.public_id
             /*
        [
           {
        url: 'https://cloudinary.com/your-image-url-1.jpg',
        public_id: 'public_id_1'
           },
           {
        url: 'https://cloudinary.com/your-image-url-2.jpg',
        public_id: 'public_id_2'
           }
        ]
        */
        }
        
    }))
        const newPorta= clouRes.map((result, index)=>{
            return new portada({
                title, 
                description, 
                num_cap,
                genero, 
                emision, 
                imageUrl: result.url, 
                public_id: result.public_id
            })
        })
        await portada.insertMany(newPorta)
            /*
        [
                {
        title: "Mi Manga",
        description: "Descripción de mi manga",
        num_cap: 10,
        genero: "Aventura",
        emision: "En curso",
        imageURL: "https://cloudinary.com/your-image-url-1.jpg",
        public_id: "public_id_1"
              },
               {
                }
        ]
             */
        await req.files.map(file=>fs.unlink(file.path))
        res.redirect('/formC')
        
     console.log(req.files)
}  

export const formCapitulo = (req, res)=>{
        res.render('capitulo_M')
}

export const sendCapitulo = async (req, res)=>{
    try {
        const {nombre_capitulo, numero_paginas, imgId} = req.body;
        const idport = await portada.findById(imgId)
    
        const newCap = new capitulo({
            nombre_capitulo, numero_paginas, ref_manga:idport._id
        })
    
        const capSave = await capitulo.insertMany(newCap)
        idport.ref_capitulo= idport.ref_capitulo.concat(capSave.map(cap => cap._id))
        await idport.save()
        console.log(capSave)
        res.send("capitulo guardado")
    }   catch(err){
        console.error("error al enviar el capitulo", err)
        res.status(500).send("error al enviar el capitulo")
    }
    
}

export const formImagenes =  (req, res)=>{
    res.render("imagenes_C")
}

export const sendImagenes = async(req, res)=>{
    try{
        const {imgsId} = req.body
    const idCapi =  await capitulo.findById(imgsId)
    const clouRes= await Promise.all(req.files.map(async(file)=>{
        const result = await cloudinary.v2.uploader.upload(file.path, {folder:'capitulos'});
        return {
            url: result.url,
            public_id: result.public_id
        }
        
    }))
    const newImages = clouRes.map((result, index)=>{
        return new imgs({
            idImg:idCapi._id,
            imageURL:result.url,
            public_id:result.public_id
        })
    })
    const savImg = await imgs.insertMany(newImages)
    idCapi.ref_paginas = idCapi.ref_paginas.concat(savImg.map(img=>img._id))
    await req.files.map(file=>fs.unlink(file.path))
    await idCapi.save()
    console.log("imagenes subidas")
    res.send("imagenes guardadas")
    }catch(err){
        console.error("error al enviar las imagenes", err)
    }
}

export const indexPortada= async(req, res)=>{
    const portadas = await portada.find({}).lean()
    res.render('./manga_client/index', {portadas})
}

export const infoCpitulo= async(req, res)=>{
    const infoCapitul = await portada.findById(req.params.id).populate(
{       
    path:'ref_capitulo'
}
    ).lean()
    res.render('./manga_client/manga_info', {infoCapitul})
}

export const imgsCaps = async(req, res)=>{
    const imgCap= await capitulo.findById(req.params.id).populate({
        path:'ref_paginas'
    }).lean()
    res.render('./manga_client/imgs_Cap', {imgCap})

    console.log(req.params.id)
}


 //buscar siguiente id
 export const next = async(req,res)=>{
    //
    try{
        let actualId = req.params.id
    //obetengo el id del comic actual
    const actualPortada = await capitulo.findById(req.params.id).populate({
        path:'ref_paginas'
    }).lean()

        //comparo el id del comic actual con uno mayor dentro del mismo comic
    const SiguentePortaInfs = await capitulo.findOne({_id: {$gt: actualId}, ref_manga: actualPortada.ref_manga}).populate({
        path:'ref_paginas'
    }).lean()
     console.log(SiguentePortaInfs)
    //si hay un id mayor renderiza la ruta
     if(SiguentePortaInfs){
        res.render('./manga_client/imgs_Cap', {imgCap:SiguentePortaInfs })
     }
     else{
        res.render('./manga_client/imgs_Cap', {imgCap:actualPortada })
       console.log("no hay mas capitulo")
     }
    }catch(err){
        console.error("error", err)
    }
     
}
//capitulo anterior

 
