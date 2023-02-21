
import {Router} from 'express'
import usuarioController from './../controllers/usuarioController.js'
const router = Router()

router.get('/',usuarioController.listarTodos)
router.post('/',usuarioController.crear)
router.get('/:id',usuarioController.listarUno)

export default router