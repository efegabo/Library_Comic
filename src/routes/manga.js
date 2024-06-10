import { Router } from "express";

import{formPortada,
     sendPortada,
      formCapitulo,
       sendCapitulo, 
       formImagenes, 
       sendImagenes,
       indexPortada,
       infoCpitulo,
       imgsCaps,
       next} from '../controllers/manga_controller.js'
       import{isAuthenticated} from '../helper/auth.js'  

const router = Router();

router.get('/formP',isAuthenticated,formPortada)
router.get('/formC',isAuthenticated,formCapitulo)
router.get('/formI',isAuthenticated,formImagenes)
router.get('/', indexPortada)
//router.get('/index', indexPortada)
router.get('/info/cap/:id',infoCpitulo)
router.get('/cap/imgs/:id',imgsCaps)

router.post("/send/portada", sendPortada)
router.post("/send/capitulo", sendCapitulo)
router.post("/send/imagenes", sendImagenes)
router.get("/next/imagenes/:id", next)
export default router