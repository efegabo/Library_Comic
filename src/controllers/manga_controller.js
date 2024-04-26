import cloudinary from 'cloudinary'
import fs from 'fs-extra';
import  portada from '../models/manga_P.js'
import capitulo from '../models/capitulo_M.js'
cloudinary.config({ 
  cloud_name: 'dagjjmraf', 
  api_key: '923334742718338', 
  api_secret: 'WK00Yxe6ExwJjbo0BlyZN6DHaiA' 
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
    const {nombre_capitulo, numero_paginas, imgId} = req.body;
    const idport = await portada.findById(imgId)

    const newCap = new capitulo({
        nombre_capitulo, numero_paginas, idport:idport._id
    })
    const capSave = await capitulo.insertMany(newCap)
    idport.ref_capitulo= idport.ref_capitulo.concat(capSave.map(cap => cap._id))
    await idport.save()
    console.log(capSave)
    res.send("capitulo guardado")
}