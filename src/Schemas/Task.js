import mongoose, { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
    name: String,
    descripcion: String,
    
    dateEnd: {
        type: Date,
        required: true,
        default: Date.now()
    },
    state:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    userStatusChange:({
        type: mongoose.Types.ObjectId,
        ref: "User"
    }),
    userCreateTask: ({
        type: mongoose.Types.ObjectId,
        ref: "User"

    }),
    proyect:{
        type: mongoose.Types.ObjectId,
        ref: 'Proyect'
    }

},{
    timestamps: true
})

TaskSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})
export const Task = model('Task', TaskSchema)