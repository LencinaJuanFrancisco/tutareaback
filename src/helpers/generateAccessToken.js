
// jwt no admite de forma directa la destructuracion , me dice que haga lo siguiente
import pkg  from 'jsonwebtoken'
const jwt = pkg


export async function generateAccessToken(user){
    const time = "10m"
    const token = jwt.sign(user,process.env.SECRET_JWT)   
    console.log("TOKENNNNN", token); 
    return token
}