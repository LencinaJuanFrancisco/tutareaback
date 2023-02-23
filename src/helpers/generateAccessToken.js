
// jwt no admite de forma directa la destructuracion , me dice que haga lo siguiente
import pkg  from 'jsonwebtoken'
const jwt = pkg


export async function generateAccessToken(user){
    return jwt.sign(user,process.env.SECRET_JWT)
}