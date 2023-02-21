import {Schema,model} from 'mongoose'   

const usersSchema = new Schema({
    name:String,
    email:String,
    password:String,
    
})

usersSchema.set('toJSON',{
    transform: (document, returnedObjet)=>{
        returnedObjet.id = returnedObjet._id
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})
export const User = model('User',usersSchema)