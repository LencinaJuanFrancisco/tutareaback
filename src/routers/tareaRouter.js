import {Router} from 'express'
import tareaController from './../controllers/tareaController.js'

const router = Router()

router.get("/",tareaController.listarTodos)
router.post("/",tareaController.crear)


export default router