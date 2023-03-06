import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'
import {validateToken} from '../middlewares/validateToken.js'
import {taskValidation} from '../middlewares/validationForm/taskValidationData.js'

const router = Router()

router.get("/",validateToken,tareaController.listarTodos)
router.post("/cambioestado/:id",validateToken,tareaController.cambioEstado)
router.post("/:id",validateToken,taskValidation,tareaController.crear)//esta ruta se va a llamar desde proyect, por lo tanto el id que viene como parametro es el del proyecto para poder asignarlo a la tarea
router.get('/:id',validateToken,tareaController.listarUno)
router.patch('/:id',validateToken,taskValidation,tareaController.editar)
router.delete('/:id',validateToken,tareaController.borrar)



export default router