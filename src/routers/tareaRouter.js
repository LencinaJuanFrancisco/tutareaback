import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'
import {validateToken} from '../middlewares/validateToken.js'

const router = Router()

router.get("/",tareaController.listarTodos)
router.post("/",validateToken,tareaController.crear)
router.get('/:id',tareaController.listarUno)
router.patch('/:id',tareaController.editar)
router.delete('/:id',tareaController.borrar)



export default router