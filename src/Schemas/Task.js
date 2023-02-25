import { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
    name: String,
    descripcion: String
  /* dateStar: {
        type: Date,
  default: Date.now */
    ,
    dateEnd: Date,
    state: String,
    priority: String,

})

TaskSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})
export const Task = model('Task', TaskSchema)