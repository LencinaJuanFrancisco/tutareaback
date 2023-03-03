import {Router} from 'express'
import proyectoControlles from './../controllers/proyectoController.js'
import {validateToken} from '../middlewares/validateToken.js'
const router = Router()

router.get("/",validateToken,proyectoControlles.listarTodos)
router.post("/",validateToken,proyectoControlles.crear)
router.post("/addcolaborator/:id",validateToken,proyectoControlles.agregarColaborador)
router.post("/deletecolaborator/:id",validateToken,proyectoControlles.eliminarColaborador)
router.get('/:id',proyectoControlles.listarUno)
router.patch('/:id',validateToken,proyectoControlles.editar)
router.delete('/:id',validateToken,proyectoControlles.borrar)


export default router