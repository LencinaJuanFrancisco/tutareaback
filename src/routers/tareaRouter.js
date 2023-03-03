import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'
import {validateToken} from '../middlewares/validateToken.js'

const router = Router()

router.get("/",validateToken,tareaController.listarTodos)
router.post("/cambioestado/:id",validateToken,tareaController.cambioEstado)
router.post("/:id",validateToken,tareaController.crear)//esta ruta se va a llamar desde proyect, por lo tanto el id que viene como parametro es el del proyecto para poder asignarlo a la tarea
router.get('/:id',validateToken,tareaController.listarUno)
router.patch('/:id',validateToken,tareaController.editar)
router.delete('/:id',validateToken,tareaController.borrar)



export default router