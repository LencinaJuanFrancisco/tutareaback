
import {Router} from 'express'
import usuarioController from './../controllers/usuarioController.js'
const router = Router()

router.get('/',usuarioController.listarTodos)


export default router