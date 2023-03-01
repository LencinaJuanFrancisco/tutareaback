import {Router} from 'express'
import proyectoControlles from './../controllers/proyectoController.js'
import {validateToken} from '../middlewares/validateToken.js'
const router = Router()

router.get("/",proyectoControlles.listarTodos)
router.post("/",validateToken,proyectoControlles.crear)
router.get('/:id',proyectoControlles.listarUno)
router.patch('/:id',proyectoControlles.editar)
router.delete('/:id',proyectoControlles.borrar)



export default router