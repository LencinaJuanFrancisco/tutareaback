
import jwt  from 'jsonwebtoken'



export async function generateAccessToken(id){
    const expiresIn = "5m"
    const token = jwt.sign({id:id},process.env.SECRET_JWT,{expiresIn})   
    console.log("TOKENNNNN", token); 
    return {token,expiresIn}
}