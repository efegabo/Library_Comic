//imports
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
import express from 'express'
 
import multer from 'multer';
import {dirname, join} from 'path'
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars'
import manga_router from './routes/manga.js'


//initialitationes 
  
const app = express()
const PORT = process.env.PORT;
 
import "./bd.js"
const __dirname= dirname(fileURLToPath(import.meta.url))
//setting
app.set('views', join(__dirname, 'views'))
 const hbs = exphbs.create({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'), 'layouts'),
    partialsDir:join(app.get('views'), 'partials'),
    extname:'.hbs'
 })

 app.engine(".hbs", hbs.engine)
 app.set("view engine", ".hbs")
//midelwares 

app.use(express.json());
app.use(express.urlencoded({extended: false}))
 
//subir imagenes con multer
const storage =multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), 
    filename:(req, file, cb)=>{
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).array('images'))

//routes
app.use(manga_router)
//archivos estaticos
app.use(express.static(join(__dirname, "public")));
//port
app.listen(PORT,()=>{
    console.log("server on port:", PORT)
})

export default app;