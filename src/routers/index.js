import {Router} from 'express'
 import proyectoRouter from './proyectoRouter.js'
 import tareaRouter from './tareaRouter.js'
 import usuarioRouter from './usuarioRouter.js'
 import home from './homeRouter.js'


function allRouter(app){
    const router = Router()
    app.use('/api/v1',router)

    router.use('/',home)
    router.use('/proyecto',proyectoRouter)
    router.use('/tarea',tareaRouter)
    router.use('/usuario',usuarioRouter)



}

export default allRouter;