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
    //console.log("passbody y passDb", passBody,passDb);
    try {
        // compare devuelve true o false 
        const result = await compare(passBody,passDb);
        //console.log('log de compare---->',result);
       return result
    } catch (error) {
      //  console.log("error en hashPaswword en la function compare");
        return error
    }
}