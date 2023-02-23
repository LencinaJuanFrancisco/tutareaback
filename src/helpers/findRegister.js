import {User} from '../Schemas/Users.js'
import { validateIdParamas } from './validateIdParamas.js'
export async function findRegister(model,id) {
    
    if (validateIdParamas(id)) {
        switch (model) {
            case "User":
                const rta = await User.findById(id)
                return rta
                break;
        
            default:
                break;
        }
    } else {
        return "El formato del id no es correcto"
    }
}