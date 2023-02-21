import {compare, hash} from 'bcrypt'

const saltRounds = 10;

//para crear un usuario
export async function hashPassword(pass){
    try {
        const resutl = await hash(pass,saltRounds)
        return resutl
    } catch (error) {
        return error
    }
        

}

//para hacer un login
export async function comparePassword(passBody,passDb){
    try {
        // compare devuelve true o false 
        const result = await compare(passBody,passDb);
        if (result) {
            return result
        } else {
            return result
        }
    } catch (error) {
        return error
    }
}