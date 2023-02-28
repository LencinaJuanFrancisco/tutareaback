import jwt from 'jsonwebtoken'

export function validateToken(req,res,next){
    //verificamos si hay un token
    const accessToken = req.headers.authorization || req.query.accesstoken
    console.log("token por headers ",req.headers. authorization );
    console.log("token por query ",req.query.accesstoken);
    if (!accessToken) {
        return res.status(201).json({message:"no tiene autorizacion ,debe logearse"})
    }
    jwt.verify(accessToken,process.env.SECRET_JWT,(err,user)=>{
        if (err) {
            return res.status(201).json({message:"Token invalido o expirado, por favor compruebe volviendo a logearce"})
        }else{
            next()
        }

    })

}
