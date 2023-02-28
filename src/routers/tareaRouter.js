import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'

const router = Router()

router.get("/",tareaController.listarTodos)
router.get('/:id',tareaController.listarUno)
router.post("/",tareaController.crear)
router.patch('/:id',tareaController.editar)
router.delete('/:id',tareaController.borrar)



export default router