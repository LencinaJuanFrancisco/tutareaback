import jwt from 'jsonwebtoken'

export function validateToken(req,res,next){
    //verificamos si hay un token
    try {
        if (req.headers.authorization) {
            console.log("token por headers ",req.headers. authorization );
            //si el token viene por headers debemos eliminar el BEARER TOKEN para dejar unicamente el token
            const accesstoken = req.headers.authorization
            const token = accesstoken.split(' ')[1]

            
            jwt.verify(token,process.env.SECRET_JWT,(err,user)=>{
                if (err) {
                    throw new Error('NO existe TOKEN o a expirado')
                }else{
                    const {id}= jwt.verify(token,process.env.SECRET_JWT)
                    //insertamos en el req. el id del usuario
                    req.uid = id
                    next()
                }
        
            })

        }else if (req.query.accesstoken) {
            console.log("token por query ",req.query.accesstoken);
            const accesstokenQuery = req.query.accesstoken
            jwt.verify(accesstokenQuery,process.env.SECRET_JWT,(err,user)=>{
                if (err) {
                    throw new Error('NO existe TOKEN o a expirado')
                }else{
                    const {id}= jwt.verify(accesstokenQuery,process.env.SECRET_JWT)
                    //insertamos en el req. el id del usuario
                    req.uid = id
                    next()
                }
        
            })

        }else{

            throw new Error('NO existe TOKEN o a expirado')
        }
    } catch (error) {
    
        return res.status(401).json({error:error.message})
        
    }
    
}
