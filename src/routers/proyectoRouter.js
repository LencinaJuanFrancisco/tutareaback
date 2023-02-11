import {Router} from 'express'

const router = Router()

router.get('/',(req,res)=>{
    console.log('PROYECTOS');
    res.send('PROYECTOS')
})


export default router