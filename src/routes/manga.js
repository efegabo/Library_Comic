import { Router } from "express";

import{formPortada, sendPortada, formCapitulo, sendCapitulo} from '../controllers/manga_controller.js'

const router = Router();

router.get('/formP',formPortada)
router.get('/formC',formCapitulo)

router.post("/send/portada", sendPortada)
router.post("/send/capitulo", sendCapitulo)
export default router