
import {Router} from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { userValidationData } from '../middlewares/validation/userValidationData.js'
import usuarioController from './../controllers/usuarioController.js'
const router = Router()

//CRUD USERS
router.get('/',usuarioController.listarTodos)
router.post('/',userValidationData,usuarioController.crear)

//ROUTE PROTECTED
router.get('/protegida',validateToken,(req,res)=>{
    res.send("Estan en una area restringida 👽👽👽👽👽👽👽👽👽")
})

//LOGIN
router.post('/login', usuarioController.login)


router.get('/:id',usuarioController.listarUno)
router.patch('/:id',usuarioController.editar)
router.delete('/:id',usuarioController.borrar)







export default router