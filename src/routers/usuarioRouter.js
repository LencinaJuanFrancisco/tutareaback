
import {Router} from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { userValidationCreate, userValidationLogin, userValidationLoginUpdate } from '../middlewares/validation/userValidationData.js'
import usuarioController from './../controllers/usuarioController.js'
const router = Router()


//ROUTE PROTECTED
router.get('/protegida',validateToken,(req,res)=>{
    res.send("Estan en una area restringida 👽👽👽👽👽👽👽👽👽")
})

//LOGIN
router.post('/login',userValidationLogin, usuarioController.login)

//GET INFO USERS FOR JWT
//con el token generado recupero la informacion del usuario por medio de ID que se encuentra en el payload de JWT
//esto nos va a servir para tener todos los datos del usuario
router.get('/giu',validateToken,usuarioController.giu)

//CRUD USERS
router.get('/',usuarioController.listarTodos)
router.post('/',userValidationCreate,usuarioController.crear)
router.get('/:id',usuarioController.listarUno)
router.patch('/:id',userValidationLoginUpdate,usuarioController.editar)
router.delete('/:id',usuarioController.borrar)







export default router