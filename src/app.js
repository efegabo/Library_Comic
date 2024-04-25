//imports
import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer';
import {dirname, join} from 'path'
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars'
import manga_router from './routes/manga.js'

//initialitationes 
 
const app = express()
const PORT = process.env.PORT||3000;
dotenv.config();
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

//port
app.listen(PORT,()=>{
    console.log("server on port:", PORT)
})

export default app;