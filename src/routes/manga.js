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

const router = Router();

router.get('/formP',formPortada)
router.get('/formC',formCapitulo)
router.get('/formI',formImagenes)
router.get('/index', indexPortada)
router.get('/info/cap/:id', infoCpitulo)
router.get('/cap/imgs/:id', imgsCaps)

router.post("/send/portada", sendPortada)
router.post("/send/capitulo", sendCapitulo)
router.post("/send/imagenes", sendImagenes)
router.get("/next/imagenes/:id", next)
export default router