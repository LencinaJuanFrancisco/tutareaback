import {Router} from 'express'
import proyectoControlles from './../controllers/proyectoController.js'
import {validateToken} from '../middlewares/validateToken.js'
import {ProyectValidation} from '../middlewares/validationForm/proyectValitadionData.js'
const router = Router()

router.get("/",validateToken,proyectoControlles.listarTodos)
router.post("/",validateToken,ProyectValidation,proyectoControlles.crear)
router.post("/addcolaborator/:id",validateToken,proyectoControlles.agregarColaborador)
router.post("/deletecolaborator/:id",validateToken,proyectoControlles.eliminarColaborador)
router.get('/:id',validateToken,proyectoControlles.listarUno)
router.patch('/:id',validateToken,ProyectValidation,proyectoControlles.editar)
router.delete('/:id',validateToken,proyectoControlles.borrar)


export default router