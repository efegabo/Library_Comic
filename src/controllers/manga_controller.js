import cloudinary from 'cloudinary'
          
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
    await Promise.all(req.files.map(async(file)=>{
        const result = await cloudinary.v2.uploader.upload(file.path, {folder:'Portadas'});
        return {
            url: result.url,
            public_id: result.public_id
        }
    }))
    res.send("imagen guardada")
    
    console.log(req.files)
}