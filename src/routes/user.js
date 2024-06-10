import {Router} from 'express'

import{renderSignUp,signUp, renderLogin, login,logout} from '../controllers/auth_controller.js'
const router = Router()

router.get('/user/signUp', renderSignUp)
router.get('/user/login', renderLogin)
router.get("/user/logout", logout)


router.post('/user/signUp', signUp)
router.post('/user/login', login)

export default router