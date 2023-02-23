
import {Router} from 'express'
import { userValidationData } from '../middlewares/validation/userValidationData.js'
import usuarioController from './../controllers/usuarioController.js'
const router = Router()

//CRUD USERS
router.get('/',usuarioController.listarTodos)
router.post('/',userValidationData,usuarioController.crear)
router.get('/:id',usuarioController.listarUno)
router.patch('/:id',usuarioController.editar)
router.delete('/:id',usuarioController.borrar)


//LOGIN
router.post('/login', usuarioController.login)


//ROUTE PROTECTED
router.get('/protegida',(req,res)=>{
    res.send("Estan en una area restringida 👽👽👽👽👽👽👽👽👽")
})



export default router