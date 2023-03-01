
import jwt  from 'jsonwebtoken'



export async function generateAccessToken(id){
    const expiresIn = process.env.JWT_EXPIRES_IN
    const token = jwt.sign({id:id},process.env.SECRET_JWT,{expiresIn})   
    console.log("TOKENNNNN", token); 
    return {token,expiresIn}
}