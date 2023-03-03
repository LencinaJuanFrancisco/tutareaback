import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'
import {validateToken} from '../middlewares/validateToken.js'

const router = Router()

router.get("/",tareaController.listarTodos)
router.post("/:id",validateToken,tareaController.crear)//esta ruta se va a llamar desde proyect, por lo tanto el id que viene como parametro es el del proyecto para poder asignarlo a la tarea
router.get('/:id',tareaController.listarUno)
router.patch('/:id',tareaController.editar)
router.delete('/:id',tareaController.borrar)



export default router