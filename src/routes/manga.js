import { Router } from "express";

import{formPortada, sendPortada} from '../controllers/manga_controller.js'

const router = Router();

router.get('/formP',formPortada)

router.post("/send/portada", sendPortada)
export default router